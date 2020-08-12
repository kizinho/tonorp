/* eslint-disable camelcase */
const user = require('../../models/user');

// Validates and registers a user to the app
const addUser = async (userDetails) => {
  if (!userDetails) {
    throw TypeError(`Add user expects an object, got ${typeof userDetails}`);
  }

  if (!isValidDetails(userDetails)) {
    throw new Error('Invalid user details');
  }

  const new_user = await user.create(userDetails);
  return new_user;
};

module.exports = { addUser };
