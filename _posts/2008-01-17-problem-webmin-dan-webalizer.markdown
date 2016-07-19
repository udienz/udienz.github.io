---
author: udienz
comments: true
date: 2008-01-17 16:01:39+00:00
layout: post
link: https://blog.mahyudd.in/2008/01/17/problem-webmin-dan-webalizer.html
slug: problem-webmin-dan-webalizer
title: problem webmin dan webalizer
wordpress_id: 158
categories:
- Linux
- MySelf
tags:
- artikel
- curhat
- Linux
- tutoral
---

barusan punya pengalaman bagus saat instalasi webalizer, kejadianya seperti ini...
saya install webalizer via webmin, ini saya lakukan saat saya bekerja secara remote dengan putty. awalnya saya males untuk instalasi webalizer via apt-get atau dpkg saya coba-coba via  webmin. dan sukses di install tapi.... menunggu adalah hal yang paling tidak aku sukai.. setelah menunggu lama selama 3 menit akhirnya saya tutup begitu saya browser dan menunggu dengan cemas hasil instalasi webalizer...

ah nekat aja saya install via apt-get
`root@ardienz:~# apt-get install webalizer
Reading package lists... Done
Building dependency tree
Reading state information... Done
webalizer is already the newest version.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
2 not fully installed or removed.
E: Could not get lock /var/cache/apt/archives/lock - open (11 Resource temporarily unavailable)
E: Unable to lock the download directory`

lho.... duh... cek prosesnya ah...
`root@ardienz:~# pstree | grep apt
|-miniserv.pl---miniserv.pl---sh-+-apt-get---dpkg`

oh... ternyata si proses apt-masih jalan toh... kita kill aja bareng-bareng yuk, eits sebelumnya lihat dulu PIDnya..
`root@ardienz:~# ps -A | grep apt
10560 ?        00:00:00 apt-get
`
Sip.... lihat tuh PIDnya 10560, catat yah...
`root@ardienz:~# kill 10560`

caba cek lagi...
`root@ardienz:~# ps -A | grep apt
root@ardienz:~# pstree | grep apt`

hihihi... sudah ga ada proses yah... ya udah install aja webalizer via apt-get deh...
`root@ardienz:~# apt-get install webalizer
Reading package lists... Done
Building dependency tree
Reading state information... Done
webalizer is already the newest version.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
2 not fully installed or removed.
Need to get 0B of archives.
After unpacking 0B of additional disk space will be used.
Setting up libgeoip1 (1.3.17-1.1) ...
Setting up webalizer (2.01.10-32) ...
Processing triggers for libc6 ...
ldconfig deferred processing now taking place
root@ardienz:~#`

wah... ternyata bisa...
menunggu ada hal yang membosankan... menunggu dapat membuat kebingungan.. kebingungan menuntut pemikiran.. pemikiran dapat memecahkan masalah.. hihihi

`root@ardienz:~# webalizer
Webalizer V2.01-10 (Linux 2.6.22-14-generic) locale: en_US.UTF-8
Using logfile /var/log/apache2/access.log.1 (clf)
Using default GeoIP database
Creating output in /var/www/webalizer
Hostname for reports is 'ardienz'
Reading history file... webalizer.hist
Generating report for January 2008
Generating summary report
Saving history information...
438 records (180 ignored) in 4.50 seconds, 97/sec
root@ardienz:~#`

alhamdulillah...
