---
author: udienz
comments: true
date: 2014-08-27 08:32:18+00:00
layout: post
slug: penerapan-powerdns-untuk-blocking-situs-porno-part-1
title: Penerapan Powerdns untuk blocking situs porno (part 1)
wordpress_id: 817
categories:
- Linux
- Networking
- Ubuntu
tags:
- dns
- ubuntu
---

Untuk membloking situs porno, sebenarnya bisa dilakukan dengan powerdns. Berikut adalah langkah langkahnya.



## Persiapan sistem



Sebelum memasang powerdns, alangkah baiknya memastikan sistem telah mendapatkan database paket terbaru. Saya menggunakan sumber dari buaya.klas.or.id untuk mendapatkan paket Ubuntu seperti dibawah:

{% gist udienz/68a1b2752f2ce4e897db %}

Silakan simpan di /etc/apt/sources.list, kemudian update system.
```$ sudo apt-get update
$ sudo apt-get dist-upgrade -y```



## Instalasi powerdns



Silakan ketik perintah dibawah ini untuk melakukan instalasi powerdns.

```
ubuntu:~$ sudo apt-get install mysql-server -y
```

Pada saat instalasi mysql-server kita akan ditanya kata sandi untuk mysql-server, kali ini saya menggunakan kata sandi **merdeka**. Selanjutnya melakukan pemasangan powerdns dan backendnya.

```
ubuntu:~$ sudo apt-get install pdns-server pdns-backend-mysql -y
```

Pada saat istalasi kita akan di beripilihan untuk mengatur database paket pdns-backend-mysql dengan dbconfig-common, saya memilik untuk **YES**. Kemudian silakan isikan katasandi mysql, dan memasukkan lagi kata sandi mysql untuk paket pdns-backend-mysql, kali ini saya menggunakan password **17agustus**. Silakan pengaturan powerdns dengan perintah berikut:

```
ubuntu:~$ sudo cat /etc/powerdns/pdns.d/pdns.local.gmysql.conf 
# MySQL Configuration
#
# Launch gmysql backend
launch=gmysql

# gmysql parameters
gmysql-host=localhost
gmysql-port=
gmysql-dbname=pdns
gmysql-user=pdns
gmysql-password=17agustus
gmysql-dnssec=no
# gmysql-socket=
```

Dikarenakan kita tidak menggunakan bind sebagai backend, maka kita harus mendisable pengaturan bind. Kemudian mengatur agar powerdns bisa menjadi resolver dengan menambahkan kolom **recursor**.

```
ubuntu:~$ cd /etc/powerdns/pdns.d/  
ubuntu:/etc/powerdns/pdns.d$ sudo mv pdns.simplebind.conf pdns.simplebind.conf.disabled
ubuntu:/etc/powerdns/pdns.d$ cd ..
ubuntu:/etc/powerdns$ sudo cp pdns.conf pdns.conf.orig
ubuntu:/etc/powerdns$ sudo sed -i -e '/^#/d' -e 's/ //g' -e '/^$/d' pdns.conf
ubuntu:/etc/powerdns$ sudo cat pdns.conf
allow-recursion=127.0.0.1, 192.168.0.0/16
config-dir=/etc/powerdns
daemon=yes
disable-axfr=yes
guardian=yes
local-address=0.0.0.0
local-port=53
module-dir=/usr/lib/powerdns
setgid=pdns
setuid=pdns
socket-dir=/var/run
version-string=powerdns
recursor=8.8.8.8:53
include-dir=/etc/powerdns/pdns.d
ubuntu:/etc/powerdns$ sudo service pdns restart
 * Restarting PowerDNS Authoritative Name Server pdns
```

Langkah selanjutnya adalah mencoba apakah powerdns dapat berfungsi sebagai resolver dengan cara sebagai berikut:

```
ubuntu:/etc/powerdns$ host ubuntu.com localhost
Using domain server:
Name: localhost
Address: 127.0.0.1#53
Aliases: 

ubuntu.com has address 91.189.94.156
ubuntu.com mail is handled by 10 mx.canonical.com.
```

Tips: Bila anda mempunyai network lain secarai client, anda dapat menambahkan network nya di isian **allow-recursion**

Selanjutnya di [part 2](http://blog.mahyudd.in/2014/08/27/penerapan-powerdns-untuk-blocking-situs-porno-part-2.html)
