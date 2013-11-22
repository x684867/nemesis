/*
	Nemesis Cryptography Package Package
	/srv/nemesis/packages/ciphers/
	(c) 2013 Sam Caldwell.  All Rights Reserved.
	
	This package creates simple and easy-to-use functions for cryptography, 
	standardized to the Nemesis project.
	
	USE:
		root.{encrypt,decrypt,hash}
		
	DOCUMENTATION:
	
		See https://github.com/x684867/nemesis_server/wiki/Framework:-Packages:-Ciphers
	
*/
module.exports=function(){

	var crypto=require('crypto');
	
	root.decrypt=function(cT,key){
		cipher=crypto.createDecipher(config.ciphers.algorithm,key).setAutoPadding(true);
		return cipher.update(pT,config.ciphers.encoding,config.ciphers.encoding)
			  +cipher.final('utf8');
	}
	root.encrypt=function(pT,key){
		cipher=crypto.createCipher(config.ciphers.algorithm,key).setAutoPadding(true);
		return cipher.update(pT,config.ciphers.encoding,'utf8')
		 	  +cipher.final(config.ciphers.encoding);
	}
	root.encryptJSON=function(jsonPt,key){return encrypt(JSON.stringify(jsonPt,key));}
	root.decryptJSON=function(jsonCt,key){return JSON.parse(decrypt(jsonCt,key);}

	root.hash=function(n){
		function f(s){return (typeof(s)=='undefined')?"":s;}
		return require('crypto').createHash('sha512').update(f(n),'utf8').digest('base64');
	}

	root.createPSK=function(ip1,ip2,k){
		function f(n){return (typeof(n)=='number')?true:false;}
		function R(b){return (crypto.randomBytes(((f(b))&&(b>=1))?b:R(1))).toString('hex');}
		function T(){return (n=(new Date),n.getTime()+n.getTimezoneOffset()).toString();} 
		return hash(R(0)+T()+R(0)+ip1+R(0)+ip2+R(0)+k+R(0));
	}
	root.generateKeys=function(){
		/*
			generate a key pair and return as object {private:'',public:''}
		 */
		throw new Error('Oops! generateKeys() not implemented');
	}
	root.base64=function(s){
		throw new Error('Oops! base64() not implemented.');
	}
	root.randomInt=function(p,q){
		throw new Error('Oops! randomInt(p,q) not implemented.');
		/*
			return a random integer between p and q
		 */
	}
	root.isValidPSK=function(psk){
		return ( 
			(typeof(psk)!='string') || 
			(psk.length!=config.peerNetCore.registration.pskLen)
		);
	}
	root.selectDHgroupName=function(){return randomInt(0,config.ciphers.dhGroups);}

	root.signCSR=function(csr,key){return encrypt(csr,key);}

	root.generateTLSkey=function(){
		throw new Error('Oops! generateTLSkey not implemented.');
	}
	root.generateTLScsr=function(key){
		throw new Error('Oops! generateTLScsr not implemented.');
	}

}
