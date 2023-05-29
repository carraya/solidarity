import { decodeBase64 } from "tweetnacl-util";
import { deriveKey } from "./utils";

export async function login(userId: string, password: string) {
  // TODO: Retrieve the user's salt securely
  const salt = "";

  // Derive the key from the password and salt
  const key = await deriveKey(password, decodeBase64(salt));

  // TODO: Use this key to authenticate the user
}
