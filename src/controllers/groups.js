const {
  attendanceGroups,
  User,
  attendanceRoll,
} = require('../../models/index');
const {
  generateRandomString,
  isValidDate,
} = require('../modules/utils/helper');

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

const changeUserRoleInGroup = async (roleNumber, userId, attendanceGroupId) => {
  if (typeof roleNumber !== 'number') {
    throw new TypeError(`Role should be a number, got ${typeof roleNumber}`);
  }
  if (roleNumber < 1 || roleNumber > 3) {
    throw new TypeError(
      `Role number is out of range, should be between 1 to 3`
    );
  }

  const group = await attendanceGroups.findByPk(attendanceGroupId);

  const userInGroup = await group.getUsers({
    where: {
      id: userId,
    },
  });

  const joinTable = userInGroup[0].userGroup;
  joinTable.role = roleNumber;
  await joinTable.save();
  return joinTable;
};

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

      .then(async (group) => {
        addGroupSetting(group);
        await addUserToGroup(userId, groupId);
        changeUserRoleInGroup(3, userId, group.id);
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
  changeUserRoleInGroup,
};
