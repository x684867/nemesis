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
	/*
		The store object abstracts away the mongo database.
	 */
	if(typeof(config.server_type)=='undefined') error.raise(error.store.UndefinedServerType);
	
	
	root.store={};
	var marco=require('./marco/main.js')();
	var polo=require('./polo/main.js')();
	
	initialize_store(marco,polo);
	/*
		read():
				The read method will attempt to read the object file from disk
				and if that fails, it will execute store.polo.advertise to 
				request the object from peers.  It will then retry the read 
				operation for a pre-determined number of times (pausing for
				two seconds first.
	 */
	root.store.read=function(objectId){

		var buffer=undefined;
		var retryCount=config.store.read.timeOut;
		var objectReader=function(objectId,retryCount-1){
		 	require('fs').readFile(
				objectPath,
				function(err,encoded_data){
					if(err) switch(err.code){
						case 'ENOENT':
							error.raise(error.store.objectNotOnHost,objectId);
							store.polo.advertise(objectId);
							if(retryCount>0){
								setTimeout(function(){
									buffer=objectReader(objectId,retryCount-1);
								},config.store.read.retryInterval);
							}
							break;
							/*
								Add more error handling
							 */
						default:
							/*
								catch all un-handled errors.
							 */
							error.raise(error.store.fileReadError,err.toString());
							buffer=undefined;
							break;
					}else{
						buffer=encoded_data;
						break;					
					}
				});
				/*We have returned data.  Decode it*/
				return require('base64').decode(buffer);
		}
		if(buffer==undefined){
			error.raise(error.store.objectNotFound,objectId);
		}else{
			return buffer;
		}
	};
	/*
		write():
				The write method will attempt to write the object file to
				disk and then send the same to marco for replication.
	 */
	root.store.write=function(objectId,objectData){
		var oStore={
				"id":objectId,
				"hash":crypto.createHash('sha512WithRSAEncryption').update(objectData).digest('hex'),
				"time":(new Date()).getTime(),
				"data":require('base64').encode(objectData),
				"ttl":config.store.replication.ttl
		};
		require('fs').fileWrite(filename,objectData){
		});
		store.marco.push(objectId,oStore);/*Marco will push to a queue and return.*/	
	};
}
function start_write(objectId,oStore){
	/*
		start asynchronous write
	*/
}

function initialize_store(marco,polo){
	/*
		Initialize the store-as-a-peer service.
		This means connecting to each registered
		peer and advertising the current host as
		online and ready.
	*/
	marco.register();
	polo.startListener();
	marco.startReplicator();
}