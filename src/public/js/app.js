/** @format */
const messageForm = document.querySelector("form");
const sendButton = messageForm.querySelector("button");
const messageList = document.querySelector("ul");
const inputNickname = document.querySelector("#nickname");
const inputMessage = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected from Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

socket.addEventListener("message", (message) => {
  const obj = JSON.parse(message.data);
  const li = document.createElement("li");
  const nicknameDiv = document.createElement("h3");
  const messageDiv = document.createElement("div");
  nicknameDiv.innerText = obj.nickname;
  messageDiv.innerText = obj.message;
  li.append(nicknameDiv);
  li.append(messageDiv);
  messageList.append(li);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputNickname.value == "" || inputMessage.value == "") return;
  const obj = {
    nickname: inputNickname.value,
    message: inputMessage.value,
  };
  socket.send(JSON.stringify(obj));
  inputNickname.value = "";
  inputMessage.value = "";
});
