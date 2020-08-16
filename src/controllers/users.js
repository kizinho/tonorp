/* eslint-disable camelcase */
const model = require('../../models/index');
const Validate = require('../modules/utils/ValidateUser');

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
    const new_user = await user.create(userDetails);
    return new_user;
  } catch (e) {
    /* handle error */
    console.log(e);
    throw e;
  }
};

module.exports = { addUser };
