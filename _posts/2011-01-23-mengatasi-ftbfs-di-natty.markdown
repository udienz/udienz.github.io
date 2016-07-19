---
author: udienz
comments: true
date: 2011-01-23 18:21:43+00:00
layout: post
slug: mengatasi-ftbfs-di-natty
title: Mengatasi FTBFS di Natty
wordpress_id: 495
categories:
- Debian
- Linux
- Ubuntu
tags:
- binutils-gold
- Debian
- experimental
- ftbfs
- gcc-4.5
- natty
- ubuntu
- wheexy
---

Apa itu FTBFS? kepanjanganya adalah** failed to build from starch**, yaitu paket yang gagal dibangun dari sumber. Penyebabnya bisa banyak:



	
  * **Lokasi berkas** (_no such file or directory_) , biasanya ini karena scriptnya keliru. solusi: lihat log dan cek lokasi nya apakah ada atau tidak. Contoh ada [di sini](http://people.ubuntuwire.org/~lucas/ubuntu-nbs/32/speech-dispatcher_0.7.1-0ubuntu2_lubuntu32.buildlog), versi fixnya ada [di sini](https://launchpad.net/ubuntu/+source/speech-dispatcher/0.7.1-0ubuntu3).


Nama paket [speech-dispatcher](https://launchpad.net/ubuntu/+source/speech-dispatcher), log sebelum di benahi:

    
    cp: cannot stat `debian/tmp/debian/tmp/usr/lib/python2.6': No such file or directory
    dh_install: cp -a debian/tmp/debian/tmp/usr/lib/python2.6 debian/python-speechd//usr/lib/ returned exit code 1
    make: *** [binary-install/python-speechd] Error 2
    dpkg-buildpackage: error: /usr/bin/fakeroot debian/rules binary gave error exit status 2


Solusinya? jangan menuliskan secara manual versi python. berikut adalah patchnya:

    
    diff -Nru speech-dispatcher-0.7.1/debian/python-speechd.install speech-dispatcher-0.7.1/debian/python-speechd.install
    --- speech-dispatcher-0.7.1/debian/python-speechd.install	2010-07-11 12:18:15.000000000 +0000
    +++ speech-dispatcher-0.7.1/debian/python-speechd.install	2011-01-11 15:43:02.000000000 +0000
    @@ -1,3 +1,3 @@
     debian/tmp/usr/bin/spd-conf
    -debian/tmp/usr/lib/python2.6
    +debian/tmp/usr/lib/python2.?
     debian/tmp/usr/share/sounds/speech-dispatcher/test.wav





	
  * **Ketergantungan** atau **dependency**. ini karena daftar dependency di berkas `debian/control` kurang. Solusi: lihat log dan masukkan dependency terkait. Contohnya ada [di sini](https://launchpad.net/ubuntu/+source/gedit-valencia-plugin/0.3.0-1/+build/2036687), versi fixnya ada [di sini](https://launchpad.net/ubuntu/+source/gedit-valencia-plugin/0.3.0-1ubuntu1).


Nama paket; [gedit-valencia-plugin](https://launchpad.net/ubuntu/+source/gedit-valencia-plugin), log sebelum dibenahi:

    
    Processing triggers for libc-bin ...
    ldconfig deferred processing now taking place
    Processing triggers for python-support ...
    Checking correctness of source dependencies...
    After installing, the following source dependencies are still unsatisfied:
    libvala-dev(missing)


Solusinya? lihat paket yang dibutuhkan dan tambahkan di `debian/control`. dan jangan lupa melakukan `autoreconf` sebelum melakukan pemaketan. berikut adalah patchnya

    
    diff -Nru gedit-valencia-plugin-0.3.0/debian/control gedit-valencia-plugin-0.3.0/debian/control
    --- gedit-valencia-plugin-0.3.0/debian/control	2010-09-21 22:40:45.000000000 +0000
    +++ gedit-valencia-plugin-0.3.0/debian/control	2011-01-19 11:09:09.000000000 +0000
    @@ -1,14 +1,16 @@
    - , libvala-dev
    - , valac
    + , libvala-0.10-dev
    + , valac-0.10
      , m4
    + , libtool
    diff -Nru gedit-valencia-plugin-0.3.0/debian/patches/01_valac_transition.patch gedit-valencia-plugin-0.3.0/debian/patches/01_valac_transition.patch
    --- gedit-valencia-plugin-0.3.0/debian/patches/01_valac_transition.patch	1970-01-01 00:00:00.000000000 +0000
    +++ gedit-valencia-plugin-0.3.0/debian/patches/01_valac_transition.patch	2011-01-19 11:09:09.000000000 +0000
    @@ -0,0 +1,32 @@
    +Description: Fix FTBFS because valac transition by adding replacing Build-Depends
    + libvala-dev -> libvala-0.10-dev and valac -> valac-0.10
    +Author: Mahyuddin Susanto <udienz@gmail.com>
    +Bug-Ubuntu: https://launchpad.net/bugs/703615
    +
    +--- gedit-valencia-plugin-0.3.0.orig/Makefile
    ++++ gedit-valencia-plugin-0.3.0/Makefile
    +@@ -8,13 +8,13 @@ VALAC = valac
    +-PACKAGES = --pkg gedit-2.20 --pkg gee-1.0 --pkg gtk+-2.0 --pkg vala-1.0 --pkg vte
    ++PACKAGES = --pkg gedit-2.20 --pkg gee-1.0 --pkg gtk+-2.0 --pkg vala-0.10 --pkg vte
    +-    vala-1.0 >= 0.7.10 
    ++    vala-0.10 >= 0.7.10 
    + parser:  expression.vala parser.vala program.vala scanner.vala util.vala
    +-	$(VALAC) $(VFLAGS) --pkg vala-1.0 --pkg gtk+-2.0 $^ -o $@
    ++	$(VALAC) $(VFLAGS) --pkg vala-0.10 --pkg gtk+-2.0 $^ -o $@
    diff -Nru gedit-valencia-plugin-0.3.0/debian/patches/series gedit-valencia-plugin-0.3.0/debian/patches/series
    --- gedit-valencia-plugin-0.3.0/debian/patches/series	2010-09-21 22:49:16.000000000 +0000
    +++ gedit-valencia-plugin-0.3.0/debian/patches/series	2011-01-19 11:09:09.000000000 +0000
    @@ -1 +1,2 @@
     00-fix_icon_location.patch
    +01_valac_transition.patch
    diff -Nru gedit-valencia-plugin-0.3.0/debian/rules gedit-valencia-plugin-0.3.0/debian/rules
    --- gedit-valencia-plugin-0.3.0/debian/rules	2010-09-21 22:45:38.000000000 +0000
    +++ gedit-valencia-plugin-0.3.0/debian/rules	2011-01-19 11:09:09.000000000 +0000
    @@ -12,3 +12,6 @@
    
     override_dh_auto_install:
     	# do nothing
    +
    +pre-build::
    +	autoreconf -f -i -v





	
  * **Compiler**, dikarenakan ubuntu natty menggunakan GCC-4.5 maka metode kompilasinya agak berbeda. Contoh paket yang mengalami ftbfs adalah [openhpi](https://launchpad.net/ubuntu/+source/openhpi). versi fixnya bisa ditemukan [di sini](https://launchpad.net/ubuntu/+source/openhpi/2.14.1-1ubuntu1). saya tidak membahas ini dulu, karena paket ini mengalami dua masalah yaitu compiler dan library. untuk library silakan baca dibawah ini.

	
  * **Library linker**, atau biasa disebut dengan DSO Linker. ini adalah masalah umum di Ubuntu Natty dan Debian Wheezy (setelah squeeze) hal ini terjadi karena paket **binutils-gold**. hanya saja dikarenakan rilis wheezy (experimental) masih lama, maka di debian masih belum dibenahi berbeda dengan ubuntu natty yang akan dirilis april ioni.Â  maka bagaimana cara mengatasinya? melihat log adalah langkah tepat! mari kita lihat bersama-sama


Log:

    
    ipmi_mc_vendor.cpp: In member function 'virtual bool cIpmiMcVendor::CreateWatchdogs(cIpmiDomain*, cIpmiMc*)':
    <code>ipmi_mc_vendor.cpp</code>:934:30: error: expected type-specifier
    ipmi_mc_vendor.cpp:934:30: error: cannot convert 'int*' to 'cIpmiRdr*' in initialization
    ipmi_mc_vendor.cpp:934:30: error: expected ',' or ';'
    


Bisa ditebak ini penyebabnya adalah **GCC**, bagaimana cara mengatasinya? silakan buka `ipmi_mc_vendor.cpp` dan buang deklarasi yang tidak perlu

    
    -          cIpmiRdr *wd = new cIpmiWatchdog::cIpmiWatchdog( mc, SAHPI_DEFAULT_WATCHDOG_NUM, 0 );
    +          cIpmiRdr *wd = new cIpmiWatchdog( mc, SAHPI_DEFAULT_WATCHDOG_NUM, 0 );
    


problem selanjutnya adalah Library Linker, biasanya log akan menunjukkan kalau ada linker A yang mengakses B tapi library B tidak di deklarasikan. Contoh Log:

    
    /usr/lib/openhpiutils.so.6: could not read symbols: Invalid operation
    


bagaimana mengatasinya? silakan buka berkas Makefile.in atau Makefile.am dan tambahkan library yang dibutuhkan. dari pesan error diatas bisa disimpulkan kalau si paket butuh library openhpiutils, jadi tambahkan saja di LDADD atau LIBADDdan bukan di LDLAGS atau CFLAGS.

    
    -hpitop_LDADD            = $(COMMONLIBS)
    +hpitop_LDADD            = $(COMMONLIBS) $(top_builddir)/utils/libopenhpiutils.la
    


Nah silakan kompile ulang :) dan lihat log terakhir bila error lagi. Silakan merujuk [ke sini](http://launchpadlibrarian.net/62016835/openhpi_2.14.1-1_2.14.1-1ubuntu1.diff.gz) untuk patch openhp.

Sebenarnya ada banyak hal yang menyebabkan paket-paket mengalami ftbfs, namun dikarenakan saya masih belum tau jadi mohon maaf. nah sebagai info untuk menjadi Debian/Ubuntu developer anda harus benar-benar bisa menguasai ini, atau paling itdak tau apa dan mengapa paket ini tidak bisa dibangun. Silakan merujuk ke **[Ubuntu packages that FTBFS](http://udd.debian.org/cgi-bin/ubuntu_ftbfs.cgi)** untuk melihat daftar paket yang menlami ftbfs.
