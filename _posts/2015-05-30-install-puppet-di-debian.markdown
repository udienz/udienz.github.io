---
author: udienz
comments: true
date: 2015-05-30 15:08:46+00:00
layout: post
link: https://blog.mahyudd.in/2015/05/30/install-puppet-di-debian.html
slug: install-puppet-di-debian
title: Install puppet di Debian
wordpress_id: 930
categories:
- Linux
tags:
- howto
- puppet
- puppetmaster
---

### Intro



Puppet adalah softwareÂ untuk mengatur infrastuktur yang membantu administrator untuk membuat otomatisasi pada semua node server, membuat template, menghindari perintah berulang-ulang. Pada kehidupan nyata, system administrator harus memastikan bahwasanya semua servernya memilik aplikasi terbaru dari repository. Jika system administrator (sysadmin) hanya memanage kurang dari lima server, maka akan mudah bagi sysadmin untuk login ke setiap node dan menjalankan perintah yang dapat memastikan servernya _up to date_. Bayangkan apabila sysadmin memegang 100 server! tentunya akan menyita waktu bagi sysadmin untuk melakukan login ke semua node.

Contoh lain, puppet dapat melakukan manajemen user, sebuah perusahaan mempunyai dua orang sysadmin yaitu Amin dan Budi. Amin salah satu dari sysadmin tersebut akan mengundurkan diri (_resign_), umumnya setiap sysadmin memiliki user sendiri-sendiri pada setiap node server. Apabila perusahaan tersebut mempunyai seratus node, Budi harus memastikan bahwasanya login untuk Amin sudah dihapus setelah Amin dinyatakan resmi tidak bekerja pada perusahaan. Nah bagaimana teknisnya? apakah Budi akan melakukan login ke semua server dan membuang user admin? bisa _sih_, tapi mau kah Budi login ke seratus server? Cara yang gampang bisa menggunakan _software manajemen tool_ semacam **puppet**.



### Persiapan



Pada tulisan kali ini, saya menggunakan Debian Jessie di Virtualbox, saya asumsikan bahwasanya Debian telah terpasang di Virtualbox. Domain yang akan saya pakai adalah puppet.id
Note: Untuk mengakali proses dns resolving, kita dapat mengakali nya di berkas /etc/hosts. Berikut adalah isi dari /etc/hosts pada master:

[code]
127.0.0.1       localhost
127.0.1.1       puppet master puppet.puppet.id master.puppet.id

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
[/code]



### Membuat puppet master



Tahap pertama adalah membuat puppet master,Â beberapa alternatif untuk membuat puppet master, bisa menggunakan passangger atau dari binary puppet master. Saya akan menggunakan puppet master untuk kali ini. Untuk hostname pada puppet master saya menggunakan nama master.puppet.id

Silakan login ke server master untuk memulai pemasangan. Pada tahap ini kita akan melakukan refresh database paket dan pemasangan ntp.

[code]
root@master:~# apt-get update && apt-get dist-upgrade -y && apt-get install ntp -y
[/code]

Langkah selanjutnya adalah mengunduh binary untuk repository puppet dan pemasangan puppetmaster.

[code]
root@master:~# cd /tmp/
root@master:/tmp# wget http://apt.puppetlabs.com/puppetlabs-release-jessie.deb
root@master:/tmp# dpkg -i puppetlabs-release-jessie.deb
(Reading database ... 30917 files and directories currently installed.)
Preparing to unpack puppetlabs-release-jessie.deb ...
Unpacking puppetlabs-release (1.0-11) over (1.0-11) ...
Setting up puppetlabs-release (1.0-11) ...
root@master:/tmp# apt-get update && apt-get install puppetmaster -y
[/code]

Matikan service puppet master terlebih dahulu:
[code]
root@master:~# service puppetmaster stop
 * Stopping puppet master                                                [ OK ]
[/code]

Langkah selanjutnya adalah mengatur pengaturan dari puppet yang terletak di /etc/puppet/puppet.conf, silakan buka berkas tersebut dan edit seperti pada tampilan dibawah:

[code]
[main]
logdir=/var/log/puppet
vardir=/var/lib/puppet
ssldir=/var/lib/puppet/ssl
rundir=/var/run/puppet
factpath=$vardir/lib/facter
#prerun_command=/etc/puppet/etckeeper-commit-pre
#postrun_command=/etc/puppet/etckeeper-commit-post
certname = puppet.puppet.id
dns_alt_names = master.puppet.id,puppet
[master]
# These are needed when the puppetmaster is run by passenger
# and can safely be removed if webrick is used.
ssl_client_header = SSL_CLIENT_S_DN
ssl_client_verify_header = SSL_CLIENT_VERIFY
[/code]



### Membuat sertifikat



Setelah kita mengatur puppet, langkah selanjutnya adalah membuat sertifikat SSL untuk puppet, puppet dalam proses nya akan menggunakan sertifikat dalam berkomunikasi dua arah dari master ke client. Untuk membuat sertifikat SSL dapat menggunakan perintah berikut,:

[code]
root@master:/tmp# rm /var/lib/puppet/ssl/* -rf
root@master:/tmp# puppet master --verbose --no-daemonize
[/code]

Dari perintah tersebut puppet akan membuat SSL, dan tekan tomcol CTRL + C untuk menghentikan proses.

[code language="bash"]
Info: Creating a new SSL key for ca
Info: Creating a new SSL certificate request for ca
Info: Certificate Request fingerprint (SHA256): E2:B6:CB:85:41:BE:57:66:9F:4C:0B:E7:72:BD:B3:7E:7B:DB:9D:BD:84:B1:19:7F:CD:85:C1:58:18:67:BB:AE
Notice: Signed certificate request for ca
Info: Creating a new certificate revocation list
Info: Creating a new SSL key for puppet.puppet.id
Info: csr_attributes file loading from /etc/puppet/csr_attributes.yaml
Info: Creating a new SSL certificate request for puppet.puppet.id
Info: Certificate Request fingerprint (SHA256): EC:8C:D3:62:48:CD:FD:20:4F:48:D0:E0:3C:38:66:4B:BA:0C:D6:23:28:10:33:68:E1:9B:5B:55:E0:0D:66:2B
Notice: puppet.puppet.id has a waiting certificate request
Notice: Signed certificate request for puppet.puppet.id
Notice: Removing file Puppet::SSL::CertificateRequest puppet.puppet.id at '/var/lib/puppet/ssl/ca/requests/puppet.puppet.id.pem'
Notice: Removing file Puppet::SSL::CertificateRequest puppet.puppet.id at '/var/lib/puppet/ssl/certificate_requests/puppet.puppet.id.pem'
Notice: Starting Puppet master version 3.7.2
^CNotice: Caught INT; calling stop
[/code]

Jika tampilan shell menunjukkan tampilan seperti diatas berarti sertifikat SSL sudah dibuat, silakan pastikan dengan menggunakan perintah dibawah.

[code]
root@master:/tmp# puppet cert list -all
+ "puppet.puppet.id" (SHA256) 36:68:90:27:2D:9B:17:5B:E1:57:E7:C4:9A:85:9C:1B:0D:40:DE:06:88:FC:68:96:60:F5:C9:00:2E:42:82:55 (alt names: "DNS:master.puppet.id", "DNS:puppet", "DNS:puppet.puppet.id")
[/code]

Kemudian start daemon puppet dengan mengetikkan
[code]
root@master:~# service puppetmaster start
 * Starting puppet master                                                [ OK ]
root@master:~#
[/code]



### Memasang puppet agent



Kita akan memasang puppet agent di node master dan di client. Untuk node master, kita dapat langsung ke tahap pemasangan puppet-agent.

[code]
root@client1:/tmp# wget http://apt.puppetlabs.com/puppetlabs-release-jessie.deb
root@client1:/tmp# dpkg -i puppetlabs-release-jessie.deb
root@client1:/tmp# apt-get update && apt-get install puppet -y
[/code]

Langkah selanjutnya adalah mengatur puppet agent agar terkoneksi ke puppet master. Silakan ubah berkas pada /etc/puppet/puppet.conf seperti pada tampilan dibawah.

[code]
[main]
logdir=/var/log/puppet
vardir=/var/lib/puppet
ssldir=/var/lib/puppet/ssl
rundir=/var/run/puppet
factpath=$vardir/lib/facter
certname=client1.puppet.id

[master]
# These are needed when the puppetmaster is run by passenger
# and can safely be removed if webrick is used.
ssl_client_header = SSL_CLIENT_S_DN
ssl_client_verify_header = SSL_CLIENT_VERIFY

[agent]
server = master.puppet.id
[/code]

Note:
Apabila anda memiliki masalah dalam koneksi ke master, misalnya masalah dns maka untuk mengakalinya alah menambahkan IP master ke /etc/hosts. Dengan ip master adalah 192.168.2.1 maka isian dari /etc/hosts adalah sebagi berikut:

[code]
127.0.0.1       localhost client1
192.168.2.1  puppet master puppet.puppet.id master.puppet.id

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
[/code]

Langkah selanjutnya adalah membuat sertitikat pada client1 dan mendaftarkan sertifikat tersebut ke master. Untuk itu silakan ketik perintah seperti dibawah:

[code]
root@client1:~# puppet agent --test
Info: Creating a new SSL key for client1.puppet.id
Info: Caching certificate for ca
Info: csr_attributes file loading from /etc/puppet/csr_attributes.yaml
Info: Creating a new SSL certificate request for client1.puppet.id
Info: Certificate Request fingerprint (SHA256): 96:C2:9E:DF:AF:C5:CB:E6:73:D3:DC:CC:32:21:66:14:6C:42:EC:D5:EB:52:DD:E5:BC:1B:F7:FD:53:6F:F9:A0
Info: Caching certificate for ca
Exiting; no certificate found and waitforcert is disabled
[/code]

Selanjutnya, pada sisi node master kita harus melakukan tanda tangan ke sertifikat client1, sebelumnya cek apakah ssl adalah benar yang dimaksud dengan perintah sebagai berikut:

[code]
root@master:~# puppet cert list
  "client1.puppet.id" (SHA256) 96:C2:9E:DF:AF:C5:CB:E6:73:D3:DC:CC:32:21:66:14:6C:42:EC:D5:EB:52:DD:E5:BC:1B:F7:FD:53:6F:F9:A0
[/code]

Terlihat bahwa fingerprint dari ssl client1 adalah sama, maka langkah selanjutnya adalah melakukan tanda tangan dengan perintah sebagai berikut:

[code]
root@master:~# puppet cert sign client1.puppet.id
Notice: Signed certificate request for client1.puppet.id
Notice: Removing file Puppet::SSL::CertificateRequest client1.puppet.id at '/var/lib/puppet/ssl/ca/requests/client1.puppet.id.pem'
[/code]

Cek kembali pada master, bahwa sertifikat tersebut sudah tertandatangani dengan tanda + di depah client1.puppet.id

[code]
+ "client1.puppet.id" (SHA256) 1D:22:8F:AF:74:4A:4A:45:AC:64:58:D3:65:15:00:32:E1:71:28:9C:41:C1:2C:33:06:34:F7:93:8F:14:BC:D3
+ "puppet.puppet.id"  (SHA256) 36:68:90:27:2D:9B:17:5B:E1:57:E7:C4:9A:85:9C:1B:0D:40:DE:06:88:FC:68:96:60:F5:C9:00:2E:42:82:55 (alt names: "DNS:master.puppet.id", "DNS:puppet", "DNS:puppet.puppet.id")
[/code]

Kembali ke client1, silakan eksekusi puppet kembali untuk menerima sertifikat yang sudah di tanda tangani dengan perintah sebagai berikut:

[code]
root@client1:~# puppet agent --test
Info: Caching certificate for client1.puppet.id
Info: Caching certificate_revocation_list for ca
Info: Caching certificate for client1.puppet.id
Info: Retrieving pluginfacts
Info: Retrieving plugin
Info: Caching catalog for client1.puppet.id
Info: Applying configuration version '1432997774'
Info: Creating state file /var/lib/puppet/state/state.yaml
Notice: Finished catalog run in 0.02 seconds
[/code]

Kemudian start daemon puppet agent

[code]
root@master:~# service puppet restart
 * Restarting puppet agent                                               [ OK ]
root@master:~#
[/code]

Note: Apabila terdapat warning pada console tentang 'puppet not configured to start', silakan sunting berkas /etc/default/puppet dan ubah **START=no** menjadi **START=yes**
Selamat client dan master sudah terkoneksi! Untuk pemasangan puppet agent pada master dapat mengikuti proses diatas.



### Testing puppet



Langkah selanjutnya adalah membuat berkas pada semua node untuk memastikan bahwasanya puppet terpasang dengan baik. Kita akan membuat berkas di /home/HELLO dengan konten yang akan kita tentukan, untuk itu silakan buka berkas /etc/puppet/manifests/site.pp kemudian silakan tambahkan isian sebagai berikut:

[code]
file { '/home/HELLO':
        ensure => present,
        content => 'Hello this is test file',
}
[/code]

Kemudian test dari client dan server dengan perintah sebagai berikut:

[code]
Info: Retrieving pluginfacts
Info: Retrieving plugin
Info: Caching catalog for client1.puppet.id
Info: Applying configuration version '1432998118'
Notice: /Stage[main]/Main/File[/home/HELLO]/ensure: created
Notice: Finished catalog run in 0.05 seconds
[/code]

Dan pastikan bahwasanya isian dari berkas /home/HELLO adalah 'Hello this is test file'

[code]
root@client1:~# cat /home/HELLO
Hello this is test file
[/code]



### Penutup



Mudah bukan? pada tulisan selanjutnya akan kita bahas puppet lebih lanjut
