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

describe('Test user management', () => {
  after(async () => {
    await User.destroy({ truncate: { cascade: true, restartIdentity: true } });
  });
  context('Add users', () => {
    it('Add user', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/register')
        .send(data)
        .type('json')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
