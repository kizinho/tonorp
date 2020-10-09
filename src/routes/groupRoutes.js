/* eslint-disable camelcase */
const express = require('express');

// Application modules
const { userGroups } = require('../controllers/getUserGroups');
const {
  addGroup,
  addUserToGroup,
  usersInGroup,
  createAttendanceROll, updateGroupSetting
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
  const { id: userId } = request.user;

  try {
    const group = await addGroup(userId, name);
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
  const { groupId } = request.body;
  const { id: userId } = request.user;

  try {
    addUserToGroup(userId, groupId);
    return response
      .status(200)
      .json({ error: false, message: 'Joined group successfully' });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.get('/user-in-groups/:groupId', async (request, response) => {
  const { groupId } = request.params;

  try {
    const userInGroup = await usersInGroup(groupId);
    return response.status(200).json({
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

router.put('/update-group-setting', async (request, response) => {

  try {
    await updateGroupSetting(request.body);
    return response
      .status(200)
      .json({ error: false, message: 'Group setting updated succefully' });
  } catch (error) {
    return response.status(401).json({ error: true, message: error.message });
  }



})

module.exports = router;
