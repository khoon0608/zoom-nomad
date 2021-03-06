/** @format */
const socket = io();

const welcome = document.querySelector("#welcome");
const home = welcome.querySelector("#home");
const room = document.querySelector("#room");
const roomName = home.querySelector("#room-name");
const nicknameInput = home.querySelector("#nickname");

room.hidden = true;

function addMessage(message) {
  const chatList = room.querySelector("#chat-list");
  const chat = document.createElement("li");
  chat.innerText = message;
  chatList.append(chat);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("#room-name");
  h3.innerText = roomName.value;
  const roomForm = room.querySelector("#room-form");
  const msgInput = roomForm.querySelector("#message");
  roomForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("new_message", msgInput.value, roomName.value, () => {
      addMessage(`Me: ${msgInput.value}`);
      msgInput.value = "";
    });
  });
}

home.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("enter_room", roomName.value, nicknameInput.value, showRoom);
});

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("#room-name");
  h3.innerText = `${roomName.value}: (${newCount})`;
  addMessage(`${user} joined!`);
});
socket.on("bye", (user, newCount) => {
  const h3 = room.querySelector("#room-name");
  h3.innerText = `${roomName.value}: (${newCount})`;
  addMessage(`${user} left :(`);
});
socket.on("new_message", addMessage);
socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("#room-list");
  if (rooms.length == 0) roomList.innerHTML = "";
  rooms.forEach((room) => {
    const openRoom = document.createElement("li");
    openRoom.innerText = room;
    roomList.append(openRoom);
  });
});
