import Gun from "gun";
import { decodeBase64 } from "tweetnacl-util";
import { encodeBase64 } from "tweetnacl-util";
import { deriveKey } from "./utils";

const gun = Gun({
  peers: ["http:localhost:8000/gun"],
});

export async function login(userId: string, password: string) {
  try {
    const encodedSalt = await getUserSalt(userId);
    const salt = decodeBase64(encodedSalt);
    const key = await deriveKey(password, salt);

    // Encode key to base64
    let encodedKey;
    if (typeof window !== "undefined") {
      encodedKey = encodeBase64(
        new Uint8Array(
          await window.crypto.subtle.exportKey("raw", key as CryptoKey)
        )
      );
    } else {
      encodedKey = key as string;
    }

    return await authenticateUser(userId, encodedKey);
  } catch (err) {
    console.error(err);
    return false;
  }
}

function getUserSalt(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    gun.get(userId).once((data: { salt?: string }) => {
      if (data.salt) {
        resolve(data.salt);
      } else {
        reject(new Error("Salt not found"));
      }
    });
  });
}

function authenticateUser(userId: string, encodedKey: string) {
  return new Promise((resolve) => {
    gun.get(userId).once((data) => {
      resolve(data.key === encodedKey);
    });
  });
}
