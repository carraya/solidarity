// utils/crypto.ts

import { promisify } from "util";
import crypto from "crypto";

const isBrowser = typeof window !== "undefined";

export const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<CryptoKey | string> => {
  if (isBrowser) {
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
    return await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  } else {
    const derivedKey = await promisify(crypto.pbkdf2)(
      password,
      salt,
      100000,
      32,
      "sha256"
    );
    console.log("HEREHERE");

    return derivedKey.toString("hex");
  }
};
