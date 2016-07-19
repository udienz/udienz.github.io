---
author: udienz
comments: true
date: 2007-11-25 10:38:58+00:00
layout: post
link: https://blog.mahyudd.in/2007/11/25/wget-di-bawah-proxy.html
slug: wget-di-bawah-proxy
title: wget di bawah proxy
wordpress_id: 133
categories:
- Debian
- Linux
- Networking
tags:
- Debian
- Linux
- Networking
- proxy
- ubuntu
- wget
---

Saya sering lupa yang ini, yaitu lupa setting wget saat di kampus. karena kampus saya menggunkan proxy mana saya sering lupa tuk setting wget.... caranya buka file /etc/wgetrc temukan kata-kata yang berbau proxy....  seperti ini

    
    # You can set the default proxies for Wget to use for http and ftp.
    # They will override the value in the environment.
    http_proxy = http://10.10.1.3:3128/
    ftp_proxy = http://10.10.1.3:3128/
    
    # If you do not want to use proxy at all, set this to off.
    use_proxy = on


karena saya suka menggunakan mc dan pico perintah pengeditanya seperti ini

`$ pico /etc/wgetrc`

kalo sudah simpan dan siap di uji coba boz.....

referensi:

http://milisdad.blogspot.com/2007_09_01_archive.html
