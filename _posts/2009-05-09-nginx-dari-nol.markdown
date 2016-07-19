---
author: udienz
comments: true
date: 2009-05-09 12:26:27+00:00
layout: post
slug: nginx-dari-nol
title: nginx, dari nol
wordpress_id: 444
categories:
- Debian
- Linux
- Ubuntu
tags:
- apache
- Debian
- install
- lighttpd
- nginx
- ngoprek
- tutorial
- ubuntu
- web server
---

![logo](http://nginx.org/nginx.gif)
Nginx adalah web server yang sangat powerfull, menurut bechmark terbukti nginx unggul di static file dari pada [apache ](http://www.joeandmotorboat.com/2008/02/28/apache-vs-nginx-web-server-performance-deathmatch/)dan [lighttpd](http://superjared.com/entry/benching-lighttpd-vs-nginx-static-files/). nah bagimana cara installnya? silakan ikuti langkah berikut

    
    # untuk debian/ubuntu/blankon
    $ sudo apt-get install nginx
    # untuk centos, fedora, dkk
    $ sudo yum install nginx
    # untuk opensuse
    $ zipper in nginx


silakan koreksi bila perintah di atas salah. nah tapi saya pengen install dari source code, bagaimana? oke oke saya akan nyoba nginstal nginx dari nol. eh.. ini cuman berlaku di debian/ubuntu/blankon :D

<!-- more -->

    
    $ wget http://sysoev.ru/nginx/nginx-0.6.36.tar.gz
    $ tar -xzvf nginx-0.6.36.tar.gz
    $ cd nginx-0.6.36
    $ sudo aptitude install build-essential


sebentar saya break dulu, seperti biasa instalasi melalui source entah itu dari berkas `tar.gz` atu `tar.bz2` itu insya Allah tidak jauh jauh dari

    
    $ ./configure
    $ make
    $ sudo make install


dan ternyata berlaku juga di nginx, alhamdulillah kalo begitu. tapi di sini saya nggak akan cuman melakukan perintah `./configure` yang umum, namun harus menyelaraskan dengan settingan di debian/ubuntu/blankon. jadi nya:

    
    $ 	./configure --conf-path=/etc/nginx/nginx.conf 
    	--error-log-path=/var/log/nginx/error.log --pid-path=/var/run/nginx.pid 
    	--lock-path=/var/lock/nginx.lock   --http-log-path=/var/log/nginx/access.log 
    	--http-client-body-temp-path=/var/lib/nginx/body --http-proxy-temp-path=/var/lib/nginx/proxy 
    	--http-fastcgi-temp-path=/var/lib/nginx/fastcgi --with-debug --with-http_stub_status_module 
    	--with-http_flv_module --with-http_ssl_module --with-http_dav_module
    $ make
    $ sudo make install


okeh sudah jalan, silakan aktifkan nginxnya

    
    $ sudo /etc/init.d/nginx start


**Trus saya pengen php juga**
lha ini yang agak mbulet :D, okeh sekarang copas script berikut dan taruh di `/etc/default/php-fastcgi`:

    
    #
    # Settings for php-cgi in external FASTCGI Mode
    #
    
    # Should php-fastcgi run automatically on startup? (default: no)
    
    START=yes
    
    # Which user runs PHP? (default: www-data)
    
    EXEC_AS_USER=www-data
    
    # Host and TCP port for FASTCGI-Listener (default: localhost:9000)
    
    FCGI_HOST=localhost
    FCGI_PORT=9000
    
    # Environment variables, which are processed by PHP
    
    PHP_FCGI_CHILDREN=5
    PHP_FCGI_MAX_REQUESTS=1000


dan ini juga, di simpan di `/etc/init.d/php-fastcgi`:

    
    #!/bin/sh
    ### BEGIN INIT INFO
    # Provides:          php-fastcgi
    # Required-Start:    $all
    # Required-Stop:     $all
    # Default-Start:     2 3 4 5
    # Default-Stop:      0 1 6
    # Short-Description: Start and stop php-cgi in external FASTCGI mode
    # Description:       Start and stop php-cgi in external FASTCGI mode
    ### END INIT INFO
    
    # Author: Kurt Zankl
    
    # Do NOT "set -e"
    
    PATH=/sbin:/usr/sbin:/bin:/usr/bin
    DESC="php-cgi in external FASTCGI mode"
    NAME=php-fastcgi
    DAEMON=/usr/bin/php-cgi
    PIDFILE=/var/run/$NAME.pid
    SCRIPTNAME=/etc/init.d/$NAME
    
    # Exit if the package is not installed
    [ -x "$DAEMON" ] || exit 0
    
    # Read configuration variable file if it is present
    [ -r /etc/default/$NAME ] && . /etc/default/$NAME
    
    # Load the VERBOSE setting and other rcS variables
    . /lib/init/vars.sh
    
    # Define LSB log_* functions.
    # Depend on lsb-base (>= 3.0-6) to ensure that this file is present.
    . /lib/lsb/init-functions
    
    # If the daemon is not enabled, give the user a warning and then exit,
    # unless we are stopping the daemon
    if [ "$START" != "yes" -a "$1" != "stop" ]; then
            log_warning_msg "To enable $NAME, edit /etc/default/$NAME and set START=yes"
            exit 0
    fi
    
    # Process configuration
    export PHP_FCGI_CHILDREN PHP_FCGI_MAX_REQUESTS
    DAEMON_ARGS="-q -b $FCGI_HOST:$FCGI_PORT"
    
    do_start()
    {
            # Return
            #   0 if daemon has been started
            #   1 if daemon was already running
            #   2 if daemon could not be started
            start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON --test > /dev/null || return 1
            start-stop-daemon --start --quiet --pidfile $PIDFILE --exec $DAEMON --background --make-pidfile --chuid $EXEC_AS_USER --startas $DAEMON -- $DAEMON_ARGS || return 2
    }
    
    do_stop()
    {
            # Return
            #   0 if daemon has been stopped
            #   1 if daemon was already stopped
            #   2 if daemon could not be stopped
            #   other if a failure occurred
            start-stop-daemon --stop --quiet --retry=TERM/30/KILL/5 --pidfile $PIDFILE > /dev/null # --name $DAEMON
            RETVAL="$?"
            [ "$RETVAL" = 2 ] && return 2
            # Wait for children to finish too if this is a daemon that forks
            # and if the daemon is only ever run from this initscript.
            # If the above conditions are not satisfied then add some other code
            # that waits for the process to drop all resources that could be
            # needed by services started subsequently.  A last resort is to
            # sleep for some time.
            start-stop-daemon --stop --quiet --oknodo --retry=0/30/KILL/5 --exec $DAEMON
            [ "$?" = 2 ] && return 2
            # Many daemons don't delete their pidfiles when they exit.
            rm -f $PIDFILE
            return "$RETVAL"
    }
    
    case "$1" in
      start)
            [ "$VERBOSE" != no ] && log_daemon_msg "Starting $DESC" "$NAME"
            do_start
            case "$?" in
                    0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
                    2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
            esac
            ;;
      stop)
            [ "$VERBOSE" != no ] && log_daemon_msg "Stopping $DESC" "$NAME"
            do_stop
            case "$?" in
                    0|1) [ "$VERBOSE" != no ] && log_end_msg 0 ;;
                    2) [ "$VERBOSE" != no ] && log_end_msg 1 ;;
            esac
            ;;
      restart|force-reload)
            log_daemon_msg "Restarting $DESC" "$NAME"
            do_stop
            case "$?" in
              0|1)
                    do_start
                    case "$?" in
                            0) log_end_msg 0 ;;
                            1) log_end_msg 1 ;; # Old process is still running
                            *) log_end_msg 1 ;; # Failed to start
                    esac
                    ;;
              *)
                    # Failed to stop
                    log_end_msg 1
                    ;;
            esac
            ;;
      *)
            echo "Usage: $SCRIPTNAME {start|stop|restart|force-reload}" >&2
            exit 3
            ;;
    esac



nah kemudian silakan truskan dengan perintah di bawah ini:

    
    
    $ sudo chmod 755 /etc/init.d/php-fastcgi
    $ sudo update-rc.d php-fastcgi defaults



untuk selanjutnya silakan lihat ke [sini](http://www.how2forge.org/installing-nginx-with-php5-and-mysql-support-on-debian-etch-p2), itu tulisan keren dah :p

gimana sudah paham? nah kalau ada waktu senggang silakan lihat repo nginx saya di [github.com](http://github.com/udienz/Nginx/tree/master), itu sudah siap di paketkan jadi `.deb`. udah duluah capek nulisnya :D
