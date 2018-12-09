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

socket.emit('newMessage',{
  from:"Admin",
  text:"welcom to my chat app",
  creatAt: new Date().getTime()
});
socket.broadcast.emit('newMessage',{
  from:"Admin",
  text:"new user connected",
  creatAt: new Date().getTime()
});


 socket.on('createMessage', (message)=>{
   console.log('nouveau message de client', message);

   io.emit('newMessage',{
   from: message.from,
     text:message.text,
     creatAt: new Date().getTime()
   });
  //socket.broadcast.emit('newMessage',{
     //from: message.from,
     //text:message.text,
    // creatAt: new Date().getTime()
   //});
 });

  socket.on('disconnect', (socket)=>{
    console.log('user is disconnected!');
  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
