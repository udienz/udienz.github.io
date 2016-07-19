---
author: udienz
comments: true
date: 2011-02-28 15:41:11+00:00
layout: post
link: https://blog.mahyudd.in/2011/02/28/catatan-motu-1-membuat-patch.html
slug: catatan-motu-1-membuat-patch
title: 'Catatan MOTU [1]: Membuat patch'
wordpress_id: 553
categories:
- Linux
- Ubuntu
tags:
- as-needed
- binutils-gold
- ftbfs
- motu
- natty
- no-add-needed
- ubuntu
---

Tadi sempat ngobrol dengan [Khoiron](http://librarylinux.wordpress.com/) tentang bagaimana membuat patch, setelah praktek darat singkat ternyata [khoiron](http://librarylinux.wordpress.com/) masih menggunakan cara lama yaitu dengan:



	
  1. mengekstrak paket kemudian

	
  2. menyalin direktori asli ke asli.ngoprek

	
  3. membuat diff berkas yang berubah

	
  4. memasukkan berkas patch ke list (debian/patches/*)


Nah langkah-langkah diatas benar, namun sangat tidak efisien dikarenakan membuang-buang waktu karena harus membuat backup sana-sini dll. Sebenarnya ada perangkat untuk mengatasi proses ini, sangat singkat dan padat. Silakan menggunakan perintah `edit-patch` yang terdapat dipaket [ubuntu-dev-tools](https://launchpad.net/ubuntu/+source/ubuntu-dev-tools).

    
    $ sudo apt-get install ubuntu-dev-tools


Selanjutnya, kita akan membuat patch untuk paket [smpeg](http://packages.qa.debian.org/s/smpeg.html) yang mengalami gagal dibangun di [natty](http://people.ubuntuwire.org/~lucas/ubuntu-nbs/32/smpeg_0.4.5+cvs20030824-2.2_lubuntu32.buildlog) dan [wheezy](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=556351). Hal ini dikarenakan [persoalan klasik transisi binutils-gold](http://tripledin.wordpress.com/2011/01/23/mengatasi-ftbfs-di-natty/). Jika dilihat dari log terakhir yaitu:

    
    /usr/bin/ld: gtv.o: undefined reference to symbol 'XMoveWindow'
    /usr/bin/ld: note: 'XMoveWindow' is defined in DSO /usr/lib/libX11.so.6 so try adding it to the linker command line
    /usr/lib/libX11.so.6: could not read symbols: Invalid operation


Jelas dari log kita dapat melihat bahwa paket tersebut lupa memasukkan pustaka X11 di `configure.in` (catatan, terkadang anda dapat memasukkan pustaka di `Makefile.am` jika `configure.in` tidak ada).Â  Untuk langkah selanjutnya silakan unduh paket tersebut dan cek [sistem patch apa yang digunakan](http://wiki.debian.org/debian/patches)?

    
    ~/project/ftbfs $ pull-lp-source smpeg
    ~/project/ftbfs $ cd smpeg-0.4.5+cvs20030824/
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $ what-patch
    quilt
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $


Oh ternyata [quilt](http://packages.debian.org/quilt) (hasil dapat berupa dpatch, cdbs, atau patchless yang menandakan tidak menggunakan sistem patch). nah masih di kode sumber silakan ketik perintah edit-patch untuk membuat/menyunting berkas patch

    
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $ edit-patch binutils-gold


Selanjutnya anda akan dibuatkan direktori acak di /tmp/XYZ yang berisikan kode sumber paket, dari sini dilakan melakukan perubahan di berkas configure.in dan tambahkan pustakan X11 di baris 140 atau 139. Jika sebelumnya adalah"

    
    LIBS="$LIBS $SDL_LIBS"


ubah menjadi

    
    LIBS="$LIBS $SDL_LIBS -lX11"


Simpan dan tekah CTRL+D untuk keluar dari mode sunting, maka selanjutnya anda akan ditampilkan ke changelog sebagai tercantum dibawah ini:

    
    smpeg (0.4.5+cvs20030824-2.2ubuntu1) natty; urgency=low
    
      * debian/patches/binutils-gold.patch: [DESCRIBE CHANGES HERE]
    
     -- Mahyuddin Susanto   Mon, 28 Feb 2011 21:59:32 +0700


Sunting keterangan `[DESCRIBE CHANGES HERE]` menjadi keterangan mengapa anda membuat patch tersebut. Contoh: `Fix FTBFS binutils-gold with ld no-add-needed by adding X11 in configure.in`. Nah jika ternyata di Ubuntu sudah ada bug nya maka anda harus menambahkan nomer bug tersebut setelah configure.in dengan `(LP: #123456)`, dan jika di Debian anda harus menambahkan `(Closes: #123456)`. Jika sudah silakan lakukan perintah update-maintainer dan debuild.

    
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $ update-maintainer
    The original maintainer is: Debian SDL packages maintainers
    Resetting as: Ubuntu Developers
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $ debuild -S
     dpkg-buildpackage -rfakeroot -d -us -uc -S
    dpkg-buildpackage: export CFLAGS from dpkg-buildflags (origin: vendor): -g -O2
    dpkg-buildpackage: export CPPFLAGS from dpkg-buildflags (origin: vendor):
    dpkg-buildpackage: export CXXFLAGS from dpkg-buildflags (origin: vendor): -g -O2
    dpkg-buildpackage: export FFLAGS from dpkg-buildflags (origin: vendor): -g -O2
    dpkg-buildpackage: export LDFLAGS from dpkg-buildflags (origin: vendor): -Wl,-Bsymbolic-functions
    dpkg-buildpackage: source package smpeg
    dpkg-buildpackage: source version 0.4.5+cvs20030824-2.2ubuntu1
    dpkg-buildpackage: source changed by Mahyuddin Susanto
     dpkg-source --before-build smpeg-0.4.5+cvs20030824
     fakeroot debian/rules clean
    dh_testdir
    dh_testroot
    /usr/bin/make distclean
    make[1]: Entering directory `/home/udienz/project/ftbfs/smpeg-0.4.5+cvs20030824'
    make[1]: *** No rule to make target `distclean'.  Stop.
    make[1]: Leaving directory `/home/udienz/project/ftbfs/smpeg-0.4.5+cvs20030824'
    make: [clean] Error 2 (ignored)
    QUILT_PATCHES=debian/patches quilt pop -a -R || test $? = 2
    No patch removed
    dh_clean
     dpkg-source -b smpeg-0.4.5+cvs20030824
    dpkg-source: warning: no source format specified in debian/source/format, see dpkg-source(1)
    dpkg-source: info: using source format `1.0'
    dpkg-source: info: building smpeg using existing smpeg_0.4.5+cvs20030824.orig.tar.gz
    dpkg-source: info: building smpeg in smpeg_0.4.5+cvs20030824-2.2ubuntu1.diff.gz
    dpkg-source: warning: the diff modifies the following upstream files:
     .pc/.quilt_patches
     .pc/.quilt_series
     .pc/.version
     video/mmxflags_asm.S
     video/mmxidct_asm.S
    dpkg-source: info: use the '3.0 (quilt)' format to have separate and documented changes to upstream files, see dpkg-source(1)
    dpkg-source: info: building smpeg in smpeg_0.4.5+cvs20030824-2.2ubuntu1.dsc
     dpkg-genchanges -S >../smpeg_0.4.5+cvs20030824-2.2ubuntu1_source.changes
    dpkg-genchanges: not including original source code in upload
     dpkg-source --after-build smpeg-0.4.5+cvs20030824
    dpkg-buildpackage: source only, diff-only upload (original source NOT included)
    Now running lintian...
    W: smpeg source: patch-system-but-no-source-readme
    W: smpeg source: patch-system-but-direct-changes-in-diff .pc/.quilt_patches and 4 more
    W: smpeg source: debhelper-but-no-misc-depends smpeg-gtv
    W: smpeg source: debhelper-but-no-misc-depends libsmpeg0
    W: smpeg source: debhelper-but-no-misc-depends smpeg-plaympeg
    W: smpeg source: debhelper-but-no-misc-depends libsmpeg-dev
    W: smpeg source: debian-rules-ignores-make-clean-error line 54
    W: smpeg source: ancient-standards-version 3.7.2 (current is 3.9.1)
    W: smpeg source: ancient-libtool ltmain.sh 1.3.5
    W: smpeg source: ancient-libtool ltconfig
    E: smpeg source: ancient-autotools-helper-file config.sub 2001-01-12
    E: smpeg source: ancient-autotools-helper-file config.guess 2001-01-17
    Finished running lintian.
    Now signing changes and any dsc files...
     signfile smpeg_0.4.5+cvs20030824-2.2ubuntu1.dsc Mahyuddin Susanto 
    
    You need a passphrase to unlock the secret key for
    user: "Mahyuddin Susanto "
    3072-bit DSA key, ID 08E6A8A5, created 2011-01-21 (main key ID DFBD2A86)
    
     signfile smpeg_0.4.5+cvs20030824-2.2ubuntu1_source.changes Mahyuddin Susanto 
    
    You need a passphrase to unlock the secret key for
    user: "Mahyuddin Susanto "
    3072-bit DSA key, ID 08E6A8A5, created 2011-01-21 (main key ID DFBD2A86)
    
    Successfully signed dsc and changes files
    ~/project/ftbfs/smpeg-0.4.5+cvs20030824 $


Yak ternyata sudah selesai anda bisa membangun di linkungan chroot, pbuilder atau upload ke ppa. kalau saya ke PPA :). silakan lihat hasilnya [di PPA saya](https://launchpad.net/~udienz/+archive/experimental/+packages).

Update: contoh patch



	
  * [Dpatch di Firestarter](http://bazaar.launchpad.net/~ubuntu-branches/ubuntu/natty/firestarter/natty/view/head:/debian/patches/23_fix_ftbfs_binutils-gold.dpatch)

	
  * [CDBS di eggcups](http://bazaar.launchpad.net/~ubuntu-branches/ubuntu/natty/eggcups/natty/view/head:/debian/patches/01_fix_ftbfs_binutils-gold.patch)

	
  * [Quilt di zoem](http://bazaar.launchpad.net/~ubuntu-branches/ubuntu/natty/zoem/natty/view/head:/debian/patches/0002-Use_LDADD_instead_of_LDFLAGS.patch)


