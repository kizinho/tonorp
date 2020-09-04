process.env.NODE_ENV = 'test';

// third-party dependencies
const chai = require('chai');
const { expect } = require('chai');
const chai_http = require('chai-http');

// application modules
const app = require('../../src/main');

chai.use(chai_http);

describe('Test user management', () => {
  context('Add users', () => {
    it('Add user', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/register')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
