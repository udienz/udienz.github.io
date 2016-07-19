---
author: udienz
comments: true
date: 2013-01-24 10:59:32+00:00
layout: post
link: https://blog.mahyudd.in/2013/01/24/which-ubuntu-repository-should-i-choose.html
slug: which-ubuntu-repository-should-i-choose
title: Which ubuntu repository should i choose?
wordpress_id: 732
categories:
- Ubuntu
tags:
- apt
- ubuntu
---

Menyambung [tulisan sebelumnya tentang debian](http://blog.udienz.web.id/2013/01/24/which-debian-repository-should-i-choose.html), kita lanjut mbahas Ubuntu.

Di Ubuntu juga bisa di sesuaikan, asalkan repository tersebut terdaftar di Launchpad, maka sangat mungkin kita diarahkan ke server indonesia. Untuk pengaturanya bisa dengan mengubah sources.listnya dengan isian seperti berikut:

[sourcecode language="plain"]deb mirror://mirrors.ubuntu.com/mirrors.txt precise main restricted universe multiverse
deb-src mirror://mirrors.ubuntu.com/mirrors.txt precise main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-updates main restricted universe multiverse
deb-src mirror://mirrors.ubuntu.com/mirrors.txt precise-updates main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-backports main restricted universe multiverse
deb-src mirror://mirrors.ubuntu.com/mirrors.txt precise-backports main restricted universe multiverse
deb mirror://mirrors.ubuntu.com/mirrors.txt precise-security main restricted universe multiverse
deb-src mirror://mirrors.ubuntu.com/mirrors.txt precise-updates main restricted universe multiverse[/sourcecode]

Dan lakukan update

[sourcecode language="plain"]$ sudo apt-get update
$ sudo apt-get upgrade[/sourcecode]

Silakan dicoba!
