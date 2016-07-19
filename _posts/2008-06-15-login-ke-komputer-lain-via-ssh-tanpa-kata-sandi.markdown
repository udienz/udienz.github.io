---
author: udienz
comments: true
date: 2008-06-15 12:00:35+00:00
layout: post
slug: login-ke-komputer-lain-via-ssh-tanpa-kata-sandi
title: Login ke Komputer lain via SSH tanpa Kata sandi
wordpress_id: 203
categories:
- Linux
- Networking
tags:
- artikel
- blankon
- Linux
- network
- ssh
- tutorial
- ubuntu
---

SSH (Secure Shell) digunakan untuk login ke komputer lain yang terhubung dalam jaringan, pada umumnya dia ada di port 22, penggunaanya adalah sebagai berikut:

    
    server:~# ssh root@ironhide.immteknik.org
    
    root@ironhide.immteknik.org's password:
    
    Last login: Thu Jun 12 18:57:20 2008 from 192.168.1.1
    
    Linux ironhide 2.6.24-16-generic #1 SMP Thu Apr 10 13:23:42 UTC 2008 i686
    The programs included with the BlankOn system are free software; the exact distribution terms for each program are described in the individual files in /usr/share/doc/*/copyright.
    BlankOn comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.
    
    Linux ironhide 2.6.24-16-generic #1 SMP Thu Apr 10 13:23:42 UTC 2008 i686
    The programs included with the BlankOn system are free software; the exact distribution terms for each program are described in the individual files in /usr/share/doc/*/copyright.
    BlankOn comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.
    
    ironhide:~#


terus bagaimana kalo saya pengen login ke ironhide.immteknik.org tanpa kata kunci? cukup mudah sekali apabila anda ingin menghemat waktu, bayangkan bila kata kunci nya puanjang? wew lama bangetz: caranya seperti ini:
1. buat kunci ssh di sisi server

    
    ssh-keygen -t dsa


2. simpan sebagai id_dsa

3. salin berkas id_dsa ke komputer target (misal nya di `/tmp`

    
    scp .-r ssh/id_dsa.pub root@ironhide.immteknik.org:/tmp


4. kemudian login di komputer target

5. buka berkas tersebut

    
    ironhide:/tmp # cat id_dsa.pub >> ~/.ssh/authorized_keys


6. log out dari target, dan coba login lagi dari server

    
    server:~# ssh root@ironhide.immteknik.org
    Last login: Thu Jun 12 19:13:40 2008 from 192.168.1.1
    Linux ironhide 2.6.24-16-generic #1 SMP Thu Apr 10 13:23:42 UTC 2008 i686
    
    The programs included with the BlankOn system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.
    
    BlankOn comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
    applicable law.
    Linux ironhide 2.6.24-16-generic #1 SMP Thu Apr 10 13:23:42 UTC 2008 i686
    
    The programs included with the BlankOn system are free software;
    the exact distribution terms for each program are described in the
    individual files in /usr/share/doc/*/copyright.
    
    BlankOn comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
    applicable law.
    ironhide:~#


tanpa ada kata kunci bukan?
