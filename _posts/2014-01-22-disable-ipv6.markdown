---
author: udienz
comments: true
date: 2014-01-22 10:58:44+00:00
layout: post
slug: disable-ipv6
title: Disable ipv6
wordpress_id: 810
categories:
- Networking
tags:
- ipv6
---

Bagaimana cara disable ipv6?
Terkadang router [melakukan](http://tools.ietf.org/html/rfc4862) [advertise](http://en.wikipedia.org/wiki/IPv6_address#Stateless_address_autoconfiguration) ipv6nya, mirip dengan dhcp di ipv4. Mau tidak mau system akan mempunyai ipv6 loh.

Nah cara untuk mendisable nya adalah:

    
    sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1



Silakan dicoba
