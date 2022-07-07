<!-- @format -->

# zoom-nomad

## Chapter 01
### Server Setup

1. babel package 설치

```
// 터미널
npm i @babel/core @babel/cli @babel/node --save-dev @babel/preset-env
```

2. .gitignore 생성 및 설정

```
// 터미널
touch .gitignore
```

```
// .gitignore
/node_modules
```

3. nodemon.json, babel.config.json 생성 및 설정

```
// nodemon.json
{
  "exec": "babel-node src/server.js"
}
```

```
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

### Frontend Setup

1. express, pug 설치

```
// 터미털
npm i express pug
```

```
// src/server.js
import express from "express";

const app = express();

console.log("Hello");

app.listen(3000);
```

2. 라우터 설정

```
// server.js
app.set("view engine", "pug"); => view engine을 pug로 설정
app.set("views", __dirname + "/views"); => express에 view로 나타낼 파일경로 설정
app.use("/public", express.static(__dirname + "/public")); => public url을 생성해서 유저에게 공개할 파일의 경로를 지정
app.get("/", (req, res) => res.render("home")); // "/"로 왔을 때 "home.pug"를 렌더링
```

```
// /src/views/home.pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Noom
    link(rel="stylesheet", href="https://unpkg.com/mvp.css")
  body
    header
      h1 It works!
    main
      button DOG
    script(src="/public/js/app.js")
```

```
/src/public/js/app.js
```

3. 코드 업데이트 자동화

```
// 터미널
npm i -D livereload connect-livereload
```

```
src/server.js

import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";

const liveServer = livereload.createServer({
exts: ["js", "pug", "css"],
delay: 1000,
});

liveServer.watch(__dirname);

app.use(livereloadMiddleware());
```

## Chapter 2

### WebSockets in NodeJS

```
// 터미널
npm i ws
```

```
/src/server/js/app.js

import livereloadMiddleware from "connect-livereload";
import livereload from "livereload";
import http from "http";
const server = http.createServer({server});
const wss = new WebSocketServer({ server });

server.listen(3000, handleListen);
```

### WebSocket Events

```
src/server.js

import { WebSocketServer } from "ws";
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const handleConnection = (socket) => {
  console.log(socket);
};
wss.on("connection", handleConnection);
server.listen(3001, handleListen);
```
server에서의 socket은 브라우저를 의미함

```
src/public/js/app.js

const socket = new WebSocket(`ws://${window.location.host}`);
```
frontend에서의  socket은 서버와의 연결을 의미함