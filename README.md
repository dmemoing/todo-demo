# Todo Demo
具有前后端以及数据库的Todo应用，支持增、删、改、筛选查看功能。

## Todo前端
基于react、react-router实现，实现了基本的增、删、改、查的功能，
在线[demo](https://dmemoing.github.io/todo-demo/)（在线demo中没有数据存储的部分）

使用axios向后端发送请求，同时实现了简单的请求接口抽象。

## Todo后端
后端基于koa2实现，用来处理来自前端的http请求，

根据请求，将数据持久化到MongoDB数据库中，使用mongoose对数据库进行操作。

## 运行

首先启动Todo后端
```
$ cd todo-backend
$ npm install
$ npm start
```
后端启动后监听3030端口，连接本地MongoDB数据库todo


再启动Todo前端
```
$ cd todo-demo
$ npm install
$ npm start
```
前端使用3000端口，通过http://localhost:3000 查看最终结果

## 后续学习
了解react渲染过程，了解性能优化的方法，

使用koa过程中依赖了koa-bodyparser、koa-json等中间件，需要详细了解其中对请求的处理
