/* eslint-disable camelcase */

const { saveGroupMessage } = require('./messages');

const sendGroupMessage = (io, groupId, data) => {
  saveGroupMessage(groupId, data.senderId, data.message);

  io.to(groupId).emit('group message', data);
};

const sendPersonalMessage = (io, chatId, data) => {
  io.to(chatId).emit('personal message', data);
};

module.exports = { sendGroupMessage, sendPersonalMessage };
