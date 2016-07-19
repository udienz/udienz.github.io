---
author: udienz
comments: true
date: 2007-07-02 15:14:41+00:00
layout: post
link: https://blog.mahyudd.in/2007/07/02/google-bisa-add-di-sourcelist.html
slug: google-bisa-add-di-sourcelist
title: Google bisa add di source.list
wordpress_id: 381
categories:
- Komputer
- Linux
tags:
- Debian
- google
- Linux
- picassa
- sources.list
- ubuntu
---

Uncle Google ini memang hebat, dah mendunia terkenal dan mendukung OpenSource lho!!

kabargembira buat pecinta Ubuntu, ternyata google bisa di add ke repository kita.

nih caranya:

pertama tama kita harus meng-add [Signing  Key](http://www.google.com/linuxrepositories/aboutkey.html) nya dengan cara

    
    sudo wget -q -O - http://dl.google.com/linux/linux_signing_key.pub | apt-key add -



    
    sudo apt-get update


terus edit source.listnya dan tambahkan

    
    deb http://dl.google.com/linux/deb/ stable non-free


dan install picassa nya...
