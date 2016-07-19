---
author: udienz
comments: true
date: 2011-02-15 08:24:59+00:00
layout: post
slug: berpartisipasi-di-pengembangan-ubuntu-1-permintaan-sync
title: 'Berpartisipasi di pengembangan Ubuntu [1]: Permintaan Sync'
wordpress_id: 521
categories:
- Debian
- Linux
- Ubuntu
tags:
- Launchpad
- natty
- sid
- sync
- ubuntu-motu
- unstable
---

Berpartisipasi di [Pengembangan Ubuntu](https://wiki.ubuntu.com/UbuntuDevelopment) bisa melalui beberapa proses, bisa melakukan [merge (penggabungan)](https://wiki.ubuntu.com/UbuntuDevelopment/Merging), [sync](https://wiki.ubuntu.com/SyncRequestProcess), [memperbaiki bug](https://wiki.ubuntu.com/HelpingWithBugs), [membuat paket baru](https://wiki.ubuntu.com/UbuntuDevelopment/NewPackages). Dalam tulisan ini saya akan menuliskan tentang bagaimana berpartisipasi di Ubuntu dengan proses sync dari debian. Adapun peralatan yang dibutuhkan adalah [ubuntu-dev-tools](http://packages.ubuntu.com/search?keywords=ubuntu-dev-tools), [devscripts](http://packages.ubuntu.com/search?keywords=devscripts), anda mempunyai profile di Launchpad, [telah mendaftarkan GPG anda](https://launchpad.net/+help/openpgp-keys.html), [menandatangani CoC](https://help.ubuntu.com/community/GnuPrivacyGuardHowto).

Langkah selanjutnya adalah menilik paket apa yang akan anda sync kan ke Ubuntu, silakan lihat di [Ubuntuwire](http://qa.ubuntuwire.com/multidistrotools/universe.html#outdatedinB), saya memilih paket shorewall6. SIlakan lihat di halaman [PTS Debian](http://packages.qa.debian.org/s/shorewall6.html) dan [Launchpad](https://launchpad.net/ubuntu/+source/shorewall6), apakah versinya sudah singkron? owh ternyata belum. Di PTS shorewall mempunyai versi 4.4.17-1 dan di Launchpad mempunyai versi 4.4.16.1. Masih belum yakin? silakan cek lagi dengam tool rmadison.

    
    $ rmadison -u debian shorewall6
    shorewall6 | 4.4.11.6-1 | squeeze | source, all
    shorewall6 | 4.4.16.1-1 | wheezyÂ  | source, all
    shorewall6 | 4.4.17-1Â Â  | sidÂ Â Â Â  | source, all
    $ rmadison shorewall6
    shorewall6 |Â Â  4.2.10-1 | karmic/universe | source, all
    shorewall6 |Â Â Â  4.4.6-1 | lucid/universe | source, all
    shorewall6 | 4.4.10.1-1 | maverick/universe | source, all
    shorewall6 | 4.4.16.1-1 | natty/universe | source, all
    $


Selangjutnya kita harus memeriksa [changelog](http://packages.debian.org/changelogs/pool/main/s/shorewall6/current/changelog) di Debian, apakah yang berubah? owh ternyata hanyalah rilis upstream. jadi tidak akan menjadi masalah. yang akan menjadi masalah adalah jika paket tersebut mempunyai perubahan di Ubuntu, untuk meyakinkan apakah versi tersebut ada perubahan di Ubuntu dapat ditentukan dengan pemversian. Jika shorewall6 mempunyai perubahan di Ubuntu maka versinya akan mempunyai ekor XubuntuY, contoh 4.4.16.1-1ubuntu2. Sebaiknya kita mengecek lagi apakah perubahan itu sudah ada di Debian atau belum. Jika belum maka anda harus melakukan merging (penggabungan), akan dibahas di tulisan selanjutnya. Jika tidak mari kita lanjutkan prosesinya

Permintaan sync dapat dilakukan dengan beberapa metode, yaitu dengan menggunakan tool requestsync (dari ubuntu-dev-tools), membuat bug, atau dengan mengirimkan via email. Jika menggunakan tool request sync maka perintahnya adalah sebagai berikut:

    
    $ requestsync -C -d unstable shorewall6 natty 4.4.17-1


maka akan tampil sebagai berikut:

    
    Summary (one line):
    Sync shorewall6 4.4.17-1 (universe) from Debian unstable (main)
    
    Description:
    Please sync shorewall6 4.4.17-1 (universe) from Debian unstable (main)
    
    Changelog entries since current natty version 4.4.16.1-1:
    
    shorewall6 (4.4.17-1) unstable; urgency=low
    
    * New Upstream Version
    
     -- Roberto C. Sanchez   Thu, 10 Feb 2011 22:19:03 -0500


Silakan ikuti prosedur yang akan menuntun anda selanjutnya. Metode lainya adalah dengan mengirimkan [email](https://help.launchpad.net/Bugs/EmailInterface), mode ini sangat mudah, cukup dengan mengirimkan email ke new@bugs.launchpad.net. Hanya saja alamat email yang akan anda kirim harus didaftarkan dulu ke Launchpad. Berikut adalah contohnya:

    
    From: udienz@ubuntu.com
    To: new@bugs.launchpad.net
    Subject: Sync shorewall6 4.4.17-1 (universe) from Debian unstable (main)
    
     affects ubuntu/shorewall6
     subscribe ubuntu-sponsors
    
    Explanation why Ubuntu delta can be dropped:
    No Ubuntu delta can be dropped
    
    Changelog entries since current natty version 4.4.16.1-1:
    
    shorewall6 (4.4.17-1) unstable; urgency=low
    
    * New Upstream Version
    
     -- Roberto C. Sanchez   Thu, 10 Feb 2011 22:19:03 -0500


Dan silakan dikirim, Langkah lainya adalah dengan membuat bug, silakan membuka halaman [launchpad shorewall6](https://bugs.launchpad.net/ubuntu/+source/shorewall6/). Klik [Report bug](https://bugs.launchpad.net/ubuntu/+source/shorewall6/+filebug) dan ikuti prosedur ini.


[![](http://tripledin.files.wordpress.com/2011/02/gambar-layar-2.png)](http://tripledin.files.wordpress.com/2011/02/gambar-layar-2.png)







Kemudian isi Summary dengan Format "Sync $NAMAPAKET $VERSI ($KOMPONEN) from Debian $RILIS ($KOMPONEN), dalam hal ini saya menuliskanya dengan "Sync shorewall6 4.4.17-1 (universe) from Debian unstable (main)".







[](http://tripledin.files.wordpress.com/2011/02/gambar-layar.png)[![](http://tripledin.files.wordpress.com/2011/02/gambar-layar.png)](http://tripledin.files.wordpress.com/2011/02/gambar-layar.png)


Isi Further information dengan informasi seperti di metode emails. kemudian klik Submit bug report di halaman bawah


[![](http://tripledin.files.wordpress.com/2011/02/gambar-layar-1.png)](http://tripledin.files.wordpress.com/2011/02/gambar-layar-1.png)




Jika sudah anda akan melihat rangkuman bug anda, Lihat halaman berikut untuk melihat hasilnya: [LP: #719191](https://bugs.launchpad.net/ubuntu/+source/shorewall6/+bug/719191). Langkah selanjutnya adalah anda harus men-subscribe [ubuntu-sponsors](https://launchpad.net/~ubuntu-sponsors), kenapa? karenakita tidak mempunyai kuasa untuk melakukan upload ke arsip ubuntu bukan?. Untuk men-subscribe, silakan klik halaman [berikut](https://bugs.launchpad.net/ubuntu/+source/shorewall6/+bug/719191/+addsubscriber), maka tampilannya akan sebagai berikut: dan jangan lupa isikan [ubuntu-sponsors](https://launchpad.net/~ubuntu-sponsors)







[![](http://tripledin.files.wordpress.com/2011/02/gambar-layar-3.png)](http://tripledin.files.wordpress.com/2011/02/gambar-layar-3.png)


Selesai tugas kita, selanjutnya adalah menunggu konfirmasi dari tim [Ubuntu Sponsors](https://launchpad.net/~ubuntu-sponsors). Jika sync anda diterima maka Tim akan menuliskan kata-kata "Sync request ACK'd" dan tim akan mensubscribe [ubuntu-package-archive-administrators](https://launchpad.net/~ubuntu-archive).

Lihat juga prosesi sync yang saya lakukan:



	
  1. [Shorewall-lite
](https://bugs.launchpad.net/ubuntu/+source/shorewall-lite/+bug/717811)

	
  2. [Shorewall6-lite](https://bugs.launchpad.net/ubuntu/+source/shorewall6-lite/+bug/717812)

	
  3. [Gmodels](https://bugs.launchpad.net/ubuntu/+source/gmodels/+bug/707053)


Selamat berpartisipasi di Ubuntu!
