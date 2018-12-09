const path = require('path');
const express = require('express');
const http= require('http');
const socketIO= require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server= http.createServer(app);//create server http:)
var io= socketIO(server);

io.on('connect', (socket)=>{
  console.log('user is connected');

  socket.on('disconnect', (socket)=>{
    console.log('user is disconnected!');
  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
