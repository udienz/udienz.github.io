---
author: udienz
comments: true
date: 2013-10-29 10:12:58+00:00
layout: post
slug: mengaktifkan-repo-ports-di-openbsd
title: Mengaktifkan repo ports di OpenBSD
wordpress_id: 797
categories:
- Komputer
tags:
- bsd
- openbsd
---

Pada dasarnya OpenBSD memiliki system yang lengkap, namun kadang banyak paket yang belum ditambahkan :(.Â Sebenarnya ports berasal dari FreeBSD namun telah ditulis ulang.

Untuk mengaktifkan ports di OpenBSD silakan mengikuti langkah langkah berikut:



	
  * Umumnya ada di direktori /usr, jadi silakan pindah ke /usr

	
  * Unduh berkas ports dari mirror terdekat



    
    # pwd
    /usr
    # wget http://kartolo.sby.datautama.net.id/OpenBSD/5.3/ports.tar.gz -q
    # ls -hal | grep ports 
    -rw-r--r--   1 root  wheel  20.5M Mar 13  2013 ports.tar.gz





	
  * Kemudian di ekstrak



    
    # tar -xzf ports.tar.gz
    # cd ports                                                                                                                                      
    # pwd
    /usr/ports


**Install paket**
Contohnya kita mau install snmp

    
    # cd /usr/ports/net/net-snmp/
    # make install


**Un-Install paket**
Untuk pencopotan paket bisa mengetikkan

    
    # cd /usr/ports/net/net-snmp/
    # make uninstall
