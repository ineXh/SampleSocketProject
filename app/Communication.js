module.exports = exports = Communication;

// //////////////////////
var Names = ['Amy', 'Bart', 'Bob', 'George', 'May', 'Mary', 'Michael', 'Nick',  'Peter', 'Steve', 'Tony'];

function Communication(io){
	var comm = this;
	this.name = 'Commucation Module'
	this.playerlist = {};
	//this.playerIds = [];
	//for(var i = 0; i < 8; i++) this.playerIds.push(i);
	
	this.io = io;	
	io.on('connection', function(socket){
		//console.log('a user connected');
		var client = {
			"Name": "",
		  	"id": -1,
		  	"Online": true
		}
		socket.on('join', onJoin.bind(comm));
		socket.on('disconnect', onDisconnect.bind(comm));

		function onJoin(msg){
			//id = this.playerIds.shift();
			id = msg;
			client.Name = Names[id];
			client.id = id;
		    console.log(client.Name + ' has joined. Id: ' + id);
	    	if(this.playerlist[id] == undefined) this.playerlist[id] = client;
	    	if(this.playerlist[id] != undefined) this.playerlist[id].Online = true;

	    	socket.emit('welcome', client.Name);
	    	socket.broadcast.emit('news', client.Name + " has joined.");
	    	sendPlayerList();
		}
		function onDisconnect(msg){
			id = client.id;
			//delete(this.playerlist[id]);
			//this.playerIds.push(id);
			if(this.playerlist[id] != undefined){
				this.playerlist[id].Online = false;	
			}else{
				console.log('Error in onDisconnect')
				console.log('id: ' + id)
				console.log(this.playerlist)
			}
		    console.log(client.Name + ' has Left.');
		    socket.broadcast.emit('news', client.Name + " has left.");
		    sendPlayerList();
		}
		function sendPlayerList(){
			io.local.emit('player list', this.playerlist);
		}

	}); // end connection
	return this;
} // end Communication

