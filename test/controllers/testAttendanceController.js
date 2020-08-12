// thirdparty dependencies
const { expect } = require('chai');

// application modules
const attendanceController = require('../../src/controllers/attendanceController.js');

describe('Test Attendace controllers', () => {
  context('Test user attendance groups', () => {
    it('should return user groups', () => {
      expect(typeof attendanceController()).to.equal('string');
    });
  });
});
