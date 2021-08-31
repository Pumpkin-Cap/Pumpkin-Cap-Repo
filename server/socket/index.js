// const Message = require('../db/models/message');
// const Channel = require('../db/models/channel');

module.exports = io => {

  const rooms = {}
  const users = {}

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('join-room', joinObject => {
        console.log(` ${joinObject.userName} has joined the room: ${joinObject.roomName} `)
        users[socket.id] = joinObject.userName
        socket.join(joinObject.roomName)
        socket.to(joinObject.roomName).emit(` ${joinObject.userName} has joined the room: ${joinObject.roomName} `)
    })

    socket.on('leave-room', leaveObject => {
        console.log(` ${leaveObject.userName} has left the room: ${leaveObject.roomName} `)
        socket.leave(leaveObject.roomName)
        socket.to(leaveObject.roomName).emit(` ${leaveObject.userName} has left the room: ${leaveObject.roomName} `)
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

    socket.on('join-call', callObject => {
      // const socketIds = rooms[callObject.roomName]
      console.log(`${callObject.peerId} is trying to join the call in room ${callObject.roomName}` )
      socket.to(callObject.roomName).emit('call-socket', callObject)
    })

  });

  io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
    rooms[room] = []
  });
  

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
    rooms[room].push(id)

    let userArray = rooms[room].map(socketId => users[socketId])

    io.to(room).emit("room-update", {userName: 'server', room: {roomName: room, users: userArray, sockets: rooms[room]}})
    console.log('room members: ', rooms[room])
  });
  

  io.of("/").adapter.on("leave-room", (room, id) => {
    console.log(`socket ${id} has left the room ${room}`);
    rooms[room].splice(rooms[room].indexOf(id),1)

    io.to(id).emit("room-update", {userName: 'server', room: {roomName: '', users: [], sockets: []}})
    let userArray = rooms[room].map(socketId => users[socketId])
    io.to(room).emit("room-update", {userName: 'server', room: {roomName: room, users: userArray, sockets: rooms[room]}})
    console.log('room members: ', rooms[room])
  });

};