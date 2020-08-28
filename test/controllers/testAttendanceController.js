/* eslint-disable camelcase */
process.env.NODE_ENV = 'test';
// thirdparty dependencies
const { expect } = require('chai');

// application modules
const {
  User,
  attendanceGroups,
  meeting,
  groupSetting,
  attendance,
  attendanceRecorded,
} = require('../../models/index');
const {
  userAttendances,
  createAttendance,
  recordAttendance,
} = require('../../src/controllers/attendance.js');
const { userMeeting } = require('../../src/controllers/meeting');
const { addGroup } = require('../../src/controllers/groups');

describe('Test Attendace controllers', () => {
  context('Test user attendance groups', () => {
    it('should return user groups', () => {
      expect(typeof userAttendances()).to.equal('string');
    });
  });
});

describe('Test that attendance is created', function () {
  let meeting_id;
  let att_id;
  let user_id;
  before(async () => {
    const data = {
      firstName: 'Melody',
      lastName: 'Daniel',
      username: 'melodyogonna',
      email: 'meodkdkdk@jjj.jk',
      password: 'kskskkkskks',
    };
    const user = await User.create(data);
    const group = await addGroup(user.id, 'testgroup');
    const test_meeting = await userMeeting(group.id, 'virtual');
    meeting_id = test_meeting.id;
    user_id = user.id;
    return test_meeting;
  });
  after(async () => {
    await attendanceGroups.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
    await groupSetting.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });

    await meeting.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
    await attendance.destroy({ truncate: { cascade: true } });
    await attendanceRecorded.destroy({ truncate: { cascade: true } });
    return true;
  });
  it('Should create a new attendance', async function () {
    const new_attendance = await createAttendance(meeting_id);
    att_id = new_attendance.id;
    expect(typeof new_attendance.id).to.equal('number');
  });
  it('Tests if attendance is recorded', async function () {
    const re_att = await recordAttendance(att_id, user_id);
    expect(typeof re_att.id).to.equal('number');
  });
});
