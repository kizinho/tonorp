const router = require('express').Router();

// Application modules
const passport = require('../middlewares/auth/index');
const { userAttendances } = require('../controllers/attendance');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log(req.user);
    const attendances = await userAttendances(req.user.id);
    return res.send(req.user);
  }
);

module.exports = router;
