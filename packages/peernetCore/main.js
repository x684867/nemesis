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
	
	var certificates=[];
	
	var peerList=loadPeerList();
	
	var peerConfigRefreshTimer=setInterval(
				refreshPeerList(peerList),
				config.peerNetCore.peerConfigRefreshInterval
	);
	/*
		Event handler for file changes on peerList files.
	 */
	var peerRekeyTimer=setInterval(
				peerListRekey(peerList),
				config.peerNetCore.peerConfigRekeyInterval
	);
}

function refreshPeerList(peerList){
	console.log("Persisting peer list to disk.");
	peerList.forEach(function(peer,peerId){
		JSON.config.write(peer.address+".json",peer);
	});
}

function loadPeerList(){
	var peerList=JSON.config.load(config.peerNetCore.peerList);
	if(!types.isArray(peerList)) error.raise(error.peerNetCore.invalidPeerList)
	return peerList;
}

	
	
	/*		
				1.c. Generate a new certificate authority (self-signed).
				
				1.d. Our first operation is to contact each peer and provide a new CA
					 certificate and a Certificate Signing Request (CSR).  Thus, for each 
					 peer--
					 	1.d.1. Generate CaKey and LocalKey
					 	1.d.2. Generate self-signed CaCert certificate.
					 	1.d.3. Generate LocalKey CSR.
					 	1.d.4. Connect to peer and send CaCert file and localKey CSR using
					 	       the "registerCrypto" message.
					 	1.d.4. Mark peer as "pendingCSRsigning."
					 	
				1.d. When the peer responds to "pendingCSRsigning,"
						1.e.1. Peer sends LocalCert (signed) by peerCA.
						1.e.2. Peer sends peerCA (public key) (self-signed).
						1.e.3. Mark peer as "localSigned."			
	*/
}