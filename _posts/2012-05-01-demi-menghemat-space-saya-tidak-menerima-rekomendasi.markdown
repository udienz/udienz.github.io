---
author: udienz
comments: true
date: 2012-05-01 03:00:35+00:00
layout: post
slug: demi-menghemat-space-saya-tidak-menerima-rekomendasi
title: Demi menghemat space, saya tidak menerima rekomendasi
wordpress_id: 28
categories:
- Debian
tags:
- apt
---

Setelah instalasi sistem Debian selesai, yang pertama saya pikirkan adalah space. Kadang apt/aptitude menyertakan paket yang direkomendasikan untuk dipasamng. Nah bagaimana caranya agar sistem tidak memasang paket yang direkomendasikan?


    
    udienz@debian:~$ cat /etc/apt/apt.conf.d/20recommends 
    APT::Install-Recommends "0";
    udienz@debian:~$ 
    



Silakan dicoba
