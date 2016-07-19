---
author: udienz
comments: true
date: 2008-12-05 18:27:19+00:00
layout: post
link: https://blog.mahyudd.in/2008/12/06/manipulasi-ekstensi-file-di-apache2.html
slug: manipulasi-ekstensi-file-di-apache2
title: Manipulasi ekstensi file di Apache2
wordpress_id: 233
categories:
- Linux
- Networking
tags:
- apache
- manipulasi
- Mirror
- web server
---

Beberapa hari yang lalu saya memasang paket [SEDOT](https://launchpad.net/sedot) yang sangat membantu dalam pembuatan [mirror kampus](http://mirror.unej.ac.id), nah ada kendala lain yang sempat saya alami, kendala ini adalah ketika kita mau membaca log dari prosesi mirror maka kita harus [mendownload file nya (bentuknya gz)](http://dl2.foss-id.web.id/status/log/opensuse/20081206.000002/sync.log.gz). Sangat tidak efisien bukan?

hasil [ngerumpi](http://dev.blankonlinux.or.id/irclogs/2008/09/16) di blankon dan melihat hasil dari [mbek](http://kambing.ui.edu/status/log/blankon/20081206.000003/sync.log.gz), saya jadi tergoda untuk membuat konfigurasi yang sama di mirror saya, nah akhirnya [BERHASIL](http://mirror.unej.ac.id/status/log/blankon/20081205.180001/sync.log.gz),dan akhirnya berkas gz bisa di baca di web browser

caranya cukup memaksa si apache menggunakan aplikasi zcat untuk membaca berkas *.gz sehingga bisa di tampilkan, silakan edit berkas di`/etc/apache2/site-avaliable/default`, kemudian tambahkan opsi berikut:

    
    Alias /status "/home/sedot/data/report"
    <Directory /home/sedot/data/report>
    AddType text/plain gz
    AddEncoding x-gzip gz
    <Directory>


kemudian jangn lupa untuk me-reload konfigurasi apachenya

    
    $ sudo /etc/init.d/apache2 reload


sekian, terlalu panjang yah? :p
