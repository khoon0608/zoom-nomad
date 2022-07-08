/** @format */

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected from Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New Message: ", message.data, " from the Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

setTimeout(() => {
  socket.send("hello, this message was sended by frontend!");
}, 5000);
