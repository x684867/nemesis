/*
	Nemesis Data Store Abstraction Layer Package
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
	
	initialize_store();
	
	root.store={};
	
	root.store.marco=require('./marco/main.js');
	root.store.polo=require('./polo/main.js');
	
	root.store.read:function(objectId){
		var fs=require('fs');
		var buffer=undefined;
		for(retry_count=0;i<=config.store.readTimeout; retry_count++){
			fs.readFile(objectPath,function(err,encoded_data){
				if(err){
					switch(err.code){
						case 'ENOENT':store.polo.advertise(objectId);
						/*
							Add more error handling
						 */
						default:error.raise(error.store.fileReadError,err.toString());break;
					}
				}else{
					buffer=require('base64').decode(encoded_data);
					break;					
				}
			});
		}
		if(buffer===undefined){
			error.raise(error.store.objectNotFound,objectId);
		}else{
			return buffer;
		}
	}
	write:function(objectId,objectData){
	}
}

function initialize_store(){
	/*
		Initialize the store-as-a-peer service.
		This means connecting to each registered
		peer and advertising the current host as
		online and ready.
	*/
	
}