---
author: udienz
comments: true
date: 2008-02-18 22:43:55+00:00
layout: post
slug: hacking-livecd-ubuntu
title: Hacking LiveCD Ubuntu
wordpress_id: 165
categories:
- Foss-ID
- Hack
- Linux
- Ubuntu
tags:
- Linux
- ngoprek
- turorial
- ubuntu
---

Dalam halaman ini akan di jelaskan bagaimana cara membuat Live CD yang berbasiskan Ubuntu dimana anda dapat menambah, mengurangi paket sehingga di harapkan Live CD yang di hasilkan dapat memenuhi kebutuhan anda.






### Sistem Minimal yang di gunakan





	
  1. Harddisk kosong sebesar 3 - 5 GB (semakin besar ruang kosong, semakin dianjurkan)

	
  2. Memori 512MB dan swap 1 GB (semakin besar memori, semakin dianjurkan)

	
  3. 


Paket squashfs-tools, dchroot dan mkisofs




	
  4. 


Program Virtualisasi semacam Qemu, [VirtualBox](http://wiki.cecunguk.web/VirtualBox), VM Ware dan lainya




	
  5. Berkas ISO Ubuntu Live CD Desktop








### Proses




Pertama, anda harus menginstall paket-paket yang di butuhkan seperti Paket squashfs-tools, dchroot dan mkisofs. untuk itu anda harus melakukan instalasi paket-paket tersebut







    
    sudo apt-get install squashfs-tools dchroot mkisofs qemu




Langkah selanjutnya adalah meload module squashfs







    
    sudo modprobe squashfs


<!-- more -->






#### Menyalin berkas yang di butuhkan




Siapkan ISO dari Ubuntu Desktop Live CD anda, kemudian salin berkas yang di butuhkan







    
    sudo mount -o loop ubuntu-7.10-desktop-i386.iso /media/cdrom
    mkdir extract-cd
    rsync --exclude=/casper/filesystem.squashfs -a /media/cdrom/ extract-cd








#### Ekstrak Sistem Desktop




Mount berkas sistem squashfs







    
    mkdir squashfs
    sudo mount -t squashfs -o loop mnt/casper/filesystem.squashfs squashfs




Extract isi squashfs kedalam direktori 'edit'







    
    mkdir edit
    sudo cp -a squashfs/* edit/








#### Persiapan dan menggunakan chroot




Jika anda ingin menggunakan jaringan, lakukan langkah berikut







    
    sudo cp /etc/resolv.conf edit/etc/
    sudo cp /etc/hosts edit/etc/
    sudo chroot edit
    mount -t proc none /proc
    mount -t sysfs none /sys
    export HOME=/root
    export LC_ALL=C
    exit








#### Kustomisasi




Akan di jelaskan beberapa tips untuk meng-kustom CD Live Ubuntu








##### APT-Get




Anda dapat menambah dan mengurangkan paket-paket yang ada dalam edit dengan perintah apt,aptitute dan dpkg. Untuk menyesuaikan daftar repository antara mesin utama dengan edit maka lakukan perintah berikut:







    
    sudo cp /etc/apt/sources.list edit/etc/apt/sources.list
    sudo chroot edit
    apt-get update && apt-get upgrade
    apt-get install nama_paket_yang_akan_dipasang




hal ini berguna untuk menyamakan sumber paket dari system chroot dan sistem utama anda, alangkah lebih baiknya apabila anda mempunyai [repository sendiri](http://wiki.cecunguk.web/DokumentasiKomunitas/MembuatRepositoryLokal) dalam sistem anda, sehingga sistem chroot dapat mengakses repository anda dan menghemat bandwidth.




Anda dapat melihat paket yang telah terpasang di edit dengan cara:







    
    dpkg-query -W --showformat='${Installed-Size} ${Package}n' | sort -nr | less




Jika anda menginginkan untuk membuang beberapa paket lakukan selalu dengan purge agar supaya paket benar-benar di bersihkan







    
    apt-get remove --purge paket_yang_akan_dibuang




_ ![/!](http://wiki.cecunguk.web/_static/rightsidebar/img/alert.png) ingat, banyaknya paket yang di pasang akan mengakibatkan besarnya berkas iso yang di hasilkan. dan banyaknya paket yang di kurangi boleh jadi akan mengurangi kinerja, mohon di perhatikan dependensi/ketergantungan paket yang akan di buang. Perhatikan pula banyaknya paket yang terpasang, semakin banyak paket maka pada saat dijalankan LiveCD akan membutuhkan memori yang besar yang menyebabkan LIveCD tidak dapat di booting di karenakan Over load_








##### Gambar Latar untuk GNOME




Umumnya Gambar latar pada desktop ada pada:






	
  1. 


/usr/share/gnome-background-properties/ubuntu-wallpapers.xml dan




	
  2. 


/etc/gconf/gconf.xml.defaults/%gconf-tree.xml







Seumpama anda punya gambar latar warty-final-ubuntu.png maka salinlah gambar latar anda di /usr/share/backgrounds/ kemudian ubah harga string pada berkas /etc/gconf/gconf.xml.defaults/%gconf-tree.xml hingga menjadi







    
    <dir name="background">
    <entry name="picture_filename" mtime="1201195198" type="string">
    <stringvalue>/usr/share/backgrounds/warty-final-ubuntu.png</stringvalue>
    </entry>
    </dir>




Kemudian simpan berkas tersebut








##### Ikon untuk GNOME




Anda dapat menambahkan ikon kesayangan anda ke dalam sistem LiveCD baru anda, ada dua metode untuk mendapatkan ikon baru:






	
  1. 


Salin secara manual. Ikon yang terdapat dalam sistem anda terdapat di ~/.icons dan /usr/share/icons. Atau anda dapat menambah ikon yang terdapat dalam situs gnome-art dan menyalinya ke /usr/share/icons




	
  2. APT-Get




Seumpama anda ingin sistem chroot dalam edit menggunakan ikon Docang maka langkahnya adalah sebagai berikut







    
    sudo cp -R /usr/share/icons/Docang/ edit/usr/share/icons/




kemudian ubah harga string berkas /etc/gconf/gconf.xml.defaults/%gconf-tree.xml menjadi







    
    <entry name="icon_theme" mtime="1201195198" type="string">
    <stringvalue>Docang</stringvalue>
    </entry>




Kemudian simpan berkas tersebut








##### Tema GNome




Anda dapat menambahkan theme GNome anda pada sistem LiveCD baru anda. Metodenya hampir sama dengan pemasangan ikon.




Seumpama anda ingin sistem chroot dalam edit menggunakan tema Docang maka langkahnya adalah sebagai berikut:







    
    sudo apt-get install docang-theme




atau







    
    sudo cp -R /usr/share/themes/Docang edit/usr/share/themes/




kemudian ubah harga string berkas /etc/gconf/gconf.xml.defaults/%gconf-tree.xml menjadi







    
    <entry name="gtk_theme" mtime="1201195198" type="string">
    <stringvalue>Docang</stringvalue>
    </entry>




Kemudian simpan berkas tersebut








##### Mengubah bahasa default pada gfxboot




Untuk pengubahan ini harus dilakukan di luar chroot







    
    sudo -s
    apt-get install dpkg-dev
    apt-get source gfxboot-theme-ubuntu gfxboot
    cd gfxboot-theme-ubuntu*/
    make DEFAULT_LANG=id
    sudo cp -af boot/* ../extract-cd/isolinux/
    exit








##### Batasan Kustomisasi




Setelah anda mengkustomisasi, pastikan bahwa tidak ada pengguna yang mempunyai UID >=1000. Bila tidak image anda tidak dapat di booting karena tidak ada pengguna yang tersedia (lihat /usr/lib/user-setup/functions.sh dan /usr/lib/user-setup/user-setup-apply). Di dalam chroot lakukan perintah:







    
    grep '^[^:]*:[^:]*:[1-9][0-9][0-9][0-9]:' /etc/passwd
    grep '^[^:]*:[^:]*:[12][0-9][0-9][0-9][0-9]:' /etc/passwd




Apabila anda berhasil, cobalah untuk mengganti UID:







    
    usermod -u 500 $hit








##### Kustomisasi Lanjut




Anda dapat melakukan Kustomisasi Lanjut terhadap sistem chroot Live CD anda








##### Kernel Live CD




Anda dapat mengubah kernel pada sistem chroot Live CD anda dengan menyalin vmlinuz dan initrd yang kemudian di letakkan di  extract-cd/casper (jangan lupa untuk ap-get pada kernel sebenarnya( salah satunya terdapat dalam livecd).




contoh:







    
    sudo cp /boot/vmlinuz-2.6.22-14-386 extract-cd/casper/vmlinuz
    sudo cp /boot/initrd.img-2.6.22-14-386 extract-cd/casper/initrd.gz








##### Boot init




Anda dapat mengubah berkas dalam /usr/share/initramfs-tools/scripts/casper-bottom/*. Sebagai contoh anda dapat mengubah nama host dan nama nengguna livecd




contoh:







    
    sudo nano edit/usr/share/initramfs-tools/scripts/casper




kemudian sunting nama host dan nama user







    
    sudo nano edit/usr/share/initramfs-tools/scripts/casper-bottom/10adduser




untuk mengubah kata sandi pengguna livecd








##### Membangun ulang initrd




Setelah anda memodifikasi kernel, skript init atau modul kenel terbaru, anda harus membangun ulang berkas initrd.gz dan menggantinya dalam direktori casper







    
    sudo chroot edit
    mkinitramfs -o /initrd.gz 2.6.22-14-386




Silakan keluar chroot dan pindahkan berkas tersebut kedalam extract-cd/casper:







    
    exit
    mv edit/initrd.gz extract-cd/casper/








### Membersihkan




Pastikan anda membuang semua berkas sementara yang tidak di perlukanlagi, hal ini dikarenakan ruang dari CD terbatas. Contoh lama adalah berkas pengunduhan paket, dapat di bersihkan dengan:







    
    apt-get clean




atau buang berkas sementara







    
    rm -rf /tmp/*




atau pengaturan nama server







    
    rm /etc/resolv.conf




sekarang umount (unmount) berkas sistem spesial dan keluar dari chroot:







    
    umount /proc
    umount /sys
    exit








### Membuat CD




Genarate ulang manifest







    
    chmod +w extract-cd/casper/filesystem.manifest
    sudo chroot edit dpkg-query -W --showformat='${Package} ${Version}n' > extract-cd/casper/filesystem.manifest
    sudo cp extract-cd/casper/filesystem.manifest extract-cd/casper/filesystem.manifest-desktop
    sudo sed -ie '/ubiquity/d' extract-cd/casper/filesystem.manifest-desktop




Kompress berkas sustem







    
    sudo rm extract-cd/casper/filesystem.squashfs
    sudo mksquashfs edit extract-cd/casper/filesystem.squashfs




Atur nama imade dalam extract-cd/README.diskdefines







    
    sudo vim extract-cd/README.diskdefines




Buang berkas md5sum.txt dan kalkulasikan lagi berkas md5sums







    
    sudo -s
    rm extract-cd/md5sum.txt
    cd extract-cd && find . -type f -print0 | xargs -0 md5sum > md5sum.txt
    exit




Membuat ISO







    
    cd extract-cd
    sudo mkisofs -r -V "$IMAGE_NAME" -cache-inodes -J -l -b isolinux/isolinux.bin -c isolinux/boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -o ../ubuntu-7.10.1-desktop-i386-custom.iso .




Mengetes CD




Test menggunakan qemu emulator







    
    qemu -cdrom ubuntu-7.10.1-desktop-i386-custom.iso -boot d




Anda dapat menggunakan program lain seperti [VirtualBox](http://wiki.cecunguk.web/VirtualBox), Vmware








### Membakar berkas ISO ke CD




Mudah! lakukan:







    
    cdrecord dev=/dev/cdrom ubuntu-7.10.1-desktop-i386-custom.iso








### Referensi





	
  1. 


[https://help.ubuntu.com/community/InstallCDCustomization](https://help.ubuntu.com/community/InstallCDCustomization)




	
  2. 


[https://help.ubuntu.com/community/LiveCDCustomization](https://help.ubuntu.com/community/LiveCDCustomization)




	
  3. 


[Ubuntu Customization Kit](http://uck.sourceforge.net/)




	
  4. 


[Reconstructor](http://reconstructor.sourceforge.net/)




	
  5. 


[http://flamerobin.blogspot.com/2006/05/creating-flamerobinfirebird-live-cd.html](http://flamerobin.blogspot.com/2006/05/creating-flamerobinfirebird-live-cd.html)




	
  6. 


[http://www.atworkonline.it/%7Ebibe/ubuntu/custom-livecd.htm](http://www.atworkonline.it/%7Ebibe/ubuntu/custom-livecd.htm)




	
  7. 


[http://lichota.net/%7Ekrzysiek/projects/kubuntu/dapper-livecd-optimization/](http://lichota.net/%7Ekrzysiek/projects/kubuntu/dapper-livecd-optimization/)





