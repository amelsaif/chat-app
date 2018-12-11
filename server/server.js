const path = require('path');
const express = require('express');
const http= require('http');
const socketIO= require('socket.io');

var {isRealString}= require('./utils/validation');
var {Users}= require('./utils/users');
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


  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
     var user = users.getUser(socket.id);

     if (user) {
       io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
     }
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
