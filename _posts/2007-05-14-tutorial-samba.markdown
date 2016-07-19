---
author: udienz
comments: true
date: 2007-05-14 11:00:49+00:00
layout: post
slug: tutorial-samba
title: Tutorial Samba
wordpress_id: 369
categories:
- Linux
tags:
- Debian
- etch
- feisty
- Linux
- Networking
- server
- ubuntu
- window
---

**Menyandingkan Linux ke  Windows dengan Samba**




**By: mahyuddin***




** **




Menghubungkan jaringan  komputer dengan sistem berbeda tidaklah sulit hal ini karena sudah adanya  layanan-layanan yang sudah disediakan oleh sistem operasi yang bersangkutan.  Seperti pada Linux untuk berhubungan dengan sistem lain maka Linux membutuhkan  suatu service yang disebut dengan Samba, dimana samba ini digunakan Linux untuk  menjadi client maupun server di jaringan yang ada sistem operasi windowsnya.




<!-- more -->




Samba adalah program  aplikasi yang mengimplementasikan protokol Server Massage Block (SMB) di  lingkungan Unix atau Linux. Protokol ini mempunyai fungsi utama untuk berbagi  (sharing) file dan printer. Samba dapat menjadi jembatan untuk mengatasi  masalah komunikasi antar jaringan, baik dalam lingkungan Linux/unix maupun  platform lainya.







	
  1. **Penginstalasian Samba di Linux**




Untuk menginstall samba user harus log-in sebagai  root, log-in sebagai root dapat melalui terminal konsole dengan cara sebagai berikut:




ardienz@udienz:~$ su




password:




udienz:~#/home/udienz#




** **




Kemudian install samba




**udienz:~# apt-get  install samba smbclient smbfs**







Atau bila menggunakan Ubuntu/Edubuntu/Kubuntu dapat  menggunakan perintah sudo




ardienz@udienz-ubuntu:~$ sudo apt-get install mc




ardienz@udienz-ubuntu:~$ sudo apt-get install smbclient smbfs




ardienz@udienz-ubuntu:~$ sudo apt-get install samba smbclient smbfs




** **







Kemudian konfigurasikan samba dengan membuka  /etc/samba/samba.conf dengan Midningt  Commander atau gedit atau kedit bila menggunakan desktop KDE




ardienz@udienz-ubuntu:~$  Sudo  gedit /etc/samba/smb.conf




ardienz@udienz-ubuntu:~$  Sudo mcedit /etc/samba/smb.conf







_#=======================  Global Settings =======================_




_[global]_




_workgroup  = mshome_




_server  string = %h server (Samba %v)_




_wins  support = yes_




_wins  server = w.x.y.z_




_#   include = /etc/samba/dhcp.conf_




_dns  proxy = no_




_;   name resolve order = lmhosts host wins bcast_




_####  Debugging/Accounting ####_




_log  file = /var/log/samba/log.%m_




_max  log size = 1000_




_panic  action = /usr/share/samba/panic-action %d_




_#######  Authentication #######_




_security  = share_




_encrypt  passwords = true_




_;  passdb backend = tdbsam guest_




_;  obey pam restrictions = yes_




_;  guest account = share_




_;  invalid users = nobody_




_;   unix password sync = no_




_ _




_;   passwd program = /usr/bin/passwd %u_




_;   passwd chat = *EntersnewsUNIXspassword:*  %nn *RetypesnewsUNIXspassword:* %nn ._




_;   pam password change = no_




_##########  Printing ##########_




_load  printers = yes_




_printing  = bsd_




_printcap  name = /etc/printcap_




_printing  = cups_




_printcap  name = cups_




_printer  admin = @ntadmin_




_########  File sharing ########_




_preserve  case = yes_




_short  preserve case = yes_




_############  Misc ############_




_include  = /home/samba/etc/smb.conf.%m_




_socket  options = TCP_NODELAY_




_;   message command = /bin/sh -c  '/usr/bin/linpopup "%f" "%m" %s; rm %s' &_




_;   domain master = auto_




_;   idmap uid = 10000-20000_




_;   idmap gid = 10000-20000_




_;   template shell = /bin/bash_




_#=======================  Share Definitions =======================_




_[homes]_




_   comment = Home Directories_




_   browseable = yes_




_[data]_




_    comment= cobain aja deh_




_    path= /home/ ardienz/public_




_    browseable= yes_




_    read only= yes_




_    guest ok= yes_




_    writable= yes_




_writable  = yes_




_create  mask = 0777_




_directory  mask = 0777_




_[netlogon]_




_   comment = Network Logon Service_




_   path = /home/samba/netlogon_




_   guest ok = yes_




_   writable = yes_




_   share modes = yes_




_[printers]_




_   comment = All Printers_




_   browseable = yes_




_   path = /tmp_




_   printable = yes_




_   public = yes_




_   writable = yes_




_   create mode = 0700_




_ [print$]_




_   comment = Printer Drivers_




_   path = /var/lib/samba/printers_




_   browseable = yes_




_   read only = no_




_   guest ok = yes_




_write  list = root, @ntadmin, â€œMahyuddin Susantoâ€_




_[cdrom]_




_   comment = Samba server's CD-ROM_




_   writable = no_




_   locking = no_




_   path = /cdrom_




_   public = yes_




_   preexec = /bin/mount /cdrom_




_   postexec = /bin/umount /cdrom_




** **




** **




**Keterangan:**




**Workgroup     :** setiap host atau client yang  terhubung ke dalam satu jaringan yang sama (satu group) baik windows ataupun Linux  harus memiliki workgroup yang sama.




**Guest account :** diset sebagai nobody; guest account  ini mengatur pemberian hak izin write ke semua user




**Security           **:option defaultnya adalah â€œuserâ€,  â€œshareâ€, â€œserverâ€, dan â€œdomainâ€




**comment          **: komentar tentang drive tersebut




**path                  **: letak direktori yang akan dishare




**read-only        **: option defaultnya adalah â€œyesâ€  sehingga semua host yang ada tidak dapat melakukan perubahan apapun terhadap  drive tersebut




**locking            **: hak izin read only untuk filesystem  ataupun perangkat device (CD-ROM)




**browseable      **: Option defaultnya adalah â€œyesâ€  sehingga drive yang dishare akan tampak pada komputer lain




**Public              **: option ini menyebabkan semua host  dapat mengakses




file  atau direktori yang tershare tanpa adanya permintaan password dari komputer  tersebut




**guest  ok          **: fungsinya sama dengan _public_




**create mode    **: option ini untuk mengatur hakâ€“hak  yang akan diberikan kepada host lain terhadap file atau direktori yang akan  dishare.




**Writable          :** option ini memberikan hak azas  kepada host lain untuk melakukan perubahan pada file atau direktori yang anda  share. Pilihan defaulnya adalah â€œ**no**â€.







Setelah  anda melakukan perubahan pada file konfigurasi di atas, restart kembali service  samba anda untuk mendapatkan perubahan pada file konfigurasi tersebut. Perintah  yang digunakan adalah:




udienz:~# /etc/init.d/samba restart




Apabila  user ingin melihat file apasaja di komputer Debian/Ubuntu dapat menggunakan  perintah:




ardienz@udienz-ubuntu:~/public$ sudo  testparm /etc/samba/smb.conf







_Load smb config  files from /etc/samba/smb.conf_




_Processing  section "[printers]"_




_Processing  section "[print$]"_




_Processing  section "[Dekstop_Udienz]"_




_NOTE: Service Dekstop_Udienz  is flagged unavailable._




_Processing  section "[Bolehdiakses]"_




_Loaded services  file OK._




_WARNING: passdb  expand explicit = yes is deprecated_




_Server role:  ROLE_STANDALONE_




_Press enter to  see a dump of your service definitions_




_ _




_[global]_




_        workgroup = LABKOMTEK_




_        server string = %h server (Samba,  Ubuntu)_




_        security = SHARE_




_        obey pam restrictions = Yes_




_        passdb backend = tdbsam_




_        passwd program = /usr/bin/passwd %u_




_        passwd chat = *EntersnewsUNIXspassword:*  %nn *RetypesnewsUNIXspassword:* %nn *passwordsupdatedssuccessfully* ._




_        syslog = 0_




_        log file = /var/log/samba/log.%m_




_        max log size = 1000_




_        dns proxy = No_




_        wins support = Yes_




_        panic action = /usr/share/samba/panic-action  %d_




_        invalid users = root_




_ _




_[printers]_




_        comment = All Printers_




_        path = /tmp_




_        create mask = 0700_




_        printable = Yes_




_        browseable = No_




_ _




_[print$]_




_        comment = Printer Drivers_




_        path = /var/lib/samba/printers_




_ _




_[Dekstop_Udienz]_




_        comment = desktopnya udienz hehehe_




_        path = /home/_




_        read only = No_




_        available = No_




_ _




_[Bolehdiakses]_




_        path = /home/black/public_




_        read only = No_




_        guest ok = Yes_




_ _




Untuk  melihat file atau direktori yang telah anda dan komputer lain share, anda dapat  menggunakan browser konqueror yang mendukung protokol samba. Pada Url ketikkan  : **smbclient â€“U% -L <ip_address>**




ardienz@udienz-ubuntu:~/public$ sudo  smbclient -U% -L 192.168.171.1




** **




Domain=[LABKOMTEK]  OS=[Windows 5.1] Server=[Windows 2000 LAN Manager]







                  Sharename       Type       Comment




                  ---------       ----       -------




Error  returning browse list: NT_STATUS_ACCESS_DENIED




session  request to 192.168.171.1 failed (Called name not present)




session  request to 192 failed (Called name not present)




Domain=[LABKOMTEK]  OS=[Windows 5.1] Server=[Windows 2000 LAN Manager]







Server                      Comment




---------                    -------




UDIENZ_XP







Workgroup              Master




---------                    -------




LABKOMTEK                         UDIENZ_XP




LABKOMTEK                         BLACK-DESKTOP




Bila user Linux ingin me-mount directory yang dishare  dapat menggunakan perintah:







udienz:~# smbmount//192.168.42.1/my_music /mnt/music







Jika  nama host atau IP_address yang anda masukkan ada dalam jaringan anda, maka  konqueror webrowser akan menampilkan isi dari direktori yang dishare oleh  komputer lain.







_Oleh:_




**_Mahyuddin Susanto_**




_Mahasiswa Teknik Elektro  Universitas Jember_




_Asisten UPT-TI Universitas  Jember, Aktifis IMM KoTA Universitas Jember, Ketua DPM Teknik Elektro  Universitas Jember_




_e-mail = udienz@gmail.com__ _
