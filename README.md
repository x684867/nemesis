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