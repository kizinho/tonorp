/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
const { meeting } = require('../../models/index');

const userAttendances = (user_id) => {
  return 'user attendance';
};

const createAttendance = async (meeting_id) => {
  const meet = await meeting.findByPk(meeting_id);
  if (meet === null) {
    throw Error('No class with the passed id');
  }

  const attendance = await meet.createAttendance();
  return attendance;
};
module.exports = { userAttendances, createAttendance };
