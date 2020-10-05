/* eslint-disable camelcase */
// Third party modules
require('dotenv');
const express = require('express');

// Application modules
const userController = require('../controllers/users');
const { generateToken } = require('../modules/utils/helper');

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

  const user = await userController.returnUser(parseInt(user_id, 10));
  return response.send(user);
});

router.post('/register', async (request, response) => {
  try {
    const user = await userController.addUser(request.body);
    const token = generateToken(user);
    return response
      .status(201)
      .json({ user, error: false, message: 'registration successful', token });
  } catch (error) {
    return response
      .status(400)
      .json({ error: true, message: error.message, details: error.errors });
  }
});

module.exports = router;
