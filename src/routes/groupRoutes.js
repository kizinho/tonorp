/* eslint-disable camelcase */
const router = require('express').Router();

// Application modules
const { userGroups } = require('../controllers/getUserGroups');

router.get('/user-groups/:userId', async (request, response) => {
  const { userId } = request.params;

  if (typeof parseInt(userId, 10) !== 'number') {
    return response.status(400).json({ error: 'userId should be a number' });
  }

  const user_groups = await userGroups(parseInt(userId, 10));
  console.log(user_groups);
  return response.send('user attendance');
});

module.exports = router;
