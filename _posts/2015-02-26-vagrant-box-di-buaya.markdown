---
author: udienz
comments: true
date: 2015-02-26 09:15:09+00:00
layout: post
link: https://blog.mahyudd.in/2015/02/26/vagrant-box-di-buaya.html
slug: vagrant-box-di-buaya
title: vagrant box di buaya
wordpress_id: 896
categories:
- Linux
tags:
- vagrant
- virtualbox
- Virtualization
---

Pada saat ini buaya.klas.or.id telah menyediakan box untuk [vagrant](https://www.vagrantup.com/) [0] dengan provider [virtualbox](https://www.virtualbox.org/). Hingga detik ini, beberapa distro yang didukung adalah Centos 5/6/7, Debian 7, OpenSUSE, Ubuntu, Lubuntu dan FreeBSD.

Untuk mengunduh box, dapat dilihat pada halaman berikut:
[http://vagrant.klas.or.id/box/current/](http://vagrant.klas.or.id/box/current/)

Untuk kode sumber builder dapat ditemukan pada halaman github berikut:
[https://github.com/udienz/packer](https://github.com/udienz/packer)

Contoh penggunaan;


    
    mkdir debian-7.8.0-amd64
    vagrant box add --provider virtualbox debian-7.8.0-amd64 http://vagrant.klas.or.id/box/current/virtualbox-debian-7.8.0-amd64.box
    vagrant init debian-7.8.0-amd64
    vagrant up



atau;


    
    mkdir debian7-amd64
    vagrant init buaya/debian7-amd64
    vagrant up



untuk melihat shorturl vagrant buaya pada atlas dapat merujuk pada url [berikut](https://atlas.hashicorp.com/boxes/search?provider=virtualbox&q=buaya) [2]



## Tentang Vagrant



Vagrant adalah sebuah program yang memanfaatkan teknologi Mesin Virtual yang memungkinkan kita untuk membuat lingkungan development software secara portable, mudah di duplikasi, konsisten, sehingga proses pengembangan lebih fleksibel.

Jika menemukan bug, atau usulan improvisasi mohon melaporkan pada github.

Terimakasih

--
[0] https://www.vagrantup.com/
[1] https://www.virtualbox.org/
[2] https://atlas.hashicorp.com/boxes/search?provider=virtualbox&q=buaya
