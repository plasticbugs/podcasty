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
  socket.broadcast.to(channel).emit('message', 'you are in');
  
  module.exports.io = io;
  // socketController.connection(socket, io);
  socket.emit('message', 'you are in')
  module.exports.socket = socket;
})

// module.exports.Server = Server;