---
author: udienz
comments: true
date: 2013-01-24 10:53:19+00:00
layout: post
slug: which-debian-repository-should-i-choose
title: Which debian repository should i choose?
wordpress_id: 728
categories:
- Debian
tags:
- apt
- Debian
- squeeze
---

Sesuai judul, akan susah dijawab. :) Dengan semakin banyaknya penyedia mirror open source di Indonesia, kita jadi kesulitan untuk memilih server mana yang dekat. Nah ada situs yang menyediakan alternatif pilihan ketika anda bingung 'which mirror should i choose?'

Untuk **Debian**, silakan mengunjugi keÂ [http://http.debian.net](http://http.debian.net), dan slakan coba demonya di sini [http://http.debian.net/demo.html](http://http.debian.net/demo.html).Â Â Terlalu ribet? oke kita langsung sunting saja soureces.list kita. Di saya sources listnya adalah sebagai berikut:

    
    #deb http://http.debian.net/debian-backports stable main contrib non-free
    #deb-src http://http.debian.net/debian-backports/ stable-backports main contrib non-free
    deb http://http.debian.net/debian/ stable main contrib non-free
    deb-src http://http.debian.net/debian/ stable main contrib non-free
    deb http://http.debian.net/debian-security/ stable main contrib non-free
    deb-src http://http.debian.net/debian-security/ stable main contrib non-free



Test dengan mengunduh berkas di server.


    
    udienz@debian:~$ wget http://http.debian.net/debian/ls-lR.gz
    --2013-01-24 17:46:51--  http://http.debian.net/debian/ls-lR.gz
    Resolving http.debian.net... 2a01:4f8:131:152b::42, 46.4.205.43
    Connecting to http.debian.net|2a01:4f8:131:152b::42|:80... connected.
    HTTP request sent, awaiting response... 302 Moved Temporarily
    Location: http://ftp.jaist.ac.jp/debian/ls-lR.gz [following]
    --2013-01-24 17:46:52--  http://ftp.jaist.ac.jp/debian/ls-lR.gz
    Resolving ftp.jaist.ac.jp... 2001:200:141:feed::feed, 150.65.7.130
    Connecting to ftp.jaist.ac.jp|2001:200:141:feed::feed|:80... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 7157185 (6.8M) [application/x-gzip]
    Saving to: â€œls-lR.gzâ€
    
    100%[======================================================================>] 7,157,185    347K/s   in 20s     
    
    2013-01-24 17:47:12 (354 KB/s) - â€œls-lR.gzâ€ saved [7157185/7157185]


Ok, berarti sudah berhasil walau sayang masih mengarah ke [JAIST](http://ftp.jaist.ac.jp/debian) (Jepang).
