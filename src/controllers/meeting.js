const { meeting, attendanceGroups } = require('../../models/index');

/**
 * Create a class inside a group
 * Don't be confused with class and meeting, they're the same thing
 * @param {number} attendanceGroupsId - Id of the parent group
 * @param {string} type = Type of class, physical or virtual
 */
const userMeeting = async (attendanceGroupId, type) => {
  if (
    !attendanceGroupId ||
    !type ||
    typeof attendanceGroupId !== 'number' ||
    typeof type !== 'string'
  ) {
    throw new Error('Attendance group and type can not be null');
  }
  const groupMeeting = await meeting.create({
    attendanceGroupId,
    type,
  });
  return groupMeeting;
};

/**
 * Return the classes held in a group
 * @param {number} groupId - Group Id for the classes
 * @return {array} Classes in a group as array
 */
const classesHeld = async (groupId) => {
  if (!groupId || typeof groupId !== 'number') {
    throw new TypeError(
      `Invalid parameter type, expected number but got ${typeof groupId}`
    );
  }

  const group = await attendanceGroups.findByPk(groupId);
  if (!group) {
    throw new Error('Group does not exist');
  }

  const classes = await group.getMeetings();
  return classes;
};

module.exports = { userMeeting, classesHeld };
