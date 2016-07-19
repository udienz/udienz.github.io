---
author: udienz
comments: true
date: 2007-07-03 11:41:17+00:00
layout: post
link: https://blog.mahyudd.in/2007/07/03/tip-dan-trik-ubuntu-feisty-yang-biasa-aku-lakukan.html
slug: tip-dan-trik-ubuntu-feisty-yang-biasa-aku-lakukan
title: Tip dan Trik Ubuntu Feisty (yang biasa aku lakukan)
wordpress_id: 384
categories:
- Komputer
- Linux
- Ubuntu
tags:
- feisty
- Linux
- tips dan trik
- tutorial
- ubuntu
---

tulisan ini terinspirasi dari http://majalah-linux.baliwae.com/



         Setelah menginstall Ubuntu Feisty Twan kesayangan kita adakalanya kita mengalami kesusahan seperti saat kita akan memainkan lagu, menambah program, dan lainya. perlu diketahui Ubuntu sendiri menggunakan medium CD sebagai installernya sehingga hanya beberapa program saja yang dapat di muat di cd tersebut, maka kita perlu menambah program yang kita sayangi. berikut adalah trik dan tips yang sering saya gunakan ketika sehabis menginstall ubuntu:




<!-- more -->







  1. **mengaktifkan kartu jaringan**




apabila anda terhubung dengan internet via DHCP server maka lakukan konfigurasi seperti ini:


    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;">gksu gedit /etc/network/interfaces</span>



    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"></span>




sesuaikan isi file dengan dibawah ini




_# The primary network interface - use DHCP to find our address_




_auto eth0 iface eth0 inet dhcp_




Namun apabila anda tidak terhubung dengan DHCP server maka anda perlu mengkonfigurasi kartu jaringan secara manual dengan perintah




sudo ifconfig ethx <nomer-ip> netmask <xxx.xxx.xxx.xxx> misal




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;">sudo ifconfig eth0 192.168.3.90 netmask 255.255.255.0</span>




Ethx maksudnya nomer urut kartu jaringan yang anda gunakan, semisal anda hanya mempunyai satu katu jaringan maka gantilah ethx dengan eth0, namun apabila anda menggunakan gateway maka ketikkan




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> gksu gedit /etc/network/interfaces</span>




_# The primary network interface _




_auto eth0 _




_iface eth0 inet static _




_address 192.168.3.90 _




_gateway 192.168.3.1 _




_netmask 255.255.255.0 _




_network 192.168.3.0 _




_broadcast 192.168.3.255_




Kemudian aktifkan konfigurasi untuk kartu jaringan dengan perintah




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> ifconfig ethx up</span><span style="font-size:10pt;line-height:150%;font-family:Verdana;"></span>




** **







  1. **menambah daftar repository 4 DVD yang telah di kopi      di folder lokal**




Bila anda mempunyai DVD repository yang disediakan oleh tim Ubuntu Indonesia maka anda perlu menambahkanya kedalam daftar repository anda, kemudian buka _konsole_, yang ada di menu **applications**>**accesories**. Ketikkan 




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> gksu gedit /etc/apt/source.list</span>




Masukkan _pasword_, setelah tampil window maka di bagian akhir tambahkan 




_deb file:/home/udienz/ubuntu/dvd1 feisty main restricted _




_deb file:/home/udienz/ubuntu/dvd2 feisty universe_




_deb file:/home/udienz/ubuntu/dvd3 feisty universe_




_deb file:/home/udienz/ubuntu/dvd4 feisty universe multiverse_** **




** **(Lokasinya menyesuaikan dengan folder installernya) dan tambahkan # di setiap kalimat yang mengandung depanya deb http:// dan deb-src http:// hal ini dilakukan untuk mencegah system agar tidak mendownload repository dari internet. kemudian save dan ketikkan 




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> sudo apt-get update</span>




3.       Install XMMS




Bersama Ubuntu sangat mengasyikkan apalagi di tambah dengan dengerin musik, di linux sendiri telah tersedia program yang tersedia gratis dan mirip Winamp. Caranya masukkan perintah 




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;">sudo apt-get install xmms</span>




4.       Install Kubuntu/Xubuntu/Edubuntu




Bagi yang mau dobel desktop manager kita dapat memasukkan perintah




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> </span><i><span style="font-size:10pt;line-height:150%;font-family:Verdana;">s</span></i><span style="font-size:10pt;line-height:150%;font-family:Verdana;">udo apt-get install kubuntu-desktop<i> </i></span>




_ _Atau_ _




    
    <i><span style="font-size:10pt;line-height:150%;font-family:Verdana;"> </span></i><span style="font-size:10pt;line-height:150%;font-family:Verdana;">sudo apt-get install xubuntu-desktop</span>




_ _Atau 




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> sudo apt-get install edubuntu-desktop</span>




Bila ingin menggabungkan semua perintah diatas maka perintahnya adalah




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> </span><i><span style="font-size:10pt;line-height:150%;font-family:Verdana;">s</span></i><span style="font-size:10pt;line-height:150%;font-family:Verdana;">udo apt-get install kubuntu-desktop xubuntu-desktop edubuntu-desktop</span>




_ _







  1. **install codec audio video yang sering di butuhkan **




Biar semua file musik dan video dapat dimainkan di linux maka Caranya ketikan




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> sudo apt-get install w32codecs vlc gxine</span>










  1. **Read/Write Partisi NTFS**




Bila anda menggunakan system dual booting maka lebih baik menggunakan ntfs3g agar kita bisa menulis dan membaca di partisi ntfs, caranya




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> sudo apt-get install ntfs-3g</span>




Kemudian mount partisinya contohnya:




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> sudo mount ntfs-3g /dev/hda1 /media/sistemx</span>




** **







  1. **mengijinkan semua user untuk menulis dan mambaca di      partisi FAT32 dan melewati fdisk saat boot (kata om belutz  ga aman lho...)**




Untuk mempersingkat waktu boot saya lebih suka tidak menscan file system FAT32 dan mengijinkan hak baca tulis kepada siapa saja agar lebih fleksibel, caranya ketik 




    
    <span style="font-size:10pt;line-height:150%;font-family:Verdana;"> gksu gedit /etc/fstab</span>




edit pengaturan nya seperti di bawah ini




_/dev/hda5 /media/dokumenku vfat iocharset=utf8,umask=000             0        0 _






         Bersambung di kesempatan selanjutnyaâ€¦â€¦â€¦
