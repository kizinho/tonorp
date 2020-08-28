process.env.NODE_ENV = 'test';

const { expect } = require('chai');

const { User, attendanceGroups } = require('../../models/index');
const { userGroups } = require('../../src/controllers/getUserGroups');


// dummy information
const data = {
    firstName: 'Adike',
    lastName: 'Kizito',
    username: 'Maduabuchi',
    email: 'kizzz@gmail.com',
    password: '12345678',
};
describe('Test Get User Group controllers', () => {
    let userId;
    before(async () => {
        const testUser = await User.create(data);
        userId = testUser.id;

        await attendanceGroups.create({
            name: 'workshop',
            ownerId: userId
        })
        return testUser;
    });
    after((done) => {
        attendanceGroups
            .destroy({
                truncate: {
                    cascade: true,
                    restartIdentity: true
                }
            })
            .then(() => {
                User.destroy({
                    truncate: {
                        cascade: true,
                        restartIdentity: true
                    },
                }).then(()=>{
                    done();
                })
            }).catch(() => {
                done();
            });
    });
    it('Test that user  group successfully return', async () => {
        const userGroup = await userGroups(userId);
        expect(userGroup).to.be.an('array');
    });

});