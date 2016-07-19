---
author: udienz
comments: true
date: 2009-05-10 17:09:56+00:00
layout: post
link: https://blog.mahyudd.in/2009/05/11/di-balik-mirroring-3-mirror-opensuse.html
slug: di-balik-mirroring-3-mirror-opensuse
title: 'Di balik mirroring (3): Mirror OpenSUSE'
wordpress_id: 446
categories:
- Linux
tags:
- Mirror
- OpenSUSE
- Suse
---

[OpenSUSE](http://opensuse.org) adalah distro ke dua ku ketika mengenal linux, yah distro kedua. yang pertama itu mandriva. Nah sekarang kebetulan di [mirror.unej.ac.id](http://mirror.unej.ac.id) sudah menyediakan repository OpenSUSE. Sekalian reuni masa lalu saya juga menemukan cerita yang unik ketika membuat repository OpenSUSE di mirror kampus UNEJ. nah seberapa unik?  Begini, seperti biasanya distro besar pastilah menyediakan fasilitas mirrorring. nah di OpenSUSE ini ada yang beda, dimana modulnya banyak dan cukup rumit untuk melakukan mirroring. mari kita lihat bersama-sama [di sini untuk rsync.opensuse.org](http://www.poeml.de/~poeml/rsyncinfo-rsync.o.o.txt) dan di [sini untuk stage.opensuse.org](http://www.poeml.de/~poeml/rsyncinfo-stage.o.o.txt).  banyak modul kan?. nah yang jadi unik itu antara lain:



	
  * banyak modul, bila anda punya mirror yang mepet, mending pake `opensuse-hotstuff-160gb`

	
  * tidak ada nya modul yang satu, satu ini mencakup kesemuanya. ini yang membuat saya bingung waktu pertama kali membangun repository. sebenarnya ada alternatif yaitu modul `opensuse-full` tapi modul ini tidak menyertakan repository BS (Build Services)

	
  * adanya [Redirector](http://lizards.opensuse.org/2008/12/16/best-way-to-download-opensuse/), menurut saya ini sangat bagus dan cocok untuk kita yang ada di indonesia. ini yang membuat saya terkagum-kagum

	
  * nah... ini sudak masuk teknis. kalo waktu rsync ke rsync.opensuse.org maka saya mengakalinya untuk mengambil repo OpenSUSE di kambing dulu baru ke rsync.opensuse.org. kenapa? yah biar hemat bandwidth internasional

	
  * [pernah hilang ~100GB](http://lists.opensuse-id.org/htdig.cgi/milis-opensuse-id.org/2009-April/006417.html) ini gara-gara server [KAIST](http://ftp.kaist.ac.kr) down! bayangin ajah harus download ~100 GB lagi...


Alhadulillah semua teratasi, saya juga sangat bahagia dengan respon teman teman komunitas [opensuse indonesia](http://www.opensuse-id.org) yang sangat mendukung dan mensupport dengan adanya mirror ini. Senang rasanya bisa membantu dan hilang rasa kesel karena download lagi ~100GB :D

akhir kata Happy Downloading dan Maju terus OpenSource indonesia!
