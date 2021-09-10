// const Message = require('../db/models/message');
// const Channel = require('../db/models/channel');

module.exports = io => {

  const rooms = {}
  const userNames = {}

  const users = {};
  const socketToRoom = {};

  io.on('connection', socket => {

    socket.on('join-room', joinObject => {
        userNames[socket.id] = joinObject.userName
        socket.join(joinObject.roomName)
        socket.to(joinObject.roomName).emit(` ${joinObject.userName} has joined the room: ${joinObject.roomName} `)
    })

    socket.on('leave-room', leaveObject => {
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

    socket.on('join-call', payload => {
      // const socketIds = rooms[callObject.roomName]
      // console.log(`${callObject.peerId} is trying to join the call in room ${callObject.roomName}` )
      const usersInRoom = rooms[payload]
      socket.emit('all-users', usersInRoom)
    })

    socket.on("sending-single", payload => {
      io.to(payload.userToSignal).emit('user-joined', { signal: payload.signal, callerId: payload.callerId })
    })

    socket.on('returning-signal', payload => {
      io.to(payload.callerId).emit('receiving-returned-signal', { signal: payload.signal, id: socket.id })
    })





    socket.on("join room", roomName => {
      const roomID = roomName + "Video"
      if (users[roomID]) {
          const length = users[roomID].length;
          if (length === 4) {
              socket.emit("room full");
              return;
          }
          users[roomID].push(socket.id);
      } else {
          users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
      socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
          room = room.filter(id => id !== socket.id);
          users[roomID] = room;
      }

      socket.broadcast.emit('user left', socket.id)
  });









  });

  io.of("/").adapter.on("create-room", (room) => {
    rooms[room] = []
  });


  io.of("/").adapter.on("join-room", (room, id) => {
    rooms[room].push(id)

    let userArray = rooms[room].map(socketId => userNames[socketId])

    io.to(room).emit("room-update", {userName: 'server', room: {roomName: room, userNames: userArray, sockets: rooms[room]}})
  });


  io.of("/").adapter.on("leave-room", (room, id) => {
    rooms[room].splice(rooms[room].indexOf(id),1)

    io.to(id).emit("room-update", {userName: 'server', room: {roomName: '', users: [], sockets: []}})
    let userArray = rooms[room].map(socketId => userNames[socketId])
    io.to(room).emit("room-update", {userName: 'server', room: {roomName: room, users: userArray, sockets: rooms[room]}})
  });

};
