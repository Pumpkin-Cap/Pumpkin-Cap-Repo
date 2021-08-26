// const Message = require('../db/models/message');
// const Channel = require('../db/models/channel');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('join-room', roomName => {
        console.log(` ${socket} has joined the room ${roomName} `)
        socket.join(roomName)
    })

    socket.on('message-room', roomName => {
        console.log(` ${socket} is sending a message to ${roomName}`)
        socket.to(roomName).emit('new-message', 'HELLO')
    })

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });
    
    socket.on('new-channel', channel => {
      socket.broadcast.emit('new-channel', channel);
    });

  });

};