const express = require('express');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

// Application modules
const { validateLogin } = require('../controllers/users');

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
  const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY);

  return res
    .status(200)
    .json({ error: false, message: 'Login successful', token });
});

module.exports = router;
