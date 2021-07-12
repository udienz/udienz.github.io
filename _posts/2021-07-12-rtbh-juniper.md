---
layout: post
title: "RTBH (Remote Trigger Black Hole) trigger via BGP di Juniper"
date: 2021-07-12
categories:
    - Networking
tags:
    - juniper
    - bgp
---

Di dunia networking, sering kali terjadi DDOS yang mengakibatkan kelumpuhan jaringan.
Untuk menanganinya, salah satunya adalah dengan melakukan menginformasikan ke upstream agar
ip yang terkena DDOS agar di blackhole.

Sayangnya, tidak semua provider ISP di Indonesia menyediakan fitur ini, padahal fitur ini
sudah menjadi fitur tambahan layanan **free** ke semua customer BGP. ~~Di Indonesia ini,
saya dengar malah di jadikan komersil, haha~~

Kita kaan mensimulasikan bagaimana RTBH ini bekerja, saya menggunakan topologi antara upstream
dan downstream

## Topologi
```
Customer AS101 <---- network 5.0.2.4/30 ----> PE1
```
Detailnya:
- Customer Router mempunyai ASN 101, selanjutnya kita akan menyebut dengan CR-101
- CR-101 mempunyai IP 5.0.2.6/30 yang terpasang di interface lt-0/0/0.101
- CR-101 akan mengadvertise prefix 101.0.0.0/16
- Router provider yang selanjutkan akan disebut dengan PE1 mempunyai ASN 5
- PE1 mempunyai IP 5.0.2.5/30 yang terpasang di interface lt-0/0/0.2

## Konfigurasi

Berikut konfigurasi dari PE1

```
interfaces {
	lt-0/0/0 {
		  unit 2 {
		      description "CR-101";
		      encapsulation ethernet;
		      peer-unit 101;
		      family inet {
		          address 5.0.2.5/30;
		      }
		  }
	}
  lo0 {
      unit 0 {
          family inet {
              address 5.0.0.2/32;
          }
      }
  }
}
routing-options {
	autonomous-system 5;
	router-id 5.0.0.2;
}
policy-options {
    route-filter-list ipv4-as101 {
        101.0.0.0/16 upto /24;
    }
    route-filter-list ipv4-as101-blackhole {
        101.0.0.0/16 prefix-length-range /32-/32;
    }
    policy-statement ipv4-as101-in {
        term blackhole {
            from {
                protocol bgp;
                community BLACKHOLE;
                route-filter-list ipv4-as101-blackhole;
            }
            then {
                next-hop discard;
                accept;
            }
        }
        term bgp {
            from {
                protocol bgp;
                route-filter-list ipv4-as101;
            }
            then accept;
        }
        term last {
            then reject;
        }
    }
}
protocols {
    group ipv4-as101 {
        type external;
        import ipv4-as101-in;
        family inet {
            unicast;
        }
        peer-as 101;
        neighbor 5.0.2.6;
    }
}
```

Berikut adalah konfigurasi dari CR-101

```
interfaces {
    lt-0/0/0 {
        unit 101 {
            encapsulation ethernet;
            peer-unit 2;
            family inet {
                address 5.0.2.6/30;
            }
        }
    }
    lo0 {
        unit 101 {
            family inet {
                address 101.0.0.1/32;
            }
        }
    }
}
protocols {
    bgp {
        group ipv4-as5 {
            type external;
            local-address 5.0.2.6;
            import ipv4-as5-in;
            family inet {
                unicast;
            }
            export ipv4-as5-out;
            peer-as 5;
            neighbor 5.0.2.5;
        }
    }
}
policy-options {
    route-filter-list ipv4-ours {
        101.0.0.0/16 upto /24;
    }
    route-filter-list ipv4-ours-blackhole {
        101.0.0.0/16 prefix-length-range /32-/32;
    }
    policy-statement ipv4-as5-in {
        term default {
            then accept;
        }
    }
    policy-statement ipv4-as5-out {
        term static-blackhole {
            from {
                protocol static;
                community BLACKHOLE;
                route-filter-list ipv4-ours-blackhole;
            }
            then accept;
        }
        term static {
            from {
                protocol static;
                route-filter-list ipv4-ours;
            }
            then accept;
        }
        term last {
            then reject;
        }
    }
    community BLACKHOLE members 65535:666;
}
routing-options {
    static {
        route 101.0.0.0/16 discard;
        route 101.0.0.0/24 discard;
        route 101.0.1.0/24 discard;
    }
    router-id 101.0.0.1;
    autonomous-system 101;
}
```

## Penjelasan

Pada konfigurasi diatas, beberapa hal yang perlu diperhatikan adalah:
- Di PE1, kita perlu membuat route-filter-list dua kali, yaitu untuk filter bgp yang umum
  (route-filter-list ipv4-as101) dan filter bgp blackhole (route-filter-list ipv4-as101-blackhole)
- Pada policy statement ipv4-as101-in, term blackhole akan mengecek apakah benar ip yang diadvertise
  mempunyai prefix /32 dan memunyai tag blackhole (65535:666). Jika benar maka akan diarahkan ke
  interface discard. Jika yang diadvertise /16 sampai /24 maka akan dipreses term bgp.
- Pada CR-101, saat ini belum mengirimkan blackhole, hanya ip 101.0.0.0/16, 101.0.0.0/24 dan 101.0.1.0/24.

## Blackhole dari CR-101

Untuk mengirimkan prefix blackhole, ketikkan perintah berikut:

```
set routing-options static route 101.0.66.66/32 discard
set routing-options static route 101.0.66.66/32 community 65535:666
```

Ingat, hanya advertise /32 dari network 101.0.0.0/16 ya

## Verifikasi

Untuk verifikasi, bisa di cek di CR-101 dengan mengetikkan perintah berikut
```
> show route advertising-protocol bgp 5.0.2.5 

inet.0: 36 destinations, 36 routes (36 active, 0 holddown, 0 hidden)
  Prefix                  Nexthop              MED     Lclpref    AS path
* 101.0.0.0/16            Self                                    I
* 101.0.0.0/24            Self                                    I
* 101.0.1.0/24            Self                                    I
* 101.0.66.66/32          Self                                    I
```

Sedangkan di PE-1 dapat di cek dengan perintah berikut:
```
> show route 101.0.66.66/32 table inet.0 exact detail 

inet.0: 60 destinations, 71 routes (60 active, 0 holddown, 1 hidden)
101.0.66.66/32 (1 entry, 1 announced)
        *BGP    Preference: 170/-101
                Next hop type: Discard, Next hop index: 0
                Address: 0xa1de64c
                Next-hop reference count: 18
                State: <Active Ext>
                Local AS:     5 Peer AS:   101
                Age: 45:45 
                Validation State: unverified 
                Task: BGP_101.5.0.2.6+179
                Announcement bits (3): 0-KRT 6-BGP_RT_Background 7-Resolve tree 3 
                AS path: 101 I 
                Communities: 65535:666
                Accepted
                Localpref: 100
                Router ID: 101.0.0.1
```

Terlihat ip 101.0.66.66 sudah di di blackhole dan mempunyai bgp community 65535:666

Pada pembahasan selanjutnya, Insya Allah saya akan membahas bagaimana mendstribusikan blackhole ini
ke jaringan melalui iBGP
