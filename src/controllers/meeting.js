const { meeting } = require('../../models/index');

const userMeeting = async (attendanceGroupsId, type) => {
  if (
    !attendanceGroupsId ||
    !type ||
    typeof attendanceGroupsId !== 'number' ||
    typeof type !== 'string'
  ) {
    throw new Error('Attendance group and type can not be null');
  }
  const groupMeeting = await meeting.create({
    attendanceGroupsId,
    type,
  });
  return groupMeeting;
};

module.exports = { userMeeting };

