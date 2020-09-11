/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
const { meeting, attendance } = require('../../models/index');

const userAttendances = (user_id) => {
  return 'user attendance';
};

const createAttendance = async (meeting_id) => {
  const meet = await meeting.findByPk(meeting_id);
  if (meet === null) {
    throw Error('No class with the passed id');
  }

  const new_attendance = await meet.createAttendance();
  return new_attendance;
};

const recordAttendance = async (attendance_id, UserId, meetingId) => {
  const p_att = await attendance.findByPk(attendance_id);
  if (p_att === null) {
    throw new Error('Invalid attendance list');
  }
  const recorded_attendance = await p_att.createAttendanceRecorded({
    UserId,
    meetingId,
  });
  return recorded_attendance;
};
module.exports = { userAttendances, createAttendance, recordAttendance };
