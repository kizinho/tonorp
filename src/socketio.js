/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const io = require('socket.io')();

const {
  sendGroupMessage,
  sendPersonalMessage,
} = require('./controllers/socket/socketIoChat');

const { messagesInGroup } = require('./controllers/socket/utils');
const { JoinUserToGroup } = require('./controllers/socket/socketIoGroup');

io.on('connection', (socket) => {
  socket.emit('connectionSuccess', "You're connected");

  socket.on('register', (userId) => {
    JoinUserToGroup(socket, userId);
    socket.user_id = userId;
  });

  // Personal Messages
  socket.on('group message', (message, groupId) => {
    return sendGroupMessage(socket, groupId, message);
  });

  // Send personal message
  socket.on('personal message', (message, chatId) => {
    // message = JSON.parse(message);
    return sendPersonalMessage(io, chatId, message);
  });

  // Return messages sent in a group
  socket.on('messages in group', async (groupId, offsetIndex) => {
    const messages = await messagesInGroup(groupId, offsetIndex);
    io.to(socket.id).emit('messages in group', messages);
  });

  socket.on('disconnect', () => {
    console.log('User disconnectted');
  });
});

module.exports = io;
