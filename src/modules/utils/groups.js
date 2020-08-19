const { attendanceGroups } = require('../../../models/index');

const groupExists = async (groupId) => {
  const group = await attendanceGroups.findByPk(groupId);
  if (group === null) {
    return false;
  }
  return true;
};

module.exports = { groupExists };
