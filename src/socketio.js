/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const io = require('socket.io')();

const {
  sendGroupMessage,
  sendPersonalMessage,
} = require('./controllers/socketIoChat');

// eslint-disable-next-line no-unused-vars
const { JoinUserToGroup } = require('./controllers/socketIoGroup');

io.on('connection', (socket) => {
  socket.emit('connectionSuccess', "You're connected");

  socket.on('register', (userId) => {
    JoinUserToGroup(socket, userId);
    socket.user_id = userId;
  });

  socket.on('group message', (message, groupId) => {
    sendGroupMessage(io, groupId, message);
  });

  // Send personal message
  socket.on('personal message', (message, chatId) => {
    // message = JSON.parse(message);
    return sendPersonalMessage(io, chatId, message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnectted');
  });
});

module.exports = io;
