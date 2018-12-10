const path = require('path');
const express = require('express');
const http= require('http');
const socketIO= require('socket.io');


var {generateMessage, generateLocationMessage}= require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server= http.createServer(app);//create server http:)
var io= socketIO(server);

io.on('connect', (socket)=>{
  console.log('user is connected');
  socket.emit('newMessage',generateMessage('Admin', 'welcom to my chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user connected'));


 socket.on('createMessage', (message, callback)=>{
   console.log('nouveau message de client', message);
   io.emit('newMessage',generateMessage(message.from, message.text));
   callback('this is from the server');
 });

 socket.on('createLocationMessage', (coords)=>{
   io.emit('newLocationMessage', generateLocationMessage('Amel',coords.latitude, coords.longitude));
 });

  socket.on('disconnect', (socket)=>{
    console.log('user is disconnected!');
  });
});



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
