---
author: udienz
comments: true
date: 2011-10-01 07:40:49+00:00
layout: post
slug: bagaimana-jika-nge-ping-tapi-icmp-di-blok-server
title: Bagaimana jika nge-ping tapi ICMP di blok server?
wordpress_id: 608
categories:
- Networking
---

Bagaimana jika nge-ping tapi [ICMP](http://en.wikipedia.org/wiki/Internet_Control_Message_Protocol) di blok server? ada yang tau? Pengetesan sederhana untuk memastikan apakah server hidup atau tidak adalah dengan [ping](http://en.wikipedia.org/wiki/Ping) via icmp, tapi akan jadi masalah (kecil) jika port icmp ditutup. nah kadang kita terlalu ambil pusing dan menyimpulkan status bahwa server tersebut mati karena tidak bisa di ping, padahal itu salah! bisa jadi layanan port icmp di tutup karena suatu hal.

Umumnya ping menggunakan port icmp, tapi kita bisa menggunakan port lain. seperti [tcp](http://en.wikipedia.org/wiki/Transmission_Control_Protocol), [udp](http://en.wikipedia.org/wiki/User_Datagram_Protocol). Nah, cara lain untuk memastikan server tersebut up atau tidak ya jangan hanya pakai ping via icmp. silakan lihat-lihat paket hping. untuk instalasinya, jika di debian/ubuntu bisa mengetikkan:

    
    sudo apt-get install hping3


Kita ambil suatu server yang di blok icmpnya, contohnya adalah www.unej.ac.id. server tersebut di blok icmp nya. tapi untuk memastikan server tersebut hidup atau tidak kita bisa cek apakah port 80 (yang dibukak oleh server tersbut) up atau tidak. caranya adalah sebagai berikut:

    
    sudo hping3 -S -p 80 -c 4 www.unej.ac.id
    
    HPING www.unej.ac.id (wlan0 222.124.210.122): S set, 40 headers + 0 data bytes
    len=44 ip=222.124.210.122 ttl=57 DF id=0 sport=80 flags=SA seq=0 win=14600 rtt=40.2 ms
    len=44 ip=222.124.210.122 ttl=58 DF id=0 sport=80 flags=SA seq=1 win=14600 rtt=34.2 ms
    len=44 ip=222.124.210.122 ttl=58 DF id=0 sport=80 flags=SA seq=2 win=14600 rtt=33.2 ms
    len=44 ip=222.124.210.122 ttl=58 DF id=0 sport=80 flags=SA seq=3 win=14600 rtt=33.3 ms
    
    --- www.unej.ac.id hping statistic ---
    4 packets transmitted, 4 packets received


Nah up kan servernya? jadi jangan menyimpulkan server tersebut down atau tidaknya hanya via icmp :)

NB:



	
  1. Â untuk windows silakan menggunakan [http://www.elifulkerson.com/projects/tcping.php](http://www.elifulkerson.com/projects/tcping.php)

	
  2. banyak opsinya loh, silakan lihat manualnya. Salah satunya untuk port scanning :)


