const express = require('express');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

// Application modules
const { validateLogin } = require('../controllers/users');

// initialize middlewares
router.use(express.json());

// Define routes
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await validateLogin(email, password);
  const token = jwt.sign({ data: user.id }, process.env.SECRET_KEY);
  res.status(200).json({ error: false, message: 'Login successful', token });
});

module.exports = router;
