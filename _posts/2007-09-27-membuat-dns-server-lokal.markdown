---
author: udienz
comments: true
date: 2007-09-27 20:33:52+00:00
layout: post
slug: membuat-dns-server-lokal
title: Membuat DNS Server Lokal
wordpress_id: 410
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- Debian
- dns
- Linux
- Networking
- server
- tutorial
---

**Summary**




Domain Name Service (DNS) is an Internet service that maps IP addresses and fully qualified domain names (FQDN) to one another. In this way, DNS alleviates the need to remember IP addresses. Computers that run DNS are called_name servers_. Ubuntu ships with **BIND** (Berkley Internet Naming Daemon), the most common program used for maintaining a name server on Linux. 








## Server









### Primary Server





The primary server who user in immkota.org domain is **192.168.1.1**, Based on Debian Server. The SOA for this domain is **ns1.immkota.org**








### Secondary Server





The Secondary Server who user  in immkota.org domain is 192.168.1.11, Based on Ubuntu Server 








## Domain









#### Primary Domain Controller





SOA (start of authority) dari domain immkota.org adalah 192.168.1.1 








#### Secondary Server





Controlled by 192.168.1.11 (Ubuntu 7.04 Server) 








### Domains





we used immkota.org, and this domain have much sub domain such us 



<table >
<tr >

<td >


[www.immkota.org](http://www.immkota.org/)



</td>

<td >


[blog.immkota.org](http://blog.immkota.org/)



</td>

<td >


[forum.immkota.org](http://forum.immkota.org/)



</td>
</tr>
<tr >

<td >


[elearning.immkota.org](http://forum.immkota.org/)



</td>

<td >


[nino.immkota.org](http://nino.immkota.org/)



</td>

<td >


[udienz.immkota.org](http://udienz.immkota.org/)



</td>
</tr>
<tr >

<td >


[loetphi.immkota.org](http://loetphi.immkota.org/)



</td>

<td >


[ubuntu.immkota.org](http://ubuntu.immkota.org/)



</td>

<td >


[debian.immkota.org](http://debian.immkota.org/)



</td>
</tr>
</table>
<!-- more -->








### Configuration





before you build the server (localhost), you must install bind, dhcpd, proftpd, mysql, php5, and apache. to install those programs follow this instructions: (become root) 







    
    $ apt-get install bind9





then you must  make file to definition this domain, to build domain follow this instructions: 







    
    $ touch /etc/bind/192.168.1.1.rev
    <span class="anchor"></span>$ chmod 644 /etc/bind/192.168.1.1.rev
    <span class="anchor"></span>$ chown root.bind /etc/bind/192.168.1.1.rev
    <span class="anchor"></span>$ touch /etc/bind/immkota.hosts
    <span class="anchor"></span>$ chmod 644 /etc/bind/immkota.hosts
    <span class="anchor"></span>$ chown root.bind /etc/bind/immkota.hosts





don't forget to typing those file, type those file like below: 








#### file in /etc/bind/192.168.1.rev








    
    $ttl 38400
    <span class="anchor"></span>10.168.192.in-addr.arpa.    IN    SOA    ns1.immkota.org. udienz.immkota.org. (
    <span class="anchor"></span>                    07102006
    <span class="anchor"></span>                    10800
    <span class="anchor"></span>                    3600
    <span class="anchor"></span>                    604800
    <span class="anchor"></span>                    38400 )
    <span class="anchor"></span>1.168.192.in-addr.arpa.    IN    NS    ns1.immkota.org.
    <span class="anchor"></span>1.1.168.192.in-addr.arpa.    IN    PTR    ns1.immkota.org
    <span class="anchor"></span>11.1.168.192.in-addr.arpa.   IN    PTR    udienz.immkota.org









#### file in /etc/bind/immkota.org.hosts





    
    $ttl 38400
    immkota.org.            IN    SOA    ns1.immkota.org. udienz.immkota.org. (
                        07102006
                        10800
                        3600
                        604800
                        38400 )
    immkota.org.            IN    NS    ns1.immkota.org.
    immkota.org.	IN	TXT	"v=spf1 a mx ip4:192.168.0.0/16 include:_.immkota.org ~all"
    _xmpp-server._tcp.immkota.org.	IN	SRV	5 0 5269 udienz.immkota.org.
    server.immkota.org.     IN    A    192.168.1.1
    server			IN	AAAA fe80::f66d:4ff:fe2e:4096
    ns1.immkota.org.        IN    A    192.168.1.1
    ns1			IN	AAAA fe80::f66d:4ff:fe2e:4096
    www.immkota.org.        IN    CNAME	server
    blog.immkota.org.       IN    CNAME	server
    forum.immkota.org.      IN    CNAME	server
    nino.immkota.org.       IN    CNAME	server
    elearning.immkota.org.  IN    CNAME	server
    ubuntu.immkota.org.     IN    CNAME	udienz
    udienz.immkota.org.     IN    A    192.168.1.11
    udienz			IN	AAAA fe80::d029:e0ff:fea5:2131
    debian.immkota.org.     IN    CNAME	udienz





#### file in /etc/bind/named.conf.local








    
    zone "immkota.org" {
    <span class="anchor"></span>    type master;
    <span class="anchor"></span>    file "/etc/bind/immkota.org.hosts";
    <span class="anchor"></span>    };
    <span class="anchor"></span>zone "1.168.192.in-addr.arpa" {
    <span class="anchor"></span>    type master;
    <span class="anchor"></span>    file "/etc/bind/192.168.1.rev";
    <span class="anchor"></span>    };









#### file in /etc/hosts








    
    127.0.0.1    localhost
    <span class="anchor"></span>192.168.1.1    server.immkota.org    server
    <span class="anchor"></span># The following lines are desirable for IPv6 capable hosts
    <span class="anchor"></span>::1     ip6-localhost ip6-loopback
    <span class="anchor"></span>fe00::0 ip6-localnet
    <span class="anchor"></span>ff00::0 ip6-mcastprefix
    <span class="anchor"></span>ff02::1 ip6-allnodes
    <span class="anchor"></span>ff02::2 ip6-allrouters
    <span class="anchor"></span>ff02::3 ip6-allhosts









#### file in /etc/host.conf








    
    multi on
    <span class="anchor"></span>order hosts, bind









#### file in /etc/hostname








    
    server









#### file in /etc/resolv.conf








    
    search immkota.org
    <span class="anchor"></span>nameserver 192.168.1.1
    <span class="anchor"></span>









#### finishing





don't forget to restart bind services 







    
    $ /etc/init.d/bind restart
