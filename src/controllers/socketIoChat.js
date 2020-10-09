/* eslint-disable camelcase */
const sendGroupMessage = (io, groupId, data) => {
  io.to(groupId).emit('group message', data);
};

const sendPersonalMessage = (io, chatId, data) => {
  io.to(chatId).broadcast('personal message', data);
};

module.exports = { sendGroupMessage, sendPersonalMessage };
