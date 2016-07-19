---
author: udienz
comments: true
date: 2008-09-25 14:36:44+00:00
layout: post
slug: membuat-paket-debian
title: Membuat Paket Debian
wordpress_id: 224
categories:
- Debian
- Hack
- Ubuntu
tags:
- .deb
- Debian
- motu
- packaging
- shell
- ubuntu
---

Oke, kita akan membuat paket debian dari kode sumber milik kita sendiri untuk itu silakan buat program anda sendiri atau silakan skript punyaan saya, simpan skript milik kita di ~/cek-kompi-0.1 (kalo saya ada di /media/repo/unknow/cek-kompi-0.1 jangan tiru2 saya) dan file tersebut mempunyai nama cek-komputer.sh. jangan lupa untuk membuat file tersebut eksekutabel.




    
    $ ls -l
    total 4
    -rwxrwxr-x 1 udienz udienz 859 2008-08-01 05:30 cek-komputer.sh




hal-hal yang perlu diperhatikan adalah:






	
  * 


membaca manual page [Packaging Guide](https://wiki.ubuntu.com/PackagingGuide)




	
  * memasang paket-paket yang dibutuhkan dalam pembuatan/compile paket debian

	
  * pembuatan gpg dan kompilisasi

	
  * makan jangan LUPA! oia kalo cewekmu sms silakan di balas secepatnya, ntar bisa berabe masak gara-gara belajar linux putus :p




oke... semua lancar dan silakan buka terminal/konsole dan ketikkan:




    
    $ sudo apt-get install devscripts build-essential fakeroot debhelper gnupg dh-make lintian ubuntu-dev-tools cdbs
    $ pico ~/.bashrc
     > export DEBFULLNAME="Mahyuddin Susanto"
     > export DEBEMAIL="udienz@ubuntu.com"
    $ source .bashrc
    $ gpg --gen-key
      > pilih setingan default
      > Masukkan nama dan alamat email
      > masukkan kata sandi untuk gpg




silakan pindah direktory ke direktory kerja (dimana skript ada di situ), kemudian jalankan perintah:




    
    $ dh_make -c gpl -s --createorig




maka akan muncul pertanyaan




    
    Maintainer name : Mahyuddin Susanto
    Email-Address   : udienz@ubuntu.com
    Date            : Fri, 01 Aug 2008 05:35:22 +0700
    Package Name    : cek-kompi
    Version         : 0.1
    License         : gpl
    Type of Package : Single
    Hit <enter> to confirm: <<<<< TEKAN ENTER
    Currently there is no top level Makefile. This may require additional tuning.
    Done. Please edit the files in the debian/ subdirectory now. You should also
    check that the cek-kompi Makefiles install into $DESTDIR and not in / .




maka di direktory kerja tadi akan dibuat direktory tambahan debian, direktory ini yang akan kita edit dan disini juga argumen saat instalasi di deklarasikan




    
    $ ls -lh
    total 8.0K
    -rwxrwxr-x 1 udienz udienz  859 2008-08-01 05:30 cek-komputer.sh
    drwxr-xr-x 2 udienz udienz 4.0K 2008-08-01 05:35 debian




kita pindah dulu ke direktori debian dan kita akan bersih-bersih file2 yang nggak dibutuhkan lagi.




    
    $ cd debian
    $ rm *.ex *.EX dirs docs




kemudian edit berkas debian/changelog




    
    $ mcedit debian/changelog




kemudian isikan kayak berikut:




    
    cek-kompi (0.1-1) hardy; urgency=low
    
      * Initial release
      * ini pertama kalinya saya membuat program di ubuntu dengan format debian package
      * silakan kontak milis elektro ums untuk selanjutnya
    
     -- Mahyuddin Susanto <udienz@ubuntu.com>  Fri, 01 Aug 2008 05:35:22 +0700




dan edit lagi file debian/control kemudian isikan sebagai berikut:




    
    Source: cek-kompi
    Section: text
    Priority: extra
    Maintainer: Mahyuddin Susanto <udienz@ubuntu.com>
    Build-Depends: debhelper (>= 5), cdbs
    Standards-Version: 3.8.0
    
    Package: cek-kompi
    Architecture: all
    Depends: ${shlibs:Depends}, ${misc:Depends}, zenity
    Description: Ini untuk mendeteksi detail komputer
     hai, ini adalah program saya
     kegunaanya adalah
      * cek disk
      * ip
      * dan lainya
      .
      silakan coba bila ada pertanyaan tanyakan saja dan di pendam




terus edit juga copyright+Readme.Debian




    
    This package was debianized by Mahyuddin Susanto <udienz@ubuntu.com> on
    Fri, 01 Aug 2008 05:35:22 +0700.
    
    It was downloaded from http://udienz.immteknik.org
    
    Upstream Author(s):
    
        Mahyuddin Susanto udienz@ubuntu.com
    
    Copyright:
    
        Copyright (C) 2008 Mahyuddin Susanto
    
    License:
    
        This package is free software; you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation; either version 2 of the License, or
        (at your option) any later version.
    
        This package is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.
    
        You should have received a copy of the GNU General Public License
        along with this package; if not, write to the Free Software
        Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
    
    On Debian systems, the complete text of the GNU General
    Public License can be found in `/usr/share/common-licenses/GPL'.
    
    The Debian packaging is (C) 2008, Mahyuddin Susanto <udienz@ubuntu.com> and
    is licensed under the GPL, see above.
    
    
    # Please also look if there are files or directories which have a
    # different copyright/license attached and list them here.







    
    cek-kompi for Debian
    --------------------
    
    bagaimana cara menggunakanya?
    $ /usr/bin/cek-komputer.sh
    
     -- Mahyuddin Susanto <udienz@ubuntu.com>  Fri, 01 Aug 2008 05:35:22 +0700




oke, kemudian kita edit file debian/rules. ini yang terpenting dan harus dipahami




    
    $ mcedit rules
    #!/usr/bin/make -f
    
    include /usr/share/cdbs/1/rules/debhelper.mk
    
    install/cek-kompi::
            cp cek-komputer.sh debian/cek-kompi/usr/bin/
            find debian/cek-kompi -type f -exec chmod 655 {} ;




simpan dan keluar. pindah ke direktory sebelum debian (atau root direktory kerja:




    
    $ cd ..
    $ pwd
    /media/repo/unknow/cek-kompi-0.1




oke kemudian kita akan bangun file nya...




    
    $ debuild -S
     * masukkan password gpg anda bila ada pertanyaan macem-macem, hehehe




kemudian kompile menjadi .deb




    
    $ dpkg-buildpakage -rfakeroot




SELESAI!!! silakan lihat di direktory luar nya..




    
    $ ls ../ | grep cek-kompi
    cek-kompi-0.1
    cek-kompi_0.1-1_all.deb
    cek-kompi_0.1-1.diff.gz
    cek-kompi_0.1-1.dsc
    cek-kompi_0.1-1_i386.changes
    cek-kompi_0.1-1_source.build
    cek-kompi_0.1-1_source.changes
    cek-kompi_0.1.orig.tar.gz




untuk melihat detail dari paket kita silakan cek dengan less




    
    $ less cek-kompi_0.1-1_all.deb




gimana cara mengoperasikanya?




    
    $ /usr/bin/cek-komputer.sh




Gampang kan?








### Referensi




[http://dev.blankonlinux.or.id/wiki/Pemaket/PanduanPembuatanPaket](http://dev.blankonlinux.or.id/wiki/Pemaket/PanduanPembuatanPaket)




[http://dev.blankonlinux.or.id/wiki/Pemaket/PanduanPembuatanPaketMotu](http://dev.blankonlinux.or.id/wiki/Pemaket/PanduanPembuatanPaketMotu)




[http://dev.blankonlinux.or.id/wiki/Pemaket/Kelas/Kelas080608](http://dev.blankonlinux.or.id/wiki/Pemaket/Kelas/Kelas080608)




[http://dl2.foss-id.web.id/dokumen/ubuntu/packagingguide.pdf](http://dl2.foss-id.web.id/dokumen/ubuntu/packagingguide.pdf)




[http://cecunguk.blankonlinux.or.id/~iang/video/motu/getting_started.ogg](http://cecunguk.blankonlinux.or.id/%7Eiang/video/motu/getting_started.ogg)


[http://cecunguk.blankonlinux.or.id/~iang/video/motu/packaging_101.ogg](http://cecunguk.blankonlinux.or.id/%7Eiang/video/motu/packaging_101.ogg)
