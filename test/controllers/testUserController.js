process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { User } = require('../../models/index');

const { addUser, validateLogin } = require('../../src/controllers/users');

describe('Add user to the database', function () {
  const data = {
    firstName: 'Melody',
    lastName: 'Daniel',
    username: 'melodyogonna',
    email: 'meodkdkdk@jjj.jk',
    password: 'kskskkkskks',
  };

  after(async () => {
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
  });
  it('Create a new user', async () => {
    const adduser = await addUser(data);
    expect(typeof adduser.id).to.equal('number');
  });
});

describe('Test user login', () => {
  // dummy information
  const data = {
    firstName: 'Adiketest',
    lastName: 'Kizito',
    username: 'Maduabuchi',
    email: 'meodkdkdk@jjj.jk',
    password: 'kskskkkskks',
  };
  before(async () => {
    const testUser = await addUser(data);
    return testUser;
  });
  after(async () => {
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
  });
  it('Test user login successfully logged', async () => {
    const loginUser = await validateLogin('meodkdkdk@jjj.jk', 'kskskkkskks');
    expect(typeof loginUser.id).to.equal('number');
  });

  // it('Test user invaild email', () => {
  //   const login = userLogin;
  //   // eslint-disable-next-line no-return-await
  //   expect(async () => await login('adikekizi@gmail.com', '1233445')).to.throw();
  // });
});
