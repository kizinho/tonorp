const { attendanceGroups, User } = require('../../models/index');
const { generateRandomString } = require('../modules/utils/helper');

const addGroup = async (userId, name, groupmodel = attendanceGroups) => {
  if (!name || name === '' || typeof name !== 'string') {
    throw TypeError('Invalid Group Name');
  } else if (!userId || typeof userId !== 'number') {
    throw TypeError('Invalid user id');
  }

  const addGroupSetting = async (group) => {
    try {
      await group.createGroupSetting();
      return;
    } catch (e) {
      /* handle error */
      console.log(e);
      throw e;
    }
  };

  const creategroup = () => {
    const groupId = generateRandomString(7);
    return groupmodel
      .create({ name, ownerId: userId, groupId })
      .then((group) => {
        addGroupSetting(group);
        return group;
      })
      .catch((e) => {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return creategroup();
        }
        throw e;
      });
  };
  return creategroup();
};

const addUserToGroup = async (userId, groupId) => {
  const user = await User.findByPk(userId);
  const group = await attendanceGroups.findByPk(groupId);
  const userAdded = await group.addUser(user);
  return userAdded;
};

const usersInGroup = async (groupId) => {
  const group = await attendanceGroups.findByPk(groupId);
  const users = await group.getUsers();
  return users;
};

module.exports = { addGroup, addUserToGroup, usersInGroup };
