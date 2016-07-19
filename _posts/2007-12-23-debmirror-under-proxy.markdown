---
author: udienz
comments: true
date: 2007-12-23 13:21:52+00:00
layout: post
link: https://blog.mahyudd.in/2007/12/23/debmirror-under-proxy.html
slug: debmirror-under-proxy
title: debmirror
wordpress_id: 148
categories:
- Debian
- Linux
- Ubuntu
tags:
- artikel
- Debian
- debmirror
- Linux
- ubuntu
---

setelah membaca dan memahami tulisan[ om Fajra](http://wiki.ubuntu-id.org/DokumentasiKomunitas/TutorialRepositoriLokal)[n](http://wiki.ubuntu-id.org/DokumentasiKomunitas/TutorialRepositoriLokal), akhirnya jadi kebelet juga tuk mempraktekkan debmirror....

tapi ini di khususkan buat yang punya bandwith lebih ke internet lho (walaupun sebenarnya untuk server lokal juga bisa)

debmirror ini di buat untuk me-mirrorkan paket debian yang terdapat dalam server, server di sini bukan hanya server internet tapi juga server lokal.. jadi seumpama kita mau me-mirrorkan kompi kita dengan mirror `kambing.ui.edu` dengan rincian:

<!-- more -->

distro: `Ubuntu Gutsy`

jenis paket: `main, restricted, universe, multiverse`

jenis koneksi: `http`

arsitektur: `i386`

maka perintah yang di gunakan adalah:

    
    $ debmirror -m --passive --host=kambing.ui.edu --root=ubuntu/ --method=ftp --progress --dist=gutsy --section=main,restricted,universe,multiverse --arch=i386 ubuntu/ --ignore-release-gpg


sebagai catatan:

bila anda berada di balik proxy alangkah baiknya bila di tambahin opsi

    
    --proxy=<alamat.proxy.anda>:<port.proxy.anda>


seandainya anda tidak ingin mendownload source nya (berupa file .diff dan .tar.gz) tambahin aja

    
    --nosource


untuk host, anda dapat menggantikanya dengan `ubuntu.indika.net.id, dl2.foss-id.web.id, buaya.klas.or.id`

untuk metode yang di gunakan anda dapat menggantinya dengan `ftp`, atau `http` namun jika server mirror mendukung SSL apa salahnya mencoba `sftp `dan `https`

untuk dist anda dapat mengisikan code_name dari ubuntu itu sendiri, semisal `dapper, breezy, dapper, feisty`. namun daripada itu juga anda dapat mengisikan update dan layanan security nya yaitu dengan menambahkan <nama_rilis>-updates, <nama_rilis>-security

berikut adalah contoh lengkapnya

    
    $ debmirror -m --passive --host=kambing.ui.edu --root=ubuntu/ --method=http --progress --dist=gutsy,feisty,gutsy-updates,gutsy-security,feisty-updates,feisty-security,dapper,dapper-updates,dapper-security --section=main,restricted,universe,multiverse --arch=i386,amd64,sparc ubuntu/ --ignore-release-gpg --proxy=10.10.1.3:3128


pabila perintah diatas anda praktekkan, entah berapa lamanya.......

selamat mencoba!!

nb:

ini juga bisa di praktekkan dalam debian, cukup ganti ubuntu dengan debian dan ganti gutsy dengan `lenny/etch`

referensi:

http://wiki.ubuntu-id.org/DokumentasiKomunitas/TutorialRepositoriLokal

manual page `DebMirror` ($ man debmirror)
