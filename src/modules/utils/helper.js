const jwt = require('jsonwebtoken');

const helper = {};

/** generate a random string for
 * @param {number} stringLength - Length of generated random string
 */

helper.generateRandomString = (stringLength) => {
  // eslint-disable-next-line no-param-reassign
  stringLength = typeof stringLength === 'number' ? stringLength : 20;
  const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < stringLength; i++) {
    const randomChar = possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
    str += randomChar;
  }
  return str;
};

/** Check if a date is valid
 * @param {String} d - Date you're validating
 */
helper.isValidDate = (d) => {
  // eslint-disable-next-line no-restricted-globals
  return new Date(d) !== 'Invalid Date' && !isNaN(new Date(d));
};

helper.generateToken = (user) => {
  const randomString = this.generateRandomString(3);
  const token = jwt.sign({ id: user.id, randomString }, process.env.SECRET_KEY);
  return token;
};

module.exports = helper;
