const express = require('express');

const router = require('express').Router();

// Application modules
const { validateLogin } = require('../controllers/users');
const { generateToken } = require('../modules/utils/helper');

// initialize middlewares
router.use(express.json());

// Define routes
router.post('/login', async (req, res) => {
  let user;

  const { email, password } = req.body;
  try {
    user = await validateLogin(email, password);
  } catch (e) {
    /* handle error */
    return res.status(401).json({ error: true, message: e.message });
  }

  const token = generateToken();
  return res
    .status(200)
    .json({ error: false, message: 'Login successful', token });
});

module.exports = router;
