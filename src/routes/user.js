/* eslint-disable camelcase */
// Third party modules
require('dotenv');
const express = require('express');

// Application modules
const userController = require('../controllers/users');
const getUserGroupController = require('../controllers/getUserGroups');

// Initialize express router
const router = express.Router();

// Initialize middlewares
router.use(express.json());

// Define routes
router.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  if (typeof parseInt(user_id, 10) !== 'number') {
    response.status(400).json({ error: 'Invalid user id type' });
  }

  const user = userController.returnUser(parseInt(user_id));
  return response.send(user);
});

router.post('/register', async (request, response) => {
  const user = await userController.addUser(request.body);
  return response.send(user);
});

router.get('/get_groups/:user_id', async (request, response) => {
  const { user_id } = requests.params
  try {
    const getGroup = await getUserGroupController.userGroups(parseInt(user_id));
    return response.send(getGroup);
  } catch (error) {
    console.log(error.message)
    return response.status(400).json({ error: 'Error Ocuured' })
  }

});

module.exports = router;
