---
author: udienz
comments: true
date: 2011-10-07 17:20:47+00:00
layout: post
link: https://blog.mahyudd.in/2011/10/07/membuat-virtual-python.html
slug: membuat-virtual-python
title: Membuat Virtual Python
wordpress_id: 612
categories:
- Debian
- Linux
- Ubuntu
tags:
- bootstrap
- python
- python2.6
- python2.7
- virtual-python
---

Membuat virtual python ini berguna bila anda tidak mempunyai hak akses root untuk menambahkan program-program python ke system. Atau bila anda ingin menjaga system anda bersih, maka anda harus membuat virtual python. Caranya adalah:


    
    $ wget http://peak.telecommunity.com/dist/virtual-python.py
    $ /usr/bin/python virtual-python.py --clear --no-site-packages
    



Langkah selanjutnya adalah memngunduh ez_setup.py


    
    
    $ wget http://peak.telecommunity.com/dist/ez_setup.py
    



Tunggu dulu, jika anda menggunakan python2.5 kebawah maka langkahi-langkah membuat link berikut. Namun jika anda menggunakan python2.6 keatas maka anda harus membuat link dari `/usr/lib/python2.7/dist-packages/*` ke `$HOME/local/lib/dist-packages/*`. loh kenapa? karena di python2.6 keatas site-packages diganti dengan dist-packages (CMIIW) dan secara default direktori `$HOME/local/lib/dist-packages` akan di linkkan ke `/usr/lib/python2.7/dist-packages/`. Nah karena kita bukan root, maka kita tidak mempunyai hak tulis di direktori tersebut bukan? akhirnya saya kepikiran untuk membuang berkas soft-link tersebut dan melakukan soft-link pada setiap direktory/berkas tersebut. Untuk melakukannya silakan buat script kecil kecilan seperti dibawah ini dan simpan dengan nama ~/link-python.sh:

    
    
    #!/bin/bash
    
    list=$(mktemp)
    
    ls -1 /usr/lib/python2.7/dist-packages > $list
    cat $list | while read i
            do
            echo "ln -s /usr/lib/python2.7/dist-packages/$i $HOME/local/lib/python2.7/dist-packages/$i"
            ln -s /usr/lib/python2.7/dist-packages/$i $HOME/local/lib/python2.7/dist-packages/$i
            done
    rm $list
    



baik, link sudah terbentuk. Ehhh.. Sebelumnya silakan buang dulu `$HOME/local/lib/dist-packages` baru menjalankan berkas ~/link-python.sh. Oke lanjut, selanjutnya membuat berkas tersebut dapat dieksekusi dan melanjutkan instalasi.

    
    $ chmod +x link-python.sh
    $ ./link-python.sh
    $ $HOME/bin/python ez_setup.py
    



Jika mau praktis, maka tambahkan $PATH anda juga ke $HOME/local/bin karena di situ ada beberapa berkas eksekusi. caranya adalah memesukkan kode dibawah di ~/.bashrc:

    
    $ export PATH="$HOME/local/bin:$HOME/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games"



Kemudian,


    
    source ~/.bashrc



Cek apakah path python/easy_install anda sudah berada di $HOME anda


    
    
    py26:~$ which python
    /home/py26/local/bin/python
    py26:~$ which easy_install
    /home/py26/local/bin/easy_install
    py26:~$ which easy_install-2.7 
    /home/py26/local/bin/easy_install-2.7
    py26:~$ 
    



Yap, sukses! **Keep Your system Clean!**
