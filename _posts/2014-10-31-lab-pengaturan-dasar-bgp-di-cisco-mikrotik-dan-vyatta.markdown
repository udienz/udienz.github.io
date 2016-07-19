---
author: udienz
comments: true
date: 2014-10-31 07:07:12+00:00
layout: post
link: https://blog.mahyudd.in/2014/10/31/lab-pengaturan-dasar-bgp-di-cisco-mikrotik-dan-vyatta.html
slug: lab-pengaturan-dasar-bgp-di-cisco-mikrotik-dan-vyatta
title: '[LAB] Pengaturan dasar BGP di Cisco, Mikrotik dan Vyatta'
wordpress_id: 855
categories:
- Networking
tags:
- bgp
- Cisco
- mikrotik
- Vyatta
---

Pada tulisan kali ini akhirnya saya akan menuliskan tentang [BGP](http://en.wikipedia.org/wiki/Border_Gateway_Protocol) (Border Gateway Protocol) yaitu suatu protocol yang mengijinkan kita untuk saling bertukar tabel routing dengan mesin lain. Pada lab kali ini saya menggunakan GNS3 di Ubuntu, untuk device cisco saya menggunakan router 7200 NPE400, sedangkan untuk vyatta saya menggunakan versi 6.6, dan untuk mikrotik saya menggunakan versi 6.19.



## Topologi



Pada lab kali ini topologi yang akan digunakan adalah sebagai berikut:

[![lab-bgp-basic1](https://blog.mahyudd.in/wp-content/uploads/2014/10/lab-bgp-basic1.png)](https://blog.mahyudd.in/wp-content/uploads/2014/10/lab-bgp-basic1.png)

Untuk mesin vyatta akan menggukan sebutan Router 1 (R1), untuk cisco menggunakan sebutan Router 2 (R2) dan dan Router 3 (R3) untuk Mikrotik. Sedangkan network yang akan digunakan adalah network 192.168.0.0/16, dengan rincian sebagai berikut:




    
  1. Pada router 1, memiliki jaringan 192.168.11.0/24, dan tersambung dengan router 2 (cisco) dengan network 192.168.1.0/24

    
  2. Pada router 2, memiliki jaringan 192.168.22.0/24, dan tersambung dengan router 1 dengan network 192.168.1.0/24 dan tersambung dengan router 3 dengan network 192.168.2.0/24

    
  3. Pada router 3, meiliki jaringan 192.168.33.0/24 dan tersambung dengan router 2 dengan network 192.168.2.0/24

    
  4. Untuk network 192.168.0.0/24 digunakan untuk ip loopback.





## Pengaturan



Langkah awal, kita harus mengatur alamat ip terlebih dahulu.

Vyatta:


    
    vyatta@vyatta:~$ configure 
    vyatta@vyatta# set interfaces loopback lo address 192.168.0.1/32
    vyatta@vyatta# set interfaces ethernet eth0 address 192.168.1.1/24
    vyatta@vyatta# commit
    



Cisco:


    
    Cisco#conf t
    Cisco(config)#int Loopback 0
    Cisco(config-if)#ip address 192.168.0.2 255.255.255.255
    Cisco(config-if)#exit
    Cisco(config)#int gi0/0
    Cisco(config-if)#ip address 192.168.1.2 255.255.255.0  
    Cisco(config-if)#no shut
    Cisco(config-if)#exit               
    Cisco(config)#int Gi1/0
    Cisco(config-if)#ip address 192.168.2.2 255.255.255.0
    Cisco(config-if)#no shut
    



Mikrotik:


    
    [admin@MikroTik] > /interface bridge add name=loopback0
    [admin@MikroTik] > /ip address add interface=loopback0 address=192.168.0.3/32
    [admin@MikroTik] > /ip address add interface=ether1 address=192.168.2.3/24
    



Pastikan bahwa semua perangkat telah terhubung.


    
    vyatta@vyatta# ping 192.168.1.2
    PING 192.168.1.2 (192.168.1.2) 56(84) bytes of data.
    64 bytes from 192.168.1.2: icmp_req=1 ttl=255 time=14.0 ms
    64 bytes from 192.168.1.2: icmp_req=2 ttl=255 time=11.6 ms
    ^C
    --- 192.168.1.2 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1003ms
    rtt min/avg/max/mdev = 11.666/12.864/14.062/1.198 ms
    




    
    Cisco#ping 192.168.1.1
    Type escape sequence to abort.
    Sending 5, 100-byte ICMP Echos to 192.168.1.1, timeout is 2 seconds:
    !!!!!
    Success rate is 100 percent (5/5), round-trip min/avg/max = 4/8/12 ms
    Cisco#ping 192.168.2.3
    Type escape sequence to abort.
    Sending 5, 100-byte ICMP Echos to 192.168.2.3, timeout is 2 seconds:
    !!!!!
    Success rate is 100 percent (5/5), round-trip min/avg/max = 8/9/12 ms
    Cisco#
    




    
    [admin@MikroTik] > ping 192.168.2.2
    HOST                                     SIZE TTL TIME  STATUS                                                                                  
    192.168.2.2                                56 255 10ms 
    192.168.2.2                                56 255 8ms  
    192.168.2.2                                56 255 8ms  
        sent=3 received=3 packet-loss=0% min-rtt=8ms avg-rtt=8ms max-rtt=10ms 
    
    [admin@MikroTik] > 
    





## Pengaturan BGP



Pada pengaturan BGP, router 1 (vyatta) akan menggunakan as **11**, router 2 (cisco) akan menggunakan as **22**, dan router 3 (mikrotik) akan menggunakan as **33**

Vyatta


    
    vyatta@vyatta# set protocols bgp 11 parameters router-id 192.168.0.1
    vyatta@vyatta# set protocols bgp 11 parameters log-neighbor-changes
    vyatta@vyatta# set protocols bgp 11 neighbor 192.168.1.2 remote-as 22
    vyatta@vyatta# set protocols bgp 11 neighbor 192.168.1.2 soft-reconfiguration inbound
    vyatta@vyatta# exit
    Warning: configuration changes have not been saved.
    exit
    



Cisco


    
    Cisco(config)#router bgp 22
    Cisco(config-router)#bgp router-id 192.168.0.2
    Cisco(config-router)#default bgp log-neighbor-changes
    Cisco(config-router)#neighbor 192.168.1.1 remote-as 11
    Cisco(config-router)#neighbor 192.168.2.3 remote-as 22
    Cisco(config-router)#address-family ipv4
    Cisco(config-router-af)#neighbor 192.168.1.1 soft-reconfiguration inbound
    Cisco(config-router-af)#neighbor 192.168.2.3 soft-reconfiguration inbound
    Cisco(config-router-af)#neighbor 192.168.1.1 activate
    Cisco(config-router-af)#neighbor 192.168.2.3 activate
    Cisco(config-router-af)#^Z                                                
    Cisco#



Mikrotik


    
    [admin@MikroTik] > /routing bgp
    [admin@MikroTik] /routing bgp> instance set default router-id=192.168.0.3 as=33
    [admin@MikroTik] /routing bgp> peer add name=to-cisco remote-address=192.168.2.2 remote-as=22 disabled=no 
    



Cek status bgp peer


    
    vyatta@vyatta:~$ show ip bgp sum
    BGP router identifier 192.168.0.1, local AS number 11
    IPv4 Unicast - max multipaths: ebgp 1 ibgp 1
    RIB entries 0, using 0 bytes of memory
    Peers 1, using 2524 bytes of memory
    
    Neighbor        V    AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
    192.168.1.2     4    22      15      15        0    0    0 00:12:01        0
    
    Total number of neighbors 1
    




    
    Cisco#sh ip bgp sum
    BGP router identifier 192.168.0.2, local AS number 22
    BGP table version is 1, main routing table version 1
    
    Neighbor        V           AS MsgRcvd MsgSent   TblVer  InQ OutQ Up/Down  State/PfxRcd
    192.168.1.1     4           11      15      17        1    0    0 00:12:23        0
    192.168.2.3     4           33      11      11        1    0    0 00:08:42        0
    




    
    [admin@MikroTik] /routing bgp> peer print 
    Flags: X - disabled, E - established 
     #   INSTANCE  REMOTE-ADDRESS REMOTE-AS  
     0 E default   192.168.2.2    22
    



Pada dasarnya, bgp peering semuanya sudah berjalan namun bgp **belum** melakukan pertukaran tabel routing? bagaimana bisa? hal ini dikarenakan di semua device diatas belum melakukan advertise prefix. Hal ini dapat di lihat dari mesin cisco pada output `show ip bgp sum` pada kolom `State/PfxRcd` terlihat **0** yang berarti tidak ada prefix yang diterima.

Untuk melakukan advertise (distibusi prefix) bisa menggunakan berbagai cara bisa dengan redistribusi prefix yang tersambung (connected), statis, ospf dan lain lain. Kali ini kita akan mengadvertise ip loopback dan network yang dialokasikan.

Vyatta


    
    vyatta@vyatta:~$ configure 
    vyatta@vyatta# set protocols bgp 11 network 192.168.0.1/32
    vyatta@vyatta# set protocols bgp 11 network 192.168.11.0/24
    vyatta@vyatta# commit
    [edit]
    vyatta@vyatta# exit
    Warning: configuration changes have not been saved.
    exit



Cisco


    
    Cisco#conf t
    Enter configuration commands, one per line.  End with CNTL/Z.
    Cisco(config)#router bgp 22
    Cisco(config-router)#address-family ipv4
    Cisco(config-router-af)#network 192.168.0.2 mask 255.255.255.255
    Cisco(config-router-af)#network 192.168.22.0 mask 255.255.255.0 
    Cisco(config-router-af)#exit
    Cisco(config-router)#exit
    Cisco(config)#ip route 192.168.22.0 255.255.255.0 Null 0



Mikrotik


    
    [admin@MikroTik] /routing bgp> network add network=192.168.33.0/24 synchronize=yes
    [admin@MikroTik] /routing bgp> /ip route add dst-address=192.168.33.0/24 type=blackhole



Cek dengan tabel route


    
    vyatta@vyatta:~$ sh ip route 
    Codes: K - kernel route, C - connected, S - static, R - RIP, O - OSPF,
           I - ISIS, B - BGP, > - selected route, * - FIB route
    
    C>* 127.0.0.0/8 is directly connected, lo
    C>* 192.168.0.1/32 is directly connected, lo
    <strong>B>* 192.168.0.2/32 [20/0] via 192.168.1.2, eth0, 00:10:39
    B>* 192.168.0.3/32 [20/0] via 192.168.1.2, eth0, 00:00:03</strong>
    C>* 192.168.1.0/24 is directly connected, eth0
    S>* 192.168.11.0/24 [1/0] is directly connected, Null0, bh
    <strong>B>* 192.168.22.0/24 [20/0] via 192.168.1.2, eth0, 00:08:09
    B>* 192.168.33.0/24 [20/0] via 192.168.1.2, eth0, 00:07:17
    </strong>




    
    Cisco#sh ip ro
    Codes: L - local, C - connected, S - static, R - RIP, M - mobile, B - BGP
           D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area 
           N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2
           E1 - OSPF external type 1, E2 - OSPF external type 2
           i - IS-IS, su - IS-IS summary, L1 - IS-IS level-1, L2 - IS-IS level-2
           ia - IS-IS inter area, * - candidate default, U - per-user static route
           o - ODR, P - periodic downloaded static route, H - NHRP, l - LISP
           + - replicated route, % - next hop override
    
    Gateway of last resort is not set
    
          192.168.0.0/32 is subnetted, 3 subnets
    <strong>B        192.168.0.1 [20/1] via 192.168.1.1, 00:09:43
    </strong>C        192.168.0.2 is directly connected, Loopback0
    <strong>B        192.168.0.3 [20/0] via 192.168.2.3, 00:00:08
    </strong>      192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
    C        192.168.1.0/24 is directly connected, GigabitEthernet0/0
    L        192.168.1.2/32 is directly connected, GigabitEthernet0/0
          192.168.2.0/24 is variably subnetted, 2 subnets, 2 masks
    C        192.168.2.0/24 is directly connected, GigabitEthernet1/0
    L        192.168.2.2/32 is directly connected, GigabitEthernet1/0
    <strong>B     192.168.11.0/24 [20/0] via 192.168.1.1, 00:08:43
    </strong>S     192.168.22.0/24 is directly connected, Null0
    <strong>B     192.168.33.0/24 [20/0] via 192.168.2.3, 00:07:22
    </strong>




    
    [admin@MikroTik] /routing bgp> /ip route pr
    Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme, 
    B - blackhole, U - unreachable, P - prohibit 
     #      DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE
    <strong> 0 ADb  192.168.0.1/32                     192.168.2.2              20
     1 ADb  192.168.0.2/32                     192.168.2.2              20</strong>
     2 ADC  192.168.0.3/32     192.168.0.3     loopback0                 0
     3 ADC  192.168.2.0/24     192.168.2.3     ether1                    0
    <strong> 4 ADb  192.168.11.0/24                    192.168.2.2              20
     5 ADb  192.168.22.0/24                    192.168.2.2              20</strong>
     6 A SB 192.168.33.0/24                                              1
    [admin@MikroTik] /routing bgp> 
    
    



Prefix di vyatta, cisco dan mikrotik sudah menerima prefix dari bgp yang ditandai dengan huruf tebal.

Langkah selanjutnya adalah cek koneksi pada router ujung ke ujung apakah sudah benar tersambung.


    
    [admin@MikroTik] > /tool traceroute 192.168.0.1 src-address=192.168.0.3 count=1
    # ADDRESS LOSS SENT LAST AVG BEST WORST STD-DEV STATUS
    1 192.168.2.2 0% 1 8.8ms 8.8 8.8 8.8 0
    2 192.168.0.1 0% 1 17.7ms 17.7 17.7 17.7 0
    
    [admin@MikroTik] >



Hal ini berarti perangkat sudah saling terhubung.

Pengaturan bgp pada ketiga perangkat tersebut dapat dilihat di sini; [Mikrotik](https://gist.github.com/udienz/425d3229d0c6ad778a79), [Cisco](https://gist.github.com/udienz/3689f92893115a73b066), dan [Vyatta](https://gist.github.com/udienz/2d6af8a5290c9b001d20)
