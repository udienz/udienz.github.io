---
author: udienz
comments: true
date: 2009-03-05 14:40:18+00:00
layout: post
slug: pantau-jaringan-via-vnstat
title: Pantau jaringan via vnstat
wordpress_id: 302
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- bandwidth
- jaringan
- Linux
- traffic
- vnstat
---

Memantau bandwidth adalah hal yang wajib bagi seorang administrator, nah kebetulan di debian/ubuntu kita dapat meng installnya via repository


    
    $ sudo apt-get install vnstat



untuk centos, saya menggunakan cara ini


    
    $ cd /usr/local/src
    
    $ su -
    
    # wget http://humdi.net/vnstat/vnstat-1.6.tar.gz
    
    # tar -zxvf vnstat-1.6.tar.gz
    
    # cd vnstat-1.6
    
    # make && make install



kemudian buatlah database per kartu jaringan, saya akan membuat database traffic untuk eth0 maka perintahnya:


    
    # vnstat -u -i eth0



nah silakan ganti sesuka anda interfacenya, dan secara default akan terdapat ringkasan dari traffic bandwidth anda.


    
    # vnstat
    
    rxÂ Â Â Â Â  /Â Â Â Â  txÂ Â Â Â Â  /Â Â Â  totalÂ Â Â  /Â  estimated
    eth0:
    yesterdayÂ Â Â Â Â  3.04 GBÂ  /Â Â Â  1.15 GBÂ  /Â Â Â  4.19 GB
    todayÂ Â Â Â Â  2.08 GBÂ  /Â  777.02 MBÂ  /Â Â Â  2.83 GBÂ  /Â Â  21.71 GB
    
    eth1:
    yesterdayÂ Â Â  103.81 MBÂ  /Â Â Â  2.21 GBÂ  /Â Â Â  2.31 GB
    todayÂ Â Â  101.00 MBÂ  /Â Â Â  1.66 GBÂ  /Â Â Â  1.76 GBÂ  /Â Â  13.44 GB



nah bagaimana cara memantau secara live traffic yang ada di eth1? yup caranya adalah sebagai berikut


    
    # vnstat --live -i eth1



gampang bukan? silahkan dipadukan dengan report hatml nya [vnstatweb](http://www.sqweek.com/sqweek/index.php?p=1)
