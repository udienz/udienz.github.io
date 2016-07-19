---
author: udienz
comments: true
date: 2008-01-01 14:06:52+00:00
layout: post
slug: ngetes-kecepatan-loading-komputer
title: ngetes kecepatan loading komputer
wordpress_id: 151
categories:
- BlankOn
- Linux
- MySelf
tags:
- blankon
- bootchart
- Linux
- MySelf
- tutorial
---

ada suatu program yang namanya bootchart dia di gunakan untuk mnghitung lamanya waktu booting awal hingga sistem sudah up....

cukup menarik sekali karena si program ini dapat menghitung dengan akurat dan menampilkan hasilnya dalam format gambar.

program ini tersedia dalam paket repository debian/ubuntu, untuk instalasinya tinggal ketikkan

`# apt-get install bootchart`

paket lainya juga tersedia dalam bentuk distro Suse, Mandriva. dan ada juga dalam bentuk source nya (tarball)

untuk melihat hasilnya, anda harus merebot dulu komputer anda, dan silakan lihat di /var/log/bootchart/, setiap anda login bootchart akan membuat file hasil timing nya dengan format png...

ini hasilnya

[![](http://lh3.google.com/udienz/R3pEMNX0nGI/AAAAAAAAAcM/v-9-CvtEPOc/s800/konde-20071229-2.png)](http://picasaweb.google.com/udienz/MySystem/photo#5150504100390280290)

ini file aslinya

`http://lh3.google.com/udienz/R3pEMNX0nGI/AAAAAAAAAcM/v-9-CvtEPOc/s400/konde-20071229-2.png`

Waktu yang di hasilkan **43 detik** dengan rincian komputer

Prosesor: Intel Pentium IV 2.4A

Memory: 1024 MB

HD: 240 GB

Software tambahan: LAMP, DNS

jangan lupa pasting di http://wiki.ubuntu-id.org/SeaGamesUbuntu untuk membandingkan dengan yang lainya....
silakan mencoba...
