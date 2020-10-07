/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const io = require('socket.io')();

const {
  sendGroupMessage,
  sendPersonalMessage,
} = require('./controllers/socketIoChat').default;
// eslint-disable-next-line no-unused-vars
const { JoinUserToGroup } = require('./controllers/socketIoGroup');

const connectedUsers = {};

io.on('connection', (socket) => {
  socket.emit('connectionSuccess', "You're connected");

  socket.on('register', (userId) => {
    JoinUserToGroup(socket, userId);
    socket.user_id = userId;
  });

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
