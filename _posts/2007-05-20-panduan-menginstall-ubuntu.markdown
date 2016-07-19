---
author: udienz
comments: true
date: 2007-05-20 08:53:50+00:00
layout: post
slug: panduan-menginstall-ubuntu
title: PANDUAN MENGINSTALL UBUNTU
wordpress_id: 53
categories:
- Linux
- Ubuntu
tags:
- dapper
- Linux
- tutorial
- ubuntu
---

Created by: [Mahyuddin Susanto](http://udienz.wordpress.com/2007/05/20/panduan-menginstall-ubuntu/)


Disini akan di jelaskan secara step by step cara menginstall Ubuntu Edgy. Sebagai catatan harddisk yang digunakan adalah 10Gb (belum di partisi) memory 256MB, Prosesor Intel P4 2.4GHz dan proses penginstallasian ini menggunakan VMware Workstation

<!-- more -->

Sebelum meng-install Ubuntu pada BIOS harus di set Boot Device Priority-nya dulu, dalam menginstall Ubuntu Boot Device Priority harus di arahkan ke CDROM. Untuk masuk ke BIOS tiap Motherboard mempunyai standart sendiri. Namun sebagian besar tinggal menekan tombol **delete** atau **F2. **Ketika membooting pertama kali tekan F2 atau del untuk masuk BIOS, anda harus menekan nya dengan cepat, sebab bila tidak komputer akan masuk ke OS di hardisk. Apabila anda â€œlebih cepatâ€ dari loading komputer anda maka tampilanya akan muncul sebagai berikut:


![1](http://www.geocities.com/mahyuddin_s/panduan_files/image002.jpg)


Kemudian simpan konfigurasinya dan Kemudian reboot ulang


![2](http://www.geocities.com/mahyuddin_s/panduan_files/image004.jpg)





## a.     Mulai meng-install


Setelah di restart, maka akan muncul tampilan layar sebagai berikut (apabila komputer di booting via cdrom)


![1](http://www.geocities.com/mahyuddin_s/panduan_files/image006.jpg)


Pilih Start or Install Ubuntu, tunggu hingga muncul layar seperti di bawah


![4](http://www.geocities.com/mahyuddin_s/panduan_files/image008.jpg)


Gambar diatas menunjukkan bahwasanya kita telah berhasil menjalankan Ubuntu Live-CD. Di LiveCd kita dapat menjajal kemampuan Ubuntu tanpa harus menginstall ke harddisk, pada saat ini anda dapat menulis dokumen, berinternetan, layaknya anada sudah menginstall ke Harddisk. Dan perlu diingat bahwasanya ini hanya bersifat readonly yang berarti semua dokumen yang di simpan di /home hanya lah sementara dan akan hilang jika di reboot. Kita asumsikan anda mempunyai hardisk baru 10 GB belum di partisi dan akan di install Ubuntu.

Langkah selanjutnya kita harus mempartisi harddisk dulu, klik System>Administration>Gnome Partition Editor


![5](http://www.geocities.com/mahyuddin_s/panduan_files/image010.jpg)


Hingga muncul tampilan sebagai berikut


![6](http://www.geocities.com/mahyuddin_s/panduan_files/image012.jpg)


                Karena kita akan membuat partisi baru maka klik kanan di area hitam muda hingga muncul seperti gambar diatas


![7](http://www.geocities.com/mahyuddin_s/panduan_files/image014.jpg)


                Kilk create, kemudian tunggu


![8](http://www.geocities.com/mahyuddin_s/panduan_files/image016.jpg)


Kilk kanan di area hitam muda lagi hingga muncul gambar diatas. Dan jangan lupa kita harus menentukan berapa mesar partisi yang digunakan. Di sini saya mempunyai harddisk 10 GB dengan di partisi 2 yaitu 8,7 GB untuk ext3 dan sisanya untuk swap. Kilk add bila kita sudah mengkonfigurasinya


![9](http://www.geocities.com/mahyuddin_s/panduan_files/image018.jpg)


Setelah kita mengeklik add maka akan muncul warna biru pada areal hitam muda, pada gambar di atas masih terdapat area hitam muda hal ini di karenakan masih adanya ruang sisa. Untuk itu maka kilk kanan lagi pilh new


![10](http://www.geocities.com/mahyuddin_s/panduan_files/image020.jpg)


                Pada gambar diatas areal yang kosong tadi akan digunakan sebagi partisi swap, kemudian klik add, (linux minimal membutuhkan partisi swap dan root) setelah itu bila kita ingin melakukan tindakan pemartisi hardisk yang telah di lakukan tadi maka klik apply hingga muncul tampilan sebagai berikut


![11](http://www.geocities.com/mahyuddin_s/panduan_files/image022.jpg)


Kilk aplly lagi, kmudian tunggu loadingnya


![12](http://www.geocities.com/mahyuddin_s/panduan_files/image024.jpg)


Setelah proses pemartisian harddisk selesai maka akam muncul tampilan sebagai berikut


![3](http://www.geocities.com/mahyuddin_s/panduan_files/image026.jpg)


                Kemudian Klik close. Untuk langsung menginstallnya kita dapat mengeklik icon INSTALL di Desktop dan tunggu loadingnya hingga muncul tampilan sebagai berikut


![13](http://www.geocities.com/mahyuddin_s/panduan_files/image028.jpg)


Dalam gambar di atas kita disuruh untuk menentukan bahasa yang akan kita gunakan, dalam gambar di atas saya memilih bahasa Inggris sebagai Bahasa yang akan digunakan, namun bila menghendaki bahasa Indonesia bisa memilih Bahasa Indonesia. Kemudian klik Fordward hingga muncul gambar sebagai berikut


![14](http://www.geocities.com/mahyuddin_s/panduan_files/image030.jpg)


Di sini kita akan menunjukkan di mana kita berada, karena dengan menunjukkan dimana kita berada system Ubuntu akan menyetel Format waktu GMT di sini saya menggunakan jakarta, bila sudah selesai kilk fordward


![4](http://www.geocities.com/mahyuddin_s/panduan_files/image032.jpg)


Pada gambar di atas kita di susruh untuk menentukan Jenis Keyboard yang kita gunakan, di Indonesia kebanyakan menggunakan American English, klik Fordward hingga muncul gambar sebagai berikut


![16](http://www.geocities.com/mahyuddin_s/panduan_files/image034.jpg)


Tampilan in di maksudkan untuk mengisikan identitas kita perlu di ingat saat mengisi username huruf yang digunakan harus kecil semua dan tidak boleh ada spasi, hal yang sama saat kita mengisi nama komputer kita. Klik Fordward hingga muncul gambar sebagai berikut


![17](http://www.geocities.com/mahyuddin_s/panduan_files/image036.jpg)


Dari tampilan di atas ada dua pilihan yaitu erase disk dan manually edit. Yang dimaksud dengan erase disk adalah menghapus semua isi dari hard disk namun ini cukup berbahaya apa bila anda mempunyai data yang sudah di simpan di harddisk. Untuk amanya pilih manually edit partition. Klik Fordward hingga muncul gambar sebagai berikut


![18](http://www.geocities.com/mahyuddin_s/panduan_files/image038.jpg)


                Karena kita tadi sudah membuat partisi maka Klik Fordward hingga muncul gambar sebagai berikut


![19](http://www.geocities.com/mahyuddin_s/panduan_files/image040.jpg)


Dari gambar di atas kita disuruh untuk menentukan mount point dari dua partisi yang telah kita buat tadi, buatlah seperti gambar di atas. Klik Fordward hingga muncul gambar sebagai berikut


![20](http://www.geocities.com/mahyuddin_s/panduan_files/image042.jpg)


Ini adalah konfigurasi global yang telah kita buat untuk menginstall, Klik install (bila kita sudah mantap dengan konfigurasinya) hingga muncul gambar sebagai berikut


![21](http://www.geocities.com/mahyuddin_s/panduan_files/image044.jpg)




Bila komputer anda menunjukkan gambar seperti ini, maka Ubuntu sedang menyalin system ke dalam komputer anda. Waktu yang dibutuhkan untuk selesai loadingnya tergantung dari performa dari komputer yang anda miliki, sebagai perbandingan ketika saya saya menggunakan Pentium 4 dengan memory 512 MB dibutuhkan waktu sekitar 15menit saja. Setelah itu tunggu hingga tampilan layar sebagi berikut




![5](http://www.geocities.com/mahyuddin_s/panduan_files/image046.jpg)




               Bila tampilan layar di komputer tampak seperti diatas maka berarti intalasi ubuntu di komputer anda telah selesai.


dan ini adalah videonya

![1](http://geo.yahoo.com/serv?s=76001548&t=1177084198&f=us-w74)

[youtube=http://www.youtube.com/watch?v=XcvmNpWI8Cg]
by; Mahyuddin Susanto

asisten UPT-TI universitas Jember
