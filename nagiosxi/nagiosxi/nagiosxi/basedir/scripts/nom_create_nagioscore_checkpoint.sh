#!/bin/bash
#
# Creates a NOM Checkpoint
# Checkpoints for both nagioscore and nagiosxi
# Copyright (c) 2008-2020 Nagios Enterprises, LLC. All rights reserved.
#

BASEDIR=$(dirname $(readlink -f $0))

# Import Nagios XI and xi-sys.cfg config vars
. $BASEDIR/../var/xi-sys.cfg
eval $(php $BASEDIR/import_xiconfig.php)

cfgdir="/usr/local/nagios/etc"
checkpointdir="/usr/local/nagiosxi/nom/checkpoints/nagioscore"

# Fix permissions on config files
sudo $BASEDIR/reset_config_perms.sh

pushd $checkpointdir

# What timestamp should we use for this files?
stamp=`date +%s`

# Get Nagios verification output
output=`/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg > $stamp.txt`

# Create a tarball backup of the configuration directory
tar czfp $stamp.tar.gz $cfgdir

# Fix perms (if script run by root)
chown $nagiosuser:$nagiosgroup $stamp.txt
chown $nagiosuser:$nagiosgroup $stamp.tar.gz

popd

# Create CCM restore point
restore_point=`$BASEDIR/ccm_snapshot.sh $stamp`
