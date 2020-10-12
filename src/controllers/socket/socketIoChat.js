/* eslint-disable camelcase */

const { saveGroupMessage } = require('../messages');
const { returnUser } = require('../users');

const sendGroupMessage = async (io, groupId, data) => {
  const newMessage = await saveGroupMessage(groupId, data.userId, data.message);
  const user = await returnUser(data.userId);

  const message = {
    sender: user,
    message: newMessage.message,
    sentAt: newMessage.createdAt,
    groupId,
  };

  io.broadcast.to(groupId).emit('group message', message);
};

const sendPersonalMessage = (io, chatId, data) => {
  io.to(chatId).emit('personal message', data);
};

module.exports = { sendGroupMessage, sendPersonalMessage };
