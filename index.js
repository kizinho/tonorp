require('dotenv').config();
const http = require('http');

const app = require('./src/main');
const localSocketIo = require('./src/socketio');

const port = process.env.PORT || 4000;
const server = http.createServer(app);
localSocketIo.listen(server);

server.listen(port, () => {
  console.log(`serving app on port ${port}`);
});
