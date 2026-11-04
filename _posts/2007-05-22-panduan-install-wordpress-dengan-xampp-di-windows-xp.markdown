---
author: udienz
comments: true
date: 2007-05-22 15:33:44+00:00
layout: post
slug: panduan-install-wordpress-dengan-xampp-di-windows-xp
title: PANDUAN INSTALL WORDPRESS DENGAN XAMPP DI WINDOWS XP
description: "Panduan memasang WordPress di komputer lokal Windows XP memakai XAMPP, dari menyiapkan database sampai blog siap dipakai."
wordpress_id: 56
categories:
- Komputer
- Perenungan
tags:
- dan lainya
- Networking
- server
- windows
- Wordpress
- xampp
- xp
---

**Oleh: Udienz***







**INTRO**




Tak diragukan wordpress merupakan website blog yang sangat maju perkembanganya hal ini bisa dilihat dari banyaknya para blogger di seluruh dunia yang menggunakan wordpress sebagai mesin blog mereka. Di Indonesia sendiri perkembangan wordpress sangat cepat hal ini juga di dukung oleh dukungan wordpress dengan antarmuka bahasa Indonesia. Website Indonesia terkemuka banyak yang menggunakan wordpress antara lain Ilmukomputer, Blog Ubuntu Indonesia, dan lainya.




<!-- more -->




Wordpress mempunyai prinsip open source dimana script nya di buka bebas untuk umum dengan begitu anda dapat membuat website anda dengan Wordpress baik itu terhubung dengan internet maupun hanya di komputer sendiri (localhost). 




Di tulisan ini saya akan menunjukkan bagaimana cara membuat blog di komputer sendiri tanpa terhubung di internet. Program yang diperlukan adalah:






	
  1. XAMPP for windows  (sudah termasuk Apache2, MySQL, PHPMyadmin, FileZilla) sialakn mendownload di [http://www.apachefriends.org/en/](http://www.apachefriends.org/en/)

	
  2. Engine wordpress  terbaru, silakan download di [http://wordpress.org](http://wordpress.org/)

	
  3. Komputer yang  telah terinstall Windows XP tentunyaâ€¦..




**Letâ€™s GO!!!**




Pertama-tama  hal yang dilakukan setelah mendownlad **XAMM** dan **Wordpress** adalah anda hanrus log-in  sebagai **_administrator_**_** **_sehingga anda mempunyai akses unlimitted ke system anda, setelah itu klik dua kali program XAMPP anda sehingga muncul gambar sebagai berikut:




_(gambar tidak tersedia: clip_image002_0001.jpg)_




Pada gambar anda diatas disuruh untuk memilih konfigurasi bahasa yang akan digunakan oleh XAMPP, saya memilih bahasa inggris seperti tampilan diatas dan kemudian klik **OK** sehingga muncul gambar sebagai  berikut




_(gambar tidak tersedia: clip_image004_0001.jpg)_




Jika sudah muncul klik **Next**, sehingga muncul tampilan sebagai  berikut:




_(gambar tidak tersedia: clip_image006_0001.jpg)_




Disinikita akan disuruh untuk menentukan lokasi intaller kita di windows, secara default XAMPP akan memilih di root directory partisi system, klik **next**




_(gambar tidak tersedia: clip_image008_0001.jpg)_




Disini anda di beri opsi instalasi XAMPP, sesuaikan  dengan gambar diatas dan klik **INSTALL**




_(gambar tidak tersedia: clip_image010.jpg)_




Tunggu sebentar lagi hingga muncul gambar sebagai  berikut




_(gambar tidak tersedia: clip_image012_0001.jpg)_




**Alhamdulillah** selesai sudah, klik **FINISH** dan akan  muncul dua gambar berikut:




_(gambar tidak tersedia: clip_image014_0001.jpg)_




Kilk **ok**




_(gambar tidak tersedia: clip_image016.jpg)_




Klik **NO**.  Dan sekarang buka Browser Favorit anda (kalo saya Firefox), pada adderss bar  ketikkan [http://localhost](http://localhost/) hingga muncul  tampilan sebagai berikut




_(gambar tidak tersedia: clip_image018.jpg)_




Jikaproses intalasi anda berhasil dan seperti diatas maka akan muncul sebagaimana diatas. Gambar diatas kita disuruh untuk menentukan tampilan bahasa yang akan digunakan, pilih **english** saja sehingga muncul gambar sebagai berikut:




_(gambar tidak tersedia: clip_image020.jpg)_




Cari di panel kiri bawah pada pilihan **TOOLS** dan klik **PHPMyAdmin**, sehingga tampilanya akan muncul sebagai berikut:




_(gambar tidak tersedia: clip_image022.jpg)_




Pada tampilan ini kita akan membuat database blog kita, maka dari itu isikan nama database pada Create new database (dalam hal ini saya menggunakan nama **wordpress**)  dan klik **create**, sehingga muncul  gambar sebagai berikut.




_(gambar tidak tersedia: clip_image024.jpg)_




**Alhamdulillah** database wordpress berhasil dibuat!!! Langkah selanjutnya adalah mesin database  yang telah kita download di unzip ke **C:xampphtdocswordpress** seperti gambar berikut




_(gambar tidak tersedia: clip_image026.jpg)_





Perlu diketahui bahwasanya server Apache2 akan  menmproses di tampilan [http://localhost](http://localhost/)
yang terdapat di direktory C:xampphtdocs gampanganya apapun yang ada di direktori tersebut akan ditampilkan di localhost anda. Bila sudah maka buka browser anda dan ketikkan [http://localhost/wordpress](http://localhost/wordpress) sehingga tampilanya akan muncul sebagai berikut


_(gambar tidak tersedia: clip_image028.jpg)_




Tampilan ini menandakan bahwasanya  anda belum menkonfigurasi file **wp-config.php **tapi tidak apa-apa saya akan menunjukkan caranya. Klik c**reate wp-config.php through web interface** sehingga akan muncul tamplan sebagai berikut







_(gambar tidak tersedia: clip_image029.gif)_




Pada tampilan ini anda harus mengetahui nama  database yang akan dipakai, username nya hostnya dan tabelnyaâ€¦ bingung???? Klik **letâ€™s go**!!




_(gambar tidak tersedia: clip_image031_0001.jpg)_




Isikan nama database yang telah anda buat tadi, untuk  usernamenya masukkan **root** dan  kosongkan passwordnya dan sesuaikan dengan tampilan diatas kemudian kilk **submit**




_(gambar tidak tersedia: clip_image033_0001.jpg)_




Sekali lagi anda telah berhasil membuat singkronisasi  database SQL dan wordpress anda, klik **run  the install**




_(gambar tidak tersedia: clip_image035.jpg)_




Kilk **FIRST  STEP**




_(gambar tidak tersedia: clip_image037.jpg)_




Isikan nama blog anda dan email anda dan klik **CONTINUE TO SECOND STEP**




_(gambar tidak tersedia: clip_image038.gif)_




Ok! Anda elah berhasil kali ini, dan catat username  dan password yang tertera diatas kemudian klik **wp-login.php**




_(gambar tidak tersedia: clip_image040_0001.jpg)_




Masukkan username anda tadi beserta passwordnya




_(gambar tidak tersedia: clip_image042_0001.jpg)_




Alhamdulillah, Selamat anda berhasil membuat blog  pribadi anda di komputer anda!!!! Untuk melihat tampilanya cek di url [http://localhost/wordpress](http://localhost/wordpress)







**ENDING**




Sangat mudah bukan menginstall wordpress?? Selamat  menikmati layanan wordpress













**_*Mahyuddin Susanto_**




_Mantan  Ketua LPP Ikatan Mahasiswa Muhammadiyah Komisariat Tawang Alun Universitas  Jember, Asisten UPT-TI Universitas Jember_




_url: [http://udienz.net](/)_




_email:udienz@gmail.com_
