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



describe('Test user login', () => {

  // dummy information
  const data = {
    firstName: 'Adike',
    lastName: 'Kizito',
    username: 'Maduabuchi',
    email: 'meodkdkdk@jjj.jk',
    password: 'kskskkkskks',
  };
  it('Test user login successfully logged', async () => {
    const login = await userLogin(data.email, data.password);
    expect(typeof login.id).to.equal('number');
  });

  // it('Test user invaild email', () => {
  //   const login = userLogin;
  //   // eslint-disable-next-line no-return-await
  //   expect(async () => await login('adikekizi@gmail.com', '1233445')).to.throw();
  // });

});


