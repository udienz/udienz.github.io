---
author: udienz
comments: true
date: 2008-09-23 14:22:00+00:00
layout: post
slug: akhirnya-rsync-sudah-ada-di-mirror
title: Akhirnya Rsync sudah ada di mirror
wordpress_id: 222
categories:
- Linux
- Networking
tags:
- Mirror
- repository
- server
- unej
---

setelah [diluncurkan kemarin](http://udienz.immteknik.org/2008/09/server-repository-baru-di-indonesia.html) akhirnya [mirror.unej.ac.id](http://mirror.unej.ac.id) suah dilengkapi dengan fasilitas [rsync](http://packages.ubuntu.com/hardy/rsync), namun hanya pengguna yang terdaftar saja yang boleh mengakses karena kami sebagai pihak admin ingin memberikan pelayanan yang memuaskan :D. dan PR selanjutnya adalah pengediaan FTP bagi [mirror.unej.ac.id](http://mirror.unej.ac.id) doakan lancar yah!

mari kita coba:

    
    udienz@starscream:~$ rsync mirror.unej.ac.id::
    	    :: Welcome to rsync:://mirror.unej.ac.id ::
               _                                       _               _     _
     _ __ ___ (_)_ __ _ __ ___  _ __ _   _ _ __   ___ (_)  __ _  ___  (_) __| |
    | '_ ` _ | | '__| '__/ _ | '__| | | | '_  / _ | | / _` |/ __| | |/ _` |
    | | | | | | | |  | | | (_) | | _| |_| | | | |  __/| || (_| | (__ _| | (_| |
    |_| |_| |_|_|_|  |_|  ___/|_|(_)__,_|_| |_|___|/ (_)__,_|___(_)_|__,_|
                                                    |__/
    
            untuk info silakan berkunjung ke http://mirror.unej.ac.id
    silakan hubungi udienz@unej.ac.id/ashadebi@debian-id.org bila menemukan access forbidden!
    
    ftp            	ftp/iso archive, semua yang ada di ~/pub
    blankon        	www.blankonlinux.or.id
    bse            	Buku Sekolah Elektronik
    centos         	www.centos.com
    cygwin         	www.cygwin.com
    debian         	www.debian.org
    debian-security	Debian Linux Security Packages
    iso            	Berkas - Berkas ISO
    elive          	www.elivecd.org
    medibuntu      	www.medibuntu.org
    opensuse       	www.opensuse.org
    opensuse-guru  	www.opensuse.org
    opensuse-packman	www.opensuse.org
    RI             	Kumpulan INPRES, KEPMEN, KEPPRES, PP, dan UU
    tldp           	The Linux Documentation Project
    ubuntu         	www.ubuntu.com
    ubuntume       	www.ubuntume.com
    zekr           	http://ppa.launchpad.net/zekr
    udienz@starscream:~$
