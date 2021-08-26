import io from "socket.io-client";
import store from "./store";
// import { addNewMessage } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("new-message", (message) => {
    console.log(message)
  });
});

export default socket;