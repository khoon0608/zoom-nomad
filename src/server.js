/** @format */
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

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

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const handleConnection = (socket) => {
  console.log(socket);
};
wss.on("connection", handleConnection);
server.listen(3001, handleListen);
