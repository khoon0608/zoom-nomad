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