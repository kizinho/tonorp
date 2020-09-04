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
  const user = userController.returnUser(request.params.user_id);
  return response.send(user);
});

router.post('/register', async (request, response) => {
  const user = await userController.addUser(request.body);
  return response.send(user);
});

module.exports = router;
