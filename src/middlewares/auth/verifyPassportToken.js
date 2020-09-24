/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy;

const { User } = require('../../../models/index');
const jwtOptions = require('./jwtOptions');

/** Strategy for verifying a token and user is valid */
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  const user = await User.findByPk(jwt_payload.id);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

module.exports = jwtStrategy;
