process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const { User, attendanceGroups, groupSetting } = require('../../models/index');
const { addGroup } = require('../../src/controllers/groups');

const data = {
  firstName: 'Melody',
  lastName: 'Daniel',
  username: 'melodyogonna',
  email: 'meodkdkdk@jjj.j',
  password: 'kskskkkskks',
};
let userId;
describe('Create attendance groups', function () {
  before(async () => {
    const testUser = await User.create(data);
    userId = testUser.id;
    return testUser;
  });
  after((done) => {
    attendanceGroups
      .destroy({ truncate: { cascade: true, restartIdentity: true } })
      .then(() => {
        User.destroy({
          truncate: { cascade: true, restartIdentity: true },
        }).then(() => {
          groupSetting
            .destroy({
              truncate: { cascade: true, restartIdentity: true },
            })
            .then(() => done());
        });
      })
      .catch(() => {
        done();
      });
  });
  it('Test that group and groupSetting is created successfully', async () => {
    const group = await addGroup(userId, 'adminsNGS');
    expect(typeof group.id).to.equal('number');
  });
});
