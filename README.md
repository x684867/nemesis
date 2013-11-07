--------------------------
Server Setup Instructions:
--------------------------

1. Create virtual machine:1GB RAM,2CPU,1NIC,Expanding 64GB HDD
2. Attach Ubuntu 13.04 x86_64 server ISO image
3. Boot and install default Ubuntu 13.04 x64 server image.
4. Log in and become root by executing "sudo su -"
5. Download the package fixes: https://github.com/x684867/nemesis/blob/master/src/deb/brokenPackageFix.tar.gz
6. Execute "apt-get update -y && apt-get upgrade -y && shutdown -r now" to update the system.
   NOTE: if it fails, use the package downloaded in #5.  This includes a fixer script.
7. Install git:
		apt-get install git-core -y
8. Clone the nemesis repo to bring down the sources and dependencies

	cd /srv
	git clone https://github.com/x684867/nemesis_server

9. Execute the installer script:

/srv/nemesis/bin/nemesis-install <broker,cipher,keys,audit>


------------------------------------------------
Creating TLS Peer Relationships Using OpenSSL
------------------------------------------------

Theory:
	1. Each peer relationship is a two-way street
	   Both peers are client AND server.
	   
	2. This means that each must have a private key
	   and a public key signed by the other peer.
	   
	3. Rather than a central CA, Nemesis uses peer-
	   based certificates so that a single host is
	   NOT the CA and therefore cannot compromise
	   the entire system.


1. Create the CA Key:
	
	openssl ecparam -out /srv/nemesis/etc/tls/ca/store.ca.key

2. Create and sign the CSR for the CA key:

	openssl req -new -x509 -days 365 \
		-key /srv/nemesis/etc/tls/ca/store.ca.key \
		-out /srv/nemesis/etc/tls/ca/store.ca.crt

3. Create the client certificate pair:

	openssl 