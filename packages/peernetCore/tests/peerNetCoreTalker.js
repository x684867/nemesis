/*
	peerNetCoreTalker.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This is a peerNetCore test routine.
	
	USAGE:
		node peerNetCoreTalker IP_ADDRESS PORT OFFSET
*/

function talker(message){
	var net=require('net');

	server_address=process.argv[2];
	server_port=process.argv[3];
	offset=process.argv[4];

	var isConnected=false;
	var bufferOut=Array();
	var bufferIn=Array();

	setInterval(
		function(){
			if(isConnected){
				console.log('already connected');
				buffer.push(message);
			}else{
				if(bufferOut){
					console.log('\t\tWriting bufferOut:'+bufferOut.length);
					bufferIn.push(client.read());
				}
				var client=net.connect({host:server_address,port:server_port},function(){
					console.log('Client connected');
				});
				client.on('data',function(data){
					console.log('\tReceiving! bufferIn:'+bufferIn.length);
					bufferIn.push(data);
				});
				client.on('end',function(){
					console.log('\tDumping!');
					while(bufferIn.length>0) console.log('\t\t'+bufferIn.pop);
					console.log('disconnected');
					isConnected=false;
				});
				client.on('connect',function(){
					console.log('\tconnection established.');
					isConnected=true;
				});
			}
		},
		offset
	);
}
talker('talker test');