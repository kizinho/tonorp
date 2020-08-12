const router = require('express').Router();

// Application modules
const attendanceController = require('../controllers/attendanceController');

router.get('/user-groups/:userId', (req, res) => {
  const user_groups = attendanceController(req.params.userID);
  res.send('user attendance');
});

module.exports = router;
