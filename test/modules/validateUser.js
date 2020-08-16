process.env.NODE_ENV = 'test';
const { expect } = require('chai');

const ValidateUser = require('../../src/modules/utils/ValidateUser');

describe('validate user Inputs', () => {
  context('test that validator works for every method', () => {
    it('Should return false', () => {
      const data = {
        firstName: 'Melody',
        lastName: 'Daniel',
        username: 'melodyogonna',
        email: 'meodkdkdk@jjjj',
        password: 'kskskkkskks',
      };
      const userDetails = new ValidateUser(data);
      expect(userDetails.validate()).to.equal(false);
    });

    it('should return true', () => {
      const data = {
        firstName: 'Melody',
        lastName: 'Daniel',
        username: 'melodyogonna',
        email: 'meodkdkdk@jjj.j',
        password: 'kskskkkskks',
      };
      const userDetails = new ValidateUser(data);
      expect(userDetails.validate()).to.equal(true);
    });
  });
});

describe('Test each method', () => {
  const data = {
    firstName: 'Melody',
    lastName: 'Daniel',
    username: 'melodyogonna',
    email: 'meodkdkdk@jjjj.ckckc',
    password: 'kskskkkskks',
  };
  const validateUser = new ValidateUser(data);
  context('Test user fullname', function () {
    it('Should return true for valid fullname', () => {
      expect(validateUser.validateNames()).to.equal(true);
    });
  });

  context('Test user email', function () {
    it('should return true for valid username', function () {
      expect(validateUser.validateUsername()).to.equal(true);
    });
  });

  context('Test user email', function () {
    it('should return true for valid email', function () {
      expect(validateUser.validateEmail()).to.equal(true);
    });
  });

  context('Test user password', function () {
    it('should return true for valid password', function () {
      expect(validateUser.validatePassword()).to.equal(true);
    });
  });
});
