/*
	Nemesis Global PeerNet Management Package
	/srv/nemesis/packages/peernetCore/
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This package creates a robust peer-to-peer network for secure (TLS) connections
	between an arbitrary number of peers.
		
	USE:
		root.peernetCore
		
	DOCUMENTATION:
	
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Packages:-PeerNetCore
	
*/
module.exports=function(src,options){
	/*
		Load all peer identities
	*/
	var peerList=loadPeerList();
	/*
		Load the local security parameters (including CA)
	*/
	console.log("loading security configuration.");
	var security=JSON.config.loadValidJSON(
											config.peerNetCore.securityFile,
											config.peerNetCore.securityPatternFile
	);
	/*
		Verify that the security parameters has at least one config.
		Then loop until we have at least two (2) security configurations.
		The first security configuration (security[0]) is our current (expiring)
		Certificate authority parameters and the second security configuration
		(security[1]) is our new re-key certificate authority.
	*/
	if(security.length==0)
		error.raise(error.peerNetCore.emptySecurityConfig);
	else
		while(security.length < 2) peerListRekey(peerList);
	
	/*
	
		All setup work must precede timer initialization.
	
	 */
	/*
		Event handler for file changes on peerList files.
	 */
	var peerConfigRefresh=setInterval(
		refreshPeerList(peerList),
		config.peerNetCore.peerConfigRefreshInterval
	);
	var caReKeyTimer=setInterval(
		function(){
			if(security[0].certSigned <=0){
				console.log("retiring security[0] and generating new security[1].");
				security[0]=security[1];
				security[1]=generateNewSecurityConfig();
			}else{
				console.log("security[0] still has "+security[0].certSigned+" certificates signed.");
			}
			JSON.config.write(config.peerNetCore.securityFile,security);
		},
		config.peerNetCore.caRekeyInterval
	);

	var peerRekeyTimer=setInterval(
		peerListRekey(peerList),
		config.peerNetCore.peerConfigRekeyInterval
	);
}

function refreshPeerList(peerList){
	console.log("Persisting peer list to disk.");
	peerList.forEach(function(peer,peerId){
		process.nextTick(function(){
			JSON.config.write(peer.address+".json",peer);
		})
	});
}

function loadPeerList(){
	var peerList=JSON.config.load(config.peerNetCore.peerList);
	if(!types.isArray(peerList)) error.raise(error.peerNetCore.invalidPeerList)
	return peerList;
}
function peerListRekey(peerList){
	peerList.forEach(function(peer,peerId){
		process.nextTick(function(){
			var ca=peer.local.ca;	/*Local certificate authority*/
			var key=generateKey();
			var cert=generateCertificate(key,ca);
		})
	});
}
function generateNewSecurityConfig(){
	var key=generateKey();
	var newConfig={
		"created":types.now(), /*timestamp*/
		"expires":types.now()+config.peerNetCore.caTTL, /*timestamp*/
		"certsSigned":0,
		"key":key,
		"cert":generateSelfSignedCertifiate(key),
	};
}
function generateKey(){
	/*generate private key*/
	var key='';
	return key;
}
function generateCertificate(key,ca){
	/*generate a CSR for key and sign with ca.key*/
	var cert='';
	return cert;
}
function generateSelfSignedCertificate(key){
	var cert='';
	return cert;
}