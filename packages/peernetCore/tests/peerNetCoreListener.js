/*
	peerNetCoreListener.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This is a peerNet test module aimed at listening on a given port for 
	the peeerNetCore to perform a handshake operation.
	
	USAGE:
		node peerNetCoreListener IP_ADDRESS
*/

if((typeof(process.args[1])!='string') || (process.args[1].length==0)){
	throw new Error('invalid input');
}

server=createServer({},function(socket){
	socket.on('end',function(){
		console.log("Server is disconnected");
	});
	socket.on('connected',function(){
		console.log("Server is connected");
	});
	socket.on('error',function(e){
		console.log("Server error occurred.  Error:"+e);
	});
	console.log("Server setting up...");
	
	
	
	
	console.log("Server is initialized.");
}).listen(process.args[1],function(){
	console.log(module.filename + " is listening on "+server.address+":"+server.port
});
