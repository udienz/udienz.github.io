---
author: udienz
comments: true
date: 2011-01-22 20:54:24+00:00
layout: post
link: https://blog.mahyudd.in/2011/01/22/mencoba-memaketkan-gkamus-dan-gbilling.html
slug: mencoba-memaketkan-gkamus-dan-gbilling
title: Mencoba memaketkan gKamus dan gBilling
wordpress_id: 486
categories:
- Debian
- Linux
- Ubuntu
tags:
- Debian
- gbilling
- gkamus
- lucid
- maverick
- natty
- ubuntu
---

Iseng iseng saya mencoba membuat paket [gKamus](http://gkamus.sourceforge.net/) dan [gBilling](http://gbilling.sourceforge.net/), kedua paket ini menurut saya sangat berguna bagi pengguna Linux di Indonesia. maka dari itu saya mencoba memaketkan kedua paket ini. Sebenarnya pembuatan paket ini sangat mudah dikarenakan pencipta dari aplikasi ini sudah sangat bagus karena kode sumbernya sudah ditata rapi dan instalasinya cukup mudah. Well tidak semua aplikasi memudahkan pengguna dalam instalasi, namun ini berbeda.

Nah kenapa dalam pembuatan paket debianya sempat tertunda? ini dikarenakan ada sedikit perubahan di [Debian Policy](http://www.debian.org/doc/debian-policy/), yaitu [dep3](http://dep.debian.net/deps/dep3/) dan [dep5](http://dep.debian.net/deps/dep5). Tentu karena saya memaketkan di Debian/Ubuntu maka harus mematuhi Debian Policy dan bukan asal jadi paket deb saja bukan?

Dimana saya dapat mengambil paket debiannya? di sini

`https://launchpad.net/~garuda-id/+archive/pkg-misc`

rencananya saya akan menempatkan paket-paket aseli buatan orang Indonesia di situ, jadi agar orang luar tau bahwa kita juga bisa :). oke, selanjutnya apa saja yang saya ubah di kedua paket ini?



	
  1. Berkas desktop, saya sedikit merevisi pengaturan berkas ini karena saya cek menggunakan `desktop-file-validate` ada yang error.

	
  2. Lokasi berkas dokumentasi, di debian kita harus meletakkan berkas-berkas dokumentasi di `/usr/share/doc/$paket`


Sementara baru ketemu dua revisi, nah selanjutnya saya akan menilik pada metode kompilasi. karena di natty agak berbeda dikarenakan menggunakan binutils-gold. dan saya lihat ada pesan error yang lumayan banyak, terutama mengenai linker.

sebagai penutup, terimakasih buat mas [Ardhan Madras](mailto:ajhwb@knac.com) dan mas [Firmansyah](mailto:leonard_gimsong@yahoo.com) atas kerja kerasnya, good work mas! kita siap membantu. saya berdoa agar supaya paket ini bisa masuk ke arsip ubuntu. Amin..

NB:

Patch 1

    
    Description: Fix desktop files to meet freedesktop standard policy
    Author: Mahyuddin Susanto 
    
    diff -Nur -x '*.orig' -x '*~' gbilling-server-0.3.1-rc1/gbilling-server.desktop.in gbilling-server-0.3.1-rc1.new/gbilling-server.desktop.in
    --- gbilling-server-0.3.1-rc1/gbilling-server.desktop.in	2010-12-17 14:43:10.000000000 +0700
    +++ gbilling-server-0.3.1-rc1.new/gbilling-server.desktop.in	2011-01-22 00:18:03.838988331 +0700
    @@ -1,10 +1,9 @@
     [Desktop Entry]
    -Encoding=UTF-8
     Name=gBilling Server
     Comment=Server gBilling
    -Exec=@prefix@/bin/gbilling-server
    -Icon=@prefix@/share/pixmaps/gbilling.png
    +Exec=gbilling-server
    +Icon=gbilling
     StartupNotify=true
     Terminal=false
     Type=Application
    -Categories=Application;Utility
    +Categories=Network;RemoteAccess;
    



Patch 2:


    
    Description: Fix documentation files to debian policy
    Author: Mahyuddin Susanto <udienz@gmail.com>
    
    diff -Nur -x '*.orig' -x '*~' gbilling-client-0.3.1-rc1/Makefile.am gbilling-client-0.3.1-rc1.new/Makefile.am
    --- gbilling-client-0.3.1-rc1/Makefile.amÂ Â Â  2010-12-17 14:43:10.000000000 +0700
    +++ gbilling-client-0.3.1-rc1.new/Makefile.amÂ Â Â  2011-01-22 15:06:21.873809638 +0700
    @@ -2,7 +2,7 @@
    
    SUBDIRS = src data ui pixmaps
    
    -gbilling_clientdocdir = ${prefix}/doc/gbilling-client
    +gbilling_clientdocdir = ${prefix}/share/doc/gbilling-client
    gbilling_clientdoc_DATA = 
    README 
    COPYING 
    diff -Nur -x '*.orig' -x '*~' gbilling-client-0.3.1-rc1/Makefile.in gbilling-client-0.3.1-rc1.new/Makefile.in
    --- gbilling-client-0.3.1-rc1/Makefile.inÂ Â Â  2010-12-17 14:43:10.000000000 +0700
    +++ gbilling-client-0.3.1-rc1.new/Makefile.inÂ Â Â  2011-01-22 15:06:09.857321856 +0700
    @@ -242,7 +242,7 @@
    top_builddir = @top_builddir@
    top_srcdir = @top_srcdir@
    SUBDIRS = src data ui pixmaps
    -gbilling_clientdocdir = ${prefix}/doc/gbilling-client
    +gbilling_clientdocdir = ${prefix}/share/doc/gbilling-client
    gbilling_clientdoc_DATA = 
    README 
    COPYING 
    diff -Nur -x '*.orig' -x '*~' gbilling-client-0.3.1-rc1/configure.in gbilling-client-0.3.1-rc1.new/configure.in
    --- gbilling-client-0.3.1-rc1/configure.inÂ Â Â  2010-12-17 14:43:10.000000000 +0700
    +++ gbilling-client-0.3.1-rc1.new/configure.inÂ Â Â  2011-01-22 15:05:04.973433964 +0700
    @@ -38,7 +38,7 @@
    
    AC_DEFINE_UNQUOTED(PACKAGE_DATA_DIR, "${packageprefix}/share/${PACKAGE}", [Data directory])
    AC_DEFINE_UNQUOTED(PACKAGE_PIXMAPS_DIR, "${packageprefix}/share/pixmaps", [Pixmaps directory])
    -AC_DEFINE_UNQUOTED(PACKAGE_DOC_DIR, "${packageprefix}/doc/${PACKAGE}", [Documentation directory])
    +AC_DEFINE_UNQUOTED(PACKAGE_DOC_DIR, "${packageprefix}/share/doc/${PACKAGE}", [Documentation directory])
    
    AC_OUTPUT([Makefile
    gbilling-client.desktop
    
