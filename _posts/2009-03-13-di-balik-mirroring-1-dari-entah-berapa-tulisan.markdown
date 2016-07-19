---
author: udienz
comments: true
date: 2009-03-13 15:43:01+00:00
layout: post
link: https://blog.mahyudd.in/2009/03/13/di-balik-mirroring-1-dari-entah-berapa-tulisan.html
slug: di-balik-mirroring-1-dari-entah-berapa-tulisan
title: Di balik mirroring (1) dari (entah) berapa tulisan
wordpress_id: 316
categories:
- Hack
- Linux
tags:
- apache
- file
- ftp
- Linux
- Mirror
- Networking
- ngedumel
- ngomel
- server
---

Disadari atau tidak saya mendapat pengalaman yang banyak dalam membuat [mirror.unej.ac.id](http://mirror.unej.ac.id), nah salah satu yang buat saya selalu ingat adalah waktu yang saya habiskan demi membaca ulang manual Apache (entah berapa halaman!). ada apa dengan apache? seperti yang kita tau, teman kita dari [kambing](http://fajran.web.id/story/2007/05/24/tuma) dan [buaya](http://budiwijaya.or.id/222-124-169-xx) pernah mengeluhkan user yang ga tau diri dengan mendownload sebuah file dari server mirror dengan koneksi yang banyak (atau menggunakan Download Manager), nah sedang si user itu menggunakan koneksi lambat! masih belum mudeng? baiklah ada contoh begini. sek...sek.. [ini pengalaman saya juga](http://www.plurk.com/p/h1awv) :D

Koneksi pak surip adalah 128kbps, di ingin mendownload [dvd repository ubuntung](http://mirror.unej.ac.id/pub/iso/ubuntu-repository/) nah cobak tebak berapa hari dia akan selesai mendownload dvd repository ubuntu? nah pak surip ini memang keterlaluan, waktu download dia menggunakan IDM (atau apalah!) dengan maxkoneksi 128 saluran. nah sedang si mirror ini punya koneksi maximal koneksi 250 (default apache2) berarti saluran di koneksi tinggal 250-128=? lha terus user lain gimana nasibnya cobak? ilfiil ga kalo gini? nah ini yang sempat terbawa sampe mimpi (halah!) hehehehe

saya googling sampe ujung amrik, alhamdulillah akhirnya nemu modul apache2 yang bagus yaitu [mod-limitipconn](http://elonen.iki.fi/code/unofficial-debs/mod-limitipconn/), lha tapi si modul ini menurut saya sering over acting dalam mereject koneksi, alhasil saya sendiri sering menemukan halaman **SERVICES TEMPORARY UNAVALIABLE** aka STU!. lah kok :(Â  ya sudah akhirnya ngoprek lagi modul lain, alhasil saya nemuin modul yang lumayan bagus yaitu [mod_bw](http://packages.debian.org/stable/libapache2-mod-bw) dan ada lagi mod_cband tapi saya ga pake cband :D

nah pengaturanya gimana? sebentar saya login dulu ke mirror :D

    
    # aktifkan module
    BandwidthModule On
    #batesi 10 ae rek!
    MaxConnection all 10
    # contoh dari jaringan ini unlimitted download :D
    MaxConnection 192.168.1.0/24 0
    #Bandwidth all 20240
    # file > 70MB di limit 700kbps
    LargeFileLimit * 650000 70000
    # file iso di limit 700kbps
    LargeFileLimit .iso 1 70000
    BandWidth 192.168.1.0/24 0


Alhamdulillah sudah tidak penuh lagi :D *joged pisang*

lha kalo ftp? nah ini, kalau menggunakan vsftpd bisa (tapi lupa), proftpd bisa. kalo pake proftpd ini caranya:

    
    # you may not like the bandwidth control below
    # TransferRate RETR|STOR|APPE|STOU KBrate:freebytes
    #TransferRate RETR 10:0


silakan isi nilai nya sesuka anda :D lumayan lah bisa melindungi user lain dari "_ketamakan_" user lain juga

**episode ke dua saya ga tau mau nulis apa :p enaknya apa?**
