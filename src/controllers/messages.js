const { attendanceGroups } = require('../../models');

const saveGroupMessage = async (groupId, UserId, message) => {
  if (typeof attendanceGroupId !== 'number' || typeof UserId !== 'number') {
    throw new TypeError('User Id and Attendance Group Id must be a number');
  }

  try {
    const group = await attendanceGroups.findOne({
      where: {
        groupId,
      },
    });

    const newMessage = await group.createMessage({
      UserId,
      message,
    });

    return newMessage;
  } catch (e) {
    /* handle error */
    if (e instanceof TypeError) {
      throw e;
    }

    const error = new Error('Could not save message to database');
    error.originMessage = e.message;
    throw error;
  }
};

module.exports = { saveGroupMessage };
