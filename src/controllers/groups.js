const { attendanceGroups, User } = require('../../models/index');

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
  const user = await User.findByPk(userId);
  const group = await attendanceGroups.findByPk(groupId);
  const userAdded = await group.addUser(user);
  return userAdded;
};

module.exports = { addGroup, addUserToGroup };
