---
author: udienz
comments: true
date: 2007-11-26 17:39:11+00:00
layout: post
link: https://blog.mahyudd.in/2007/11/26/ngecek-dulu.html
slug: ngecek-dulu
title: ngecek duluâ€¦.
wordpress_id: 425
categories:
- Debian
- Linux
- Ubuntu
tags:
- artikel
- bash
- Debian
- Linux
- perintah
- script
- terminal
- tutorial
- ubuntu
---

ngecek dulu system kita yuk....

1. Debian versi berapa?

    
    udienz@ardienz:~$ cat /etc/debian_version
    lenny/sid


2. Ubuntu Versi berapa?

    
    udienz@ardienz:~$ cat /etc/issue.net
    Ubuntu 7.10


3. Code-name nya apa?

    
    udienz@ardienz:~$ cat /etc/lsb-release
    DISTRIB_ID=Ubuntu
    DISTRIB_RELEASE=7.10
    DISTRIB_CODENAME=gutsy
    DISTRIB_DESCRIPTION="Ubuntu 7.10"


4. Tampilkan informasi sistem

    
     udienz@ardienz:~$ uname -a
    Linux ardienz 2.6.22-14-generic #1 SMP Sun Oct 14 23:05:12 GMT 2007 i686 GNU/Linux


5. Jam berapa sih sekarang?? oh ya tanggal berapa?? sekalian tahu berapa yah sekarang??

    
    udienz@ardienz:~$ date
    Tue Nov 27 00:22:10 WIT 2007


6. sekarang saya ada dimana??

    
    udienz@ardienz:~$ pwd
    /home/udienz


7. apa nama komputer ini dalam jaringan??

    
    udienz@ardienz:~$ cat /etc/hostname
    ardienz


8. berapakah IP  saya??

    
    udienz@ardienz:~$ ifconfig
    eth0      Link encap:Ethernet  HWaddr 00:0C:76:CF:88:A0
              inet addr:192.168.1.11  Bcast:192.168.1.255  Mask:255.255.255.0
              inet6 addr: fe80::20c:76ff:fecf:88a0/64 Scope:Link
              UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
              RX packets:904450 errors:0 dropped:0 overruns:0 frame:0
              TX packets:968554 errors:0 dropped:0 overruns:0 carrier:0
              collisions:0 txqueuelen:1000
              RX bytes:181631459 (173.2 MB)  TX bytes:529385498 (504.8 MB)
              Interrupt:19 Base address:0x8f00
    
    lo        Link encap:Local Loopback
              inet addr:127.0.0.1  Mask:255.0.0.0
              inet6 addr: ::1/128 Scope:Host
              UP LOOPBACK RUNNING  MTU:16436  Metric:1
              RX packets:15142 errors:0 dropped:0 overruns:0 frame:0
              TX packets:15142 errors:0 dropped:0 overruns:0 carrier:0
              collisions:0 txqueuelen:0
              RX bytes:9176169 (8.7 MB)  TX bytes:9176169 (8.7 MB)


9. saya tadi login dengan user apa yah??

    
    udienz@ardienz:~$ whoami
    udienz


10. siapa aja yang login di komputer ku??

    
    udienz@ardienz:~$ who
    udienz   tty7         2007-11-26 22:24 (:0)
    udienz   pts/0        2007-11-26 22:33 (:0.0)
    udienz   pts/2        2007-11-26 22:52 (:0.0)


11. Proses apaan aja sih yang jalan??

    
    udienz@ardienz:~$ ps
      PID TTY          TIME CMD
     8586 pts/2    00:00:00 bash
    20456 pts/2    00:00:00 ps


12. Memory yang tersedia berapa sih??

    
    udienz@ardienz:~$ free
                 total       used       free     shared    buffers     cached
    Mem:       1035636    1017376      18260          0     364656     197484
    -/+ buffers/cache:     455236     580400
    Swap:      1052216      34784    1017432


13. direktory wordpress itu menghabiskan berapa dalam harddisk yah??

    
    udienz@ardienz:~$ du wordpress/ -h --max-depth=2
    144K    wordpress/wp-includes/images
    1.9M    wordpress/wp-includes/js
    3.0M    wordpress/wp-includes
    192K    wordpress/wp-admin/import
    96K     wordpress/wp-admin/images
    28K     wordpress/wp-admin/css
    48K     wordpress/wp-admin/js
    208K    wordpress/wp-admin/includes
    1.1M    wordpress/wp-admin
    224K    wordpress/wp-content/themes
    48K     wordpress/wp-content/plugins
    280K    wordpress/wp-content
    4.5M    wordpress/


14 Harddiskku yang kosong berapa aja yah??

    
    udienz@ardienz:~$ df -h
    Filesystem            Size  Used Avail Use% Mounted on
    /dev/sdb1              14G  4.9G  8.0G  38% /
    varrun                506M  428K  506M   1% /var/run
    varlock               506M     0  506M   0% /var/lock
    udev                  506M   72K  506M   1% /dev
    devshm                506M     0  506M   0% /dev/shm
    lrm                   506M   34M  472M   7% /lib/modules/2.6.22-14-generic/volatile
    /dev/sdb3             5.8G  5.1G  482M  92% /home
    /dev/sdb5             129G  110G   20G  85% /media/dokumenku
    /dev/sda1              80G   38G   31G  56% /media/DATA





dah ah itu dulu aja.... dah malem....
