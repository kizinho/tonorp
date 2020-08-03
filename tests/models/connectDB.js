// NPM modules
const chai = require('chai');

// application modules
const { sequelize: db } = require('../../models/index');

const { expect } = chai;

describe('Connect to databse', () => {
  context('connect to database', () => {
    it('should connect to my database', async function () {
      expect().to.equal(1);
    });
  });
});
