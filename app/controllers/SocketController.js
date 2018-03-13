
var globalSocket;



module.exports.connection = (socket, io) => {
  // console.log('wordy')
  // var nsp = io.of('/websocket');
  // io.on('connection', function(socket){
    let token = socket.handshake.query.token;
    console.log('token: ', token)
    // socket.join(token)
  }
  // nsp.emit('request channel');


// module.exports.report