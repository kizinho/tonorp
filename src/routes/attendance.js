const router = require('express').Router();

// Application modules
const passport = require('../middlewares/auth/index');
const { userAttendances } = require('../controllers/attendance');

const authenticateUser = passport.authenticate('jwt', { session: false });

router.get('/', authenticateUser, async (req, res) => {
  const attendances = await userAttendances(req.user.id);
  return res.send(req.user);
});


module.exports = router;
