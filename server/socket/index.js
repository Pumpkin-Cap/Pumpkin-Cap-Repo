// const Message = require('../db/models/message');
// const Channel = require('../db/models/channel');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('join-room', joinObject => {
        console.log(` ${joinObject.userName} has joined the room: ${joinObject.roomName} `)
        socket.join(joinObject.roomName)
        socket.to(joinObject.roomName).emit(` ${joinObject.userName} has joined the room: ${joinObject.roomName} `)
    })

    socket.on('message-room', roomMessage => {
        socket.to(roomMessage.roomName).emit('new-message', roomMessage)
    })

    socket.on('new-message', messageObject => {
      socket.broadcast.emit('new-message', messageObject);
    });
    
    socket.on('change-code', eventObject => {
      socket.to(eventObject.roomName).emit('change-code', eventObject);
    });

  });

};