process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const {
  User,
  attendanceGroups,
  groupSetting,
  attendanceRoll,
} = require('../../models/index');
const {
  addGroup,
  addUserToGroup,
  usersInGroup,
  createAttendanceROll,
} = require('../../src/controllers/groups');
const { generateRandomString } = require('../../src/modules/utils/helper');
// dummy information
const data = {
  firstName: 'Melody',
  lastName: 'Daniel',
  username: 'melodyogonna',
  email: 'meodkdkdk@jjj.j',
  password: 'kskskkkskks',
};
let userId;
let groupId;

describe('Create attendance groups', function () {
  let newGroup;

  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;
    return testUser;
  });
  after(async () => {
    // await attendanceGroups.destroy({
    //   truncate: { cascade: true, restartIdentity: true },
    // });
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
    await groupSetting.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
  });
  it('Test that group and groupSetting is created successfully', async () => {
    const group = await addGroup(userId, 'adminsNGS');
    newGroup = group;

    expect(typeof group.id).to.equal('number');

    expect(group.groupId.length).to.equal(7);
  });

  it('Should test that owner is added to new group', async () => {
    const userInGroup = await usersInGroup(newGroup.groupId);
    expect(userInGroup.length).to.be.equal(1);
  });

  it('Tests weather the owner role is correctly assigned', async () => {
    const groupUsers = await usersInGroup(newGroup.groupId);
    const joinTableinfo = groupUsers[0].userGroup;
    console.log(joinTableinfo);
    expect(joinTableinfo.role).to.equal(3);
  });
});

describe('Add users to group', function () {
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;
    const group = await addGroup(userId, 'adminsNGS');
    groupId = group.groupId;
    return testUser;
  });

  after(async () => {
    await attendanceGroups.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
    await groupSetting.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
    return true;
  });

  it('Test that user is successfully added to group', async () => {
    const added = await addUserToGroup(userId, groupId);
    expect(added).to.be.an('array');
  });

  it('Should return users in group', async () => {
    const users = await usersInGroup(groupId);
    expect(users).to.an('array');
  });
});

describe('Test group attendance roll controllers', () => {
  let attendanceGroupId;
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;

    const attendGroupId = await attendanceGroups.create({
      name: 'workshop',
      ownerId: userId,
      groupId: generateRandomString(7),
    });
    attendanceGroupId = attendGroupId.id;

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
        attendanceRoll.destroy({
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
  it('Test that attendance roll return an object', async () => {
    const roll = await createAttendanceROll(
      attendanceGroupId,
      '2020-09-21 20:26:20',
      '2020-09-21 20:26:20',
      '2020-09-09 11:26:20'
    );
    expect(roll).to.be.an('object');
  });
});
