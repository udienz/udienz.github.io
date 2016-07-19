---
author: udienz
comments: true
date: 2007-11-26 16:53:19+00:00
layout: post
slug: buat-md5sum-yuk
title: buat md5sum yukâ€¦.
wordpress_id: 424
categories:
- Debian
- Linux
- Ubuntu
tags:
- artikel
- Debian
- Linux
- MD5SUM
- tutorial
- ubuntu
---

seperti yang kita ketahui md5sum merupakan tool untuk mengecek ke_valid_an dari sebuat file. tool ini berguna untuk memastikan apakah file yang kita terima apakah benar-benar orisinil atau bukan...  secara gampangnya kita dapat membuat file md5sum dengan perintah

    
    $ md5sum [nama_file_yg_akan_di_cek] > [output_file]


contohnya saya akan membuat file md5sum dari file udienz.asc yang terletak di /home/udienz, maka perintahnya adalah

    
    udienz@ardienz:~$ pwd
    /home/udienz
    udienz@ardienz:~$ md5sum udienz.asc > md5sum_udienz.asc_MD5SUM


hm... setelah itu silakan lihat file nya dengan perintah:

    
    udienz@ardienz:~$ cat md5sum_udienz.asc_MD5SUM
    7850c56cad3305701fcc60e817a1ef7d  udienz.asc


sekarang akan muncul pertanyaan, bagaimana membuat file di direktory??? contohnya seperti file MD5SUM di DVD Repository. gampang sekali, perintahnya adalah

    
    $ find [lokasi_direktory]/ -type f -print | xargs md5sum > [output_file]


contohnya saya akan mengecek direktory wordpress beserta sub-direktory nya yang berada di /home/udienz/wordpress, perintahnya adalah:

    
    udienz@ardienz:~$ pwd
    /home/udienz
    udienz@ardienz:~$ find wordpress/ -type f -print | xargs md5sum > MD5UM-wordpress.md5sum


Gampang sekali bukan??? slakan mencoba!!!
