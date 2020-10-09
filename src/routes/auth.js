const express = require('express');

const router = require('express').Router();

// Application modules
const { validateLogin } = require('../controllers/users');
const { generateToken } = require('../modules/utils/helper');
const { forgotPassword, resetPassword } = require('../controllers/auth');

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

  const token = generateToken(user);
  return res
    .status(200)
    .json({ error: false, message: 'Login successful', token, user });
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const resetPin = await forgotPassword(email);
    return res
      .status(200)
      .json({ error: false, message: 'Reset Pin successfully send to your email', resetPin, email });
  } catch (e) {
    return res.status(401).json({ error: true, message: e.message });
  }


})

router.post('/reset-password', async (req, res) => {
  const { password,  email } = req.body;
  try {
    await resetPassword(password, email);
    return res
      .status(200)
      .json({ error: false, message: 'Password Successfully Changed' });
  } catch (e) {
    return res.status(401).json({ error: true, message: e.message });
  }


})

module.exports = router;
