import Gun from "gun";
import { randomBytes } from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";
import { deriveKey } from "./utils";

const gun = Gun({
  peers: ["http:localhost:8000/gun"], // Put the relay node that you want here
});

export async function register(userId: string, password: string) {
  const salt = randomBytes(16);
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
  await saveUserData(userId, encodedKey, encodeBase64(salt));
}

function saveUserData(userId: string, key: string, encodedSalt: string) {
  return new Promise<void>((resolve) => {
    gun.get(userId).put({ key: key, salt: encodedSalt }, (ack) => {
      resolve();
    });
  });
}
