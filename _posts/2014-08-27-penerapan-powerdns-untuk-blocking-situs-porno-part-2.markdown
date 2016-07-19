---
author: udienz
comments: true
date: 2014-08-27 10:34:28+00:00
layout: post
link: https://blog.mahyudd.in/2014/08/27/penerapan-powerdns-untuk-blocking-situs-porno-part-2.html
slug: penerapan-powerdns-untuk-blocking-situs-porno-part-2
title: Penerapan Powerdns untuk blocking situs porno (part 2)
wordpress_id: 825
categories:
- Linux
- Networking
- Ubuntu
tags:
- dns
- ubuntu
---

Lihat [Penerapan Powerdns untuk blocking situs porno (part 1)](http://blog.mahyudd.in/2014/08/27/penerapan-powerdns-untuk-blocking-situs-porno-part-1.html) untuk part 1



## Download list situs porno.



Untuk mendapatkan list situs porno, saya menggunakan urlblacklist sebagai acuan. Silakan download pada halaman [berikut](http://urlblacklist.com/cgi-bin/commercialdownload.pl?type=download&file=bigblacklist)

[code language="bash"]ubuntu:/tmp$ w3m http://urlblacklist.com/cgi-bin/commercialdownload.pl?type=download&amp;file=bigblacklist
ubuntu:/tmp$ ls -1
bigblacklist.tar.gz
ubuntu:/tmp$ tar -xzvf bigblacklist.tar.gz
ubuntu:/tmp$ cd blacklists/porn/
ubuntu:/tmp/blacklists/porn$ ls
domains  expressions  urls
ubuntu:/tmp/blacklists/porn$ mv domains domains-dump[/code]

Langkah selanjutnya adalah memastikan bahwa daftar domain tersebut (filename domains) memiliki content yang benar dengan syarat merupakan domain , bukan PTR maupun daftar IP.

[code language="bash"]ubuntu:/tmp/blacklists/porn$ egrep -v -e '[0-9]$' -e '^\.' domain-dump |  sed -e '/\//d' > domains[/code]

Penjelasan:




    
  * Egrep merupakan perintah untuk menampilkan kontent dengan kondisi tertentu

    
  * -v merupakan kebalikan dari match, contoh secara umum bila kita ingin mengetahui ada kata linux di berkas, cukup dengan perintah 'grep linux *'. Jadi bila menerapkan -v maka yang terjadi adalah 'semua dimunculkan kecuali xxxx'

    
  * -e '[0-9]$', merupakan regex yang memastikan bahwa tidak ada dalam daftar yang mempunyai akhiran numerik. Ini untuk mengantisipasi dalam daftar mengandung IP address

    
  * -e '^\.', expresi ini akan mencari kondi dimana dalam daftar tersebut mempunyai awalan '\.' dibaca 'slash dan titik'. contoh \.udienz.my.id

    
  * domain-dump, berkas yang berisikan daftar domain

    
  * sed -e '/\//d', merupakan perintah untuk membuang karakter / di akhiran domain, contoh: udienz.my.id/



Langkah selanjutnya adalah bagaimana caranya dari daftar domain berikut (dalam hal ini isi dari berkas domains) diimport ke powerdns. Dikarenakan powerdns menggunakan mysql record dalam melakukan tugasnya, maka kita tinggal membuat membuat semacam database untuk daftar domain porno. Saya membuat [bash script kecil kecilan](https://gist.github.com/udienz/335f96a6a72ea9bd93fd) untuk import domain ke database.

https://gist.github.com/udienz/335f96a6a72ea9bd93fd

Catatan: Bila diperhatikan dari script diatas, perhatikan letak berkas domains yang berisikan daftar domain porno.

Setelah saya eksekusi script diatas, pastikan di mysql database sudah tersedia records dns nya dengan cara sebagai berikut:

[code language="bash"]
ubuntu:~$ mysql -u pdns -p17agustus pdns -e 'select * from domains limit 0,10;'
+----+---------------------------+--------+------------+--------+-----------------+---------+
| id | name                      | master | last_check | type   | notified_serial | account |
+----+---------------------------+--------+------------+--------+-----------------+---------+
|  1 | -xxx.com                  | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  2 | 0--0--7--hardcoresex.dk   | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  3 | 0--ass-cinema-newsp.da.ru | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  4 | 0--bondage.dk             | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  5 | 0--fightingshaving.da.ru  | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  6 | 0--foodwarez.da.ru        | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  7 | 0--gratis.dk              | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  8 | 0--lesbians.dk            | NULL   |       NULL | NATIVE |            NULL | NULL    |
|  9 | 0--oralsex.dk             | NULL   |       NULL | NATIVE |            NULL | NULL    |
| 10 | 0--sex.dk                 | NULL   |       NULL | NATIVE |            NULL | NULL    |
+----+---------------------------+--------+------------+--------+-----------------+---------+
[/code]

Pastikan juga domain nya mempunyai record A/NS/SOA di database dengan cara sebagai beikut (misal domain 0--sex.dk dengan domain id 10):

[code language="bash"]
ubuntu:~$ mysql -u pdns -p17agustus pdns -e 'select type,content from records where domain_id = '10' limit 0,10;'
+------+----------------------------------------------------------------------------------+
| type | content                                                                          |
+------+----------------------------------------------------------------------------------+
| SOA  | pdns.sby.rad.net.id hostmaster.sby.rad.net.id 2014082716 10800 1800 604800 86400 |
| A    | 127.0.0.1                                                                        |
| NS   | localhost                                                                        |
| MX   | 0--sex.dk                                                                        |
| A    | 127.0.0.1                                                                        |
+------+----------------------------------------------------------------------------------+
[/code]

Cek juga dengan dig
[code language="bash"]
ubuntu:~$ dig any @localhost 0--sex.dk

; <<>> DiG 9.9.5-3-Ubuntu <<>> any @localhost 0--sex.dk
; (2 servers found)
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35740
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 2800
;; QUESTION SECTION:
;0--sex.dk.			IN	ANY

;; ANSWER SECTION:
0--sex.dk.		3600	IN	SOA	pdns.sby.rad.net.id. hostmaster.sby.rad.net.id. 2014082716 10800 1800 604800 86400
0--sex.dk.		3600	IN	MX	0 0--sex.dk.
0--sex.dk.		3600	IN	NS	localhost.
0--sex.dk.		3600	IN	A	127.0.0.1

;; Query time: 2 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Wed Aug 27 17:31:12 WIB 2014
;; MSG SIZE  rcvd: 159
[/code]

Selamat pdns anda sudah bisa melakukan bloking situs porno!
