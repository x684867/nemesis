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
module.exports=function(src,options){
	root.peerNetSend(message){
		throw new Error('peerNetSend not implemented.');
		/*
			peerNetSend() broadcasts a message to all peers 
			as a replication activity.
		 */
	}
	root.peerNetRecv(message){
		throw new Error('peerNetRecv not implemented.');
		/*
			Pop a peerNet broadcast message off the queue.
		 */
	}
}




