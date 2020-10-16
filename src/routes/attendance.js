const express = require('express');
const router = require('express').Router();

// Application modules
const passport = require('../middlewares/auth/index');
const { userAttendances, createAttendance, recordAttendance } = require('../controllers/attendance');
const { response } = require('express');

// initialize middlewares
router.use(express.json());
const authenticateUser = passport.authenticate('jwt', { session: false });

router.get('/', authenticateUser, async (req, res) => {
  const attendances = await userAttendances(req.user.id);
  return res.send(req.user);
});

router.post('/create-attendance', authenticateUser, async (request, response) => {
  const { meetingId } = request.body;
  try {
    const attendanceCreate = await createAttendance(meetingId);
    return response.status(200).json({ error: false, message: 'attendance successfully created', attendance: attendanceCreate })
  } catch (e) {
    return response.status(400).json({ error: true, message: e.message })
  }

});

router.post('/record-attendance', authenticateUser, async (request, response) => {
  const { attendanceId, UserId, meetingId, attendanceRollId } = request.body;

  try {
    const recorededAttendance = await recordAttendance(attendanceId, UserId, meetingId, attendanceRollId );
    return response.status(200).json({ error: false, message: 'attendance recoreded successfully', record: recorededAttendance })
  } catch (e) {
    return response.status(400).json({ error: true, message: e.message })
  }


});

module.exports = router;
