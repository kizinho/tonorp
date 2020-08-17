process.env.NODE_ENV = 'test';

const {
    expect
} = require('chai');

const {
    User,
    attendanceGroups
} = require('../../models/index');
const {
    addMeeting
} = require('../../src/controllers/meeting');

const data = {
    firstName: 'Kizito',
    lastName: 'Maduabuchi',
    username: 'kizinho',
    email: 'adikekizito@gmail.com',
    password: '12345678',
};

describe('Test Meeting controllers', () => {
    before(async () => {
        const testUser = await User.create(data);
       // userId = testUser.id;
        return testUser;
    });
   
});