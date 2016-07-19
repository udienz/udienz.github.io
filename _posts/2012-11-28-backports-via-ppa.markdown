---
author: udienz
comments: true
date: 2012-11-28 14:37:48+00:00
layout: post
link: https://blog.mahyudd.in/2012/11/28/backports-via-ppa.html
slug: backports-via-ppa
title: Backports via PPA
wordpress_id: 711
categories:
- Linux
- Ubuntu
tags:
- backports
- Launchpad
- ppa
- precise
- raring
---

Salah satu yang saya sukai dari [launchpad](https://launchpad.net) adalah adanya fasilitas [PPA](https://launchpad.net/ubuntu/+ppas), biasanya saya menggunakan ppa untuk:



	
  * testing paket sebelum diupload ke arsip ubuntu

	
  * backports


Point yang terakhir ini yang <del>terlalu</del> sering saya gunakan. Pada hari ini saya membuat backports yang berisikan paket-paket server dan basic compiler. SIlakan dlihat [https://launchpad.net/~udienz/+archive/bpo](https://launchpad.net/~udienz/+archive/bpo), beberapa paket sudah saya masukkan namun sepertinya masih banyak yang belum. Dan yang menjadi permasalahan disini adalah masalah ketergantungan (<del>dependency</del>), perlu diketahui untuk paket tertentu seperti lintian, vsftpd yang mempunyai ketergantungan yang panjang :(.

Sebenarnya kita bisa kok membuat ppa sendiri, tanpa tergantung ke ppa orang lain. Di paket ubuntu-dev-tools terdapat fileÂ backportpackage yang sangat membantu kita dalam membackport dan mengupload ke ppa. Asalkan kita punya ppa <del>dan koneksi internet</del> kita bisa dengan mudah mengupload. Contohnya


    
    backportpackage -d precise -s quantal -u ppa:udienz/bpo -y apache2



-d adalah target rilis yang akan dibangun, -s adalah sumber paket dari rilis quantal, -u adalah tujuan upload, -y adalah yes :)



Silakan dicoba
