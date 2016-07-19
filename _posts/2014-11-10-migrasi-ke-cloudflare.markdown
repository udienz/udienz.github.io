---
author: udienz
comments: true
date: 2014-11-10 09:12:00+00:00
layout: post
link: https://blog.mahyudd.in/2014/11/10/migrasi-ke-cloudflare.html
slug: migrasi-ke-cloudflare
title: Migrasi ke cloudflare
wordpress_id: 868
categories:
- MySelf
tags:
- blog
- cloudflare
---

[caption id="" align="aligncenter" width="222"]![Cloudflare Logo](https://www.cloudflare.com/media/images/brand/logo-guideline-illustrations_background-white.png) Clodflare Logo[/caption]

Akhirnya setelah punya waktu cukup, domain [mahyudd.in](http://mahyudd.in) dan [udienz.web.id](http://udienz.web.id) saya migrasikan ke [cloudflare](https://www.cloudflare.com). Salah satu dari beberapa motivasi migrasi ke cloudflare adalah setelah membaca blod dari [Om Fajran tentang SSL](https://fajran.web.id/2014/10/sertifikat-ssl-cloudflare.html), Load server, dan bandwidth.

Proses migrasinya sangat mudah sekali, tinggal kita buat domain yang akan di migrasikan, upload zone dns dan atur mana saja yang akan di arahkan ke cloudflare. Selesai! Mudah dan simple.

**Kekurangan**:

Entah ini bug atau pengaturan di laptop saya yang error, ketika dukungan IPv6 saya aktifkan di blog ini, maka dari laptop saya akan mendapatkan SSL asli dari blog ini bukan dari cloudflare.

**Overall**:

Secara umum, saya sangat puas dengan penforma setelah migrasi ke cloudflare, hanya untuk catatan server cloudflare ada di Singapura jadi akan memakan bandwidth internasional.
