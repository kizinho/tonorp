/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

// Application modules
const { userGroups } = require('../controllers/getUserGroups');
const { addGroup } = require('../controllers/groups');
const { userMeeting } = require('../controllers/meeting')

// Initialize middlewares
router.use(express.json());

router.get('/user-groups/:userId', async (request, response) => {
  const { userId } = request.params;

  if (typeof parseInt(userId, 10) !== 'number') {
    return response.status(400).json({ error: 'userId should be a number' });
  }
  try {
    const user_groups = await userGroups(parseInt(userId, 10));
    return response.send(user_groups);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.post('/create', async (request, response) => {
  const { name, ownerId } = request.body;
  try {
    const group = await addGroup(ownerId, name);
    return response.send(group);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

router.post('/meeting', async (request, response) => {
  const { attendanceGroupId, type } = request.body
  try {
    const meeting = await userMeeting(attendanceGroupId, type);
    return response.send(meeting);
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }

});

module.exports = router;
