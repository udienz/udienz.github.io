---
author: udienz
comments: true
date: 2007-09-27 20:53:21+00:00
layout: post
slug: apache-server-dengan-module-openssl
title: Apache server dengan module OpenSSL
wordpress_id: 411
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- apache
- Debian
- server
- ssl
---

Apache is the most commonly used Web Server on Linux systems. Web Servers are used to serve Web Pages requested by client computers. Clients typically request and view Web Pages using Web Browser applications such as **Firefox**, **Opera**, or **Mozilla**. 








## Installation





The Apache2 Web server is available in Ubuntu/Debian Linux. To install Apache2: 






	
  * At a terminal prompt enter the following command: 

    
    sudo apt-get install apache2











## Configuration





untuk konfigurasi webserver di 192.168.1.1 isinya adalah sebagai berikut




<!-- more -->








### file /etc/apache2/apache2.conf








    
    ServerRoot "/etc/apache2"
    <span class="anchor"></span>ServerName immkota.org
    <span class="anchor"></span>PidFile /var/run/apache2.pid
    <span class="anchor"></span>Timeout 300
    <span class="anchor"></span>KeepAlive On
    <span class="anchor"></span>MaxKeepAliveRequests 100
    <span class="anchor"></span>KeepAliveTimeout 15
    <span class="anchor"></span><IfModule mpm_prefork_module>
    <span class="anchor"></span>    StartServers          5
    <span class="anchor"></span>    MinSpareServers       5
    <span class="anchor"></span>    MaxSpareServers      10
    <span class="anchor"></span>    MaxClients          150
    <span class="anchor"></span>    MaxRequestsPerChild   0
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mpm_worker_module>
    <span class="anchor"></span>    StartServers          2
    <span class="anchor"></span>    MaxClients          150
    <span class="anchor"></span>    MinSpareThreads      25
    <span class="anchor"></span>    MaxSpareThreads      75
    <span class="anchor"></span>    ThreadsPerChild      25
    <span class="anchor"></span>    MaxRequestsPerChild   0
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span>User www-data
    <span class="anchor"></span>Group www-data
    <span class="anchor"></span>AccessFileName .htaccess
    <span class="anchor"></span><Files ~ "^.ht">
    <span class="anchor"></span>    Order allow,deny
    <span class="anchor"></span>    Deny from all
    <span class="anchor"></span></Files>
    <span class="anchor"></span>TypesConfig /etc/mime.types
    <span class="anchor"></span>DefaultType text/plain
    <span class="anchor"></span>HostnameLookups Off
    <span class="anchor"></span>ErrorLog /var/log/apache2/error.log
    <span class="anchor"></span>LogLevel warn
    <span class="anchor"></span># Include module configuration:
    <span class="anchor"></span>Include /etc/apache2/mods-enabled/*.load
    <span class="anchor"></span>Include /etc/apache2/mods-enabled/*.conf
    <span class="anchor"></span># Include all the user configurations:
    <span class="anchor"></span>Include /etc/apache2/httpd.conf
    <span class="anchor"></span># Include ports listing
    <span class="anchor"></span>Include /etc/apache2/ports.conf
    <span class="anchor"></span># Include generic snippets of statements
    <span class="anchor"></span>Include /etc/apache2/conf.d/
    <span class="anchor"></span>LogFormat "%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"" combined
    <span class="anchor"></span>LogFormat "%h %l %u %t "%r" %>s %b" common
    <span class="anchor"></span>LogFormat "%{Referer}i -> %U" referer
    <span class="anchor"></span>LogFormat "%{User-agent}i" agent
    <span class="anchor"></span>ServerTokens Full
    <span class="anchor"></span>ServerSignature On
    <span class="anchor"></span><IfModule alias_module>
    <span class="anchor"></span>    Alias /icons/ "/usr/share/apache2/icons/"
    <span class="anchor"></span>    <Directory "/usr/share/apache2/icons">
    <span class="anchor"></span>        Options Indexes MultiViews
    <span class="anchor"></span>        AllowOverride None
    <span class="anchor"></span>        Order allow,deny
    <span class="anchor"></span>        Allow from all
    <span class="anchor"></span>    </Directory>
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mod_autoindex.c>
    <span class="anchor"></span>    IndexOptions FancyIndexing VersionSort HTMLTable NameWidth=*
    <span class="anchor"></span>    AddIconByEncoding (CMP,/icons/compressed.gif) x-compress x-gzip
    <span class="anchor"></span>    AddIconByType (TXT,/icons/text.gif) text/*
    <span class="anchor"></span>    AddIconByType (IMG,/icons/image2.gif) image/*
    <span class="anchor"></span>    AddIconByType (SND,/icons/sound2.gif) audio/*
    <span class="anchor"></span>    AddIconByType (VID,/icons/movie.gif) video/*
    <span class="anchor"></span>    AddIcon /icons/binary.gif .bin .exe
    <span class="anchor"></span>    AddIcon /icons/binhex.gif .hqx
    <span class="anchor"></span>    AddIcon /icons/tar.gif .tar
    <span class="anchor"></span>    AddIcon /icons/world2.gif .wrl .wrl.gz .vrml .vrm .iv
    <span class="anchor"></span>    AddIcon /icons/compressed.gif .Z .z .tgz .gz .zip
    <span class="anchor"></span>    AddIcon /icons/a.gif .ps .ai .eps
    <span class="anchor"></span>    AddIcon /icons/layout.gif .html .shtml .htm .pdf
    <span class="anchor"></span>    AddIcon /icons/text.gif .txt
    <span class="anchor"></span>    AddIcon /icons/c.gif .c
    <span class="anchor"></span>    AddIcon /icons/p.gif .pl .py
    <span class="anchor"></span>    AddIcon /icons/f.gif .for
    <span class="anchor"></span>    AddIcon /icons/dvi.gif .dvi
    <span class="anchor"></span>    AddIcon /icons/uuencoded.gif .uu
    <span class="anchor"></span>    AddIcon /icons/script.gif .conf .sh .shar .csh .ksh .tcl
    <span class="anchor"></span>    AddIcon /icons/tex.gif .tex
    <span class="anchor"></span>    AddIcon /icons/bomb.gif core
    <span class="anchor"></span>    AddIcon /icons/back.gif ..
    <span class="anchor"></span>    AddIcon /icons/hand.right.gif README
    <span class="anchor"></span>    AddIcon /icons/folder.gif ^^DIRECTORY^^
    <span class="anchor"></span>    AddIcon /icons/blank.gif ^^BLANKICON^^
    <span class="anchor"></span>    DefaultIcon /icons/unknown.gif
    <span class="anchor"></span>    ReadmeName README.html
    <span class="anchor"></span>    HeaderName HEADER.html
    <span class="anchor"></span>    IndexIgnore .??* *~ *# RCS CVS *,v *,t
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mod_mime.c>
    <span class="anchor"></span>    AddLanguage ca .ca
    <span class="anchor"></span>    AddLanguage cs .cz .cs
    <span class="anchor"></span>    AddLanguage da .dk
    <span class="anchor"></span>    AddLanguage de .de
    <span class="anchor"></span>    AddLanguage el .el
    <span class="anchor"></span>    AddLanguage en .en
    <span class="anchor"></span>    AddLanguage eo .eo
    <span class="anchor"></span>    AddLanguage es .es
    <span class="anchor"></span>    AddLanguage et .et
    <span class="anchor"></span>    AddLanguage fr .fr
    <span class="anchor"></span>    AddLanguage he .he
    <span class="anchor"></span>    AddLanguage hr .hr
    <span class="anchor"></span>    AddLanguage it .it
    <span class="anchor"></span>    AddLanguage ja .ja
    <span class="anchor"></span>    AddLanguage ko .ko
    <span class="anchor"></span>    AddLanguage ltz .ltz
    <span class="anchor"></span>    AddLanguage nl .nl
    <span class="anchor"></span>    AddLanguage nn .nn
    <span class="anchor"></span>    AddLanguage no .no
    <span class="anchor"></span>    AddLanguage pl .po
    <span class="anchor"></span>    AddLanguage pt .pt
    <span class="anchor"></span>    AddLanguage pt-BR .pt-br
    <span class="anchor"></span>    AddLanguage ru .ru
    <span class="anchor"></span>    AddLanguage sv .sv
    <span class="anchor"></span>    AddLanguage zh-CN .zh-cn
    <span class="anchor"></span>    AddLanguage zh-TW .zh-tw
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mod_negotiation.c>
    <span class="anchor"></span>    ForceLanguagePriority Prefer Fallback
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mod_mime.c>
    <span class="anchor"></span>    AddCharset us-ascii    .ascii .us-ascii
    <span class="anchor"></span>    AddCharset ISO-8859-1  .iso8859-1  .latin1
    <span class="anchor"></span>    AddCharset ISO-8859-2  .iso8859-2  .latin2 .cen
    <span class="anchor"></span>    AddCharset ISO-8859-3  .iso8859-3  .latin3
    <span class="anchor"></span>    AddCharset ISO-8859-4  .iso8859-4  .latin4
    <span class="anchor"></span>    AddCharset ISO-8859-5  .iso8859-5  .cyr .iso-ru
    <span class="anchor"></span>    AddCharset ISO-8859-6  .iso8859-6  .arb .arabic
    <span class="anchor"></span>    AddCharset ISO-8859-7  .iso8859-7  .grk .greek
    <span class="anchor"></span>    AddCharset ISO-8859-8  .iso8859-8  .heb .hebrew
    <span class="anchor"></span>    AddCharset ISO-8859-9  .iso8859-9  .latin5 .trk
    <span class="anchor"></span>    AddCharset ISO-8859-10  .iso8859-10  .latin6
    <span class="anchor"></span>    AddCharset ISO-8859-13  .iso8859-13
    <span class="anchor"></span>    AddCharset ISO-8859-14  .iso8859-14  .latin8
    <span class="anchor"></span>    AddCharset ISO-8859-15  .iso8859-15  .latin9
    <span class="anchor"></span>    AddCharset ISO-8859-16  .iso8859-16  .latin10
    <span class="anchor"></span>    AddCharset ISO-2022-JP .iso2022-jp .jis
    <span class="anchor"></span>    AddCharset ISO-2022-KR .iso2022-kr .kis
    <span class="anchor"></span>    AddCharset ISO-2022-CN .iso2022-cn .cis
    <span class="anchor"></span>    AddCharset Big5        .Big5       .big5 .b5
    <span class="anchor"></span>    AddCharset cn-Big5     .cn-big5
    <span class="anchor"></span>    # For russian, more than one charset is used (depends on client, mostly):
    <span class="anchor"></span>    AddCharset WINDOWS-1251 .cp-1251   .win-1251
    <span class="anchor"></span>    AddCharset CP866       .cp866
    <span class="anchor"></span>    AddCharset KOI8      .koi8
    <span class="anchor"></span>    AddCharset KOI8-E      .koi8-e
    <span class="anchor"></span>    AddCharset KOI8-r      .koi8-r .koi8-ru
    <span class="anchor"></span>    AddCharset KOI8-U      .koi8-u
    <span class="anchor"></span>    AddCharset KOI8-ru     .koi8-uk .ua
    <span class="anchor"></span>    AddCharset ISO-10646-UCS-2 .ucs2
    <span class="anchor"></span>    AddCharset ISO-10646-UCS-4 .ucs4
    <span class="anchor"></span>    AddCharset UTF-7       .utf7
    <span class="anchor"></span>    AddCharset UTF-8       .utf8
    <span class="anchor"></span>    AddCharset UTF-16      .utf16
    <span class="anchor"></span>    AddCharset UTF-16BE    .utf16be
    <span class="anchor"></span>    AddCharset UTF-16LE    .utf16le
    <span class="anchor"></span>    AddCharset UTF-32      .utf32
    <span class="anchor"></span>    AddCharset UTF-32BE    .utf32be
    <span class="anchor"></span>    AddCharset UTF-32LE    .utf32le
    <span class="anchor"></span>    AddCharset euc-cn      .euc-cn
    <span class="anchor"></span>    AddCharset euc-gb      .euc-gb
    <span class="anchor"></span>    AddCharset euc-jp      .euc-jp
    <span class="anchor"></span>    AddCharset euc-kr      .euc-kr
    <span class="anchor"></span>    #Not sure how euc-tw got in - IANA doesn't list it???
    <span class="anchor"></span>    AddCharset EUC-TW      .euc-tw
    <span class="anchor"></span>    AddCharset gb2312      .gb2312 .gb
    <span class="anchor"></span>    AddCharset iso-10646-ucs-2 .ucs-2 .iso-10646-ucs-2
    <span class="anchor"></span>    AddCharset iso-10646-ucs-4 .ucs-4 .iso-10646-ucs-4
    <span class="anchor"></span>    AddCharset shift_jis   .shift_jis .sjis
    <span class="anchor"></span>    AddHandler type-map var
    <span class="anchor"></span>    AddType text/html .shtml
    <span class="anchor"></span>    AddOutputFilter INCLUDES .shtml
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span><IfModule mod_setenvif.c>
    <span class="anchor"></span>    BrowserMatch "Mozilla/2" nokeepalive
    <span class="anchor"></span>    BrowserMatch "MSIE 4.0b2;" nokeepalive downgrade-1.0 force-response-1.0
    <span class="anchor"></span>    BrowserMatch "RealPlayer 4.0" force-response-1.0
    <span class="anchor"></span>    BrowserMatch "Java/1.0" force-response-1.0
    <span class="anchor"></span>    BrowserMatch "JDK/1.0" force-response-1.0
    <span class="anchor"></span>    BrowserMatch "Microsoft Data Access Internet Publishing Provider" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "MS FrontPage" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "^WebDrive" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "^WebDAVFS/1.[012]" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "^gnome-vfs/1.0" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "^XML Spy" redirect-carefully
    <span class="anchor"></span>    BrowserMatch "^Dreamweaver-WebDAV-SCM1" redirect-carefully
    <span class="anchor"></span></IfModule>
    <span class="anchor"></span># Include the virtual host configurations:
    <span class="anchor"></span>Include /etc/apache2/sites-enabled/









### file /etc/apache2/site-avaliable/default





perlu di perhatikan bahwasanya server web ini menggunakan mode HTTPS 







    
    NameVirtualHost *
    <span class="anchor"></span>#-------------------------------------------------- konfigurasi www.immkota.org--------------------------------------------
    <span class="anchor"></span><VirtualHost *>
    <span class="anchor"></span>        ServerAdmin udienz@gmail.com
    <span class="anchor"></span>        ServerName www.immkota.org
    <span class="anchor"></span>        DocumentRoot /var/www/drupal/
    <span class="anchor"></span>        SSLEngine on
    <span class="anchor"></span>SSLOptions +FakeBasicAuth +ExportCertData +StrictRequire
    <span class="anchor"></span>SSLCertificateFile /etc/ssl/certs/server.crt
    <span class="anchor"></span>SSLCertificateKeyFile /etc/ssl/private/server.key
    <span class="anchor"></span>        <Directory />
    <span class="anchor"></span>                Options FollowSymLinks
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span>        <Directory /var/www/>
    <span class="anchor"></span>                Options Indexes FollowSymLinks MultiViews
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>                Order allow,deny
    <span class="anchor"></span>                allow from all
    <span class="anchor"></span>                # kalo mau kunjungi http://www.immkota.org/ akan di alihkan ke  http://www.immkota.org/drupal-6/
    <span class="anchor"></span>                # tapi kalo ndak di pake juga ga papa
    <span class="anchor"></span>              #  RedirectMatch ^/$ /drupal-5.1/
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span>        # untuk script cgi
    <span class="anchor"></span>        ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
    <span class="anchor"></span>        <Directory "/usr/lib/cgi-bin">
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>                Options ExecCGI -MultiViews +SymLinksIfOwnerMatch
    <span class="anchor"></span>                Order allow,deny
    <span class="anchor"></span>                Allow from all
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span>        # pen catat error
    <span class="anchor"></span>        ErrorLog /var/log/apache2/error.log
    <span class="anchor"></span>        # Possible values include: debug, info, notice, warn, error, crit,
    <span class="anchor"></span>        # alert, emerg.
    <span class="anchor"></span>        LogLevel warn
    <span class="anchor"></span>        CustomLog /var/log/apache2/access.log combined
    <span class="anchor"></span>        ServerSignature On
    <span class="anchor"></span>    Alias /doc/ "/usr/share/doc/"
    <span class="anchor"></span>    <Directory "/usr/share/doc/">
    <span class="anchor"></span>        Options Indexes MultiViews FollowSymLinks
    <span class="anchor"></span>        AllowOverride None
    <span class="anchor"></span>        Order deny,allow
    <span class="anchor"></span>        allow from all
    <span class="anchor"></span>    </Directory>
    <span class="anchor"></span>        ScriptAlias /mywiki "/usr/share/moin/mywiki/moin.cgi"
    <span class="anchor"></span>        Alias /wiki "/usr/share/moin/htdocs"
    <span class="anchor"></span>        <Directory /usr/share/moin/htdocs>
    <span class="anchor"></span>        Options Indexes FollowSymLinks
    <span class="anchor"></span>        AllowOverride None
    <span class="anchor"></span>        Order allow,deny
    <span class="anchor"></span>        allow from all
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span></VirtualHost>
    <span class="anchor"></span># ---------------------------------------------- http://blog.immkota.org----------------------------
    <span class="anchor"></span># ni konfigurasi Blognya, pake wordpress
    <span class="anchor"></span><VirtualHost *>
    <span class="anchor"></span>ServerName blog.immkota.org
    <span class="anchor"></span>        DocumentRoot /var/www/wordpress/
    <span class="anchor"></span>SSLEngine on
    <span class="anchor"></span>SSLOptions +FakeBasicAuth +ExportCertData +StrictRequire
    <span class="anchor"></span>SSLCertificateFile /etc/ssl/certs/server.crt
    <span class="anchor"></span>SSLCertificateKeyFile /etc/ssl/private/server.key
    <span class="anchor"></span>        <Directory /var/www/wordpress/>
    <span class="anchor"></span>                Options FollowSymLinks
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>                allow from all
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span></VirtualHost>
    <span class="anchor"></span># ---------------------------------------------- http://forum.immkota.org----------------------------
    <span class="anchor"></span>#ni konfigurasi forum, pake phpBB3
    <span class="anchor"></span><VirtualHost *>
    <span class="anchor"></span>ServerName forum.immkota.org
    <span class="anchor"></span>        DocumentRoot /var/www/phpBB3/
    <span class="anchor"></span>SSLEngine on
    <span class="anchor"></span>SSLOptions +FakeBasicAuth +ExportCertData +StrictRequire
    <span class="anchor"></span>SSLCertificateFile /etc/ssl/certs/server.crt
    <span class="anchor"></span>SSLCertificateKeyFile /etc/ssl/private/server.key
    <span class="anchor"></span>        <Directory /var/www/phpBB3/>
    <span class="anchor"></span>                Options FollowSymLinks
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>                allow from all
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span></VirtualHost>
    <span class="anchor"></span># ---------------------------------------------- http://elearning.immkota.org----------------------------
    <span class="anchor"></span>#ni konfigurasi elearing, pake Dokeos
    <span class="anchor"></span><VirtualHost *>
    <span class="anchor"></span>ServerName elearning.immkota.org
    <span class="anchor"></span>        DocumentRoot /var/www/dokeos/
    <span class="anchor"></span>SSLEngine on
    <span class="anchor"></span>SSLOptions +FakeBasicAuth +ExportCertData +StrictRequire
    <span class="anchor"></span>SSLCertificateFile /etc/ssl/certs/server.crt
    <span class="anchor"></span>SSLCertificateKeyFile /etc/ssl/private/server.key
    <span class="anchor"></span>        <Directory /var/www/dokeos/>
    <span class="anchor"></span>                Options FollowSymLinks
    <span class="anchor"></span>                AllowOverride None
    <span class="anchor"></span>                allow from all
    <span class="anchor"></span>        </Directory>
    <span class="anchor"></span></VirtualHost>
    <span class="anchor"></span>









## install mod_ssl





untuk mengaktifkan mode https anda harus meng-enable kan module ssl dengan cara 







    
    sudo a2enmod ssl
    <span class="anchor"></span>









### install sertifikat dan keamanan





hal ini dibutuhkan untuk membuat https 







    
    openssl genrsa -des3 -out server.key 1024








    
    Generating RSA private key, 1024 bit long modulus
    <span class="anchor"></span>.....................++++++
    <span class="anchor"></span>.................++++++
    <span class="anchor"></span>unable to write 'random state'
    <span class="anchor"></span>e is 65537 (0x10001)
    <span class="anchor"></span>Enter pass phrase for server.key:
    <span class="anchor"></span>








    
    openssl rsa -in server.key -out server.key.insecure
    <span class="anchor"></span>









### Pembuatan Self-Signed Certificate








    
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
    <span class="anchor"></span>









### pembuatan Certificate Signing Request (CSR)








    
    openssl genrsa -des3 -out server.key 1024
    <span class="anchor"></span>








    
    Generating RSA private key, 1024 bit long modulus
    <span class="anchor"></span>.....................++++++
    <span class="anchor"></span>.................++++++
    <span class="anchor"></span>unable to write 'random state'
    <span class="anchor"></span>e is 65537 (0x10001)
    <span class="anchor"></span>Enter pass phrase for server.key:
    <span class="anchor"></span>









### Install di server








    
    sudo cp server.crt /etc/ssl/certs
    <span class="anchor"></span>sudo cp server.key /etc/ssl/private
    <span class="anchor"></span>









## kemudian...





restart services apache 







    
    sudo /etc/init.d/apache restart
