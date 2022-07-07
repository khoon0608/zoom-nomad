/** @format */
import express from "express";
import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import http from "http";
import {WebSocketServer} from "ws";

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

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer({server});
const wss = new WebSocketServer({ server });

server.listen(3000, handleListen);