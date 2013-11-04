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
	var peerList=JSON.commented.load(config.store.peerList);
	var replicator=undefined;

	push=function(oStore){
	
		if(store.debug) console.log(messages.store.pushingToQueue+"("+oStore.id+") ");
		
		if(replicator==undefined){
		
			console.log("\tSpawn replicator...");
			replicator=require('child_process').fork('./replicator.js');
			console.log("\tReplicator spawned.");
			
		}else{
		
			console.log("\tReplicator exists.");
		}
		
		console.log("\tDispatching oStore to replicator: "+oStore.id);
		replicator.send(oStore); 
	}
	advertise(objectId){
	
		if(store.debug) console.log("advertise() starting.");
		
		if(advertiser==undefined){
		
			console.log("\tAdvertiser spawning...");
			advertiser=require('child_process').fork('./advertiser.js');
			console.log("\tAdvertiser spawned.");
			
		}else{
		
			console.log("\tAdvertiser exists.");
		}
		
		console.log("\tDispatching job to advertiser: "+objectId);
		advertiser.send(objectId);
	}
}



