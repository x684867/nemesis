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

	console.log("Phase I Peer Key Exchange Sequence (starting...)");
	getPeerList().forEach(function(peer,peerId){
			console.log("\tEstablishing trust {'peer':'"+peerId"','address':'"+peer.address+"'}");
			var openssl=require('./packages/peerNetCore/openssl.js');
			console.log("\t\tLoading pre-shared CA");
			var ca=JSON.config.loadValidJSON(
									config.peerNetCore.init.caFile,
									config.peerNetCore.init.caPatternFile
			);
			console.log("\t\tGenerating tempKey");
			var tmpKey=openssl.genKey();
			console.log("\t\tGenerating tempCert");
			var tmpCrt=openssl.signCert(ca.key,key);
			console.log("\t\tExchanging keys (establishing connection)");
			var connection=openssl.open(key,cert);
			console.log("\t\tLocking down pre-shared CA");
			ca.key="";
			JSON.config.write(config.peerNetCore.init.caFile,ca);
			console.log("\t\t
	});
	
}
	
	
	
	
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