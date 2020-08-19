process.env.NODE_ENV = 'test';
// thirdparty dependencies
const { expect } = require('chai');

// application modules
const {
  userAttendances,
  createAttendance,
} = require('../../src/controllers/attendance.js');

describe('Test Attendace controllers', () => {
  context('Test user attendance groups', () => {
    it('should return user groups', () => {
      expect(typeof userAttendances()).to.equal('string');
    });
  });
});

describe('Test that attendance is created', function () {});
