/*
	Nemesis Data Store Push Replicator for Store Package
	/srv/nemesis/packages/store/
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This package provides a peer-to-peer distributed key-value store.
		
	USE:
		root.store.marco
		
	DOCUMENTATION:
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Packages:-Marco
	
*/
module.exports=function(){
	
	var peerList=JSON.commented.load(config.store.peerList);
	var replicator=undefined;

	push=function(oStore){
	
		if(store.debug) console.log(messages.store.pushingToQueue+"("+oStore.id+") ");
		
		if(replicator==undefined){
		
			console.log("\tSpawn replicator...");
			replicator=require('child_process').fork('./replicator.js');
			replicator.send({"code":"init_process","peerList":peerList});
			console.log("\tReplicator spawned.");
			
		}else{
		
			console.log("\tReplicator exists.");
		}
		
		console.log("\tDispatching oStore to replicator: "+oStore.id);
		replicator.send({"code":1,"oStore":oStore}); 
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



