/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy;

const { User } = require('../../../models/index');
const jwtOptions = require('./jwtOptions');

/** Strategy for verifying a token and user is valid */
const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log(jwt_payload);
  User.findOne({ id: jwt_payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

module.exports = jwtStrategy;
