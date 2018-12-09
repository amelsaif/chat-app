var socket= io();

socket.on('connect', function(){
  console.log('connected to the server!');
});

socket.on('newMessage', function(message){
  console.log('nouveau message de serveur', message);
  var li= jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});


socket.on('disconnect', function(){
  console.log('disconnected from the server')
});

jQuery('#message-form').on('submit', function(e){
e.preventDefault();
socket.emit('createMessage',{
  from:"frank",
  text:jQuery('[name=message]').val()
}, function(data){

});
});
