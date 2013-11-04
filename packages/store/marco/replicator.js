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
process.title=module.filename;
/*
	NOTE: This is a worker process module.
 */
var peerList=Array();
var replicatorQueue=Array();
var qProcessingId=undefined;
var isQueueProcessing=false;
var isBusy=false;
var isRunning=false;
var queueProcessMgmtInterval=1000;
var statsReportingInterval=5000;


var stats={
			initCalls:0,
			statRequests:0,
			invalidIPCmessages:0,
			processMgmtIntervalChanges:0,
			statsReportingIntervalChanges:0,
			queueProcessing:{
				objectProcessStarted:0,
				objectProcessCompleted:0,
				alive:0,
				notAlive:0,
				stopping:0,
				isStopping:0,
				start:0,
				startCompleted:0,
				starting:0
			},
			queue:{
				loads:0;
				size:0,
				sampleTime:(new Date).getTime()
			}
			/*
				Implement a peerList stats tracking here.
			 */
};
process.on('message',
	function(message,handle){
		switch(message.code){
			case "init_process":
				stats.initCalls++;
				message.peerList.forEach(function(peer){peerList.push(peer);});
				break;
			case "load_object": 
				stats.queue.loads++;
				replicatorQueue.push(message.oStore);
				if(!isRunning) startQueueProcessing;
				break;
			case "stats": 
				stats.statRequests++;
				sendCurrentStats();
				break;
			case "setProcessMgmtInterval": 
				stats.processMgmtIntervalChanges++;
				queueProcessMgmtInterval=message.value;
				break;
			case "setStatsReportingInterval":
				stats.statsReportingIntervalChanges++;
				statsReportingInterval=message.value;
				break;
			default: 
				stats.invalidIPCmessages++;
				break;
		}
	}
);
process.on('exit',function(code,signal){
	stats.exit={
		"pid":process.pid,
		"code":code,
		"signal":signal
	};
	sendCurrentStats()
});

setInterval(function(){
	stats.queue.size=replicatorQueue.length;
	stats.queue.sampleTime=(new Date).getTime();
	if(replicatorQueue.length<=0)
		stopQueueProcessing();
	else
		startQueueProcessing();
},queueProcessMgmtInterval);

setInterval(function(){sendCurrentStats();},statsReportingInterval);

function startQueueProcessing(){

	stats.queueProcessing.start++;

	if(isQueueProcessing){
		console.log("QueueProcessing is alive");
		stats.queueProcessing.alive++;
	}else{
		stats.queueProcessing.notAlive++;
		if(isStopping){
			stats.queueProcessing.isStopping++;
			console.log("QueueProcessing cannot start.  It is stopping.");
		}else{
			stats.queueProcessing.starting++;
			console.log("QueueProcessing is starting.");
			qProcessingId=setInterval(function(){
				isBusy=true;
				stats.queueProcessing.objectProcessStarted++;
				oStore=replicationQueue.pop();
				/*
					timer to process message queues.
					process oStore...
				*/
				isBusy=false;
				stats.queueProcessing.objectProcessCompleted++;

			},0);
			isQueueProcessing=true;
			console.log("QueueProcessing is stopped.");
	
		}
	}
	stats.queueProcessing.startCompleted++;
}
function stopProcessing(){
	if(isQueueProcessing){
		if(isBusy)
			console.log("QueueProcessing is busy.  Cannot stop now.");
		else{
			isStopping=true;
			console.log("QueueProcessing is stopping.");
			clearInterval(qProcessingId);
			isQueueProcessing=false;
			console.log("QueueProcessing is stopped.");
		}
	}else
		console.log("QueueProcessing is dead.");
}

function sendCurrentStats(){
	process.send( 
					{
						"code":"stats",
						"data":stats
					}
	);
}

