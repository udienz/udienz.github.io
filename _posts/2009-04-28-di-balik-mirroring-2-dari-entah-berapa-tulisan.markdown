---
author: udienz
comments: true
date: 2009-04-28 13:07:14+00:00
layout: post
slug: di-balik-mirroring-2-dari-entah-berapa-tulisan
title: Di balik mirroring (2) dari (entah) berapa tulisan
wordpress_id: 442
categories:
- Debian
- Linux
- Ubuntu
tags:
- Debian
- http
- Mirror
- nginx
- server
- ubuntu
---

Setelah Ubuntu Juanty di rilis, mirror.unej.ac.id mengalami beban yang sangat berat. yah beban ini saya lihat di log di karenakan oleh banyak nya user yang mendownload iso ubuntu, alhamdulillah kalau begitu. namun ada yang perlu sedikit di tweak, si apache ini sangat kewalahan mengahadapi requset dan sempat mogok karena apache sempat crash.Â  dulu pernah saya cek dan hasilnya waw..

    
    $ pstree | grep apache2
    |-apache2---450*[apache2]


jika mencapai angka 450 maka sudah penuh slot yang di sediakan, nah ini bukan hanya berlangsung satu atau dua jam lho, tapi seharian! nah bagaimana solusinya? ya akhirnya apache di ganti dengan nginx. alhamdulillah nginx selama ini sukses menerima request yang padat. dan alhamdulillah pula akhirnya funsi dari server kedua mirror sudah bisa di nyalakan, fungsinya kali ini untuk menghandle semua request rsync, jadi jika ada request rsync akan di alihkankan ke server kedua mirror.Â  mari kita lihat trafficnya

.[![screenshot-1](http://udienz.files.wordpress.com/2009/04/screenshot-1.png)](http://udienz.files.wordpress.com/2009/04/screenshot-1.png)

kalau di lihat2 kenaikan pada saat hari jum'at, atau pas rilis ubuntu dan sempat crashnya yaitu ahad dinihari. dan hari ahad pula di ganti menjadi nginx

Btw, saya ucapkan terimakasih sebesar-besarnya kepada pengguna ubuntu di indonesia yang telah mempercayakan mirror.unej.ac.id sebagai server jujukan. mohon maaf jika saat itu down
