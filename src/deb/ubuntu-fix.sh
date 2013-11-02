#!/bin/bash
#(c) 2013 Sam Caldwell.
#
# This script fixes a broken package problem in Ubuntu 13.04
#

apt-get purge libroken18-heimdal -y && \
apt-get update -y && apt-get upgrade -y && shutdown -r now && \
dpkg -i libroken18-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
dpkg -i libasn1-8-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
dpkg -i libhcrypto4-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
dpkg -i libwind0-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
dpkg -i libkrb5-26-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
dpkg -i libheimntlm0-heimdal_1.6~git20120403+dfsg1-2ubuntu0.13.04.1_amd64.deb && \
echo "success" && exit 0
echo "Something went wrong" && exit 1