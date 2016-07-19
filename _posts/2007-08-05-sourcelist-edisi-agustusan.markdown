---
author: udienz
comments: true
date: 2007-08-05 19:20:45+00:00
layout: post
link: https://blog.mahyudd.in/2007/08/06/sourcelist-edisi-agustusan.html
slug: sourcelist-edisi-agustusan
title: source.list edisi agustusan
wordpress_id: 398
categories:
- Tak Berkategori
---

alhamdulillah akhirnya bisa bulis lagi... setelah bingung mikiri proyek plus bantu teman-temen [Ubuntu-Indonesia](http://http://wiki.ubuntu-id.org/) bikin [BlankOn](http://http://wiki.ubuntu-id.org/BlankOn), sekarang bisa bernafas (walaupun sebentar...). jadi yang selama ini aku lakukan adalah bantu bapak-bapak [UPT-TI](http://www.unej.ac.id/upt/ti/) unej tuk bangun jaringan wireless di sekitaran jember... :) dan buat dokumentasi di Ubuntu-ID. ni hasilnya http://wiki.ubuntu-id.org/BlankOn/Dokumentasi/Partisipasi. ups... kembali ke judul saya copy paste dulu file /etc/apt/source.list nya dulu yah... ni caranya...

    
    udienz@r-a-unit6:~$ cat /etc/apt/sources.list



    
    deb http://id.archive.ubuntu.com/ubuntu/ feisty restricted main multiverse universe



    
    deb http://arsip.ubuntu-id.org/repo feisty all



    
    deb http://archive.canonical.com/ubuntu feisty-commercial main



    
    deb http://medibuntu.sos-sts.com/repo/ feisty free non-free



    
    deb http://www.linuxmint.com/repository cassandra/



    
    deb http://id.archive.ubuntu.com/ubuntu/ feisty-backports restricted main multiverse universe



    
    deb http://id.archive.ubuntu.com/ubuntu/ feisty-proposed restricted main multiverse universe



    
    deb http://id.archive.ubuntu.com/ubuntu/ feisty-security restricted main multiverse universe



    
    deb http://id.archive.ubuntu.com/ubuntu/ feisty-updates restricted main multiverse universe



    
    udienz@r-a-unit6:~$


trus gimana cara nambahin extra repo seperti:

deb http://www.linuxmint.com/repository cassandra/, deb http://arsip.ubuntu-id.org/repo feisty all, deb http://archive.canonical.com/ubuntu feisty-commercial main, deb http://medibuntu.sos-sts.com/repo/ feisty free non-free ?????

sederhana sih sebenernya... buka konsole:

    
    $ wget http://arsip.ubuntu-id.org/repo/2A68AD0A.gpg -O- | sudo apt-key add -



    
    $ wget -q http://packages.medibuntu.org/medibuntu-key.gpg -O- | sudo apt-key add -



    
    $ sudo apt-get update


jadi deh... gampang kan... ???

[bertanya di hati] iya yah... siapa bilang ubuntu itu susah..???

[mikir lagi] ah... migrasi aja...
