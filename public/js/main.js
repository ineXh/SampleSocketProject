var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var join = function(){
	console.log('join')	
	socket.emit('join', id);
}
var onWelcome = function(msg){
	name = msg;
	$("#news").text("Welcome " + name + ".");
}
var onNews = function(msg){
	$("#news").text(msg);
}
var onPlayerList = function(msg){
	//console.log('onPlayerList')
	removePlayerList();
	list = msg;
	for(i in list){
		addPlayer(list[i].Name, list[i].Online)
	}
}

var addPlayer = function(name, online){
	if(online)
		$('#playerlist').append('<tr><td>' + name + '</td><td style="background-color:green;padding:10px"></td></tr>')
	else
		$('#playerlist').append('<tr><td>' + name + '</td><td style="background-color:red;padding:10px"></td></tr>')
}
var removePlayerList = function(){
	if($('#playerlist')[0].children[0] == undefined) return;
	length = $('#playerlist')[0].children[0].children.length
	for(var i = 0; i < length; i++){
		$('#playerlist')[0].children[0].children[0].remove()
	}
}


var socket;
var id = getRandomInt(0, 10);
var name;
var Engine = (function(global) {
	socket = io.connect('http://localhost:3002/', {reconnection: false});		
	socket.on('welcome', onWelcome);
	socket.on('news', onNews);
	socket.on('player list', onPlayerList);
	join();
})(this);



