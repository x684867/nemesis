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
		[ -----------------------------------------------------------------
			  NOTE: Pre-exchange of CA certificates will allow TLS communication
				    between hosts at initialization.  The pre-exchanged CA certs
				    may have been leftover from the last runtime.
		  ----------------------------------------------------------------- ]
	var peerList=loadPeerList();
	var security=JSON.config.loadValidJSON(
											config.peerNetCore.securityFile,
											config.peerNetCore.securityPatternFile
				);
	/*
	
		All setup work must precede timer initialization.
	
	 */
	/*
		Event handler for file changes on peerList files.
	 */
	var peerConfigRefreshTimer=setInterval(
				refreshPeerList(peerList),
				config.peerNetCore.peerConfigRefreshInterval
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
function generateKey(){
	/*generate private key*/
}
function generateCertificate(key,ca){
	/*generate a CSR for key and sign with ca.key
}