process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const { User, attendanceGroups, groupSetting } = require('../../models/index');
const {
  addGroup,
  addUserToGroup,
  usersInGroup,
} = require('../../src/controllers/groups');

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
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;
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
    return;
  });
  it('Test that group and groupSetting is created successfully', async () => {
    const group = await addGroup(userId, 'adminsNGS');
    expect(typeof group.id).to.equal('number');
    console.log(group.groupId);
    expect(group.groupId.length).to.equal(10);
  });
});

describe('Add users to group', function () {
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;
    const group = await addGroup(userId, 'adminsNGS');
    groupId = group.id;
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
