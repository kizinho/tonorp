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
} = require('../../models/index');
const {
  userAttendances,
  createAttendance,
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
    return true;
  });
  it('Should create a new attendance', async function () {
    const attendance = await createAttendance(meeting_id);
    expect(typeof attendance.id).to.equal('number');
  });
});
