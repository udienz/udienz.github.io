---
author: udienz
comments: true
date: 2015-06-04 17:06:57+00:00
layout: post
link: https://blog.mahyudd.in/2015/06/04/user-group-dengan-puppet.html
slug: user-group-dengan-puppet
title: User group dengan puppet
wordpress_id: 942
categories:
- Linux
tags:
- puppet
---

Sepertin yang telah saya singgung pada tulisan sebelumnya tentang menghapus user di 100 node server, dengan puppet menghapus user di 100 node menjadi sangat mudah. Anda tidak perlu login ke semua node server, yang anda kerjakan hanya menuliskan beberapa baris code di puppet.

Pada tulisan kali ini saya akan membahas tentang manajemen user dengan puppet.



### Membuang user yang ada.



Untuk menambahkan user atau sekedar memastikan properti dari user, puppet sangat mendukung. Contohnya dalam code berikut user ani akan dibuang di semua server:


    
    user { 'ani':
        ensure => absent,
        home => '/home/ani',
        managehome => true,
     }
    



Penjelasan:
User ani dipastikan absen karena terdapat 'ensure=>absent', managehome dibutuhkan untuk memastikan bahwa $HOME direktori ani juga dibuang.



### Membuat User



Untuk menambahkan user cukup ubah absent menjadi present, contohnya untuk user budi


    
     user { 'budi':
        ensure => present,
        home => '/home/budi',
        managehome => true,
            shell => '/bin/bash',
     }
    



Dari code diatas, ada tambahan shell, yaitu mendefinisikan shell yang akan digunakan oleh pengguna. Jika anda tidak mengatur shell, maka akan dibuatakan shell /bin/sh



### Password



Untuk melakukan penentuan password pada user, dapat menggunakan kolom password, seperti pada kode dibawah.


    
    user { 'cika' :
     ensure => present,
     shell => '/bin/bash',
     managehome => yes,
     comment => 'Cika Juga',
     password => '$1$RQVI1gQL$V8DCkOeyBo.49dCE4DyCE0'
    }
    



Untuk password user cika, saya menggunakan password '**cikajuga**', password tersebut dalam format hash. Untuk meghasilkan password dalam format hash dapat gi buat dengan perintah sebegai berikut:


    
    root@master:~# openssl passwd -1
    Password:
    Verifying - Password:
    $1$RQVI1gQL$V8DCkOeyBo.49dCE4DyCE0
    





### SSH keys



Dalam puppet kita juga dapat mengatur kunci ssh yang digunakan, contoh penggunaan ssh key dapat dilihat dalam kode dibawah:


    
       ssh_authorized_key { 'dita_jumbox_ecdsa':
            user => 'dita',
            type => 'ecdsa-sha2-nistp256',
            key  => 'AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBIsT232WPROxL+Sid0lIr96uOk0rl/Rp6YVrQZNkwBLIa9OJXAk55QDoyFePvRc0xxevKCbcZbmVG2kpm6zsSgM='
        }
    



hasilnya, dalam home direktori dita akan terdapat berkas ssh authorized_keys (_~dita/.ssh/authorized_keys_). Nah bagaimana caranya agar hanya kunci ssh yang terdaftar di puppet saja yang boleh tercantum di ~dita/.ssh/authorized_keys ? untuk itu, kita harus menambahkan isian '_purge_ssh_keys => true,_'
