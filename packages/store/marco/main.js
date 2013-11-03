/*
	Nemesis Data Store Layer Package
	/srv/nemesis/packages/store/
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This package provides a peer-to-peer distributed key-value store.
		
	USE:
		root.store
		
	DOCUMENTATION:
	
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Packages:-Store
	
*/
module.exports=function(){
	
	var objectQueue=Array(); /*Queue of objects pending replication*/
	var concurrency=0;			 /*Number of instances of replicate() method currently executing*/
	
	register=function(){
	
	}
	startReplicator=function(){
	
	}
	
	push=function(objectId,oStore){
	
	}
	replicate=function(){
		if(concurrency >= store.marco.maxConcurrency){
			/*pause timer*/
		}
		rCount++;
		var curr=objectQueue.pop();
		if(curr!=undefined){
			store.peerList.forEach(function(peer,i,a){
				/*send message*/
			});
		}
		if(concurrency < store.marco.maxConcurrency){
			/*resume timer*/
		}
		rCount--;
	}
	/*
		Start the timer-based queue
		processor to replicate data
		objects to remote hosts.
	*/
	
}



function generateSignature(o){
	/*
		Generate a signature that cannot be replayed.
	 	To do this we hash the id, data and time using
	 	a sha512 algorithm.  This hash will be encrypted
	 	using the sender's private key.  Recipients can then
	 	decrypt the hash with the sender's public key to validate
	 	the package.
	 	
	 	TLS_ECDH_RSA_WITH_AES_256_GCM_SHA384
	 	
	 	
	 */
	return crypto.createHash('sha512WithRSAEncryption')
				 .update(o.id+o.hash+o.time+o.data)
				 .digest('hex');		
}
