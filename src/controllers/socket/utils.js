const { attendanceGroups } = require('../../../models');

const messagesInGroup = async (groupId, offsetIndex) => {
  const group = await attendanceGroups.findOne({
    where: {
      groupId,
    },
  });

  if (!group) {
    throw new Error('group does not exist');
  }

  const messages = await group.getMessages({
    offset: offsetIndex,
    limit: 100,
  });

  return messages;
};

module.exports = { messagesInGroup };
