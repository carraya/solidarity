import Gun from "gun";

const gun = Gun({
  peers: ["http://localhost:8000/gun"],
});

export function getGroup(groupId: string) {
  return new Promise((resolve, reject) => {
    gun
      .get("groups")
      .get(groupId)
      .once(async (group) => {
        if (group) {
          const members = await getMembersHelper(group.members["#"]);
          resolve({
            id: groupId,
            name: group.name,
            description: group.description,
            cryptoWalletCode: group.cryptoWalletCode,
            invitationCode: group.invitationCode,
            members,
          });
        } else {
          reject();
        }
      });
  });
}

function getMembersHelper(membersId: string) {
  return new Promise((resolve, reject) => {
    gun.get(membersId).once((members) => {
      if (members) {
        const memberIds = Object.keys(members).filter(
          (key) => key !== "_" && members[key] === true
        );
        resolve(memberIds);
      } else {
        reject();
      }
    });
  });
}

export function getGroupMembers(groupId: string) {
  return new Promise((resolve, reject) => {
    gun
      .get("groups")
      .get(groupId)
      .get("members")
      .once((data) => {
        if (data) {
          const memberIds = Object.keys(data).filter((key) => key !== "_");
          resolve(memberIds);
        } else {
          reject("No members found");
        }
      });
  });
}

export function getGroupAdmins(groupId: string) {
  return new Promise((resolve, reject) => {
    gun
      .get("groups")
      .get(groupId)
      .get("admins")
      .once((data) => {
        if (data) {
          // Filter out any non-member data from Gun.js
          const adminIds = Object.keys(data).filter((key) => key !== "_");
          resolve(adminIds);
        } else {
          reject("No admins found");
        }
      });
  });
}
