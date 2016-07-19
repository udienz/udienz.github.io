---
author: udienz
comments: true
date: 2009-01-25 09:02:25+00:00
layout: post
link: https://blog.mahyudd.in/2009/01/25/kegunaan-lain-perintah-file.html
slug: kegunaan-lain-perintah-file
title: Kegunaan lain perintah file
wordpress_id: 260
categories:
- Komputer
- Linux
tags:
- file
- Linux
- MIME
---

Tahukah anda bahwa kita dapat melihat extensi berkas _yang_semestinya_? contoh saya punya berkas contoh.pdf dikarenakan alasan kemanan saya merubah ekstensi berkas menjadi contoh.txt. nggak bisa di baca kan?

nah untuk melihat extensi berkas (MIME) yang sebenarnya kita dapat menggunakan perintah file, contoh nya saya habis melihat video di toutube dan saya menemukan berkas-berkas tanpa ekstensi di folder /tmp. apakah file itu? mari kita lihat


    
    udienz@ironhide:/tmp$ ls -l
    total 9200
    -rw-r--r-- 1 udienz udienzÂ Â  58233 2009-01-24 21:03 1
    -rw-r--r-- 1 udienz udienzÂ Â  19629 2009-01-24 21:04 1.1
    -rw------- 1 udienz udienz 5438385 2009-01-24 22:10 FlashiagAST
    -rw------- 1 udienz udienz 3793886 2009-01-24 22:06 FlashWkqub4



nah berkas diatas tidak punya ekstensi. dara ngeceknya gini


    
    udienz@ironhide:/tmp$ file *
    1:Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  PNG image data, 708 x 624, 8-bit/color RGBA, non-interlaced
    1.1:Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â Â  PNG image data, 354 x 312, 8-bit/color RGBA, non-interlaced
    FlashiagAST:Â Â Â Â Â Â Â Â Â Â Â Â Â Â  Macromedia Flash Video
    FlashWkqub4:Â Â Â Â Â Â Â Â Â Â Â Â Â Â  Macromedia Flash Video



ketemu deh berkas video youtube nya :D. gampang kan?
