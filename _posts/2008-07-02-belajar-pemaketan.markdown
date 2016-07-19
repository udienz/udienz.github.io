---
author: udienz
comments: true
date: 2008-07-02 07:25:14+00:00
layout: post
link: https://blog.mahyudd.in/2008/07/02/belajar-pemaketan.html
slug: belajar-pemaketan
title: Belajar pemaketan
wordpress_id: 209
categories:
- BlankOn
- Linux
- MySelf
tags:
- blankon
- Linux
- motu
- packaging
- pbuilder
- programming
- shell
---

Setelah bertapa dan meluangkan waktu akhirnya berhasil juga saya memaketkan kembali paket-paket ubuntu ke Blankon linux. kali ini saya memaketkan paket Apache2 dan Php5. Alhamdulillah berhasil! kompilasi berjalan cukup lamaaaa terutama pada kompilasi php karena harus mengkompile entah berapa modul banyaknya.

saya menggunakan pbuilder untuk membangun paket impor dari ubuntu ini, silakan lihat hasilnya:

[![Screenshot-Index of -temp - Mozilla Firefox 3 Beta 5-1](http://farm4.static.flickr.com/3137/2629868781_0eed3a61ed.jpg)](http://www.flickr.com/photos/udienz/2629868781/)

Saya hanya mengganti lsb_base sehingga server signaturenya menjadi BlankOn, lumayan mudah kok. kalo pengen belajar pemaketan silakan belajar di:

http://wiki.ubuntu-id.org/DokumentasiKomunitas/PackagingGuide

https://wiki.ubuntu.com/PackagingGuide

http://dev.blankonlinux.or.id/wiki/Pemaket/Kelas/Kelas080608
