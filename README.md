--------------------------
Server Setup Instructions:
--------------------------

Create virtual machine:1GB RAM,2CPU,1NIC,Expanding 64GB HDD

Attach Ubuntu 12.10 x86_64 server ISO image

Boot and install default Ubuntu 12.04 x64 server image.



apt-get install git-core -y

echo " " > /etc/udev/rules.d/70-persistent-net.rules && shutdown -h now

     [NOTE: This is a great point for template creation.  The template is non-production.]

     [NOTE: For performance reasons, the dev virtual machines are not encrypting the hard disks.]

Configure git repository:

cd /srv

git clone https://github.com/x684867/nemesis_server

mv /srv/nemesis_server /srv/nemesis

     [ NOTE: This is where a template should be created. ]

/srv/nemesis/bin/nemesis-install <broker,cipher,keys,audit>