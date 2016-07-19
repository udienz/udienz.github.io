---
author: udienz
comments: true
date: 2012-04-22 08:46:03+00:00
layout: post
slug: memilah-repository
title: Memilah repository
wordpress_id: 19
categories:
- Debian
tags:
- blankon
- sid
- ubuntu
- wheezy
---

Dalam tulisan saya ini saya ingin mengulas pinning di pengaturan apt, trik ini berlaku untuk Debian dan turunannya (BlankOn, Mint, Ubuntu, etc). Pinning memperbolehkan kita untuk memasang paket dari beberapa rilis tanpa mengupgrade keseluruhan sistem. Metode ini sangat berguna apabila anda menggunakan rilis testing (saat ini wheezy) namun ingin memasang paket yang ada di unstable (saat ini sid), namun tidak mau mengupgrade keseluruhan sistem.

Saya biasa menggunakan metode ini untuk memecahkan masalah ketika bermain-main pemaketan yang biasanya memerlukan versi terbaru. Catatan, saya menggunakan debian testing. Kekurangan dari metode ini adalah anda akan dibuat pusing dengan permasalahan pustaka (_library_) dari paket tersebut.

Di berkas `/etc/apt/sources.list` saya adalah sebegai berikut:

    
    deb http://kambing.ui.ac.id/debian testing main contrib non-free
    deb http://kambing.ui.ac.id/debian unstable main contrib non-free
    deb http://kambing.ui.ac.id/debian experimental main contrib non-free
    deb-src http://kambing.ui.ac.id/debian testing main contrib non-free
    deb-src http://kambing.ui.ac.id/debian unstable main contrib non-free
    deb-src http://kambing.ui.ac.id/debian experimental main contrib non-free


Dari sources.list diatas, saya mencampur adukkan beberapa rilis, yaitu stable, testing dan experimantal. Secara default system saya akan mengupgrade ke rilis yang terbaru yaitu experimental. Mengingat experimental adalah rilis yang masih buggy dan tidak bagus untuk produksi (ya, dari bahasanya saja sudah mengatakan demikian). Sedang unstable, dari bahasanya saja sudah tidak stabil. Saya ingin testing sebagai default rilis saya. Bagaimana caranya? Selama ini saya menggunakan metode pinning yaitu dengan memberikan prioritas pada rilis testing untuk rujukan pertama kalinya. Berikut pengaturan pinnging di system saya di berkas `/etc/apt/preferences.d/pinning`:

    
    Package: *
    Pin: release a=testing
    Pin-Priority: 650
    
    Package: *
    Pin: release a=unstable
    Pin-Priority: 600
    
    Package: *
    Pin: release a=experimental
    Pin-Priority: 550


Kita ambil contoh paket empathy, paket ini mempunyai rilis yang berbeda-beda di unstable, testing dan experimental.

    
    udienz@debian:~$ apt-cache policy empathy
    empathy:
      Installed: 3.2.2-1+b3
      Candidate: 3.2.2-1+b3
      Version table:
         3.3.90.2-1+b1 0
            550 http://kambing.ui.ac.id/debian/ experimental/main amd64 Packages
     *** 3.2.2-1+b3 0
            650 http://kambing.ui.ac.id/debian/ testing/main amd64 Packages
            600 http://kambing.ui.ac.id/debian/ unstable/main amd64 Packages
            100 /var/lib/dpkg/status


Terlihat bukan? namun di sistem saya terpasang versi `3.2.2-1+b3` dan bukan `3.3.90.2-1+b1`, hal ini dikarenakan di `/etc/apt/preferences.d/pinning` saya memberikan harga tertinggi untuk testing. Perlu bukti lagi?

    
    udienz@debian:~$ sudo apt-get upgrade
    Reading package lists... Done
    Building dependency tree
    Reading state information... Done
    0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.


Oh yeah, tidak ada yang perlu di upgrade.


### Bagaimana jika ingin mencampurkan dengan distro lain?


Pinning juga mendukung pencampuran, kita dapat menambahkan ke opsinya seperti berikut:

    
    Package: *
    Pin: release o=BlankOn, a=rote
    Pin-Priority: 700


Atau jika ingin hanya beberapa paket saya kita bisa menggunakan regex, contoh:

    
    Package: gnome*
    Pin: release o=BlankOn, a=rote
    Pin-Priority: 700


Atau merujuk ke rilis tertentu

    
    Package: apache2*
    Pin: release o=Ubuntu, a=precise*
    Pin-Priority: 700


Sekali lagi untuk metode pinnging beberapa distro anda harus memperhatikan konsekuensi yang lebih besar, karena sebuat paket biner diproduksi dengan metode berbeda dengan setiap rilis (kecuali bila paket biner .deb nya di salin dari debian).
