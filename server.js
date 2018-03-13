const app = require('./server-config');
const PORT = process.env.PORT || 3000;
// const socketController = require('./app/controllers/SocketController')

const server = app.listen(PORT);

console.log('Serving up fresh HTML on port ', PORT);

const io = require('socket.io')(server);

io.on('connection', socket => {
  
  let channel = socket.handshake.query.token
  console.log('connection');
  socket.join(channel);

  module.exports.io = io;
  module.exports.socket = socket;
});
