/* eslint-disable camelcase */
// Third party modules
require('dotenv');
const express = require('express');

// Application modules
const userController = require('../controllers/users');

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
  try {
    const user = await userController.addUser(request.body);
    return response.send(user);
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
});

module.exports = router;