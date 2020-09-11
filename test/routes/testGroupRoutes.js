process.env.NODE_ENV = 'test';
// third-party dependencies
const chai = require('chai');
const { expect } = require('chai');
const chai_http = require('chai-http');

// application modules
const app = require('../../src/main');

chai.use(chai_http);

describe('test attendance route', () => {
  context("Route returns user's groups", () => {
    it("return all user's groups", function (done) {
      chai
        .request(app)
        .get('/api/v1/groups/user-groups/1')
        .end((err, res) => {
          expect(res).to.not.have.status(404);
          done();
        });
    });
  });
});
