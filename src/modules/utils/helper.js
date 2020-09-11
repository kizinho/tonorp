const helper = {};

helper.generateRandomString = (stringLength) => {
  stringLength = typeof stringLength === 'number' ? stringLength : 20;
  const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  for (let i = 0; i < stringLength; i++) {
    const randomChar = possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
    str += randomChar;
  }
  return str;
};

module.exports = helper;
