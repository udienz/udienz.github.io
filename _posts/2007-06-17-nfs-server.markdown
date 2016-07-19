---
author: udienz
comments: true
date: 2007-06-17 10:38:54+00:00
layout: post
link: https://blog.mahyudd.in/2007/06/17/nfs-server.html
slug: nfs-server
title: NFS Server
wordpress_id: 66
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- Linux
- Networking
- nfs
- server
- tutorial
---

#### Instalasi Server NFS



    
    sudo apt-get install nfs-kernel-server nfs-common portmap


Konfigurasi ulang portmasp agar bind tidak mengakses kartu jaringan loopback:

    
    sudo dpkg-reconfigure portmap



    
    sudo /etc/init.d/portmap restart


Definisikan setiap folder untuk di sharing (ekspor):

<!-- more -->

    
    sudoedit /etc/exports


Masukkan definisi sharingan:

Di bawah ini akan memasukkan ijin semua alamat IP antara 192.168.1.1 dan 192.168.1.255 dengan ijin baca/tulis:

    
    /path/to/shared/files 192.168.1.1/24(rw,no_root_squash,async)


Di bawah ini akan memasukkan ijin semua alamat IP antara 192.168.1.1 dan 192.168.1.255 dengan ijin baca:

    
    /path/to/shared/files 192.168.1.1/24(ro,async)


Jika sudah selesai, simpan dan restart server NFS dengan cara: 

    
    sudo /etc/init.d/nfs-kernel-server restart


Sekarang masukkan konfigurasi anda:

    
    sudo exportfs -a




#### Instalasi Client NFS



    
    sudo apt-get install portmap nfs-common




##### Muonting secara manual



    
    cd ~



    
    mkdir temp



    
    sudo mount 192.168.1.1:/path/to/shared/files temp


setelah itu anda harus merestart serfis NFS anda:

    
    sudo /etc/init.d/portmap restart



    
    sudo /etc/init.d/nfs-common restart




##### Proses Mount Otomatis


Buat mount point anda:

    
    <span>sudo mkdir /mnt/files</span>


Ubah konfigurasi fstab: 

    
    <span>gksudo gedit /etc/fstab</span>


Masukkan Add konfigurasi sharingan nya seperti:

    
    192.168.1.1:/path/to/shared/files /mnt/files nfs rsize=8192,wsize=8192,timeo=14,intr


Test konfigurasi anda:

    
    sudo mount /mnt/files


Restart ulang untuk mengetest konfigurasi otomastis mount
