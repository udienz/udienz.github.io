---
author: udienz
comments: true
date: 2010-07-23 16:14:06+00:00
layout: post
slug: lightsquid-dan-lighttpd-di-ubuntu
title: Lightsquid dan Lighttpd di Ubuntu
wordpress_id: 463
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- lightsquid
- lighttpd
- ubuntu
---

Berikut adalah tatacara instalasi lightsquid dan lighttpd di Ubuntu, seperti yang kita ketahui lighttpd adalah sebuah web server, sedangkan lightsquid adalah squid report generator. Umumnya Lightsquid di jalankan dengan Apache, namun mari kita coba install di lighttpd.

Dengan asumsi anda telah menginstall Ubuntu di server anda dan squid siap di gunakan maka ikuti langkah-langkah berikut:



### Lighttpd


di terminal silahkan ketik

    
    
    sepidol:~# apt-get install lighthttpd
    


Langkah berikutnya adalah menyunting berkas pengaturan lighttpd

    
    
    sepidol:~# vim /etc/lighttpd/lighttpd.conf
    


tambahkan modul cgi, sehingga pada blok server.modules tertulis seperti berikut:

    
    
    server.modules              = (
                "mod_access",
                "mod_alias",
                "mod_accesslog",
                "mod_compress",
               "mod_rewrite",
    #           "mod_redirect",
    #           "mod_evhost",
    #           "mod_usertrack",
    #           "mod_rrdtool",
    #           "mod_webdav",
    #           "mod_expire",
    #           "mod_flv_streaming",
    #           "mod_evasive"
                "mod_cgi"
    )
    


kemudian sunting pengenalan index di direktory sehingga bisa mengenal index.cgi

    
    
    ## files to check for if .../ is requested
    index-file.names           = ( "index.php", "index.html",
                                   "index.htm", "default.htm", "index.cgi",
                                   "index.lighttpd.html" )
    


kemudian beritahu lihttpd agar mengeksekusi file cgi/pl menggunakan perl

    
    
    cgi.assign = (".pl" => "/usr/bin/perl", ".cgi" => "/usr/bin/perl")
    


Simpan file tersebut, jika tadi menggunakan vim maka ketik `:wq`kemudian restart daemon lighttpd

    
    
    sepidol:~# /etc/init.d/lighttpd restart
    Syntax OK
     * Stopping web server lighttpd   [ OK ]
    Syntax OK
     * Starting web server lighttpd    [ OK ]
    sepidol:~#
    





### Lightsquid


Silahkan download dulu di sini : [http://sourceforge.net/projects/lightsquid/files/](http://sourceforge.net/projects/lightsquid/files/)
masukkan perintah berikut di terminal

    
    
    sepidol:~# cd /var/www/
    sepidol:/var/www# tar -xzvf lightsquid-1.8.tgz
    sepidol:/var/www# mv lightsquid-1.8 lightsquid
    sepidol:/var/www# ln -s . html
    sepidol:/var/www/lightsquid# chmod +x *.cgi *.pl
    sepidol:/var/www/lightsquid# ./check-setup.pl
    LightSquid Config Checker, (c) 2005-9 Sergey Erokhin GNU GPL
    
    LogPath   : /var/log/squid
    reportpath: /var/www/html/lightsquid/report
    Lang      : /var/www/html/lightsquid/lang/eng
    Template  : /var/www/html/lightsquid/tpl/base
    Ip2Name   : /var/www/html/lightsquid/ip2name/ip2name.simple
    
    
    all check passed, now try access to cgi part in browser
    sepidol:/var/www/lightsquid# ./lightparser.pl
    


Silakan lihat di http://ip_nya_server/lightsquid

untuk memudahkan proses pembuatan report maka akan kita buat penjadwalan, caranya adalah sebagai berikut:

    
    
    sepidol:/var/www/lightsquid# crontab -e
    


maka tambahkan sebagai berikut:

    
    
    # m h  dom mon dow   command
    @hourly /var/www/lightsquid/lightparser.pl > /dev/null
    



Yak lighthttpd +lightsquid siap di jalankan!
