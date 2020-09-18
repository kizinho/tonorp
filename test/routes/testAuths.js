process.env.NODE_ENV = 'test';
// third-party dependencies
const chai = require('chai');
const { expect } = require('chai');
const chai_http = require('chai-http');

// application modules
const app = require('../../src/main');
const { User } = require('../../models/index');

chai.use(chai_http);

// dummy information
const data = {
  firstName: 'Melody',
  lastName: 'Daniel',
  username: 'melodyogonna',
  email: 'meodkdkdk@jjj.j',
  password: 'kskskkkskks',
};

// login information
const loginInformation = {
  email: 'meodkdkdk@jjj.j',
  password: 'kskskkkskks',
};
describe('Test user is logged in', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .type('json')
      .send(data)
      .end(() => done());
  });

  after(async () => {
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
  });
  context("Route returns user's groups", () => {
    it('Test login route works', function (done) {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginInformation)
        .end((err, res) => {
          expect(res).to.not.have.status(404);
          done();
        });
    });
    it('Test token is generated', function (done) {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(loginInformation)
        .end((err, res) => {
          expect(res.body.error).to.equal(false);
          expect(res.body.token).to.not.be.empty;
          done();
        });
    });
  });
});
