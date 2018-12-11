const path = require('path');
const express = require('express');
const http= require('http');
const socketIO= require('socket.io');

var {isRealString}= require('./utils/validation');
var {Users}= require('./utils/Users');
var {generateMessage, generateLocationMessage}= require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server= http.createServer(app);//create server http:)
var io= socketIO(server);
var users= new Users();

io.on('connect', (socket)=>{
  console.log('user is connected');


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);

    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage',generateMessage('Admin', 'welcom to my chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} is connected`));
    callback();
  });


 socket.on('createMessage', (message, callback)=>{
   console.log('nouveau message de client', message);
   io.emit('newMessage',generateMessage(message.from, message.text));
   callback('this is from the server');
 });

 socket.on('createLocationMessage', (coords)=>{
   io.emit('newLocationMessage', generateLocationMessage('Amel',coords.latitude, coords.longitude));
 });

 socket.on('disconnect', () => {
   var user = users.removeUser(socket.id);

   if (user) {
     io.to(user.room).emit('updateUserList', users.getUserList(user.room));
     io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left...`));
   }
 });
});



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
