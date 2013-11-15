/*
	peerNetCoreListener.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This is a peerNet test module aimed at listening on a given port for 
	the peeerNetCore to perform a handshake operation.
	
	USAGE:
		node peerNetCoreListener IP_ADDRESS PORT IP_ADDRESS PORT {0,1} 
*/
var http=require('http');
var net=require('net');
var url=require('url');

lhs={
	address:process.argv[2].split(":")[0],
	port:process.argv[2].split(":")[1],
};
rhs={
	address:process.argv[3].split(":")[0],
	port:process.argv[3].split(":")[1],
};
var isOpen=false;
var hasError=false;
 var ball=process.argv[4];
 var hasBall=(ball>0)?true:false;

console.log("Init Services:\n"+Array(80).join("-")+'\n'+
			"\tlhs:{\n"+
			"\t\taddress:"+lhs.address+",\n"+
			"\t\tport:"+lhs.port+"\n"+
			"\t}\n"+
			"\trhs:{\n"+
			"\t\taddress:"+rhs.address+",\n"+
			"\t\tport:"+rhs.port+"\n"+
			"\t}\n"+Array(80).join("-")+'\n' +
			"\thasBall:"+hasBall+"\n"
);
/*
 */
 var server=http.createServer(function(req,res){
 	if(hasBall){
 		console.log("throwing...");
		res.writeHead(200,{'content-Type':'text/plain'});
		res.end(ball);
		hasBall=false
		ball=undefined;
 	}else{
// 		console.log('req:('+Object.keys(req)+')'+req.toString());
		ball=+url.parse('http://'+req.url).query.split("=")[1];
		hasBall=(ball>0)?true:false;
 		console.log('    ball:'+ball+" hasBall:"+hasBall);
		res.writeHead(404,{'content-Type':'text/plain'});
		res.end('caught');
 	}
 }).listen(lhs.port,lhs.address,function(){
 	console.log("listening");
});
 