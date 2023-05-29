import { randomBytes } from "tweetnacl";
import { encodeBase64 } from "tweetnacl-util";
import { deriveKey } from "./utils";

export async function register(userId: string, password: string) {
  const salt = randomBytes(16);

  // Convert the password and salt to a key
  const key = await deriveKey(password, salt);

  // TODO: Store the user data (including salt) securely
}
