---
author: udienz
comments: true
date: 2008-07-24 17:36:02+00:00
layout: post
slug: dummy-script-to-backup-your-server
title: Dummy Script to backup your server
wordpress_id: 211
categories:
- Komputer
- Linux
- Ubuntu
tags:
- backup
- bash
- Linux
- programming
- server
- shell
---

This is smply script to backup your server and reposrted via email, but i think my script is very simply. please correct me

    
    #!/bin/sh
    ####################################
    #
    # Script to creating Backup File
    # save fo /usr/sbin/backup.sh
    # inspired from ubuntu-serverguide
    # thanks to Ubuntu Documentation Team!
    # please send me e-mail if you want to recode again!
    # thank's before
    # Mahyuddin Susanto aka udienz email = udienz@gmail.com
    #
    ####################################
    
    # What a backup?
    #DIRECTORY="/var/www /var/spool/mail /etc /boot"
    DIRECTORY="/var/www /etc /boot"
    EMAIL=udienz@gmail.com
    CCEMAIL=udienz@ubuntu.com
    # Where to backup to.
    TARGET="/tmp/backup"
    if test -d $TARGET;
    	then EXISTS="yes"
    else
    	mkdir -p $TARGET
    fi
    
    # Create archive filename.
    DAY=$(date +%F)
    HOST=$(hostname -i)
    ARCHIVE="$HOST-$DAY.tgz"
    
    # Print start status message.
    echo "Backing up $DIRECTORY to $TARGET/$ARCHIVE"
    date
    echo
    
    # Backup the files using tar.
    tar czf $TARGET/$ARCHIVE $DIRECTORY
    md5sum $TARGET/$ARCHIVE >> $TARGET/md5sum.$ARCHIVE.txt
    # i dont'know how wo make file contain dirrefent both directory
    # diff -rNu /where/come/ /want/toa/ > different$DAY.diff
    # dpatch patch-template -p "different$DAY" "different directory" < different$DAY.diff > different$DAY.patch
    #maybe, i think using method patching package into good, maybe :D
    
    # Print end status message.
    echo
    echo "Backup finished"
    date
    
    # Long listing of files in $dest to check file sizes.
    # ls -lh $TARGET
    
    # Crontab, backingup every sunday
    # 0 0 0 * * bash /usr/local/bin/backup.sh
    
    TMPFILE=`mktemp`
    exec > "$TMPFILE"
    echo "From: "Backup report $HOST" "root@$HOST""
    echo "To: $EMAIL"
    echo "Cc: $CCEMAIL"
    echo "Subject: Information about backingup $HOST"
    echo ""
    echo "Hello mr/mrs $EMAIL and $CCEMAIL!"
    echo ""
    echo "If you get this email it mean that back-up proses at $HOST,"
    echo "is succes, more information about back-up is:"
    echo ""
    echo "Directory to backup is = $DIRECTORY"
    echo "and saved to $TARGET/$ARCHIVE"
    echo "finished at `date`"
    echo "have MD5SUM `md5sum $TARGET/$ARCHIVE | cut -f1 -d ' '`"
    echo ""
    echo "`ls -lh $TARGET/`"
    echo ""
    echo "Best Regard"
    echo "............"
    exec
    /usr/sbin/sendmail -t -i < $TMPFILE
    rm -f $TMPFILE
    #ls -lh $TARGET/
    
    # END Of Script
