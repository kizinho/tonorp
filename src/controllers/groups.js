const {
  attendanceGroups,
  User,
  attendanceRoll,
} = require('../../models/index');
const {
  generateRandomString,
  isValidDate,
} = require('../modules/utils/helper');

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
  try {
    const user = await User.findByPk(userId);
    const group = await attendanceGroups.findOne({
      where: {
        groupId,
      },
    });

    await group.addUser(user);

    const users = await group.getUsers();
    return users;
  } catch (e) {
    /* handle error */
    throw new Error('Could not add user to grop');
  }
};

const usersInGroup = async (groupId) => {
  const group = await attendanceGroups.findOne({
    where: {
      groupId,
    },
  });
  const users = await group.getUsers();
  return users;
};

const createAttendanceROll = async (attendanceGroupId, time, start, end) => {
  const checkStart = isValidDate(start);
  const checkEnd = isValidDate(end);
  const checkTime = isValidDate(time);
  if (checkStart === false || checkEnd === false || checkTime === false) {
    throw TypeError('Invalid Date');
  }
  const createRoll = await attendanceRoll.create({
    attendanceGroupId,
    time,
    start,
    end,
  });
  return createRoll;
};

module.exports = {
  addGroup,
  addUserToGroup,
  usersInGroup,
  createAttendanceROll,
};
