---
author: udienz
comments: true
date: 2011-08-25 15:57:21+00:00
layout: post
link: https://blog.mahyudd.in/2011/08/25/memasang-kernel-3-0-0-di-ubuntu-natty.html
slug: memasang-kernel-3-0-0-di-ubuntu-natty
title: Memasang kernel 3.0.0 di Ubuntu Natty
wordpress_id: 600
categories:
- Linux
- Ubuntu
tags:
- backports
- kernel
- natty
- oneiric
- pemaketan
- ubuntu
---

Setelah [di rilis](https://plus.google.com/102150693225130002912/posts/CJpyYdCqBL8) oleh [Linuz trovalds](http://id.wikipedia.org/wiki/Linus_Torvalds) kernel 3.0 sudah mendarat di [Oneiric](https://launchpad.net/ubuntu/oneiric/+source/linux), namun sayangnya ooneiric belum dirilis hingga saat ini :(. Berbekal modal nekat <del>dan mumpung punya waktu luang</del>, akhirnya saya membackport kernel 3.0 ke natty. Sebenarnya ini untuk LTS yaitu lucid, namun setelah saya test semua berjalan dengan lancar. Berikut adalah cara memasang kernel tersebut dari PPA saya.

    
    $ sudo add-apt-repositoryÂ <strong>ppa:udienz/lucid-bpo</strong>
    
    $ sudo apt-get update
    
    $ sudo apt-get installÂ <strong><strong>linux-headers-3.0.0-8-genericÂ <strong>linux-image-3.0.0-8-generic</strong></strong></strong>
    
    $ sudo reboot


Done! Gampang kan? untuk memastikan silakan cek dengan perintah uname -a

    
    ~ $ uname -a
    Linux undefined 3.0.0-8-generic #11~natty1-Ubuntu SMP Tue Aug 23 20:03:27 UTC 2011 x86_64 x86_64 x86_64 GNU/Linux
    ~ $


Atau cek di system monitor :) Selamat anda sudah memasang kernel 3.0!
