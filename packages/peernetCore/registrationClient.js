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

var http=require('http');
var net=require('net');
var url=require('url');
var crypto=require('crypto');

var web={
			insecure:require('insecureWeb.js');
			secure:require('secureWeb.js');
}

module.exports=function(){
	var mName=(m=module.filename,m.substring(m.lastIndexOf("/")+1,m.length));
	console.log("\n\n"+Array(80).join("=")+"\n"+
				mName+" starting..."+
				"\n"+Array(80).join("-")+"\n\tpeer:{\n"+
				"\t\taddress:"+peer.address+",\n"+
				"\t\tport:"+peer.port+",\n"+
				"\t\tpsk:"+peer.psk+",\n"+
				"\t\tdhGroupName:"+peer.dhGroupName+",\n"+
				"\t}\n"+Array(80).join("-")+'\n'
	);
	/*
		Expected configuration parameters:
			config.peerNetCore={
				registration:{
					net:{
						address:'string',
						port:'number'
					},
					psk:'string',
					pskLen:'number'
				},
				connected:{
					phase1:'boolean',
					phase2:'boolean',
					phase3:'boolean'
				},
				tls:{
					key:'string',
					cert:'string',
					ca:'string',
					peerCert:'string'
				}				
			}
	*/
	var baseURL:"http://"+config.peerNetCore.registration.net.address+
			    ":"+config.peerNetCore.registration.net.port;

	if( isValidPSK(config.peerNetCore.registration.psk){
		console.log("PSK is properly formed.
	}else{
		console.log(messages.peerNetCore.InvalidPSK);
		process.exit(1);
	}
	/*
		Phase 1: Public-Key Exchange
	 */
	var C=0;
	var peerPublicKey='';
	var keys=generateKeys();
	var tls={};
	/*
		Step 1a (start):
			*Alice gives Bob her public key, which may be intercepted 
			by the malicious Charlcye.	 
	 */
	var response=web.insecure.send(baseURL+"/p1a",keys.public);
	if(response.code==200){
		/*
			Step 1a (completed):
				*Bob responds with his public key encrypted against Alice's public key.
				*Alice decrypts the key.
		 */
		 var peerPublicKey=decrypt(response.data,keys.private);
		/*
			Step 1b(start):
				*Alice rekeys
				*Alice sends new public key encrypted by Bob's public key.
				*Alice signs the new public key with the old private key to preserve
				 the integrity of the key authentication stream.
		 */
		var oldKey=keys.private;
		var keys=generateKeys();
			response=web.insecure.send(baseURL+"/p1b",encrypt(
												JSON.stringify(
													{"key":keys.public,
													 "signedKey":encrypt(keys.public,oldKey)}
												),peerPublicKey
											)
		);
		oldKey='';
		if(response.code==200){
			/*
				Step 1b(completed):
					*Bob decrypts the new Alice key and signature with his private key.
					*Bob validates Alice's signedKey by decrypting with the old public key.
					*Bob accepts the new public key.
					*Bob only needs to reply with an HTTP/200
			 */	
			/*
			 	Phase 2: Pre-shared Key (PSK) Authentication.
					*Alice sends PSK to Bob, encrypted by Bob's public key.
					*Alice signs the PSK with her private key.
					*Bob will know the PSK and can authenticate.
			 */
			config.peerNetCore.connected.phase1=true;
			response=web.insecure.send(baseURL+"/p2",encrypt(encrypt(psk,keys.private),peerPublicKey));
			if(response.code==200){
				console.log("registrationServer passed phase 2");
				config.peerNetCore.connected.phase2=true;
				/*
					Phase 3: Setup TLS Certificates.
				 */
				/*
					Phase 3a: Alice sends CSR to Bob for signing.
						*Generate ECC TLS key
						*Generate CSR.
						*Alice sends request to peer requesting Bob sign CSR.
				 */
				 tls.key=generateTLSkey();
				 tls.csr=generateTLScsr(tls.key);
				 response=web.insecure.send(baseURL+"/p3a",encrypt(encrypt(tls.csr,keys.private),peerPublicKey));
				 if(response.code==200){
				 	/*
				 		Phase 3b: Bob returns...
				 			*Bob returns a signed certificate to Alice along with
				 			 his own CSR.
				 		 	*Alice signs the CSR to create both Bob's certificate and her
				 		 	 own CA.
				 		 	*Alice sends Bob his new certificate.
				 		 	*Bob has Alice's signed certificate (his CA).
				 	*/
				 	tls.cert=response.data.cert;
				 	tls.ca=signCSR(response.data.csr,tls.key); /*Alice will sign Bob's certificate.*/
				 	response=web.insecure.send(baseURL+"/p3b",encrypt(encrypt(tls.peerCert,peerPublicKey);
				 	if(response.code==200){
				 		/*
				 			Phase 3 completed!
				 		 */
				 		 console.log("Phase 3 is complete.");
				 		 config.peerNetCore.connected.phase3=true;
				 		 config.tls=tls;
				 	}else{
				 		console.log("Phase 3 failed.");
				 		console.peerNetCore.connected.phase3=false;
				 		return void(0);
				 	}
				if(response.code=200){
					console.log("registrationServer passed phase 3");
					config.peerNetCore.connected.phase3=true;
					/*
						At this point we have defined TLS properties 
						(key, CA, cert) ans we are registered.
					 */
					 return tls;
				}else{
					console.log("registrationServer failed Phase 3");
					config.peerNetCore.connected.phase3=false;
				}
			}else{
				/*
					Phase 2: Pre-shared Key (PSK) Failed.
				 */
				console.log("registrationServer failed Phase 2");
				config.peerNetCore.connected.phase2=false;
			}
		}else{
			/*
				Step 1b(failed):
			 */
			console.log("registrationServer failed Phase 1b.");
			config.peerNetCore.connected.phase1=false;
		}
	}else{
		/* 
			Step 1a (failed)
		 */
		console.log("registrationServer failed Phase 1a.");
		config.peerNetCore.connected.phase1=false;
	}
	return (
			config.peerNetCore.connected.phase1 &&
			config.peerNetCore.connected.phase2 && 
			config.peerNetCore.connected.phase3
	)?true:false;
}