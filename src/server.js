/** @format */
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const liveServer = livereload.createServer({
  exts: ["js", "pug", "css"],
  delay: 1000,
});

liveServer.watch(__dirname);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use(livereloadMiddleware());
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3001`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => console.log(`Socket Event: ${event}`));
  socket.on("enter_room", (roomName, nickname, showRoom) => {
    socket.join(roomName);
    showRoom();
    socket["nickname"] = nickname;
    socket.to(roomName).emit("welcome", socket.nickname);
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
});
/*
const wss = new WebSocketServer({ server });

const socketArr = [];

wss.on("connection", (socket) => {
  socketArr.push(socket);
  socket.on("message", (message) => {
    socketArr.forEach((oneSocket) => oneSocket.send(message.toString("utf-8")));
  });
});\
*/

httpServer.listen(3001, handleListen);
