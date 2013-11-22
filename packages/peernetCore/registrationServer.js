/*
	Nemesis Global PeerNet Management Package
	/srv/nemesis/packages/peernetCore/
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This package creates a robust peer-to-peer network for secure (TLS) connections
	between an arbitrary number of peers.
		
	USE:
		root.peernetCore
		
	DOCUMENTATION:
	
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Packages:-PeerNetCore

		Generate Diffie-Hellman Keys for key exchange
		
		Note that we must do better.  We need elliptic curve crypto
		keys generated here, but I do not thing the DH object allows
		us to define which algorithm is used.
		
		Alternatively we could use the default Diffie-Hellman keys
		to secure communication for a higher-security key exchange.
 */
var keys={};

module.exports=function(){
	/*
		Start listening for peers to register.
		This means we need a listener on the following
		urls:
	*/
	listener=web.insecure.listen(address,port);
	["p1a","p1b","p2","p3a","p3b"].forEach(function(s){
		/*
			Start all listeners and their routers.
		 */
		currSrc=require('registrationServer'+s+'.js');
		route=listener.addRoute("/"+s);
		route.addRouteHandler(currSrc.routeHandler);
		route.addEventHandler('error',currSrc.error);
		route.addEventHandler('connect',currSrc.connect);
		route.addEventHandler('close',currSrc.close);
	});
}

function p1a_listener(request,response){
	/*
	 	Assumptions:
	 		(1) When this function executes, a web request has been received.
	 		(2) The request will have been parsed into a "route" command (e.g. "p1a")
	 		(3) The raw request will be forwarded along as an argument.
	 		(4) Bob will send the response to Alice using the response parameter.
	 	Operations:
			Step 1a (start):
				*Alice gives Bob her public key, which may be intercepted 
 				 by the malicious Charlcye.	 
			Step 1a (completed):
				*Bob generates his registration encryption keys.
				*Bob responds with his public key encrypted against Alice's public key.
				*Alice decrypts the key.
	 */
	 peerPublicKey=p1a_parseRequest(request);
	 keys=generateKeys();
	 response.write(encrypt( keys.public , peerPublicKey );
	 response.end();
}
function p1a_parseRequest(request){
	/*
		This function will parse the p1a request url and validate that the key
		is properly formatted.
	 */
}
function p1a_error(e){

}
function p1a_connect(){

}
function p1a_close(){

}
