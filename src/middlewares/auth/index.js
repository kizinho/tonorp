const passport = require('passport');

const verifyToken = require('./verifyPassportToken');

passport.use(verifyToken);

module.exports = passport;
