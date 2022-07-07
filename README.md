<!-- @format -->

# zoom-nomad

## Server Setup

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

4. express, pug 설치

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

5. 라우터 설정

```
// server.js
app.set("view engine", "pug"); => view engine을 pug로 설정
app.set("views", __dirname + "/views"); => express에 view로 나타낼 파일경로 설정
app.use("/public", express.static(__dirname + "/public")); => public url을 생성해서 유조에게 파일을 공유
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
