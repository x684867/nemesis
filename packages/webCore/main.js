/*
	Nemesis Web Services package
	/srv/nemesis/packages/web/main.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	
	NOTE: 
		*When listener starts, add an entry to config.webCore.listeners {addr,port}
		*When a listener stops, remove the entry.
		*When a listener starts, check the listeners table (above) to detect conflict.
	
*/
module.exports=init;

function init(){

	console.log("Web Services not implemented yet.");
	console.log("see "+package.filename);
	process.exit(1);


	root.web={
		insecure:{},
		secure:{}
	}
}

root.getLocalIP=function(interface){
	/*	
		Return the local IP address for eth0 (unless another interface is defined).
	 */
}

root.web.insecure.send=function(url,postMsg){
	//web_insecure_send.js
}

root.web.insecure.listen=function(address,port,path,callback){
	//web_insecure_listen.js
}

root.web.secure.send=function(tls,url,postMsg){
	//web_secure_send.js
}

root.web.secure.listen=function(tls,address,port,path,callback){
	//web_secure_listen.js
}

