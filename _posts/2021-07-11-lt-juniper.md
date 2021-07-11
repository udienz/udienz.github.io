---
layout: post
title: "Catatan untuk mengaktifkan interface logical tunnel di Juniper"
date: 2021-07-11
categories:
    - Networking
tags:
    - juniper
    - bgp
    - ospf
---

Seringkali saya kelupaan untuk membuat interface logical tunnel di Juniper,
interface ini menggunakan nama lt-0/0/0. Biasanya digunakan untuk membuat tunnel
antara main router dengan logical interface


Untuk membuat logical tunnel in adalah dengan cara sebagai berikut:
```          
fpc 0 {
    pic 0 {
        tunnel-services {
            bandwidth 10g;
        }
}
```

atau dengan commna dberikut:

```
set chassis fpc 0 pic 0 tunnel-services bandwidth 10g
```

## Verifikasi
Verifikasinya, silakan cek dengan perintah berikut:
```
mahyuddin@PE1> show interfaces lt-0/0/0   
Physical interface: lt-0/0/0, Enabled, Physical link is Up
  Interface index: 152, SNMP ifIndex: 542
  Type: Logical-tunnel, Link-level type: Logical-tunnel, MTU: Unlimited, Speed: 10000mbps
  Device flags   : Present Running
  Interface flags: Point-To-Point SNMP-Traps Internal: 0x4000
  Link flags     : None
  Physical info  : 13
  Current address: 2c:6b:f5:41:25:00, Hardware address: 2c:6b:f5:41:25:00
  Last flapped   : 2021-07-09 18:26:35 WIB (2d 00:09 ago)
  Input rate     : 496 bps (0 pps)
  Output rate    : 0 bps (0 pps)
                 
```
Terlihat interface logical tunnel sudah up, perlu dicatat bahwasanya interface ini mempunyau MTU
yang tidak terhingga, sehingga terkadang anda harus mendeklarasikan manual berapa MTU yang akan anda
gunakan.

## Implementasi

Kita akan membuat simulai bagaimana main router berkomunikasi dengan logical system, logical system ini
kalau di Linux bisa dikatakan sebuat vitual Router, yang ebrdiri sendiri dan mempunyai
tabel routing yang berbeda dari master

Hal yang perlu diperhattikan,
 - Kita akam membuat ip /30 untuk berkomunikasi. Kita akan menggunakan 5.0.255.0/30
 - Kita akan menggunakan 2403:5:1:255::255:0/127 untuk ipv6 nya
 - Kita akan menbuat BGP dan OSPF untuk komunikasi antar router ini, mirip dengan dua buah router bukan?
 - main router akan dinamakan dengan PE1 dan logical system akan dinamakan dengan VR1
 
Kemudian kita buat logical interface di main router dan loopback nya
```
mahyuddin@PE1> show configuration interfaces lo0    
unit 0 {
    family inet {
        address 5.0.0.1/32;
    }
    family inet6 {
        address 2403:5::0:0:1/128;
    }
}


mahyuddin@PE1> show configuration interfaces lt-0/0/0 
unit 0 {
    description "VR 1";
    encapsulation ethernet;
    mtu 9000;
    peer-unit 1;
    family inet {
        address 5.0.255.1/30;
    }
    family inet6 {
        address 2403:5:1:255::255:0/127;
    }
    family mpls;
}

```
Selanjutnya kita akan membuat logical interface juga di logical system dan membuat loopback
```
mahyuddin@PE1> show configuration logical-systems VR1 interfaces 
lt-0/0/0 {
    unit 1 {
        encapsulation ethernet;
        mtu 9000;
        peer-unit 0;
        family inet {
            address 5.0.255.2/30;
        }
        family inet6 {
            address 2403:5:1:255::255:1/127;
        }
        family mpls;
    }
}
lo0 {
    unit 255 {
        family inet {
            address 5.0.255.255/32;
        }
        family inet6 {
            address 2403:5::0:0:255/128;
        }
    }
}

```

Perharikan peer-unit di kedua interface tersebut, di main router interface ini akan peer dengan
unit 1 yang ada di logical system. Peer unit ini harus match, jika tidak kedua router tidak akan bisa
untuk berkomunikasi

## Verifikasi ping
```
mahyuddin@PE1> ping 5.0.255.255 count 5 
PING 5.0.255.255 (5.0.255.255): 56 data bytes
64 bytes from 5.0.255.255: icmp_seq=0 ttl=64 time=5603.417 ms
64 bytes from 5.0.255.255: icmp_seq=1 ttl=64 time=4605.009 ms
64 bytes from 5.0.255.255: icmp_seq=2 ttl=64 time=3602.966 ms
64 bytes from 5.0.255.255: icmp_seq=3 ttl=64 time=2600.384 ms
64 bytes from 5.0.255.255: icmp_seq=4 ttl=64 time=1598.394 ms

--- 5.0.255.255 ping statistics ---
5 packets transmitted, 5 packets received, 0% packet loss
round-trip min/avg/max/stddev = 1598.394/3602.034/5603.417/1416.289 ms

```

## Setup bgp dan ospf

Kita kaan meembuat ospf session di kedua router dan mengaktifkan bgp session kedua router tersebut,
namun kita akan menggunakan ip loopback untuk bgp session ini.

Di router PE1
```
mahyuddin@PE1> show configuration protocols bgp 
group internal {
    type internal;
    description iBGP;
    local-address 5.0.0.1;
    family inet {
        unicast {
        }
    }
    cluster 5.0.0.1;
    neighbor 5.0.255.255;
}
group internal6 {
    type internal;
    local-address 2403:5::0:0:1;
    family inet6 {
        unicast;
    }
    neighbor 2403:5::255;
}
```
Sedangkan di VR1 configurasinya adalah sebagai berikut:
```
mahyuddin@PE1> show configuration logical-systems VR1 protocols bgp 
group internal {
    type internal;
    description iBGP;
    local-address 5.0.255.255;
    import default-accept;
    family inet {
        unicast;
    }
    export ipv4-ibgp-out;
    cluster 5.0.255.255;
    neighbor 5.0.0.1;
}
group internal6 {
    type internal;
    local-address 2403:5::255;
    import ipv6-ibgp-in;
    family inet6 {
        unicast;
    }
    export ipv6-ibgp-out;
    neighbor 2403:5::0:0:1;
}
```
## Verifikasi

OSPF

```
mahyuddin@PE1> show ospf neighbor 
Address          Interface              State     ID               Pri  Dead
5.0.255.2        lt-0/0/0.0             Full      5.0.255.255      128    32

mahyuddin@PE1> show ospf3 neighbor 
ID               Interface              State     Pri   Dead
5.0.255.255      lt-0/0/0.0             Full      128     39
  Neighbor-address fe80::5200:0:0:100
```
BGP

```
mahyuddin@PE1> show bgp summary 
Groups: 5 Peers: 6 Down peers: 0
Table          Tot Paths  Act Paths Suppressed    History Damp State    Pending
inet.0               
                      25          8          0          0          0          0
bgp.l3vpn.0          
                       0          0          0          0          0          0
bgp.l2vpn.0          
                       0          0          0          0          0          0
inet6.0              
                      13          7          0          0          0          0
Peer                     AS      InPkt     OutPkt    OutQ   Flaps Last Up/Dwn State|#Active/Received/Accepted/Damped...
5.0.255.255               5       4420       4376       0       0  1d 9:13:53 Establ
  inet.0: 0/8/4/0
2403:5::255               5       4345       4289       0       0  1d 8:40:24 Establ
  inet6.0: 7/13/13/0

```

Mudah bukan
