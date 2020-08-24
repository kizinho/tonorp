const argon2 = require('argon2');

const hash = async (password) => {
    const hashedPassword = await argon2.hash(password)
    return hashedPassword;

}

module.exports = { hash }