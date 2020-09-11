process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const {
  User,
  attendanceGroups,
  attendanceRecorded,
  meeting,
  attendance,
} = require('../../models/index');
const {
  userGroups,
  groupAttendanceCount,
} = require('../../src/controllers/getUserGroups');

// dummy information
const data = {
  firstName: 'Adike',
  lastName: 'Kizito',
  username: 'Maduabuchi',
  email: 'kizzz@gmail.com',
  password: '12345678',
};
describe('Test Get User Group controllers', () => {
  let userId;
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;

    await attendanceGroups.create({
      name: 'workshop',
      ownerId: userId,
    });
    return testUser;
  });
  after((done) => {
    attendanceGroups
      .destroy({
        truncate: {
          cascade: true,
          restartIdentity: true,
        },
      })
      .then(() => {
        User.destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        }).then(() => {
          done();
        });
      })
      .catch(() => {
        done();
      });
  });
  it('Test that user  group successfully return', async () => {
    const userGroup = await userGroups(userId);
    expect(userGroup).to.be.an('array');
  });
});

describe('Test Count User  attendance recoreded Group controllers', () => {
  let userId;
  let attendanceGroupId;
  let meetingId;
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;

    const attendGroup = await attendanceGroups.create({
      name: 'workshop',
      ownerId: userId,
    });

    attendanceGroupId = attendGroup.id;
    const meetingAttendId = await meeting.create({
      attendanceGroupId,
      type: 'visual',
    });
    meetingId = meetingAttendId.id;
    const attendId = await attendance.create({
      meetingId,
    });
    const attendanceId = attendId.id;
    await attendanceRecorded.create({
      attendanceId,
      meetingId,
      UserId: userId,
    });
    return testUser;
  });
  after((done) => {
    attendanceGroups
      .destroy({
        truncate: {
          cascade: true,
          restartIdentity: true,
        },
      })
      .then(() => {
        meeting.destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        });
      })
      .then(() => {
        attendance.destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        });
      })
      .then(() => {
        attendanceRecorded.destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        });
      })
      .then(() => {
        User.destroy({
          truncate: {
            cascade: true,
            restartIdentity: true,
          },
        }).then(() => {
          done();
        });
      })
      .catch(() => {
        done();
      });
  });
  it('Test count of user attendance recoreded', async () => {
    const countAttendGround = await groupAttendanceCount(meetingId);
    expect(typeof countAttendGround).to.equal('number');
  });
});

