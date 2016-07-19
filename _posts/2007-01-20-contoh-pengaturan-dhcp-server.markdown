---
author: udienz
comments: true
date: 2007-01-20 18:47:54+00:00
layout: post
slug: contoh-pengaturan-dhcp-server
title: Contoh pengaturan DHCP Server
wordpress_id: 43
categories:
- Linux
tags:
- Debian
- dhcp
- link
- Linux
- Networking
- server
- tutorial
---

bingung ma konfigurasinya DHCP server???? ni ada file contohnya

--start--

# Sample /etc/dhcpd.conf
# (add your comments here)
default-lease-time 600;
max-lease-time 7200;
option subnet-mask 255.255.255.0;
option broadcast-address 192.168.10.255;
option routers 192.168.10.254;
option domain-name-servers 192.168.10.1;
option domain-name "ardienz.com";
subnet 192.168.10.0 netmask 255.255.255.0 {
range 192.168.10.10 192.168.10.100;
range 192.168.10.150 192.168.10.200;
}
--end--

simple kan
