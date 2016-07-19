---
author: udienz
comments: true
date: 2009-05-20 13:49:14+00:00
layout: post
link: https://blog.mahyudd.in/2009/05/20/tanggapan-dari-pertanyaan-di-milis-tanya-jawab.html
slug: tanggapan-dari-pertanyaan-di-milis-tanya-jawab
title: Tanggapan dari pertanyaan di milis tanya jawab
wordpress_id: 447
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- Debian
- Mirror
- repository
- rsync
- ubuntu
---

[Seseorang telah bertanya di milis tanya jawab](http://www.mail-archive.com/tanya-jawab%40linux.or.id/msg64692.html) tentang dokumentasi mirror, nah saya akan sedikit menjawab tentang bagaimana metode rsync untuk mirror debian/ubuntu dan turunan nya. Sedangkan opensuse saya sudah menjelaskan di tulisan sebelumnya

Rsync sangat di anjurkan bila anda menghendaki penyalinan file dari mirror repository, banyak sekali keuntungan nya tapi saya tidak akan bahas di sini :D. saya akan membahas tentang mirror debian dan turunannya. seperti yang kita ketahui directory standard dari arsip debian adalah adalah

    
    * dists
    * pool
    * project



nah dalam melakukan mirorring arsip debian kita tidak bisa langsung menggunakan metode rsync biasa yaitu `rsync mirror.kesukaan::debian/ /mirrors/debian -avh`. itu kalau menurut tim debian mirror adalah salah. lha yang bener gimana? nah yang bener adalah dengan cara dua kali mirroring yaitu:

* alternatif pertama, melakukan mirroring directory pool/ kemudian baru melakukan mirroring semuanya, contoh:

    
    # stage pertama
    rsync -avhH --timeout 3600 --stats --partial --chmod=a+rX,u+w,og-w 
    --exclude ~.tmp/ --chmod=a+rX,u+w,og-w 
    ftp.debian.org::debian/pool/ /ftp/debian/pool/
    # stage ke dua
    rsync -avhH --timeout 3600 --stats --partial 
    --exclude ~.tmp/ --delete --delete-after --delete-exclude --chmod=a+rX,u+w,og-w 
    ftp.debian.org::debian/ /ftp/debian/
    LANG=C date -u > "/ftp/debian/project/trace/`hostname -f`"



* alternatif ke dua, melakukan mirrorng tanpa menyertakan berkas `Packages*, Sources*, ls-lRh*`, dll. contoh

    
    # stage pertama
    rsync -avhH --timeout 3600 --stats --partial --chmod=a+rX,u+w,og-w 
    --exclude Packages* --exclude Sources* --exclude Release* --exclude ls-lR*Â  --exclude .~tmp~/ 
    --exclude project/trace/`hostname -f` 
    ftp.debian.org::debian/ /ftp/debian/
    # stage ke dua
    rsync -avhH --timeout 3600 --stats --partial --chmod=a+rX,u+w,og-w 
    --exclude Packages* --exclude Sources* --exclude Release* --exclude ls-lR*Â  --exclude .~tmp~/ 
    --exclude project/trace/`hostname -f` 
    --delay-updates --delete --delete-excluded 
    ftp.debian.org::debian/ /ftp/debian/
    LANG=C date -u > "/ftp/debian/project/trace/`hostname -f`"



nah bagaimana yang terbaik dari keduanya? silakan uji sendiri. saya menggunakan alternatif ke dua. Yang perlu di tekankan di sini adalah kenapa menggunakan dua metode itu? nah ini di karenakan dalam melakukan apt-get update kita hanya akan mengunduh berkas `Packages/Packages.gz/Release/Source/Sources.gz` jadi bila kita menjumpai ada teman kita waktu install dia menemukan "`file not found`" di server maka ada yang salah dengan metode singkronisasinya di server. `Packages/Packages.gz/Release/Source/Sources.gz` ini merupakan kumpulan paket atau sebut saja database dari paket-paket di dalam direktory `pool/`. jadi bila si database di unduh duluan maka akan terjadi kebingungan karena di database ada tapi kok di `pool/` ga ada. Selain itu mutlak di berkanya timestamp di `project/trace/`. kenapa? ini untuk menandakan kapan terakhir si server melakukan singkronisasi.

Nah sekarang saya pengen membuat mirror debian/ubuntu dari mana saya dapatkan scriptnya? bisa di dapatkan di
* [http://mirror.unej.ac.id/~udienz/push/anonftpsync](http://mirror.unej.ac.id/~udienz/push/anonftpsync)
* [https://launchpad.net/sedot](https://launchpad.net/sedot)
* [http://mirror.unej.ac.id/debian/project/ftpsync/ftpsync-current.tar.gz](http://http://mirror.unej.ac.id/debian/project/ftpsync/ftpsync-current.tar.gz)

mana yang mudah? semua mudah kok :D
