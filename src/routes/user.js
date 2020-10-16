/* eslint-disable camelcase */
// Third party modules
require('dotenv');
const { response } = require('express');
const express = require('express');

// Application modules
const userController = require('../controllers/users');
const { generateToken } = require('../modules/utils/helper');
const { route } = require('./attendance');

const passport = require('../middlewares/auth/index');

// Initialize express router
const router = express.Router();

// Initialize middlewares
router.use(express.json());

// global variables
const authenticateUser = passport.authenticate('jwt', { session: false });

// Define routes
router.get('/user-details', authenticateUser, async (request, response) => {
  const { id: user_id } = request.user;

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


router.post('/update-profile', async (request, response) => {
  try {
    await userController.updateProfile(request.body);
    return response.status(200).json({ error: false, message: 'profile updated successfully' });
  } catch (e) {
    return response.status(400).json({ error: true, message: e.message });
  }


})

module.exports = router;
