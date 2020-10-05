process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const { User, attendanceGroups, meeting } = require('../../models/index');
const { userMeeting, meetingSort } = require('../../src/controllers/meeting');
const { generateRandomString } = require('../../src/modules/utils/helper');

const data = {
  firstName: 'Kizito',
  lastName: 'Maduabuchi',
  username: 'kizinho',
  email: 'adikekizito@gmail.com',
  password: '12345678',
};

describe('Test Meeting controllers', () => {
  let userId;
  let attendGroupId;
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;

    const testAttendGroup = await attendanceGroups.create({
      name: 'workshop',
      ownerId: userId,
      groupId: generateRandomString(7),
    });
    attendGroupId = testAttendGroup.id;
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
        });
      })
      .then(() => {
        meeting
          .destroy({
            truncate: {
              cascade: true,
              restartIdentity: true,
            },
          })
          .then(() => done());
      })
      .catch(() => {
        done();
      });
  });
  it('should test that meeting is created', async () => {
    const meetings = await userMeeting(attendGroupId, 'physical');
    expect(typeof meetings.id).to.equal('number');
  });
});

describe('Test All Meeting sort controllers', () => {
  let userId;
  let attendanceGroupId;
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;

    const testAttendGroup = await attendanceGroups.create({
      name: 'workshop',
      ownerId: userId,
      groupId: generateRandomString(7),
    });
    attendanceGroupId = testAttendGroup.id;
    await meeting.create({
      attendanceGroupId,
      type: 'visual'
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
        });
      })
      .then(() => {
        meeting
          .destroy({
            truncate: {
              cascade: true,
              restartIdentity: true,
            },
          })
          .then(() => done());
      })
      .catch(() => {
        done();
      });
  });
  it('should test that meeting sort is received', async () => {
    const sort = await meetingSort(attendanceGroupId, new Date);
    expect(sort).to.be.an('array');
  });
});
