process.env.NODE_ENV = 'test';
// thirdparty dependencies
const { expect } = require('chai');

// application modules
const attendanceController = require('../../src/controllers/attendance.js');

describe('Test Attendace controllers', () => {
  context('Test user attendance groups', () => {
    it('should return user groups', () => {
      expect(typeof attendanceController()).to.equal('string');
    });
  });
});
