---
author: udienz
comments: true
date: 2007-08-07 09:47:48+00:00
layout: post
link: https://blog.mahyudd.in/2007/08/07/feisty-jadi-ubuntu-muslim-edition.html
slug: feisty-jadi-ubuntu-muslim-edition
title: feisty jadi ubuntu Muslim Edition
wordpress_id: 400
categories:
- Tak Berkategori
---

Bismillahirrohmanirrohiem, Assalamualikum

Di [Linux](http://) kita bisa mengoprek system sesuka kita (tp harus jadi root), hm... kemarin iseng iseng lihat ubuntu-me via website resminya, dan sempat kecewa sih sebenarnya karena tidak ada perubahan signifikan dari Ubuntu , cuma tambah beberapa program aja... (mungkin butuh kontribusi kita kali ya...)

oke akhirnya saya pengen membuat Ubuntu feisty saya menjadi Ubuntu-ME, pertimbangan:

1. ribet install ulang

2. males konfigurasi ulang

3. ga ada waktu lagi...

gimana caranya biar ubuntuku jadi Ubuntu-ME???

seperti yang telah kita ketahui Ubuntu-ME menambahkan program-program tambahan di distro tersebut, yaitu [ubuntume-artwork](http://www.ubuntume.com/ubuntume-artwork), [wcc (Web Content Control tool)](http://www.ubuntume.com/wcc), [islamiccal](http://www.ubuntume.com/islamiccal), [zekr](http://www.ubuntume.com/zekr), [minbar](http://www.ubuntume.com/minbar). perincianya adalah sebagai berikut:

1. Ubuntu-Me artwork adalah paket yang menyediakan theme, splash screen, dll

![](http://www.ubuntume.com/_media/ubuntume-wallpaper.jpg?w=400&h=&cache=cache)

<!-- more -->

Gambar.1 Wallpaper Ubuntu-Me

![](http://www.ubuntume.com/_media/fr:gdm-login2.png?w=400&h=&cache=cache)

Gambar 2. Tampilan Log-In

![](http://www.ubuntume.com/_media/fr:gdmlogin.png?w=400&h=&cache=cache)

Gambar 3. Alternatif Tampilan Log-In

![](http://www.ubuntume.com/_media/gdmsplash.png?w=400&h=&cache=cache)

Gambar 4. splash screen

![](http://www.ubuntume.com/_media/theme.png?w=400&h=&cache=cache)

Gambar 5 Tampilan Theme

2.  [wcc (Web Content Control tool)](http://www.ubuntume.com/wcc), cocok buat yang mau jaga si kecil dari situs porno dan tampilan seronok

![](http://www.ubuntume.com/_media/wcc.png?w=500&h=&cache=cache)

Gambar 6 Pengaturan

![](http://www.ubuntume.com/_media/wccfirefox.png?w=600&h=&cache=cache)

Gambar 7 ups.... ada yang mau ke situs PlayBoy

3. Islamic Calender, kalo yang ni ga ussah di jelasih semua pada udah tau lah....

![](http://www.ubuntume.com/_media/islamiccal-screenshot.png?w=&h=&cache=cache)

4. zekr, ini yang aku suka, dia menampilakan text Al-Qur'am secara lengkap dan bagus

![](http://www.ubuntume.com/_media/zekr-en.png?w=600&h=&cache=cache)

Gambar 8 Tampilan Zekr

5. [minbar](http://www.ubuntume.com/minbar), masih ingat program Athlan di *indows??? mirip seperti ini... ni program cocok buat pelupa, coz dapat mengingatkan kita waktu sholat

![](http://www.ubuntume.com/_media/minbar.png?w=&h=&cache=cache)


## Lets Go


berhubung halaman instalasi sudah ada (http://www.ubuntume.com/installation) :p maka anda tinggal melihatnya sendiri, hanya saja ketika saya mencari Kunci GPG dari situs ini tidak ada (lih: perintah

sudo gpg --keyserver-options honor-http-proxy --keyserver pgp.mit.edu --recv-keys D64E21E8), so kita harus mengingstall paket paket tersebut secara manual.

oke, selanjutnya berhubung GPG error maka kita harus download manual semua paketnya... di mana di sini http://www.ubuntume.com/repository/dists/feisty/main/binary-i386/ tempatnya....  (catatan, ganti feisty bila anda menggunakan edgy, dan ganti binary-amd64 bila anda menggunakan komputer 64 bit)

oke dapatkan semua paket paket di situ, anda dapat menggunakan perintah wget ataupun download via firefox.


## Next


saya menyimpan semua paket di hard disk saya, untuk mengeceknya anda dapat menggunakan perintah ls -all

    
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$ ls -



    
    alltotal 8712



    
    
    drwxr-xr-x 2 udienz udienz    4096 2007-08-07 23:19.drwxr-xr-x 4 udienz udienz    4096 2007-08-07 23:19
    
    ..-rw-r--r-- 1 udienz udienz   13044 2007-08-06 11:43 islamiccal.deb
    
    -rw-r--r-- 1 udienz udienz 1209834 2007-08-06 11:43 minbar_0.1-6-1ubuntu2_i386.deb
    
    -rw-r--r-- 1 udienz udienz 2969398 2007-08-06 11:42 ubuntume-artwork_0.7-1_i386.deb
    
    -rw-r--r-- 1 udienz udienz    3230 2007-08-06 11:42 ubuntume.deb
    
    -rw-r--r-- 1 udienz udienz  126984 2007-08-06 11:43 ubuntumeWCC.deb
    
    -rw-r--r-- 1 udienz udienz 4551630 2007-08-06 11:43 zekr_0.5.0-1_i386.deb
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$


`kemudian kita perlu menginstallnya dengan menggunakan tool dpkg, seperti ini`

    
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$ sudo dpkg -i *.debPassword:Selecting previously deselected package islamiccal.(Reading database ... 120803 files and directories currently installed.)Unpacking islamiccal (from islamiccal.deb) ...
    
    Selecting previously deselected package minbar.
    
    Unpacking minbar (from minbar_0.1-6-1ubuntu2_i386.deb) ...
    
    Selecting previously deselected package ubuntume-artwork.
    
    Unpacking ubuntume-artwork (from ubuntume-artwork_0.7-1_i386.deb) ...
    
    Selecting previously deselected package ubuntume.
    
    Unpacking ubuntume (from ubuntume.deb) ...
    
    Selecting previously deselected package ubuntumewcc.
    
    Unpacking ubuntumewcc (from ubuntumeWCC.deb) ...
    
    Pre Install
    
    Selecting previously deselected package zekr.
    
    Unpacking zekr (from zekr_0.5.0-1_i386.deb) ...
    
    dpkg: dependency problems prevent configuration of islamiccal:
    
    islamiccal depends on sun-java6-jre; however:
    
    Package sun-java6-jre is not installed.
    
    islamiccal depends on itools; however:
    
    Package itools is not installed.
    
    dpkg: error processing islamiccal (--install):
    
    dependency problems - leaving unconfigured
    
    dpkg: dependency problems prevent configuration of minbar:
    
    minbar depends on libitl0; however:
    
    Package libitl0 is not installed.
    
    dpkg: error processing minbar (--install):
    
    dependency problems - leaving unconfigured
    
    dpkg: dependency problems prevent configuration of ubuntume-artwork:
    
    ubuntume-artwork depends on grub-splashimages; however:
    
    Package grub-splashimages is not installed.
    
    dpkg: error processing ubuntume-artwork (--install):
    
    dependency problems - leaving unconfigured
    
    dpkg: dependency problems prevent configuration of ubuntume:
    
    ubuntume depends on islamiccal; however:
    
    Package islamiccal is not configured yet.
    
    ubuntume depends on ubuntume-artwork; however:
    
    Package ubuntume-artwork is not configured yet.
    
    ubuntume depends on minbar; however:
    
    Package minbar is not configured yet.
    
    dpkg: error processing ubuntume (--install):
    
    dependency problems - leaving unconfigured
    
    dpkg: dependency problems prevent configuration of ubuntumewcc:
    
    ubuntumewcc depends on dansguardian; however:
    
    Package dansguardian is not installed.
    
    ubuntumewcc depends on tinyproxy; however:
    
    Package tinyproxy is not installed.
    
    ubuntumewcc depends on firehol; however:
    
    Package firehol is not installed.
    
    ubuntumewcc depends on oidentd; however:
    
    Package oidentd is not installed.
    
    dpkg: error processing ubuntumewcc (--install):
    
    dependency problems - leaving unconfigured
    
    Setting up zekr (0.5.0-1) ...
    
    No CIDSupplement specified for Batang-Regular, defaulting to 0.
    
    No CIDSupplement specified for KochiGothic-Regular-JaH, defaulting to 0.
    
    No CIDSupplement specified for Headline-Regular, defaulting to 0.
    
    No CIDSupplement specified for Dotum-Regular, defaulting to 0.
    
    No CIDSupplement specified for KochiMincho-Regular-JaH, defaulting to 0.
    
    No CIDSupplement specified for KochiMincho-Regular, defaulting to 0.
    
    No CIDSupplement specified for KochiGothic-Regular, defaulting to 0.
    
    No CIDSupplement specified for Gulim-Regular, defaulting to 0.Errors were encountered while processing:
    
    islamiccal
    
    minbar
    
    ubuntume-artwork
    
    ubuntume
    
    ubuntumewcc
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$


`ups ada yang salah.... coba perbaiki ah...`

    
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$ sudo apt-get install -fReading package lists... DoneBuilding dependency treeReading state information... DoneCorrecting dependencies... Done
    
    The following extra packages will be installed:
    
    clamav clamav-base clamav-freshclam dansguardian firehol grub-splashimages itools java-common libclamav2 libesmtp5 libgmp3c2 libitl0 libltdl3
    
    odbcinst1debian1 oidentd sun-java6-bin sun-java6-jre tinyproxy unixodbc
    
    Suggested packages:
    
    unrar lha clamav-docs squid grubconf equivs sun-java6-plugin ia32-sun-java6-plugin sun-java6-fonts ttf-sazanami-gothic ttf-sazanami-mincho libmyodbc
    
    odbc-postgresql libct1
    
    Recommended packages:
    
    arj unzoo gsfonts-x11
    
    The following NEW packages will be installed:
    
    clamav clamav-base clamav-freshclam dansguardian firehol grub-splashimages itools java-common libclamav2 libesmtp5 libgmp3c2 libitl0 libltdl3
    
    odbcinst1debian1 oidentd sun-java6-bin sun-java6-jre tinyproxy unixodbc
    
    0 upgraded, 19 newly installed, 0 to remove and 93 not upgraded.
    
    5 not fully installed or removed.
    
    Need to get 46.7MB of archives.
    
    After unpacking 113MB of additional disk space will be used.
    
    Do you want to continue [Y/n]? y
    
    Get:1 http://id.archive.ubuntu.com feisty/main java-common 0.25ubuntu2 [76.9kB]
    
    Get:2 http://id.archive.ubuntu.com feisty/main libltdl3 1.5.22-4 [168kB]
    
    Get:3 http://id.archive.ubuntu.com feisty/main odbcinst1debian1 2.2.11-13 [64.1kB]
    
    Get:4 http://id.archive.ubuntu.com feisty/main unixodbc 2.2.11-13 [269kB]
    
    Get:5 http://id.archive.ubuntu.com feisty/multiverse sun-java6-bin 6-00-2ubuntu2 [26.2MB]
    
    Get:6 http://id.archive.ubuntu.com feisty/multiverse sun-java6-jre 6-00-2ubuntu2 [6324kB]
    
    Get:7 http://id.archive.ubuntu.com feisty/universe libitl0 0.6.4-1 [63.0kB]
    
    Get:8 http://id.archive.ubuntu.com feisty/universe itools 0.6.2-1 [30.6kB]
    
    Get:9 http://id.archive.ubuntu.com feisty/universe grub-splashimages 1.0.0 [292kB]
    
    Get:10 http://id.archive.ubuntu.com feisty/main libgmp3c2 2:4.2.1+dfsg-4build1 [436kB]
    
    Get:11 http://id.archive.ubuntu.com feisty-backports/universe libclamav2 0.91.1-1ubuntu3~feisty1 [437kB]
    
    Get:12 http://id.archive.ubuntu.com feisty/universe libesmtp5 1.0.3-1.1 [54.2kB]
    
    Get:13 http://id.archive.ubuntu.com feisty-backports/universe clamav-base 0.91.1-1ubuntu3~feisty1 [210kB]
    
    Get:14 http://id.archive.ubuntu.com feisty-backports/universe clamav-freshclam 0.91.1-1ubuntu3~feisty1 [10.6MB]
    
    Get:15 http://id.archive.ubuntu.com feisty-backports/universe clamav 0.91.1-1ubuntu3~feisty1 [875kB]
    
    Get:16 http://id.archive.ubuntu.com feisty/universe dansguardian 2.8.0.6-antivirus-6.4.4.1-2 [296kB]
    
    Get:17 http://id.archive.ubuntu.com feisty/universe tinyproxy 1.6.3-3 [65.8kB]
    
    Get:18 http://id.archive.ubuntu.com feisty/universe firehol 1.231-7 [162kB]
    
    Get:19 http://id.archive.ubuntu.com feisty/universe oidentd 2.0.8-1 [51.8kB]
    
    Fetched 46.7MB in 5m12s (150kB/s)
    
    Preconfiguring packages ...
    
    Selecting previously deselected package java-common.
    
    (Reading database ... 122121 files and directories currently installed.)
    
    Unpacking java-common (from .../java-common_0.25ubuntu2_all.deb) ...
    
    Selecting previously deselected package libltdl3.
    
    Unpacking libltdl3 (from .../libltdl3_1.5.22-4_i386.deb) ...
    
    Selecting previously deselected package odbcinst1debian1.
    
    Unpacking odbcinst1debian1 (from .../odbcinst1debian1_2.2.11-13_i386.deb) ...
    
    Selecting previously deselected package unixodbc.
    
    Unpacking unixodbc (from .../unixodbc_2.2.11-13_i386.deb) ...
    
    Selecting previously deselected package sun-java6-bin.
    
    Unpacking sun-java6-bin (from .../sun-java6-bin_6-00-2ubuntu2_i386.deb) ...
    
    Selecting previously deselected package sun-java6-jre.
    
    Unpacking sun-java6-jre (from .../sun-java6-jre_6-00-2ubuntu2_all.deb) ...
    
    sun-dlj-v1-1 license has already been accepted
    
    Selecting previously deselected package libitl0.
    
    Unpacking libitl0 (from .../libitl0_0.6.4-1_i386.deb) ...
    
    Selecting previously deselected package itools.
    
    Unpacking itools (from .../itools_0.6.2-1_i386.deb) ...
    
    Selecting previously deselected package grub-splashimages.
    
    Unpacking grub-splashimages (from .../grub-splashimages_1.0.0_all.deb) ...
    
    Selecting previously deselected package libgmp3c2.
    
    Unpacking libgmp3c2 (from .../libgmp3c2_2%3a4.2.1+dfsg-4build1_i386.deb) ...
    
    Selecting previously deselected package libclamav2.
    
    Unpacking libclamav2 (from .../libclamav2_0.91.1-1ubuntu3~feisty1_i386.deb) ...
    
    Selecting previously deselected package libesmtp5.
    
    Unpacking libesmtp5 (from .../libesmtp5_1.0.3-1.1_i386.deb) ...
    
    Selecting previously deselected package clamav-base.
    
    Unpacking clamav-base (from .../clamav-base_0.91.1-1ubuntu3~feisty1_all.deb) ...
    
    Selecting previously deselected package clamav-freshclam.
    
    Unpacking clamav-freshclam (from .../clamav-freshclam_0.91.1-1ubuntu3~feisty1_i386.deb) ...
    
    Selecting previously deselected package clamav.
    
    Unpacking clamav (from .../clamav_0.91.1-1ubuntu3~feisty1_i386.deb) ...
    
    Selecting previously deselected package dansguardian.
    
    Unpacking dansguardian (from .../dansguardian_2.8.0.6-antivirus-6.4.4.1-2_i386.deb) ...
    
    Selecting previously deselected package tinyproxy.
    
    Unpacking tinyproxy (from .../tinyproxy_1.6.3-3_i386.deb) ...
    
    Selecting previously deselected package firehol.
    
    Unpacking firehol (from .../firehol_1.231-7_all.deb) ...
    
    Selecting previously deselected package oidentd.
    
    Unpacking oidentd (from .../oidentd_2.0.8-1_i386.deb) ...
    
    Setting up java-common (0.25ubuntu2) ...Setting up libltdl3 (1.5.22-4) ...
    
    Setting up odbcinst1debian1 (2.2.11-13) ...Setting up unixodbc (2.2.11-13) ...
    
    Setting up libitl0 (0.6.4-1) ...Setting up itools (0.6.2-1) ...
    
    Setting up grub-splashimages (1.0.0) ...
    
    Setting up ubuntume-artwork (0.7) ...
    
    Post Install
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    wallpaper changed to /usr/share/backgrounds/ubuntuME.jpg
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    GDM splash changed to /usr/share/gdm/themes/UbuntuME/ubuntume-splash.png
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Theme changed to green-human
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Icon theme changed to HumanME-green
    
    Login sound changed to /usr/share/sounds/tasmiyah2.wav
    
    Searching for GRUB installation directory ... found: /boot/grub
    
    Testing for an existing GRUB menu.lst file ... found: /boot/grub/menu.lst
    
    Searching for splash image ... found: /boot/grub/splash.xpm.gz
    
    Found kernel: /boot/vmlinuz-2.6.20-16-generic
    
    Found kernel: /boot/vmlinuz-2.6.20-15-generic
    
    Found kernel: /boot/memtest86+.bin
    
    Updating /boot/grub/menu.lst ... done
    
    Setting up libgmp3c2 (4.2.1+dfsg-4build1) ...Setting up libclamav2 (0.91.1-1ubuntu3~feisty1) ...
    
    Setting up libesmtp5 (1.0.3-1.1) ...Setting up clamav-base (0.91.1-1ubuntu3~feisty1) ...
    
    Adding system user `clamav' (UID 111) ...
    
    Adding new group `clamav' (GID 120) ...
    
    Adding new user `clamav' (UID 111) with group `clamav' ...
    
    Not creating home directory `/var/lib/clamav'.
    
    Setting up clamav-freshclam (0.91.1-1ubuntu3~feisty1) ... * Starting ClamAV virus database updater freshclam                                                                                                   [ OK ]
    
    Setting up clamav (0.91.1-1ubuntu3~feisty1) ...Setting up dansguardian (2.8.0.6-antivirus-6.4.4.1-2) ...
    
    Warning: The home dir you specified already exists.
    
    Adding system user `dansguardian' (UID 112) ...
    
    Adding new group `dansguardian' (GID 121) ...
    
    Adding new user `dansguardian' (UID 112) with group `dansguardian' ...
    
    The home directory `/var/log/dansguardian' already exists.  Not copying from `/etc/skel'.
    
    adduser: Warning: that home directory does not belong to the user you are currently creating.
    
    DansGuardian has not been configured!
    
    Please edit /etc/dansguardian/dansguardian.conf manually then rerun
    
    this script.
    
    Setting up tinyproxy (1.6.3-3) ...Starting tinyproxy: tinyproxy.
    
    Setting up firehol (1.231-7) ...Setting up oidentd (2.0.8-1) ...
    
    Starting ident daemon: oidentd.
    
    Setting up ubuntumewcc (0.2) ...Post Install
    
    * Stopping DansGuardian dansguardian                                                                                                                 [ OK ]
    
    * Starting DansGuardian dansguardian                                                                                                                        Error connecting to parent proxy
    
    [fail]
    
    invoke-rc.d: initscript dansguardian, action "start" failed.
    
    Setting up minbar (0.1-6-1ubuntu2) ...Setting up sun-java6-jre (6-00-2ubuntu2) ...
    
    Setting up sun-java6-bin (6-00-2ubuntu2) ...Setting up islamiccal (1.1.1) ...
    
    Post Install
    
    Setting up ubuntume (0.4.1) ...


hm... udah jadi yah... tinggal ulang lagi perintah

    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$ sudo dpkg -i *.deb



    
    Password:(Reading database ... 123637 files and directories currently installed.)Preparing to replace islamiccal 1.1.1 (using islamiccal.deb) ...Unpacking replacement islamiccal ...
    
    Preparing to replace minbar 0.1-6-1ubuntu2 (using minbar_0.1-6-1ubuntu2_i386.deb) ...
    
    Unpacking replacement minbar ...
    
    Preparing to replace ubuntume-artwork 0.7 (using ubuntume-artwork_0.7-1_i386.deb) ...
    
    Unpacking replacement ubuntume-artwork ...
    
    Preparing to replace ubuntume 0.4.1 (using ubuntume.deb) ...
    
    Unpacking replacement ubuntume ...
    
    Preparing to replace ubuntumewcc 0.2 (using ubuntumeWCC.deb) ...
    
    Pre Install
    
    Unpacking replacement ubuntumewcc ...
    
    Preparing to replace zekr 0.5.0-1 (using zekr_0.5.0-1_i386.deb) ...
    
    Unpacking replacement zekr ...
    
    Setting up islamiccal (1.1.1) ...
    
    Post InstallSetting up minbar (0.1-6-1ubuntu2) ...
    
    Setting up ubuntume-artwork (0.7) ...
    
    Post Install
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    wallpaper changed to /usr/share/backgrounds/ubuntuME.jpg
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    GDM splash changed to /usr/share/gdm/themes/UbuntuME/ubuntume-splash.png
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Theme changed to green-human
    
    Resolved address "xml:readwrite:/etc/gconf/gconf.xml.defaults" to a writable configuration source at position 0
    
    Icon theme changed to HumanME-green
    
    Login sound changed to /usr/share/sounds/tasmiyah2.wav
    
    Searching for GRUB installation directory ... found: /boot/grub
    
    Testing for an existing GRUB menu.lst file ... found: /boot/grub/menu.lst
    
    Searching for splash image ... found: /boot/grub/splash.xpm.gz
    
    Found kernel: /boot/vmlinuz-2.6.20-16-generic
    
    Found kernel: /boot/vmlinuz-2.6.20-15-generic
    
    Found kernel: /boot/memtest86+.bin
    
    Updating /boot/grub/menu.lst ... done
    
    Setting up ubuntumewcc (0.2) ...
    
    Post Install
    
    * Stopping DansGuardian dansguardian                                                                                                                 [ OK ]
    
    * Starting DansGuardian dansguardian                                                                                                                        Error connecting to parent proxy
    
    [fail]
    
    invoke-rc.d: initscript dansguardian, action "start" failed.
    
    Setting up zekr (0.5.0-1) ...
    
    Setting up ubuntume (0.4.1) ...
    
    udienz@r-a-unit6:~/Documents/Downloads/ubuntu-me$


Alhamdulillah, dah jadi.... Gampang kan

ni hasilnya:

[![ubuntu-mepng.png](http://udienz.files.wordpress.com/2007/08/ubuntu-mepng.png)](http://udienz.files.wordpress.com/2007/08/ubuntu-mepng.png)

Wassalam
