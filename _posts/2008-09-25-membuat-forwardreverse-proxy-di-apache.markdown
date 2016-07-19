---
author: udienz
comments: true
date: 2008-09-25 14:32:25+00:00
layout: post
link: https://blog.mahyudd.in/2008/09/25/membuat-forwardreverse-proxy-di-apache.html
slug: membuat-forwardreverse-proxy-di-apache
title: Membuat forward/reverse proxy di apache
wordpress_id: 434
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- apache
- mod_proxy
- proxy
- reverse
- web
- web proxy
- web server
---

**jika diketahui... **




server yang dapat diakses dari jaringan luar adalah 192.168.1.1 1. web server yang akan digunakan adalah 192.168.1.11 2. server 192.168.1.1 dan 192.168.1.11 terinstall Linux dan Apache2




**Ditanya: **




saya pingin membuat webserver di server saya, server saya adalah 192.168.1.1. tetapi saya ingin agar ketika user/client mengakses [http://192.168.1.1](http://192.168.1.1/) maka yang sebenernya di akses adalah [http://192.168.1.11](http://192.168.1.11/), bagaimana caranya?




**Jawab: **




0. install apache2 dan aktifkan modul proxy, proxy_connect, proxy_http dan rewrite (opsional) di kedua ip itu






	
  * 

    
    # aptitude install apache2
    # a2enmod proxy
    # a2enmod proxy_connect
    # a2enmod proxy_http
    # a2enmod rewrite
    # /etc/init.d/apache2 restart







1. sunting berkas /etc/apache2/sites-available/default di sisi server, dan tambahkan baris berikut.






	
  * 

    
    server:~# pico /etc/apache2/sites-available/default
    ProxyRequests Off
    ProxyPreserveHost On
    <Proxy *> Order deny,allow
    Allow from all
    </Proxy>
    ProxyPass / http://192.168.1.11/
    <Location /> ProxyPassReverse /
    SetOutputFilter  proxy-html
    </Location>







2. sunting berkas /etc/apache2/sites-available/default di sisi webserver 192.168.1.11, dan tambahkan baris berikut: (opsional, boleh di laksanakan boleh tidak. walau tidak diberi tetep berjalan)






	
  * 

    
    web01:~# pico /etc/apache2/sites-available/default
    ProxyRequests On
    ProxyVia On
    <Proxy *>
    Order deny,allow
    Deny from all
    Allow from 192.168.1.1
    </Proxy>







3. restart daemon apache di kedua sisi ip






	
  * 

    
    # /etc/init.d/apache2 restart







4. cek dengan web browser dengan alamat [http://192.168.1.1](http://192.168.1.1/) maka yang akan nampak sebenere adalah [http://192.168.1.11](http://192.168.1.11/)


5. ucapkan alhamdulillah...... gampang to?
