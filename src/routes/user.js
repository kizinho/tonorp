// Third party modules
require('dotenv');
const { sequelize: db } = require('sequelize');
const express = require('express');

// Application modules
const attendanceController = require('../../controllers/attendanceController');

const router = express.Router();

router.get('user/:userID', attendanceController.userAttendances);

export default router;
