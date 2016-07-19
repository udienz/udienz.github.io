---
author: udienz
comments: true
date: 2008-01-18 09:08:37+00:00
layout: post
link: https://blog.mahyudd.in/2008/01/18/matikan-server-signaturemu.html
slug: matikan-server-signaturemu
title: Matikan Server Signaturemu!!
wordpress_id: 160
categories:
- Debian
- Linux
- Networking
tags:
- apache
- curhat
- Debian
- Linux
- Networking
---

ini saya ada cerita,... sekedar bagi2 pengalaman saja sih..
andaikata kita udah menginstall dengan sukses Apache dan modulnya (SSL+PHP,dll) lcoba deh lihat ke localhostmu.. maka di bawah sendiri akan muncul tulisan seperti ini:

    
    Apache/2.2.6 (Debian) mod_jk/1.2.25 PHP/5.2.4-2 with Suhosin-Patch mod_ssl/2.2.6 OpenSSL/0.9.8g Server at xxxxvlsm.org Port 80


lha itu sebenernya bisa di hilangkan lho...
caranya mudah sekali silakan buka konfigurasi file apache anda di

    
    /etc/apache2/sites-available/default


kemudian tambahkan

    
    ServerSignature Off


simpan dan restart servis apache nya, maka InsyaAllah hasilnya akan seperti punya saya ini

![](http://farm3.static.flickr.com/2137/2200766833_5fce59f9a1_o.png)

sedangkan ini konfigurasinya

    
    NameVirtualHost *
    
    Â ServerAdmin webmaster@localhost
    
    Â DocumentRoot /var/www/
    
    Â 	Options FollowSymLinks
    
    Â 	AllowOverride None
    
    Â 	Options Indexes FollowSymLinks MultiViews
    
    Â 	AllowOverride None
    
    Â 	Order allow,deny
    
    Â allow from all
    
    Â 	# This directive allows us to have apache2's default start page
    
    Â                # in /apache2-default/, but still have / go to the right place
    
    Â                #RedirectMatch ^/$ /apache2-default/
    
    Â ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
    
    Â 	AllowOverride None
    
    Â 	Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
    
    Â 	Order allow,deny
    
    Â Allow from all
    
    Â ErrorLog /var/log/apache2/error.log
    
    Â # Possible values include: debug, info, notice, warn, error, crit,
    
    Â # alert, emerg.
    
    Â LogLevel warn
    
    Â CustomLog /var/log/apache2/access.log combined
    
    Â Alias /doc/ "/usr/share/doc/"
    
    Â Options Indexes MultiViews FollowSymLinks
    
    Â        AllowOverride None
    
    Â        Order deny,allow
    
    Â        Deny from all
    
    Â        Allow from 127.0.0.0/255.0.0.0 ::1/128
    
    Â    ServerSignature Off


Gampang Kan!!
