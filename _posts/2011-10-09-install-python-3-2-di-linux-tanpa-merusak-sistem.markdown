---
author: udienz
comments: true
date: 2011-10-09 10:31:58+00:00
layout: post
link: https://blog.mahyudd.in/2011/10/09/install-python-3-2-di-linux-tanpa-merusak-sistem.html
slug: install-python-3-2-di-linux-tanpa-merusak-sistem
title: Install Python 3.2 di Linux tanpa merusak sistem
wordpress_id: 615
categories:
- Linux
tags:
- python
- python3
---

**Catatan**: _Saya bukan programmmer python, namun sering berjibaku dengan python karena beberapa hal :). Mohon maaf bila ada kesalahan_

Python adalah komponen penting di beberapa distribusi Linux seperti Centos, Fedora, Debian, Ubuntu, dll. Nah kadang kita pengen mencoba coba versi python terbaru bukan? apalagi di server produksi, banyak developer yang minta di installkan python versi xyz. Nah karena pentingnya python, maka tolong jangan menggangu python bawaan sistem agar tidak merusak kinerja sistem, nah loo... bagaimana jika ada teman/developer/client yang ,inta di installkan di system kita **tanpa** merusak system? Jika di tulisan selumnya saya menuliskan [virtual-python](http://tripledin.wordpress.com/2011/10/07/membuat-virtual-python/) sekarang kita buat python versi berbeda untuk user
tertentu.

Jika diketahui:



	
  * Python yang akan di install: [Python 3.2.2](http://www.python.org/download/releases/3.2.2/)

	
  * User yang meminta di install: py26

	
  * Os: Terserah...


Langkahnya adalah sebagai berikut:

    
    $ cd /tmp
    $ wget http://www.python.org/ftp/python/3.2.2/Python-3.2.2.tgz
    $ tar -xzvf Python-3.2.2.tgz
    $ cd Python-3.2.2/
    $ ./configure --prefix=/home/py26/local
    $ make
    $ make install


Jika anda ingin mengganti default pythonnya ke versi terbaru lakukan perintah seperti dibawah ini:

    
    make fullinstall


$make all

dan cek dengan

    
    $ python3.2 -V
    Python 3.2.2


Jadi deh.. Dan sekarang bisa digabungkan dengan[ tulisan saya terdahulu](http://tripledin.wordpress.com/2011/10/07/membuat-virtual-python/).
