import io from "socket.io-client";
import store from "./store";
import { setCode } from './store/code'
import { updateRoom } from "./store/room";

const socket = io(window.location.origin);

socket.on("connect", () => {

  console.log("I am now connected to the server!");

  socket.on("new-message", messageObject => {
    console.log(`${messageObject.userName}: ${messageObject.message}`)
  });

  socket.on("change-code", eventObject => {
    store.dispatch(setCode(eventObject.code))
  })

  socket.on("room-update", eventObject => {
    store.dispatch(updateRoom(eventObject.room))
  })

});

export default socket;