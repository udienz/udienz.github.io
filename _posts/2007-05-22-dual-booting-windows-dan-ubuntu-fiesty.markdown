---
author: udienz
comments: true
date: 2007-05-22 15:05:02+00:00
layout: post
link: https://blog.mahyudd.in/2007/05/22/dual-booting-windows-dan-ubuntu-fiesty.html
slug: dual-booting-windows-dan-ubuntu-fiesty
title: Dual Booting Windows dan Ubuntu Fiesty
wordpress_id: 55
categories:
- '*indows'
- Komputer
- Linux
- Ubuntu
tags:
- feisty
- Linux
- tutorial
- ubuntu
---

_By: Udienz_

**Intro**

Pada blog sebelumnya ([PANDUAN MENGINSTALL UBUNTU](http://udienz.wordpress.com/2007/05/20/panduan-menginstall-ubuntu/)) kita telah belajar menginstall Ubuntu pada system tunggal dimana hanya terdapat sebuah system, namun di artikel kali ini (karena permintaan teman-teman) saya akan memandu anda untuk meninstall Ubuntu di system yang sudah ada windows XP. Sebelum beranjak tolong perhatikan perlengkapanya antara lain:

<!-- more -->

system Windows XP

Partition Magic

CD Ubuntu Fiesty

CDROM

Mata yang jeli, hati yang tenang (thanx buat Allah yang telah menciptakan)

kopi dan cemilan atau rokok bagi perokok

dan hal-hal lainya yang tidak bertentangan dengan UUD 45

Oke, setelah semua terpenuhi, lanjut broâ€¦â€¦

**
The Show Must Go On**

Pertama tama anda harus menginstall Partition Magic atau software sejenis guna memudahkan pemartisian kita. Jika sudah buka program tersebut, kalo di kompiku tampilanya kaya gini:

[![clip_image002_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image002_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image002_0000.jpg)

Ingat bila anda belum mempunyai partisi kosong (gambar hitam) maka segera buatâ€¦ kalo udah maka buat partisi-partisi Linux dengan cara klik kanan area hitam, hingga muncul seperti gambar dibawah dan pilih crate

[![clip_image003_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image003_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image003_0000.jpg)

Atur konfigurasi dari partisi tersebut, di asumsikan saya akan membuat beberapa partisi di linux dintaranya:

/ (root)

/boot

/home

/var

/tmp

Swap area

Maka buatlah seperti gambar di bawah ini

[![clip_image004_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image004_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image004_0000.jpg)

Gambar diatas untuk partisi /boot

[![clip_image005_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image005_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image005_0000.jpg)
Gambar diatas untuk swap area

[![clip_image006_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image006_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image006_0000.jpg)

Gambar diatas untuk / (root)

[![clip_image007_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image007_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image007_0000.jpg)

Gambar diatas untuk /var

[![clip_image008_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image008_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image008_0000.jpg)

Gambar diatas untuk /tmp

[![clip_image009_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image009_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image009_0000.jpg)

Gambar diatas untuk /home, perlu di ingat bahwasanya anda untuk partisinya tidak harus sama seperti di atas dalam artian di Linx kita boleh memberdakan titik mount di setiap partisi yang berbeda, namun sebenarnya Linux hanya membutuhkan partisi swap dan root karena direktory (titik mount) /home, /var, /boot, /tmp secara default akan dijadikan satu dengan root. Dan karena saya suka untuk membedakan titik mount di setiap partisi yang berbeda maka konfigurasinya seperti di atas, hal ini saya lakukan karena saya melihatnya dari faktor maintenancenya biar lebih aman untuk memisahkan dokumen (/home) dan file dari yang berubah-ubah (/var) agar kalau system rusak maka tidak akan memberi efek ke partisi yang lainâ€¦ tapi terserah anda itulah enaknya Linux

Jika sudah maka illustasi dari partisi hardisk akan nampak sebagai berikut

[![clip_image011_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image011_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image011_0000.jpg)

Kemudian klik aplly di pojok kiri bawah, atau gambarnya seperti di bawah ini

[![clip_image012_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image012_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image012_0000.jpg)

Apabila sudah apply sudah di klik maka akan muncul jendela peringatan sebagaimana gambar di bawah ini:

[![clip_image013_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image013_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image013_0000.jpg)

Gambar diatas menunjukkan bahwa ada 12 oprasi yang akan di lakukan, apabila anda sudah mantap dengan konfigurasi partisi yang telah kita konfogurasi tadi maka klik yes untuk melakukan penulisan partisi ke harddisk, kemudian akan muncul akan gambar di bawah ini dan jangan di ganggu.

[![clip_image014_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image014_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image014_0000.jpg)

Tunggu yaâ€¦ sabar yaâ€¦ minum dulu kopinya

[![clip_image015_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image015_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image015_0000.jpg)

Kalau jendela progress menunjukkan gambar diatas maka proses penulisan sudah selesai dan siap untuk di install ubuntu. Keluarlah dari windows xp dan restart komputer anda

The Freedom is come

Selamat, anda telah membuat harddisk anda layak pakai

Sebelum meng-install Ubuntu pada BIOS harus di set Boot Device Priority-nya dulu, dalam menginstall Ubuntu Boot Device Priority harus di arahkan ke CDROM. Untuk masuk ke BIOS tiap Motherboard mempunyai standart sendiri. Namun sebagian besar tinggal menekan tombol delete atau F2

[![clip_image017_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image017_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image017_0000.jpg)

Kemudian simpan konfigurasinya

[![clip_image019_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image019_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image019_0000.jpg)

Kemudian reboot ulang, dan kalau anda berhasil megkonfigurasikan BIOS dengan benar maka sysem akan membooting via CDROM sehingga tampilan awal dari Ubuntu adalah sebagai berikut

[![clip_image021_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image021_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image021_0000.jpg)

Tampilan yang ramah ini berbeda dengan tampilan Ubuntu sebelumnya dimana ada tambahan pada edisi kali ini yaitu Install with driver Update CD. Perlu diketahui anda dapat memilih bahasa inggris pada tampilan ini ke Bahasa Indonesia. Namun kalau saya biarkan saja, menurut sâ€™to dalam buku Fedora Core nya alasan sâ€™to memilih Bahasa Inggris karena â€œteknologi datang dengan bahasa inggrisâ€. Oke ini adalah tampilan desktop Ubuntu Fiesty yang baru.....!!!!

[![clip_image023_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image023_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image023_0000.jpg)

Untuk menginstall klik install hingga tampilan desktop seperti di bawah ini

[![clip_image025_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image025_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image025_0000.jpg)

Pilih bahasa yang anda gunakan, kalo saya bahasa inggris sajalahâ€¦.. and then clik forward

[![clip_image027_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image027_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image027_0000.jpg)

Oke pilih zona waktu kita, kita gunakan Jakarta saja

[![clip_image029_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image029_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image029_0000.jpg)

Pilih keyboard anda, keyboard yang ada di Indonesia kebanyakan adalan US English

[![clip_image031_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image031_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image031_0000.jpg)

Lha ini yang paling sulitâ€¦â€¦ sabar yaâ€¦ tunggu yaâ€¦

[![clip_image033_00001.jpg](http://udienz.files.wordpress.com/2007/05/clip_image033_00001.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image033_00001.jpg)

Pada tampilan kali ini kita di pilih untuk menentukan mount pointnya dan pilihan-pilihan yang lain, hati-hati banyak yang keliru dalam hal ini yang menyebabkan data system windows rusak. Kita lihat bahwasanya partisi windows di /dev/hda1 telah termount di /media/hda1 jangan beri tanda check format!!! Oke pilih /dev/hda5 dan pilih edit

[![clip_image034_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image034_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image034_0000.jpg)

Ada tiga baris yaitu New partition (sebaiknya jangan dirubah), Use as, Mount point. Untuk partisi ini saya memberikanya ke /boot. Dan lakukan untuk partisi yang lainya sama seperti langkah diatas hingga tampilanya aka muncul sebagai berikut

[![clip_image036_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image036_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image036_0000.jpg)

Oke klik fordward

[![clip_image038_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image038_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image038_0000.jpg)

Inilah kelebihan Ubuntu Fiesty, kita dapat mengimpor dokumen, settingan pada user kita di Windows. Pilih settingan yang akan di expor dan isikan usernya serta klik next

[![clip_image040_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image040_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image040_0000.jpg)

Isikan lagi username secara detail dan passwordnya dan nama host komputer anda dan klik fordward

[![clip_image042_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image042_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image042_0000.jpg)

Inilah hasil konfigurasi kita tadi, bila anda sudah yakin 100% klik install (Konfigurasi kali ini kita tidak mengganggu windows xp kita tadim jadi jangan kawatir data kita safe)

[![clip_image044_0000.jpg](http://udienz.files.wordpress.com/2007/05/clip_image044_0000.jpg)](http://udienz.files.wordpress.com/2007/05/clip_image044_0000.jpg)

Bila muncul tampilan desktop kaya gini maka instalasi telah usai dan untuk mencicipi hasil racikan kita kita diminta Restart System kitaâ€¦â€¦

Dan kalo udah maka anda akan log-in dengan user yang telah kita buat tadi, **SELAMAT DATANG DI DUNIA OPEN SOURCE**, _mari kita sharing Ilmu_!!!!!!

_By: Mahyuddin Susanto_

_Asisten UPT-TI Universitas Jember_

_Aktivis Ikatan Mahasiswa Muhammadiyah Universitas Jember_

_E-mail=udienz@gmail.com_
