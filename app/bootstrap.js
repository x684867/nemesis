/*
	/srv/nemesis/app/bootstrap.js
	Nemesis Web Services Master Process Script
	(c) 2013 Sam Caldwell.  All Rights Reserved.

	This is the master process (app.bootstrap.js) for the Nemesis web services.
	
	USAGE:
		
		bootstrap <server_type> {master,worker}
		
	DOCUMENTATION:
	
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Bootstrap.js	
	---------------------------------------------------------------------------------
*/
root.app={title:"Nemesis",version:"0.01"}
const app_conf='./app/app.conf.json';
const app_conf_pattern='./app/app.conf.pattern.json';
require('./JSON-commented.js')();
require('./JSON-active.js')();
require('./JSON-config.js')();
/*Validate the command-line inputs.*/

var application=process.argv[2];
var launch_mode=process.argv[3];

console.log(
	Array(process.stdout.rows).join('\n')+
	Array(process.stdout.columns).join('=')+'\n'+
	'Start ['+app.title+':v'+app.version+'] '+'\n'+
    application+':'+launch_mode+'('+process.pid+') '+(new Date).toString()+'\n\n'
);
/*load config*/
if(require('fs').lstatSync(app_conf).isFile()){
	root.config=JSON.config.loadValidJSON(app_conf,app_conf_pattern);
	root.config.application=application
}else
	throw new Error('app_conf file not found.  Check '+app_conf);
/*Load packages*/
	root.packages={};
	require(config.packageLoader)(config.packageManifest,server_type,launch_mode);
});
/*	------------------------------------------------------------------------------
	Define the application
	------------------------------------------------------------------------------ */
switch(launch_mode){
	"master":
			/*
				Assumptions:
					1. 	PeerNet started at package load.
					2. 	storeServer started at package load.
					3. 	statsCollector started at package load.
					4. 	watchdogProcess started at package load.
					5. 	Each of the above packages tainted process with timer-based
						events during their initialization.
					6. process IPC messages are intercepted and handled by watchdog.
			 */
			 break;
		"worker":
			/*
				Assumptions:
					1. peerNetClient is exposed for use.
					2. storeClient is exposed for use.
					3. statsAgent is exposed for use.
					4. watchdogListener is exposed for use.
					5. workerCore is exposed for use.
					6. webCore is exposed for use.
					7. The appropriate application will launch on its package load.
			*/
			break;
		default:
			throw new Error('Application failed to launch. launch_mode is invalid');
			break;
}
