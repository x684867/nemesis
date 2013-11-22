/*
		Nemesis Application Core package Loader
		/srv/nemesis/core/core.packages.js
		(c) Sam Caldwell.  All Rights Reserved.
		
		This file exports an object used to load the packages defined in 
		root.config.packages (defined by bootstrap.js).
 */
module.exports=function( mFile , application, launch_mode ){

	var pFile=mFile.replace( /json/ , 'pattern.json' );
	
	var fs=require('fs');
	
	if(root.config.debug) console.log('PackageLoader is starting....');
	if(root.config.debug) console.log("\tVerifying manifest before loading:" +mFile );
	var manifest=JSON.config.loadValidJSON( mFile , pFile );
		
	if(root.config.debug) console.log(
			"\t\tloading...\n"+Array(process.stdout.columns).join('-')+'\n'+
			"\t\tmanifest:("+typeof(manifest)+")\n\t\t\t{"+Object.keys(manifest).join(',')+"}\n"+
			Array(process.stdout.columns).join('=')+'\n'
	);
	
	/*Make sure the mode has an associated application.*/
	if(manifest.serverPackages.indexOf(application)==-1) 
		throw new Error("ERROR! Bad application: "+application);
	if(['master','worker'].indexOf(launch_mode)==-1) 
		throw new Error("ERROR! Bad launch_mode: "+launch_mode);
	if(typeof(manifest.package_dir)!='string') 
		throw new Error('package_dir not a string');
	if(root.config.debug) 
		console.log('manifest.package_dir['+manifest.package_dir+']:valid string');
	if(!fs.lstatSync(manifest.package_dir).isDirectory()) 
		throw new Error("manifest.package_dir doesn't exist!");
		
	manifest.main[launch_mode].forEach(
		function(listName){
			/*Load the application framework (core) packages*/
			manifest[listName].forEach(
				function(pkgName){
					load(manifest.package_dir,pkgName);
				}
			);
		}
	);
}

function load(pkgDir,pName){

	var fs=require('fs');
	if(typeof(pName)=='string'){
		if(config.debug) console.log("LOADING PACKAGE! ["+pkgDir+","+pName+"]");
		if(pkgDir[pkgDir.length-1] != '/') pkgDir+='/';
				
		var p=pkgDir+pName;
		var pfile;

		if(typeof(config)=='undefined') root.config={};
		if(typeof(errors)=='undefined') root.errors={};
		if(typeof(messages)=='undefined') root.messages={};
		if(typeof(packages)=='undefined') root.packages={};

		if(config.debug) console.log('\t-CONFIG');
		
		config[pName]=JSON.config.loadValidJSON(p+'/config.json',p+'/config.pattern.json');
		
		if(typeof(config[pName])=='undefined') throw new Error("config["+pName+"] failed");

		if(config.debug){
			console.log('\t\t-SUCCESS!');
			console.log('\t-ERRORS');
		}
		
		errors[pName]=JSON.config.loadValidJSON(p+'/errors-'+process.env.LANG+'.json',p+'/errors.pattern.json');
		
		if(typeof(errors[pName])=='undefined') throw new Error('errors['+pName+'] failed');
	
		if(root.config.debug){
			console.log('\t\t-SUCCESS!');
			console.log('\t-MESSAGES');
		}

		messages[pName]=JSON.config.loadValidJSON(p+'/messages-'+process.env.LANG+'.json',p+'/messages.pattern.json');
		
		if(typeof(root.messages[pName])=='undefined') throw new Error('messages['+pName+'] failed');

		if(config.debug){
			console.log('\t\t-SUCCESS!');
			console.log('\t-PKG_MAIN');
		}

		packages[pName]=require("../"+p+'/main.js');
		
		if(typeof(packages[pName])=='undefined') throw new Error('packages['+pName+'] failed to load.');

		if(config.debug) console.log('\t\t-SUCCESS!\n');

		packages[pName]();	

	}else if(config.debug) console.log('pName type mismatch.  Expected string.');

	if(config.debug) console.log('\nload completed.\n'+Array(process.stdout.columns).join('_'));
}