/* eslint-disable camelcase */
const io = require('socket.io')();

const {
  sendGroupMessage,
  sendPersonalMessage,
} = require('./controllers/socketIoChat');
// eslint-disable-next-line no-unused-vars
const { JoinUserToGroup } = require('./controllers/socketIoGroup');

let userIds = 1;

io.on('connection', (socket) => {
  socket.emit('user id', userIds);
  socket.user_id = userIds;
  userIds += 1;

  socket.emit('connectionSuccess', "You're connected");

  socket.on('group message', (message) => {
    sendGroupMessage(socket, 'melody', message);
  });

  // Send personal message
  socket.on('personal message', (message) => {
    const { sockets } = io.sockets;
    // message = JSON.parse(message);
    Object.keys(sockets).forEach((socket_id) => {
      const current_socket = sockets[socket_id];
      if (current_socket.user_id === 3) {
        return sendPersonalMessage(socket, socket_id, message);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnectted');
  });
});

module.exports = io;
