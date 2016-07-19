---
author: udienz
comments: true
date: 2011-07-06 17:24:10+00:00
layout: post
link: https://blog.mahyudd.in/2011/07/06/iperf-pengukur-throughput.html
slug: iperf-pengukur-throughput
title: 'Iperf: Pengukur throughput'
wordpress_id: 587
categories:
- Debian
- Linux
- Networking
tags:
- Networking
- tools
---

Kira-kira dua minggu kemarin saya dan [Budi_w](http://budiwijaya.or.id) melakukan test throughput local loop antara server di Gedung Cyber Kuningan Jakarta Selatan dengan Surabaya, nah biar tidak kelupaan alangkah baiknya ditulis tentang apa dan bagaimana iperf itu. Menurut [Wikipedia](http://en.wikipedia.org/wiki/Iperf):




<blockquote>Ipref biasa digunakan untuk [software penguji jaringan komputer](http://en.wikipedia.org/wiki/Measuring_network_throughput) yang dapat membuat data TCP/UDP dan mengukur [throughput](http://en.wikipedia.org/wiki/Throughput) dari jaringan yang membawanya. Ipref adalah perangkat modern untuk mengukur performa jaringan yang ditulis menggunakan C++.
</blockquote>



Seperti yang kita tahu, kecepatan jaringan dapat dipengaruhi oleh beberapa hal, salah satunya 'kemampuan jalur' jaringan tersebut. ipref ini dapat berjalan sebagai client maupun server. Untuk instalasi di keluarga Debian kita cukup mengetikkan apt-get/aptitude saja untuk instalasinya. Mudah bukan?

Praktikum, baiklah kita praktikum. Saya mempunyai dua buah mesin terhubung dengan jaringan Gigabit, mesin ini akan bertindak sebagai server dan client. Tentu saja sebelumnya harus di install dulu iperf.


    
    $ sudo apt-get install iperf



Kemudian di kedua mesin silakan tentukan yang mana yang server dan mana yang client. Di sisi client aktifkan mode servernya dengan perintah:


    
    :~$ iperf -s



Di sisi client kita harus menghubungkannya dengan server dengan perintah


    
    :~$ iperf -c $ip_server



Perintah diatas akan mengkur dengan jalur TCP, untuk UDP anda harus memasukkan opsi -u untuk mengaktifkannya.

Berikut beberapa penampakannya di sisi server:

    
    :~$ iperf -s
    ------------------------------------------------------------
    Server listening on TCP port 5001
    TCP window size: 85.3 KByte (default)
    ------------------------------------------------------------
    [  4] local xxx.xxx.xxx.xxx port 5001 connected with xxx.xxx.xxx.xxx port 26346
    [ ID] Interval       Transfer     Bandwidth
    [  4]  0.0-10.0 sec    992 MBytes    832 Mbits/sec
    :~$ iperf -s -u
    ------------------------------------------------------------
    Server listening on UDP port 5001
    Receiving 1470 byte datagrams
    UDP buffer size:   122 KByte (default)
    ------------------------------------------------------------
    [  3] local xxx.xxx.xxx.xxx port 5001 connected with xxx.xxx.xxx.xxx port 17798
    [ ID] Interval       Transfer     Bandwidth       Jitter   Lost/Total Datagrams
    [  3]  0.0-10.0 sec  1.25 MBytes  1.05 Mbits/sec  0.005 ms    0/  893 (0%)
    



Sedang di sisi client akan ada penampakan seperti ini:


    
    :~$ iperf -c $ip_server
    ------------------------------------------------------------
    Client connecting to xxx.xxx.xxx.xxx, TCP port 5001
    TCP window size: 64.0 KByte (default)
    ------------------------------------------------------------
    [  3] local xxx.xxx.xxx.xxx port 26346 connected with xxx.xxx.xxx.xxx port 5001
    [ ID] Interval       Transfer     Bandwidth
    [  3]  0.0-10.0 sec    992 MBytes    832 Mbits/sec
    :~$ iperf -u -c xxx.xxx.xxx.xxx
    ------------------------------------------------------------
    Client connecting to xxx.xxx.xxx.xxx, UDP port 5001
    Sending 1470 byte datagrams
    UDP buffer size:   256 KByte (default)
    ------------------------------------------------------------
    [  3] local xxx.xxx.xxx.xxx port 17798 connected with xxx.xxx.xxx.xxx port 5001
    [ ID] Interval       Transfer     Bandwidth
    [  3]  0.0-10.0 sec  1.25 MBytes  1.05 Mbits/sec
    [  3] Sent 893 datagrams
    [  3] Server Report:
    [  3]  0.0-10.0 sec  1.25 MBytes  1.05 Mbits/sec  0.004 ms    0/  893 (0%)
    



Yup, mendekati 1 Gigabit. not bad :)

Info lanjut:
Website: [http://iperf.sourceforge.net/](http://iperf.sourceforge.net/)
Debian QA: [http://packages.qa.debian.org/i/iperf.html](http://packages.qa.debian.org/i/iperf.html)
Paket Debian: [http://packages.debian.org/iperf](http://packages.debian.org/iperf)
