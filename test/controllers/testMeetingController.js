process.env.NODE_ENV = 'test';

const {
    expect
} = require('chai');

const {
    User,
    attendanceGroups
} = require('../../models/index');
const addMeeting = require('../../src/controllers/meeting');

const data = {
    firstName: 'Kizito',
    lastName: 'Maduabuchi',
    username: 'kizinho',
    email: 'adikekizito@gmail.com',
    password: '12345678',
};

describe('Test Meeting controllers', () => {
    let userId;
    let attendGroupId;
    before(async () => {
        const testUser = await User.create(data);
        userId = testUser.id;

        const testAttendGroup = await attendanceGroups.create({
            name: 'workshop',
            ownerId: userId
        })
        attendGroupId = testAttendGroup.id;
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
                })
            }).then(() => {
                addMeeting
                    .destroy({
                        truncate: {
                            cascade: true,
                            restartIdentity: true
                        },
                    })
                    .then(() => done());
            }).catch(() => {
                done();
            });
    });
    it('should test that meeting is created', async () => {
        const meeting = await addMeeting(attendGroupId, 'physical');
        expect(typeof meeting.id).to.equal('number');
    });

});