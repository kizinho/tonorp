const sendGroupMessage = (io, groupName, data) => {
  io.to(groupName).emit('group message', data);
};

const sendPersonalMessage = (io, socket_id, data) => {
  io.to(socket_id).emit('personal message', data);
};

module.exports = { sendGroupMessage, sendPersonalMessage };
