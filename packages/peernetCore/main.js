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

		Generate Diffie-Hellman Keys for key exchange
		
		Note that we must do better.  We need elliptic curve crypto
		keys generated here, but I do not thing the DH object allows
		us to define which algorithm is used.
		
		Alternatively we could use the default Diffie-Hellman keys
		to secure communication for a higher-security key exchange.
 */
module.exports=function(src,options){

	var crypto=require('crypto');
	var peers=getPeerList(config.peerNetCore.init.peers);

	var isCAreplicationPending=false;
	var count={
		peerCount:peers.length,
		ca:{
			replication:{
				skipped:0,
				started:0,
				completed:0
			}
		},
		cert:{
			replication:{
				skipped:0,
				started:0,
				completed:0
			}
		
		}
	};
	var ca={};
	
	var keyExchange=function(peer,ca){
		if( !peer.isTrusted ){
			if( establishDHtrust(peer) ) 
				peer.isTrusted=true;
			else
				console.log("FAILED TO ESTABLISH DH TRUST WITH PEER ("+peer.address+")")
		}
		peerSend(peer,{"code":"caCertsend","data":ca.cert});
	}
	
	var establishDHtrust=function(peer){
		peer.isTrusted=false;
		peer.dhPublicKey='';
		peer.sharedSecret='';
		peer.dh=crypto.getDiffieHellman(config.peerNetCore.init.dhGroupName);
		peer.dh.generateKeys();
		peer.dhPublicKey(peerUntrustedSend(peer,{"code":"dhGetPublicKey"}));
		peer.sharedSecret=dh.computeSecret(peer.dhPublicKey());
		if(peerUntrustedSend(peer,{"code":"dhSendPublicKey","data":peer.getPublicKey()}))
			if(peerUntrustedSend(peer,{"code":"dhSendSecret","data":peer.sharedSecret}))
				peer.isTrusted=true;
		return peer.isTrusted;
	}
	var peerUntrustedSend(addr,msg){
		/*
			Net send over insecure TCP socket.
		 */	
	}
	var peerSend=function(peer,msg,retry){
		var retries=(typeof(retry)=='undefined')?3:retry;
		if(peer.isTrusted){
			var clearText=JSON.stringify(msg);
			var cipherText=/*Encrypt clearText against peer.publicKey*/
			/*
				Use net. to send message JSON.
			 */
			return 'returned response';
		}else{
			console.log("peerSend failed.  no trust. peer="+peer.address);
			if(retries > 0)
				return peerSend(peer,msg,retries--);
				for(i=0;i<100000;i++){/*do nothing*/}
			else
				return void(0)
		}
	}
	
	/*Periodic CA refresh by timer.  Initialize on first run.*/
	var refreshCA=function(){
		if(isCAreplicationPending){
			count.ca.replication.skip++;
			console.log("CA Replication pending. skipping. cnt="+count.ca.replication.skip);
		}else{
			count.ca.replication.executed++
			var ca={key=genTLSkey(),cert=genTLScert(key,null)}
			console.log("CA Replication starting.  cnt="+count.ca.replication.start);
			peers.forEach(function(peer) hasCAreplicated=(keyExchange(peer,ca))?true:false;
			count.ca.replication.completed++
			console.log("CA Replication done.  cnt="+count.ca.replication.completed);
		}
	};
	setInterval(refreshCA,config.peerNetCore.init.caRefreshInterval);
	refreshCA();
	
	var refreshCertificates=function(){
		if(isCertReplicationPending){
			count.cert.replication.skip++
			console.log("Cert replication pending.  skipping.  cnt="+count.cert.replication.skip);
		}else{
			count.cert.replication.executed++
			console.log("Cert Replication starting.  cnt="+count.cert.replication.start);
			peers.forEach(function(){
				/*
					Iterate through peers and generate peer-specific
					certificates signed by the CA, then exchange those 
					CA certificates with the peer.
				*/
				peer.key=genTLSkey();
				peer.cert=genTLScert(key,ca.key);
				peerSend(peer,{"code":"tlsCertSend","data":peerCert});
			});
			count.cert.replication.completed++
			console.log("Cert Replication done.  cnt="+count.cert.replication.completed);
		}
	}
	
	exchangeCertificates();
	
}

function genTLSkey(){
	/*
		Generate TLS key
	 */
	return 'tls key';
}
function genTLScert(key,ca){
	/*
		Sign the given TLS key with the ca key
	 */
	return 'signed key'
}




