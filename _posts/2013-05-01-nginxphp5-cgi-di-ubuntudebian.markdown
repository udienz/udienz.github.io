---
author: udienz
comments: true
date: 2013-05-01 04:12:53+00:00
layout: post
slug: nginxphp5-cgi-di-ubuntudebian
title: nginx+php5-cgi di Ubuntu/Debian
wordpress_id: 740
categories:
- Debian
- Linux
- Ubuntu
tags:
- nginx
- php5
---

Biasanya saya lupa untuk nulis di blog, mumpung ada ide jadi saya mau nulis tentang nginx+phpcgi hehehe. Di saya ada komputer dengan OS debian/ubuntu untuk sekedar maen maen. dan mau saya pasang nginx + php5-cgi untuk mendukung maen maen saya. Lanjut..

    
    apt-get install php5-cgi php5-cli nginx


Kemudian buat berkas /etc/init.d/php5-cgi dan buat seperti ini:

[code lang="bash"]
#!/bin/bash
### BEGIN INIT INFO
# Provides:          php-fcgi
# Required-Start:    $nginx
# Required-Stop:     $nginx
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts php over fcgi
# Description:       starts php over fcgi
### END INIT INFO

(( EUID )) && echo .You need to have root priviliges.. && exit 1
BIND=/tmp/php5.socket
USER=www-data
PHP_FCGI_CHILDREN=15
PHP_FCGI_MAX_REQUESTS=1000

PHP_CGI=/usr/bin/php-cgi
PHP_CGI_NAME=`basename $PHP_CGI`
PHP_CGI_ARGS="- USER=$USER PATH=/usr/bin PHP_FCGI_CHILDREN=$PHP_FCGI_CHILDREN PHP_FCGI_MAX_REQUESTS=$PHP_FCGI_MAX_REQUESTS $PHP_CGI -b $BIND"
RETVAL=0

start() {
      echo -n "Starting PHP FastCGI: "
      start-stop-daemon --quiet --start --background --chuid "$USER" --exec /usr/bin/env -- $PHP_CGI_ARGS
      RETVAL=$?
      echo "$PHP_CGI_NAME."
}
stop() {
      echo -n "Stopping PHP FastCGI: "
      killall -q -w -u $USER $PHP_CGI
      RETVAL=$?
      echo "$PHP_CGI_NAME."
}

case "$1" in
    start)
      start
  ;;
    stop)
      stop
  ;;
    restart)
      stop
      start
  ;;
    *)
      echo "Usage: php-fastcgi {start|stop|restart}"
      exit 1
  ;;
esac
exit $RETVAL
[/code]

Kemudian buat agar script ini dapat dieksekusi dan running ketika mesin up.

[code lang="bash"]
sudo chmod +x /etc/init.d/php5-cgi
sudo update-rc.d -f php5-cgi defaults
[/code]

Trus masukkan juga di pengaturan nginx, karena di laptop saya tidak ada virtual host jadi ya saya pake 'default' saja.

[code lang="bash"]
server {
	listen 80;
	listen [::]:80 default_server ipv6only=on;

	root /home/udienz/public_html;
	index index.htm; #index.php;

	# Make site accessible from http://localhost/
	server_name localhost;

	location / {

		autoindex on;

	}

	location ~ \.php$ {
				fastcgi_pass   unix:/tmp/php5.socket;
				fastcgi_index  index.php;
				fastcgi_param  SCRIPT_FILENAME  /home/udienz/public_html$fastcgi_script_name;
				include fastcgi_params;
			}
}
[/code]

Reload nginx dan buat berkas phpinfo.php untuk memastikan php nya jalan.

[code lang="bash"]
sudo /etc/init.d/nginx reload
[/code]

Untuk isi berkas phpinfo.php adalah sebagai berikut
[code lang="php"]
<?php
phpinfo();
?>
[/code]
