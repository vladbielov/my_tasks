#!/bin/bash
sudo yum install mariadb-server -y
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql << _EOF_
CREATE DATABASE wordpressdb;
GRANT ALL ON wordpressdb.* TO 'admin'@'%' IDENTIFIED BY 'redhat';
_EOF_