var socket= io();

socket.on('connect', function(){
  console.log('connected to the server!');




});




socket.on('newMessage', function(message){
  console.log('nouveau message de serveur', message);
});

socket.on('disconnect', function(){
  console.log('disconnected from the server')
})
