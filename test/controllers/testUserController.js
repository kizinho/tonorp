process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { User } = require('../../models/index');

const { addUser, returnUser } = require('../../src/controllers/users');

describe('Add user to the database', function () {
  const data = {
    firstName: 'Melody',
    lastName: 'Daniel',
    username: 'melodyogonna',
    email: 'meodkdkdk@jjj.jk',
    password: 'kskskkkskks',
  };

  let userId;

  after(async () => {
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
  });
  it('Create a new user', async function () {
    const adduser = await addUser(data);
    userId = addUser.id;
    expect(typeof adduser.id).to.equal('number');
  });

  it('Should return a user based on primary key', async () => {
    const user = await returnUser(userId);
    expect(user.id).to.be.a('number');
  });
});
