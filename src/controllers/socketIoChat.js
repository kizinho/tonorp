/* eslint-disable camelcase */
const sendGroupMessage = (io, groupId, data) => {
  io.to(groupId).emit('group message', data);
};

const sendPersonalMessage = (io, socket_id, data) => {
  io.to(socket_id).emit('personal message', data);
};

module.exports = { sendGroupMessage, sendPersonalMessage };
