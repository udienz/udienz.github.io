---
author: udienz
comments: true
date: 2009-03-05 14:53:47+00:00
layout: post
link: https://blog.mahyudd.in/2009/03/05/blankon-tweak-ada-yang-mau-coba.html
slug: blankon-tweak-ada-yang-mau-coba
title: BlankOn tweak, ada yang mau coba?
wordpress_id: 304
categories:
- BlankOn
tags:
- blankon
- blankon-tweak
- python
---

yak sekarang dah ada di repository resmi BlankOn, silahkan di ujicoba. gimana caranya?

    
    $ wget http://arsip.blankonlinux.or.id/blankon/pool/main/b/blankon-tweak/blankon-tweak_0.4.5-7_all.deb
    $ sudo dpkg -i blankon-tweak_0.4.5-7_all.deb
    $ blankon-tweak



nah silahkan cari bug yang ada di blankon-tweak dan silahkan laporkan ke developer blankon bila ada bug :D. oh iyah, bila ingin melakukan tweak sendiri silahkan sangat terbuka untuk umum kok, hehehe. caranya?

    
    $ dget http://arsip.blankonlinux.or.id/blankon/pool/main/b/blankon-tweak/blankon-tweak_0.4.5-7.dsc
    $ tar -xzvf blankon-tweak_0.4.5-7.tar.gz
    $ cd blankon-tewak


lakukan perubahan dan komlipe dengan

    
    $ debuild -S -sa
    $ dpkg-buildpackage -rfakeroot



happy hacking!
