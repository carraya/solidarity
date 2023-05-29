import Gun from "gun";
import crypto from "crypto";

const gun = Gun({
  peers: ["http://localhost:8000/gun"],
});

export function joinGroup(
  groupId: string,
  userId: string,
  invitationCode: string
) {
  // Verify the invitation code
  console.log("in joinGroup");
  return verifyInvitationCode(groupId, invitationCode).then((isValid) => {
    if (!isValid) {
      throw new Error("Invalid invitation code");
    }

    // If the invitation code is valid, add the user to the group
    return new Promise((resolve, reject) => {
      gun
        .get("groups")
        .get(groupId)
        .get("members")
        .put({ [userId]: true }, (ack: any) => {
          if (ack && ack.err) {
            reject(ack.err);
          } else {
            // Regenerate the invitation code once the user has successfully joined
            const newInvitationCode = crypto.randomBytes(16).toString("hex");
            gun
              .get("groups")
              .get(groupId)
              .get("invitationCode")
              .put(newInvitationCode, (ack: any) => {
                if (ack && ack.err) {
                  reject("Failed to regenerate the invitation code");
                } else {
                  resolve("Successfully joined the group");
                }
              });
          }
        });
    });
  });
}

function verifyInvitationCode(groupId: string, invitationCode: string) {
  return new Promise((resolve) => {
    gun
      .get("groups")
      .get(groupId)
      .get("invitationCode")
      .once((code) => {
        if (code === invitationCode) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
}
