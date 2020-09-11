const router = require('express').Router();

// Application modules
const { userAttendances } = require('../controllers/attendance');

router.get('/user-groups/:userId', (req, res) => {
  const user_groups = userAttendances(req.params.userID);
  res.send('user attendance');
});

module.exports = router;
