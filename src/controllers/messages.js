const { message: groupMessage } = require('../../models');

const saveGroupMessage = async (attendanceGroupId, UserId, message) => {
  if (typeof attendanceGroupId !== 'number' || typeof UserId !== 'number') {
    throw new TypeError('User Id and Attendance Group Id must be a number');
  }

  try {
    const newMessage = await groupMessage.create({
      attendanceGroupId,
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
