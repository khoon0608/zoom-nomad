/** @format */
const messageForm = document.querySelector("form");
const sendButton = messageForm.querySelector("button");
const messageUl = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected from Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

socket.addEventListener("message", (message) => {
  console.log(message.data);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
});
