/* eslint-disable func-names */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');

const { User } = require('../../models/index');
const { UserExists } = require('../../src/modules/utils/user');

describe('Return false when user does not exist', function () {
  it('should return false', async function () {
    const exist = await UserExists(1000);
    expect(exist).to.equal(false);
  });
});

describe('return true when user exists', function () {
  let userId;
  const data = {
    firstName: 'Melody',
    lastName: 'Daniel',
    username: 'melodyogonna',
    email: 'meodkdkdk@jjj.j',
    password: 'kskskkkskks',
  };
  before(async () => {
    const user = await User.create(data);
    userId = user.id;
    return userId;
  });
  after(async () => {
    await User.destroy({
      truncate: { cascade: true, restartIdentity: true },
    });
  });
  it('should return true', async function () {
    const exist = await UserExists(userId);
    expect(exist).to.equal(true);
  });
});
