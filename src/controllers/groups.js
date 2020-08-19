const { attendanceGroups, User } = require('../../models/index');
const { UserExists } = require('../modules/utils/user');
const { groupExists } = require('../modules/utils/groups');

const addGroup = async (userId, name, groupmodel = attendanceGroups) => {
  if (!name || name === '' || typeof name !== 'string') {
    throw TypeError('Invalid Group Name');
  } else if (!userId || typeof userId !== 'number') {
    throw TypeError('Invalid user id');
  }

  // Check that user with the id exists in the database
  const user = await User.findByPk(userId);
  if (user === null) {
    throw new Error('User does not Exist');
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
    return groupmodel
      .create({ name, ownerId: userId })
      .then((group) => {
        addGroupSetting(group);
        return group;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return creategroup();
};

const addUserToGroup = async (userId, groupId) => {
  if (!(await UserExists(userId))) {
    throw new Error('User does not exist');
  }
  if (!(await groupExists(groupId))) {
    throw new Error('Group does not exist');
  }
  const user = await User.findByPk(userId);
  const group = await attendanceGroups.findByPk(groupId);
  const userAdded = await group.addUser(user);
  return userAdded;
};

module.exports = { addGroup, addUserToGroup };
