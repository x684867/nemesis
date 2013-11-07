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
root.app={
	title:"Nemesis",
	version:"0.01" /*Update when pushing to master branch.*/
}
const app_conf='./app/app.conf.json';
const app_conf_pattern='./app/app.conf.pattern.json';
require('./JSON-commented.js')();
require('./JSON-active.js')();
require('./JSON-config.js')();
/*Validate the command-line inputs.*/
var server_type=process.argv[2];
var launch_mode=process.argv[3];

if(typeof(server_type)!='string') 
	throw new Error('Invalid server_type passed to boostrap.js');
if((typeof(launch_mode)!='string') && (['master','worker'].indexof(launch_mode)==-1))
	throw new Error('Invalid launch_mode passed to bootstrap.js')

console.log( Array(process.stdout.rows).join('\n')+Array(process.stdout.columns).join('=')+
             '\nStart ['+app.title+':v'+app.version+'] '+
             server_type+':'+launch_mode+'('+process.pid+') '+ (new Date).toString()+'\n\n');
/* 
	Load application configuration data
 */
if(require('fs').lstatSync(app_conf).isFile()){
	root.config=JSON.config.loadValidJSON(app_conf,app_conf_pattern);
	root.config.server_type=server_type
	if(typeof(config.debug)!='boolean') throw new Error('root.config.debug must be boolean');
}else
	throw new Error('app_conf file not found.  Check '+app_conf);
/* 
	Load all packages in the manifest.
*/
root.packages={};
root.packages.loader=require(config.packageLoader)(
														config.packageManifest,
														server_type,
														launch_mode
					);
/*
	-----------------------------------------------------------------------------------
	Define the application
	-----------------------------------------------------------------------------------
*/
/*Initialize then launch the application with the specified service (using arg[2])*/
root.app.main(server_type,launch_mode);


function main(application,launchMode){
	/*
		Load the appropriate service configuration file.
	*/
	switch(application){
		case "audit": 	root.config.service=require(root.config.svc_cfg.audit);break;
		case "broker":	root.config.service=require(root.config.svc_cfg.broker);break;
		case "cipher":	root.config.service=require(root.config.svc_cfg.cipher);break;
		case "key":		root.config.service=require(root.config.svc_cfg.key);break;
		default: 
			root.error.throw(root.error.messages.bootstrap.invalidArgument);
			break;
	}
	/*
		Show the application banner	
	*/
	root.app.log.screenBanner(root.message.app.starting);
	/*
		Initialize the process manager
	*/
	root.process=require(root.config.packages.app.process);
	root.process.init();
	/*
		Launch the application
	*/	
	if(root.app.start()){
		if(root.app.monitor.heartbeat.start()){
			if(root.app.monitor.statistics.start()){
				root.app.log.error(root.error.app.main.success);
			}else{
				root.app.log.error(root.error.app.main.monitorStatisticsFailed);
			}
		}else{
			root.app.log.error(root.error.app.main.monitorHeartbeatFailed);
		}
	}else{
		root.app.log.error(root.error.app.main.servicesFailed);
	}
}