/* eslint-disable camelcase */
const argon2 = require('argon2');
const model = require('../../models/index');
const Validate = require('../modules/utils/ValidateUser');
const { hash } = require('../modules/utils/hashPassword');

// Validates and registers a user to the app
const addUser = async (userDetails, user = model.User) => {
  if (!userDetails) {
    throw TypeError(`Add user expects an object, got ${typeof userDetails}`);
  }

  const validateuser = new Validate(userDetails);

  if (!validateuser.validate()) {
    throw new Error('Invalid user details');
  }

  try {
    const password = await hash(userDetails.password);
    // eslint-disable-next-line no-param-reassign
    userDetails.password = password;

    const new_user = await user.create(userDetails);
    return new_user;
  } catch (e) {
    /* handle error */
    console.log(e);
    throw e;
  }
};

const returnUser = async (user_id) => {
  if (!user_id || typeof user_id !== 'number') {
    throw TypeError(
      `Invalid user Id type, expected number, got ${typeof user_id}}`
    );
  }

  const user = await model.user.findByPk(user_id);
  return user;
};
module.exports = { addUser, returnUser };
