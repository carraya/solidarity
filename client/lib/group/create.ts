import Gun from "gun";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const gun = Gun({
  peers: ["http://localhost:8000/gun"],
});

export function createGroup(
  name: string,
  description: string,
  organizerId: string,
  cryptoWalletCode: string
) {
  // Generate a secure random code
  const invitationCode = crypto.randomBytes(16).toString("hex");

  // Generate a unique id for the group
  const groupId = uuidv4();

  // Initialize the group in the database with its basic details
  const groupData = {
    id: groupId,
    name,
    description,
    organizerId,
    cryptoWalletCode,
    invitationCode,
  };

  gun.get("groups").get(groupId).put(groupData);

  // Add the organizer to the members and admins
  gun
    .get("groups")
    .get(groupId)
    .get("members")
    .put({ [organizerId]: true });

  gun
    .get("groups")
    .get(groupId)
    .get("admins")
    .put({ [organizerId]: true });

  // Initialize events as an empty object
  gun.get("groups").get(groupId).get("events").put({});

  // Resolve with the group ID and invitation code
  return Promise.resolve({ groupId, invitationCode });
}
