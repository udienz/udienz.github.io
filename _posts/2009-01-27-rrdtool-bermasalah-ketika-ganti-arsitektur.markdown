---
author: udienz
comments: true
date: 2009-01-27 07:49:13+00:00
layout: post
link: https://blog.mahyudd.in/2009/01/27/rrdtool-bermasalah-ketika-ganti-arsitektur.html
slug: rrdtool-bermasalah-ketika-ganti-arsitektur
title: RRDTOOL bermasalah ketika ganti arsitektur
wordpress_id: 269
categories:
- Linux
tags:
- 32 bit
- 64 bit
- amd64
- arsitektur
- backports
- bash
- blankon
- cygwin
- Debian
- i386
- iso
- Linux
- medibuntu
- multimedia
- rrdtool
- script
- security
- sedot
- shell
- ubuntu
- volatile
---

Jadi ceritanya gini, si [mirror](http://mirror.unej.ac.id) ganti system dan arsitektur. Semula mesin menggunakan system i386 kemudian ganti ke system 64bit. Nah salah satu fitur mirror adalah adanya [monitoring paket](http://mirror.unej.ac.id/status/) ([Sedot Sampe Tua](https://launchpad.net/sedot)!), denganya kita dalap melihat kapasitas arsip suatu repository. contohnya silakan buka [http://mirror.unej.ac.id/status/size.html](http://mirror.unej.ac.id/status/size.html) disitu kita akan nelihat perkembangan banyaknya hardisk yang dipakai repository suatu paket.

Nah setelah ganti sistem ada masalah yang sedikit mengganggu, yaitu file rrd tidak bisa di produksi lagi oleh monitoring paket (sedot). ada log yang mengatakan gini:

    
    ERROR: This RRD was created on another architecture
    ERROR: This RRD was created on another architecture
    ERROR: This RRD was created on another architecture
    ERROR: This RRD was created on another architecture
    ERROR: This RRD was created on another architecture
    ERROR: This RRD was created on another architecture


ini menandakan kalau berkas rrd tidak bisa di produksi lagi bukan? ya kalau menurut tulisan diatas karena file rrd sebelumnya di produksi oleh system dengan arsitektur yang berbeda. nah bagaimana pemecahanya?

baiklah ambil contoh sedot di simpan di `/home/sedot` maka file rrd akan disimpan di `/home/sedot/mirror-size/`. nah hasil temuan google mengharuskan saya membaca tulisan [ini](http://net.doit.wisc.edu/~plonka/list/flowscan/archive/1448.html). kemudian dari situ dapat saya asumsikan bahwa berkas rrd harus di compile ulang! untuk prosesinya saya menggukaan script bash/shell.

    
    #!/bin/bash
    
    BASE=/home/sedot/mirror-size/
    
    for i in `ls $BASE -all | grep .rrd | sed -e "s/.rrd/ /g" | cut -b 47-80`;
            do
            /usr/bin/rrdtool dump $BASE/$i.rrd > $BASE/$i.xml
     /bin/rm $BASE/$i.rrd
     /usr/bin/rrdtool restore -r -f $BASE/$i.xml $BASE/$i.rrd
            done
    exit 0


nah silakan simpan script diatas ke sebuah berkas dan eksekusi... dan SIMSALABIM!

![Debian PNG](http://mirror.unej.ac.id/status/mirror-size/debian.month.png)

Gampang kan?

Silakan lihat juga di sini [https://bugs.edge.launchpad.net/sedot/+bug/320593](https://bugs.edge.launchpad.net/sedot/+bug/320593)
