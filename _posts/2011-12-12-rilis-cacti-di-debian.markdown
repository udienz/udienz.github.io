---
author: udienz
comments: true
date: 2011-12-12 15:19:14+00:00
layout: post
link: https://blog.mahyudd.in/2011/12/12/rilis-cacti-di-debian.html
slug: rilis-cacti-di-debian
title: Rilis cacti di Debian
wordpress_id: 623
categories:
- Debian
tags:
- cacti
- Debian
- unstable
---

[Cacti](http://cacti.net/), adalah salah satu software yang sangat populer di [Debian](http://www.debian.org). Sayangnya di Debian si cacti masih [0.8.7g](http://packages.qa.debian.org/c/cacti/news/20110717T163912Z.html) :( Hal ini dikarenakan Sean (Maintainer cacti sekarang) memiliki kesibukan yang banyak. Akhirnya Sean meminta [bantuan](http://bugs.debian.org/613857), walhasil saya pun mengulurkan tangan :). Alhamdulillah Sean mau saya bantu.

Nah tugas saya kali ini adalah merilis versi cacti 0.8.7i yang baru saja di rilis [Desember](http://sourceforge.net/mailarchive/message.php?msg_id=28527915) ini. Untuk mewujudkan rilis ini ke Debian, kami telah mem-push-kan kode sumber [cacti](http://git.debian.org/?p=pkg-cacti/cacti.git) dan [spine](http://git.debian.org/?p=pkg-cacti/spine.git) ke git. Pada saat tulisan ini diturunkan, kedua paket tersebut sudah bisa dibangun dan siap diuji.

Jika anda ingin membantu kami, anda bisa mengunduh kode sumber kedua paket tersebut dengan cara:

**Untuk Cacti**

    
    git clone git://anonscm.debian.org/pkg-cacti/cacti.git
    cd cacti
    dpkg-buildpackage -rfakeroot


**Untuk Spine**

    
    git clone git://anonscm.debian.org/pkg-cacti/spine.git
    cd spine
    dpkg-buildpackage -rfakeroot


Mohon doanya agar supaya kedua paket tersebut bisa secepatnya di upload ke debian, perkiraan saya akhir tahun ini akan diupload oleh sean. Yap sean sekarang sedang mengarungi antartika :p jadi ada waktu untuk mencoba versi beta paket debian nya bukan?

Mari kita berkontribusi ke Debian, Yuk jangan jadi pengguna trus :)

Link:



	
  * [Contributing to The Debian Project](http://www.debian.org/doc/manuals/debian-faq/ch-contributing.en.html)

	
  * [How to start contributing to Debian](http://raphaelhertzog.com/2011/06/30/how-to-start-contributing-to-debian/)

	
  * [how to contribute to Debian ](http://upsilon.cc/~zack/blog/posts/2010/12/how_to_contribute_to_Debian/)


