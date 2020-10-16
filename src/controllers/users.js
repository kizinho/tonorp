/* eslint-disable camelcase */
const argon2 = require('argon2');
const model = require('../../models/index');
const Validate = require('../modules/utils/ValidateUser');
const { hash } = require('../modules/utils/hashPassword');
const InvalidUserDetails = require('../modules/errors/invalidUserDetails');
const { transporterMail } = require('../modules/utils/mailDetails');
// Validates and registers a user to the app
const addUser = async (userDetails, user = model.User) => {
  if (!userDetails) {
    throw TypeError(`Add user expects an object, got ${typeof userDetails}`);
  }

  const validateuser = new Validate(userDetails);

  if (!validateuser.validate()) {
    throw new InvalidUserDetails(
      validateuser.returnErrors(),
      'Invalid user details'
    );
  }

  try {
    const password = await hash(userDetails.password);
    // eslint-disable-next-line no-param-reassign
    userDetails.password = password;

    const new_user = await user.create(userDetails);
    const transporter = await transporterMail(2525, 'smtp.mailtrap.io', false, '3d304ab625e965', '60b456bc30222a');

    await transporter.sendMail({
      from: 'support@tornop@gmail.com',
      to: userDetails.email,
      subject: "Success Registration",
      html: `<b>Hello </b>  ${userDetails.username} your registration was successful`,
    });

    return new_user;
  } catch (e) {
    /* handle error */
    console.log(e);
    throw e;
  }
};

const returnUser = async (user_id) => {
  if (!user_id || typeof user_id !== 'number') {
    throw new TypeError(
      `Invalid user Id type, expected number, got ${typeof user_id}}`
    );
  }

  const user = await model.User.findByPk(user_id);
  if (!user) {
    throw new Error('User does not exist');
  }
  return user;
};

/** Validates a user's login details
 * @param {string} email - User's Email address
 * @param {string} password - User's password
 * Checks that a user with the email address exists in the database and
 * That the passed in password matches the one already saved in the database
 */
const validateLogin = async (email, password) => {
  const userData = await model.User.findOne({
    where: { email },
  });
  if (!userData) {
    throw new Error('Email does not exist');
  }
  if (await argon2.verify(userData.password, password)) {
    return userData;
  }
  throw new Error('Invalid password');
};


const updateProfile = async (userDetails, user = model.User) => {
  if (typeof userDetails.userId !== 'number') {
    throw TypeError('Invalid user , user is required');
  }

  const updateUser = await user.update(userDetails, {
    where: {
      id: userDetails.userId
    }
  });

  return updateUser;

}
const updateProfilePhoto = async ()=>{


  
}

module.exports = { addUser, validateLogin, returnUser, updateProfile };
