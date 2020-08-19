const { User } = require('../../../models/index');

const UserExists = async (userId) => {
  const user = await User.findByPk(userId);
  if (user === null) {
    return false;
  }
  return true;
};

module.exports = { UserExists };
