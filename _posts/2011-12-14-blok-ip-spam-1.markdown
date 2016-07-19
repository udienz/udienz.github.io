---
author: udienz
comments: true
date: 2011-12-14 06:30:45+00:00
layout: post
slug: blok-ip-spam-1
title: Blok IP spam [1]
wordpress_id: 630
categories:
- Linux
- MySelf
tags:
- email
- spam
---

[![](http://tripledin.files.wordpress.com/2011/12/no-spam-logo.jpg)](http://tripledin.files.wordpress.com/2011/12/no-spam-logo.jpg)

Sebagai seseorang yang berkecimpung dengan mail server, tentunya dunia spam sangat akrab dengan keseharian :(. Spam telah menjadi musuh bersama seorang sysadmin. Karena spam dapat menghambat kinerja mail server. Beberapa cara dilakukan oleh sysadmin, ada yang menggunakan filtering, firewalling, dll.

Salah satu yang saya suka adalah teknik firewalling. Karena dengan teknik ini resource cpu bisa berkurang. Kenapa begitu? hal in dikarenakan bila menggunakan filtering IP maka akan melewati beberapa proses. Proses filtering adalah sebagai berikut:

IP Pengirim -> [ firewall ]Â  -> [ filter via dns ] - [ smtpÂ  ]

Jika ip pengirim ada di zone dns RBL maka akan di blok dan tidak boleh melakukan koneksi smtp. Nah proses ini butuh **query dns** ke (contohnya saya pake SORBS) dnsbl.sorbs.net. berarti perlu dua proses bukan dan ada delay bukan? Kalau pake firewalling kita cuman butuh satu langkah. namun kekurangan nya terkadang tidak up to date (tergantung dari anda).

Teknik firewalling ini pada prinsipnya adalah memblok ip yang terindikasikan spammer via **iptables**. Untuk mendapatkan ip-ip spam ini saya mengacu pada [bbfh.sorbs.net](http://bbfh.sorbs.net). Dari hasil download saya berhasik memblok ratusan (bahkan ribuan) ip spammer. Tentu ini sangat membahagiakan karena mail server jadi lebih bebas dari ip spammer. Namun, jika kita mendownload dari [bbfh.sorbs.net](http://bbfh.sorbs.net) atau [Bastard Blocklist From Hell ](http://bbfh.sorbs.net)kita mendapatkan dump ip :( harus di pilah dulu.

Nah, dengan sedikit shell script kita bisa mendapatkan ip nya saja. silakan cek di sini:



	
  1. [Level1](http://spam.udienz.web.id/sorbs/level1.txt)

	
  2. [Level2](http://spam.udienz.web.id/sorbs/level2.txt)

	
  3. [Level3](http://spam.udienz.web.id/sorbs/level3.txt)

	
  4. [Level4](http://spam.udienz.web.id/sorbs/level4.txt)

	
  5. [Level 1 dan Level 2](http://spam.udienz.web.id/sorbs/one-and-two.txt)

	
  6. [Level 2 dan level 3](http://spam.udienz.web.id/sorbs/23.txt)

	
  7. [Level 1, 2, dan 4](http://spam.udienz.web.id/sorbs/124.txt)


Selanjutnya anda bisa menggunakannya sebagai block list. Bisa menggunakan iptables (dengan script download dan penambahan ke iptables) atau apf yang lebih mudah. Contohnya:

    
    iptables -A INPUT -m state --state NEW -s $IPNYA -j DROP


Ada masukan cara yang lebih baik dari cara ini? mohon infonya yah.

PS: gambar diambil dari [http://3spam.com/](http://3spam.com/)
