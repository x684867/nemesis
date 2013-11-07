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
			hasNoObjects:0,
			hasObjects:0,
			sampleTime:(new Date).getTime()
		},
		peers:Array()	/*created when IPC 'init_process' loads peerList.*/
};
process.on('message',
	function(message,handle){
		switch(message.code){
			case "init_process":
				stats.initCalls++;
				message.peerList.forEach(
					function(peer,peerId){
						peerList.push(peer);
						stats.peers.push({
							replicationStart:0,
							replicationCompleted:0,
							count:0,
							totalTime:0
						});
					}
				);
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

function sendCurrentStats(){process.send({"code":"stats","data":stats});}

function startQueueProcessing(){
	stats.queueProcessing.start++;
	if(isQueueProcessing){
		console.log("QueueProcessing is alive");
		stats.queueProcessing.alive++;
	}else{
		stats.queueProcessing.notAlive++;
		if(isRunning){
			stats.queueProcessing.starting++;
			console.log("QueueProcessing is starting.");
			qProcessingId=setInterval(function(){
				isBusy=true;
				stats.queueProcessing.objectProcessStarted++;
				replicateTopObject();/*this will pop and replicate an object in queue.*/
				isBusy=false;
				stats.queueProcessing.objectProcessCompleted++;
			},0);
			isQueueProcessing=true;
			console.log("QueueProcessing is stopped.");
		}else{
			stats.queueProcessing.isStopping++;
			console.log("QueueProcessing cannot start.  It is stopping.");
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
function replicateTopObject(){
	oStore=replicatorQueue.pop();
	if(typeof(oStore)=='undefined'){
		stats.queue.hasNoObjects++;
	}else{
		stats.queue.hasObjects++;
		peerList.forEach(function(peer,peerId){
			stats.peers[peerId].replicationStart++;
			replicateObjectToPeer(peer,peerId,oStore);
			stats.peers[peerId].replicationCompleted++;
		});
	}
}

function replicateObjectToPeer(peer,peerId,oStore){
	var startTime=(new Date).getTime();
	stats.peers[peerId].count++;
	/*
		use tls to call the peer and push data to it.
		stopping work to build a generic tls socket
		package for peer-to-peer communication.
		
	 */
	 throw new Error('replicateObjectToPeer not finished');
	 /*
	 
	 
	 */
	 stats.peers[peerId].totalTime+=((new Date).getTime() - startTime);
}