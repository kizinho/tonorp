const { attendanceGroups } = require('../../models');

const saveGroupMessage = async (groupId, UserId, message) => {
  if (typeof parseInt(UserId, 10) !== 'number') {
    throw new TypeError('User Id must be a number');
  }

  if (typeof groupId !== 'string' || groupId.length < 7 || groupId.length > 7) {
    throw new TypeError(
      'Group Code must be a string and should have a length of 7'
    );
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

    console.log(e.message);
  }
};

module.exports = { saveGroupMessage };
