---
author: udienz
comments: true
date: 2008-12-31 13:09:23+00:00
layout: post
slug: mhddfs-solusi-raid-dan-lvm
title: 'MHDDFS: solusi RAID dan LVM'
wordpress_id: 238
categories:
- Linux
- Tak Berkategori
tags:
- hardisk
- lvm
- mhddfs
- mirroring
- raid
---

ini dia paket yang dinamakan dengan `mhddfs`, menurut si [penanya](http://debaday.debian.net/2008/05/25/mhddfs-join-several-real-filesystems-together-to-form-a-single-larger-one/) mhdfs dapat menggabungkan beberapa filesystem dalam satu partisi. kalo begitu mirip dengan RAID dan LVM yah? yah bener sekali. menurut saya paket ini adalah alternatif bagi kita yang hardisknya ga support terhadap RAID dan ingin menejemen hardisk yang lebih baik dari LVM.

logikanya adalah.. sebagai berikut jika ada dua hardisk normalnya gambaranya adalahâ€¦

    
    /hdd1             /hdd2
    |                 |
    +-- /dir1         +-- /dir1
    |   |             |   |
    |   +- file2      |   +- file4
    |                 |   +- file2
    +-- file1         |
    |                 +-- file5
    +-- /dir2         |
        |             +-- /dir3
        +- file3          |
                          +- file6


jika menggunakan mhddfs maka hasilnya adalah..

    
    /hdd_common
    |
    +-- /dir1
    |   |
    |   +-- file2  -> /hdd1/dir1/file2
    |   +-- file4
    |
    |-- /dir2
    |   |
    |   + file3
    |
    +-- /dir3
    |   |
    |   +-- file6
    |
    +-- file1
    +-- file5


enakkan? terus bagaimana caranya
1. pasang hardisk (lebih dari satu)
2. install mhddfs, bisa di pake [ubuntu](http://packages.ubuntu.com/search?keywords=mhddfs) atau [debian](http://packages.debian.org/mhddfs)

jika yang akan digabung adalah:

`/media/sde1` dan `/media/sdb1` yang dimount ke `/media/gabungan` maka perintahnya adalah

    
    mhddfs /media/sde1,/media/sdb1Â  /media/gabungan/ -o allow_other


mari kita cek

    
    # df -h
    
    /media/sde1;/media/sdb1Â Â Â  770GÂ  531GÂ  201GÂ  73% /media/gabungan


lumayan :D, dan bagaimana kalo dimasukkan di `fstab`? ya tinggal ditambahin:

    
    mhddfs#/media/sde1,/media/sdb1 /media/gabungan fuse defaults,allow_other 0 0


selesai dahâ€¦ silakan menikmati kapasitas hardisk baru ![:D](../wp-includes/images/smilies/icon_biggrin.gif)
