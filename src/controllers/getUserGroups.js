const { User, attendanceRecorded } = require('../../models/index');

/**
 * Return every group is a member of
 * @param {number} userId - Id of the user
 * @return {promise}
 */
const userGroups = async (userId) => {
  if (!userId || typeof userId !== 'number') {
    throw new TypeError(`Expected userId to be number, got ${typeof userId}`);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User does not exist');
  }
  const userGroupList = await user.getAttendanceGroups();
  return userGroupList;
};

const groupAttendanceCount = async (meetingId) => {
  if (!meetingId || typeof meetingId !== 'number') {
    throw new Error('GroupId is required ');
  }
  const groupCount = await attendanceRecorded.count({
    where: {
      meetingId,
    },
  });
  return groupCount;
};

module.exports = { userGroups, groupAttendanceCount };

