---
author: udienz
comments: true
date: 2007-11-27 09:39:13+00:00
layout: post
link: https://blog.mahyudd.in/2007/11/27/akhirnya-kelar-juga.html
slug: akhirnya-kelar-juga
title: akhirnya kelar juga......
wordpress_id: 136
categories:
- BlankOn
- Linux
- Ubuntu
tags:
- blankon
- download
- jigdo
- ubuntu
---

setelah [kebingungan di sana-sini](http://groups.google.com/group/BlankOn/t/d807d471a8c724c6).... akhirnya aku dah berhasil download BlankOn alternate via file jidgo....setelah lihat-lihat petunjuk [[1]](http://wiki.ubuntu-id.org/BlankOn/Infrastruktur/Jigdo) akhirnya kelar juga....

sebagai informasi, kalo mau download iso dengan jidgo lebih baik download dulu file [.jigdo](http://cdimage.blankonlinux.or.id/rilis/konde/blankon-2.0-alternate-i386.jigdo) dan [.template](http://cdimage.blankonlinux.or.id/rilis/konde/blankon-2.0-alternate-i386.template) nya, nbaru kemudian jalankan perintah:

    
    # jigdo-lite blankon-2.0-alternate-i386.jigdo


dan arahkan ke website http://arsip.blankonlinux.or.id/blankon dan kambing.ui.edu/ubuntu hingga muncul tulisan ini...

    
    FINISHED --23:23:12--
    Downloaded: 15,278,488 bytes in 10 files
    Found 10 of the 10 files required by the template
    Successfully created `blankon-2.0-alternate-i386.iso'
    
    -----------------------------------------------------------------
    Finished!
    The fact that you got this far is a strong indication that `blankon-2.0-alternate-i386.iso'
    was generated correctly. I will perform an additional, final check,
    which you can interrupt safely with Ctrl-C if you do not want to wait.
    
    OK: Checksums match, image is good!


oke saya cek md5sumnya dulu

    
    debian:/var/www/download/blankon# cat md5sum.blankon
    001dda6882e2ce7a9953c6954f2ae590  blankon-2.0-alternate-i386.iso


siiiip...... siap di jalanin nih...

thx to imtheface, mr.Andika

[1] http://wiki.ubuntu-id.org/BlankOn/Infrastruktur/Jigdo

[2] http://groups.google.com/group/BlankOn/t/d807d471a8c724c6
