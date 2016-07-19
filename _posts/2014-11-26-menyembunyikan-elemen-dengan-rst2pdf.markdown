---
author: udienz
comments: true
date: 2014-11-26 11:46:30+00:00
layout: post
link: https://blog.mahyudd.in/2014/11/26/menyembunyikan-elemen-dengan-rst2pdf.html
slug: menyembunyikan-elemen-dengan-rst2pdf
title: Menyembunyikan elemen dengan rst2pdf
wordpress_id: 872
categories:
- MySelf
tags:
- docutils
- python
- restucturedtext
- rst2pdf
---

Beberapa minggu ini saya aktif <del>kembali</del> menggunakan [reStucturedText](http://docutils.sourceforge.net/rst.html) yang kemudian saya export ke pdf dengan [rst2pdf](http://code.google.com/p/rst2pdf/). Hal ini dikarenakan kemudahan dalam penggunaanya dan dapat di export ke beberapa format seperti plain teks, doc, docx, latex dan pdf.

Namun ada beberapa catatan yang mengganjal yaitu bagaimana caranya saya ingin menyembunyikan elemen? misalnya saya ingin hanya menampilkan bagian tentang daftar peralatan di halaman **HTML** namun **tidak** di tampilkan di **PDF**?

Menurut [pengembangnya](http://ralsina.me/weblog/posts/new-rst2pdf-feature-strip-elements-with-class.html) kita bisa menyembunyikan elemen tersebut dengan opsi `--strip-elements-with-class`. Contoh

[code]
nge-blog
-----------

berisikan tentang pengertian blog, etc

.. class:: tampil

Teks ini akan tampil, di bawahnya seharusnya ada lagi.

.. class:: hilang

Teks ini hilang

.. class:: tampil

Jika hanya ada dua baris berarti ada yang **hilang**
[/code]

Untuk menyembunyikan elemen 'hilang', pada saat menkompile dengan rst2pdf bisa menggunakan opti `--strip-elements-with-class=hilang`. Contoh:
[code]
rst2pdf --strip-elements-with-class=hilang blog.rst.[/code]

Hasil keluarannya akan menghasilkan berkas blog.pdf yang hanya akan berisi 4 baris saja.
