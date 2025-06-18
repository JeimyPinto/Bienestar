const db = require("../models/index.js");
const Group = db.Group;
const User = db.User;

async function getAllGroups() {
  return await Group.findAll({
    include: [
      { association: "members", model: User },
      { association: "instructor", model: User },
    ],
  });
}

async function getGroupById(id) {
  return await Group.findByPk(id, {
    include: [
      { association: "members", model: User },
      { association: "instructor", model: User },
    ],
  });
}

async function createGroup(groupData) {
  return await Group.create(groupData);
}

async function updateGroup(id, groupData) {
  const group = await Group.findByPk(id);
  if (!group) return null;
  await group.update(groupData);
  return group;
}

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
};
