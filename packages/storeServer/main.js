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
	
	config.store.docroot+=(config.store.docroot[config.store.docroot.length-1]=="/")?"":"/";
	
	
	root.store={};
	var marco=require('./marco/main.js')();
	var polo=require('./polo/main.js')();
	/*
		Initialize the store-as-a-peer service.
		This means connecting to each registered
		peer and advertising the current host as
		online and ready.
	*/
	polo.startListener();
}
/*
	read():
			The read method will attempt to read the object file from disk
			and if that fails, it will execute store.polo.advertise to 
			request the object from peers.  It will then retry the read 
			operation for a pre-determined number of times (pausing for
			two seconds first.
 */
root.store.read=function(objectId){
	
	var objectReader=function(objectId,retryCount){
		var readerBuffer=undefined;
	 	require('fs').readFile(
			objectPath,
			function(err,encoded_data){
				if(err) switch(err.code){
					case 'ENOENT':
						
						error.raise(error.store.objectNotOnHost,objectId);
						
						store.marco.advertise(objectId);
						
						if(retryCount>0){	
							setTimeout(function(){
									readerBuffer=objectReader(objectId,retryCount-1);
								},
								config.store.read.retryInterval
							);
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
						readerBuffer=undefined;
						break;
				}else{
					readerBuffer=encoded_data;
					break;
				}
			});
			return require('base64').decode(readerBuffer);
	}/*end of objectReader*/
	
	var buffer=objectReader(
								generateFilename(objectId),
								config.store.read.timeOut-1
	);
	if(buffer==undefined)
		error.raise(error.store.objectNotFound,objectId);
	else
		return buffer;
}/*end of read()*/;
/*
	write():
			The write method will attempt to write the object file to
			disk and then send the same to marco for replication.
 */
root.store.write=function(objectId,objectData){
	var oStore={
			"id":objectId,
			"fname":generateFilename(objectId),
			"hash":crypto.createHash('sha512WithRSAEncryption').update(objectData).digest('hex'),
			"time":(new Date()).getTime(),
			"data":require('base64').encode(objectData),
			"ttl":config.store.replication.ttl,
	};
	require('fs').writeFile(oStore.fname,oStore.data,{encoding:'utf8',flag:'w'},function(err){
		console.log("Writing to disk: ostore:"+
						"{fname:\""+ostore.fname+
						"\",data:\""+ostore.data+
						"\",hash:\""+ostore.hash+"\"}"
		);
		if(err){
			console.log("\tError writing to disk!");
			error.raise(error.store.fileWriteError,err);
		}else{
			console.log("\tSuccess writing to disk!");
		}
	});
	/*Note we will push to marco even though we failed to write locally.*/
	store.marco.push(oStore);/*Marco will push to a queue and return.*/	
};

function generateFilename(objectId){return config.store.docroot+objectId+".store";}
