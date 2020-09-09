const { User } = require('../../models/index');

/**
 * Return every group is a member of
 * @param {number} userId - Id of the user
 * @return {promise}
 */
const userGroups = async (userId) => {
  if (!userId || typeof userId !== 'number') {
    throw new TypeError(`Expected userId to be number, got ${typeof userId}`);
  }

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User does not exist');
  }
  const userGroupList = await user.getAttendanceGroups();
  return userGroupList;
};

module.exports = { userGroups };
