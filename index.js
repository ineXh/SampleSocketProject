var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 3002;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});

var Communication = require('./app/Communication.js')(io);