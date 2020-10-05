/* eslint-disable camelcase */
const express = require('express');

// Application modules
const { userGroups } = require('../controllers/getUserGroups');
const {
  addGroup,
  addUserToGroup,
  usersInGroup,
  createAttendanceROll,
} = require('../controllers/groups');
const { userMeeting } = require('../controllers/meeting');

const passport = require('../middlewares/auth/index');

const router = express.Router();

// global variables
const authenticateUser = passport.authenticate('jwt', { session: false });

// Initialize middlewares
router.use(express.json());
router.use(authenticateUser);

router.get('/user-groups/', async (request, response) => {
  const { id: userId } = request.user;

  try {
    const user_groups = await userGroups(parseInt(userId, 10));

    return response.status(200).json({
      error: false,
      message: 'Groups successfully returned',
      user_groups,
    });
  } catch (error) {
    return response
      .status(400)
      .json({ error: true, message: "Can't return groups for user" });
  }
});

router.post('/create-group', async (request, response) => {
  const { name } = request.body;

  try {
    const group = await addGroup(request.user.id, name);
    return response
      .status(201)
      .json({ error: false, message: 'Group created successfully', group });
  } catch (error) {
    return response.status(400).json({ error: true, message: error.message });
  }
});

router.post('/create-meeting', async (request, response) => {
  const { attendanceGroupId, type } = request.body;

  try {
    const meeting = await userMeeting(attendanceGroupId, type);
    return response
      .status(201)
      .json({ error: false, message: 'Meeting Created', meeting });
  } catch (error) {
    return response.status(400).json({ error: true, message: error.message });
  }
});

router.post('/join-group', async (request, response) => {
  const { userId, groupId } = request.body;

  try {
    addUserToGroup(userId, groupId);
    return response
      .status(200)
      .json({ error: false, message: 'Joined group successfully' });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.get('/user-in-groups', async (request, response) => {
  const { groupId } = request.body;

  try {
    const userInGroup = await usersInGroup(groupId);
    return response
      .status(200)
      .json({
        userInGroup,
        error: false,
        message: 'Uses successfully returned',
      });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.post('/attendance-roll', async (request, response) => {
  const { attendanceGroupId, time, start, end } = request.body;

  try {
    const rollAttendance = await createAttendanceROll(
      attendanceGroupId,
      time,
      start,
      end
    );
    return response.send(rollAttendance);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

module.exports = router;
