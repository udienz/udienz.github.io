---
author: udienz
comments: true
date: 2007-01-21 09:11:04+00:00
layout: post
slug: menambah-daftar-repository-di-ubuntudebian
title: menambah Daftar Repository di Ubuntu/Debian
wordpress_id: 659
categories:
- Debian
- Linux
- Ubuntu
tags:
- Debian
- Linux
- tutorial
- ubuntu
---

Ada kalanya kita ingin mengoleksi program2 yang telah kita download/instal kedalam komputer menjadi satu kesatuan, seingga apa bila kita berpindah ke komputer lain maka kita tidak akan kesulitan mencari/mendownload program kesayangan kita. Linux Debian memberikan solusi cerdas yang dapat membuat daftar program2 kesayangan kita, melalui tool cerdas dpkg-nya. berikut adalah caranya:

1. download prgram2 yang kita inginkan
2. prgram2 yang telah kita download biasanya terletak di directory /var/apt/cache/ <kalo tidak salah>
3. copy aja semua program itu kedirektory kesayangan kita, contohnya di /home/*/ubuntu/repository/
4. setelah itu ganti file permission dari semua file tersebut dengan menggunakan perintah
sudo chmod 777 /home/*/ubuntu/repository/
5. setelah itu kita akn menyusun library dari program kesayangan kita dengan perintah
sudo dpkg-scanpackages repository/ /dev/null | gzip -9c > packages.gz
6. stelah itu buat direktory dists>main>restricted>binary-i386
7. copy file packages.gz ke /home/*/ubuntu/dists/main/restricted/binary-i386/
8. jangan lupa file yang berektensi *.deb di letakkan di direktory /home/*/ubuntu/repository/
9. tambahkan daftar repository kita dengan mengedit /etc/apt/source.list menggunkan perintah
sudo gedit /etc/apt/source.list
10. tambahkan daftar repositorynya pada baris terakhir dengan script
file:/home/*/ubuntu/ main restricted
11. save dan exit
12. ketikkan sudo apt-get update
13. dan kita udah mempunyai list program kesayangan kita

Server penyedia Repository Ubuntu yang ada di indonesia salah satunya adalah kambing.ui.edu
>udienz
Greetz: IT Community, AdminLabKom ee.Unej,Arie,Ubuntuers Indonesia
