---
author: udienz
comments: true
date: 2007-05-14 10:54:02+00:00
layout: post
link: https://blog.mahyudd.in/2007/05/14/konfigurasi-fstab-di-debian-gnulinux.html
slug: konfigurasi-fstab-di-debian-gnulinux
title: KONFIGURASI FSTAB DI DEBIAN GNU/LINUX
wordpress_id: 47
categories:
- Linux
tags:
- Debian
- fstab
- Linux
- tutorial
---

Di Linux/Ubuntu/Debian tidak mengenal drive letter (C, D, E, dstâ€¦) melainkan Linux bila mengenal hardisk PATA/IDE dengan partisinya diwakili oleh had, hdb, hdc, dan hdd. Nama-nama tersebut mewakili primary master (hda), primary slave (hdb), secondary master (hdc), secondary slave (hdd). Apabila dalam suatu hardisk primary master terdapat empat partisi yang terdiri dari dua partisi primer dan dua partisi sekunder maka penamaanya adalah hda1, hda2, hda5 dan hda6. Bila hardisk nya adalah SATA/SCSI/USB maka Linux mengenalnya dengan sda, sdb, sdc dan sdd.




<!-- more -->









<table cellpadding="0" cellspacing="0" style="border:medium none;border-collapse:collapse;" border="1" class="MsoNormalTable" >
<tr >

<td width="32" style="border:1pt solid black;width:23.75pt;padding:0 5.4pt;" >


No



</td>

<td width="83" style="width:62pt;border-color:black black black #000000;border-style:solid solid solid none;border-width:1pt 1pt 1pt medium;padding:0 5.4pt;" >


Hardware



</td>

<td width="255" style="width:191.3pt;border-color:black black black #000000;border-style:solid solid solid none;border-width:1pt 1pt 1pt medium;padding:0 5.4pt;" >


Pengaturan Bios



</td>

<td width="174" style="width:130.8pt;border-color:black black black #000000;border-style:solid solid solid none;border-width:1pt 1pt 1pt medium;padding:0 5.4pt;" >


di Linux



</td>
</tr>
<tr >

<td width="32" style="width:23.75pt;border-color:#000000 black black;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0 5.4pt;" >


1



</td>

<td width="83" style="width:62pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


PATA/SATA



</td>

<td width="255" style="width:191.3pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Primary Master, Partisi primer ke 1 -3



</td>

<td width="174" style="width:130.8pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


hda1-hda3 / sda1-sda3



</td>
</tr>
<tr >

<td width="32" style="width:23.75pt;border-color:#000000 black black;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0 5.4pt;" >


2



</td>

<td width="83" style="width:62pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


PATA/SATA



</td>

<td width="255" style="width:191.3pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Primary Slave, Partisi logical ke 5 - ~



</td>

<td width="174" style="width:130.8pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


hdb5â€“ hdb~ / sdb5-sdb~



</td>
</tr>
<tr >

<td width="32" style="width:23.75pt;border-color:#000000 black black;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0 5.4pt;" >


3



</td>

<td width="83" style="width:62pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


PATA/SATA



</td>

<td width="255" style="width:191.3pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Secondary Slave, Partisi primer ke 1 -3



</td>

<td width="174" style="width:130.8pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


hdc1-hdc3 / sdc1-sdc3



</td>
</tr>
<tr >

<td width="32" style="width:23.75pt;border-color:#000000 black black;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0 5.4pt;" >


4



</td>

<td width="83" style="width:62pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


PATA/SATA



</td>

<td width="255" style="width:191.3pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Secondary Maste, Partisi logical ke 5 - ~



</td>

<td width="174" style="width:130.8pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


hdc5â€“ hdc~ / sdc5-sdc~



</td>
</tr>
<tr >

<td width="32" style="width:23.75pt;border-color:#000000 black black;border-style:none solid solid;border-width:medium 1pt 1pt;padding:0 5.4pt;" >


5



</td>

<td width="83" style="width:62pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Floppy



</td>

<td width="255" style="width:191.3pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >




</td>

<td width="174" style="width:130.8pt;border-style:none solid solid none;border-width:medium 1pt 1pt medium;padding:0 5.4pt;" >


Fd0



</td>
</tr>
</table>





Di Linux proses mounting suatu file system dapat dilakukan secara manual maupun otomatis, sehingga user dapat memilih untuk menggunakan metode Otomatis atau manual yang ribet.




Berbicara tentang proses mounting tentu tidak afdhol bila tidak disertai dengan penyinggungan file fstab, fstab berfungsi utnuk konfigurasi filesystem yang akan di mount  oleh system Linux. File fstab ini terletak di direktori /etc. Untuk membukanya kita dapat menggunakan text editor kesayangan kita. 




Contoh: saya mempunyai harddisk yang terinstall *indows XP dan Debian sebagai rincianya *indows (C/NTFS) terletak di Partisi primer pertama pada Harddisk SATA, sedangkan Debian terinstall di Harddisk PATA di primer partisi pertama (root). Selain itu saya mempunyai partisi D/E yang berisikan dokumen-dokumen dengan format FAT32 serta sebuah DVDR. Untuk mempermudah pekerjaan saya maka saya akan memounting file system tersebut secara otomatis dan hal yang akan saya lakukan adalah mendaftarkan partisi yang ada di harddisk di file fstab. Contoh isi dari file /etc/fstab:




# /etc/fstab: static file system information.




#




# <file system> <mount point>   <type>  <options>       <dump>  <pass>




proc            /proc           proc    defaults        0       0




/dev/hda2       /               ext3    defaults,errors=remount-ro 0       1




/dev/hda7       /home           ext3    defaults        0       2




/dev/hda6       /var            ext3    defaults        0       2




/dev/hda5       none            swap    sw              0       0




/dev/hda8       /media/master           vfat iocharset=utf8,umask=000  0    0




/dev/sda1       /media/*indows          ntfs   defaults              0       0




/dev/sda5       /media/dokumenku        vfat iocharset=utf8,umask=000  0    0




/dev/hdb        /media/cdrom0   udf,iso9660 user,noauto     0       0




Berikut adalah rincian dari kooonfigurasi fstab







  1. file      system




berisikan tentang posisi filesystem itu berada (normalnya di /dev)







  1. Mount      Point




Tempat tujuan filesystem yang akan di mapping/mount







  1. Filesystem




Berisikan tentang informasi jenis filesystem yang di gunakan oleh partisi yang dimiliki. Filesystem yang telah didukung Linux sangat banyak sekali diantaranya adalah cramfs, hpfs, iso9660 (untuk CDROM), minix, msdos, ncfs, nfs, smbfs, sysv, ufs, umsdos, vfat, ntfs, ext2/3, ReiserFS, XFS, JFS, dan lainya. Naum perlu diperhatikan bahwasanya untuk NTFS, hpfs, dan ufs Linux hanya bisa membaca saja (read only).







  1. Mount Options




pada saat booting Linux akan me-mount file system yang telah di definisikan di fstab dengan beberapa opsi hal ini di lakukan karena berbagai alasan antaranya adalah kompabilitas dan keamanan. Beberapa opsi yang sering di pakai adalah:






	
  1. 


    1. Defaults







Bagi yang tidak ingin ribet gunakan ini saja karena Linux akan menyusaikan dengan kemampunya.






	
  1. 


    1. Errors=remount-ro







Ini digunakan apabila bila terjadi error pada saat pengecekan saat booting maka partisi tersebut akan di mount secara read-only, hal ini memberi keuntungan karena dengan metode ini apa bila terjadi error maka filesystem yang error akan terdeteksi tanpa merusak filesystem tersebut.






	
  1. 


    1. Sw







Opsi in bila anda menggunakan partisi swap






	
  1. 


    1. Ro







Opsi ini di gunakan untuk proses mounting file system dalam keadaan baca saja (red only)






	
  1. 


    1. No auto







Opsi ini digunakan untuk mencegah Linux memount pada saat booting, sehingga apabila anda ingin memount filesystem ini harus dilakukan secara manual.






	
  1. 


    1. Dump Flag







Digunakan untuk memback-up filesystem, pada opsi ini terdapat dua pilihan yaitu 1 dan 0. opsi 1 digunakan bila ingin membuat back-up dan 0 bila tidak membuat baack-upnya






	
  1. 


    1. Pass







Opsi ini digunakan untuk memeriksa file system pada saat Linux booting, gunakan 1 untuk melakukan cheking sedang nol untuk melewatinya




Pada contoh diatas saya menggunakan opsi iocharset=utf8,umask=000  0    0 yang berarti bahwa filesystem ini akan di mapping karakternya dengan karakter utf8 (standard internasional), sedangkan umasknya menggunkan opsi 000 yang berarti memperbolehkan semua user untuk membaca dan menulis di partisi ini dan saya mengabaikan proses back-ip filesystem dan pengecekan saat booting untuk mempersingkat waktu booting.




Bila sudah selesai maka pastikan semua partisi tersebut telah di mounting dengan cara:




Debian:~# mount â€“a




kemudian cek dengan perintah df




Debian:~# df




Filesystem           1K-blocks      Used Available Use% Mounted on




/dev/hda2              4032092   2702512   1124756  71% /




tmpfs                   258436         0    258436   0% /lib/init/rw




udev                     10240        72     10168   1% /dev




tmpfs                   258436         0    258436   0% /dev/shm




/dev/hda7              6127364   1200812   4615296  21% /home




/dev/hda6              1011928    627084    333440  66% /var




/dev/hda8             67865520  52457184  15408336  78% /media/master




/dev/sda5            135772256  94404576  41367680  70% /media/dokumenku




/dev/sda1             20482840  13012004   7470836  64% /media/*indows




/dev/sda1             20482840  13012004   7470836  64% /media/*indows




atau dengan perintah mount




/dev/hda2 on / type ext3 (rw,errors=remount-ro)




tmpfs on /lib/init/rw type tmpfs (rw,nosuid,mode=0755)




proc on /proc type proc (rw,noexec,nosuid,nodev)




sysfs on /sys type sysfs (rw,noexec,nosuid,nodev)




procbususb on /proc/bus/usb type usbfs (rw)




udev on /dev type tmpfs (rw,mode=0755)




tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)




devpts on /dev/pts type devpts (rw,noexec,nosuid,gid=5,mode=620)




/dev/hda7 on /home type ext3 (rw)




/dev/hda6 on /var type ext3 (rw)




/dev/hda8 on /media/master type vfat (rw,iocharset=utf8,umask=000)




/dev/sda5 on /media/dokumenku type vfat (rw,iocharset=utf8,umask=000)




nfsd on /proc/fs/nfsd type nfsd (rw)




rpc_pipefs on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)




/dev/sda1 on /media/*indows type fuse (rw,nosuid,nodev,noatime,allow_other)




/dev/sda1 on /media/*indows type ntfs (rw)




           namun apabila kita ingin berkeringat sedikit banyak maka kita pantas untuk mencoba proses mount secara manual, sebagai contoh saya lupa memount sebuah partisi dengan format FAT32 yang terletak di hardisk SATA pada partisi sekunder ke 6, maka yang akan saya lakukan adalah memountingnya kan??? Caranya adalah




mount [option] [letak device] [lokasi mount]




Debian:~# mount â€“t vfat /dev/hda6 /media/media







           demikian konfigurasi fstab yang saya ketahui semoga bermanfaat







Sumber:




Askari Azikin, 2004, _Debian GNU/Linux.Yogyakarta_, Penerbit Andi




Manual Page FSTAB




Novell team, 2004 _Suse Linux Advanced Guide_. Novel inc


by: Mahyuddin

udienz@gmail.com
