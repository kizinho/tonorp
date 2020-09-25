/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

// Application modules
const { userGroups } = require('../controllers/getUserGroups');
const { addGroup } = require('../controllers/groups');
const { userMeeting } = require('../controllers/meeting');

const passport = require('../middlewares/auth/index');

// Initialize middlewares
router.use(express.json());

// global variables
const authenticateUser = passport.authenticate('jwt', { session: false });

router.get('/user-groups/', authenticateUser, async (request, response) => {
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

router.post('/create-group', authenticateUser, async (request, response) => {
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

router.post('/create-meeting', authenticateUser, async (request, response) => {
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

module.exports = router;
