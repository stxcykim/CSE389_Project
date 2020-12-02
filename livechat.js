var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('chathelp.html');
});

users = [];
io.on('connection', function(socket) {
   console.log('New Connection Established');
   socket.on('setUsername', function(data) {
      console.log(data);
      users.push(data);
      socket.emit('userSet', {username: data});
   });
   
   socket.on('message', function(data) {
       io.sockets.emit('newmessage', data);
   })
});

http.listen(1000, function() {
});