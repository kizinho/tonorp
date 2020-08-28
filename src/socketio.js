const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('connectionSuccess', "You're connected");

  socket.on('group message', (message) => {
    socket.broadcast.emit(message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnectted');
  });
});

module.exports = io;
