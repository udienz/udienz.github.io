---
author: udienz
comments: true
date: 2015-04-12 08:39:41+00:00
layout: post
slug: ssl_cipher-di-nginx
title: ssl_cipher di nginx
wordpress_id: 911
categories:
- Linux
tags:
- ssl
- tls
---

Dalam mengatur nginx biasanya ssl_cipher apa saja yang diaktifkan? [by default](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_ciphers), nginx hanya menonaktifkan aNULL, MD5. Menurut saya itu kurang, dan lebih baik ditambahkan. Setelah googling tentang ssh_cipher yang bagus, saya menemukan rekomendasi Mozilla Foundation yang isinya:
**Modern**

[code]ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK
[/code]

**Intermediate**

[code]ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA[/code]

Jika harus memilih saya lebih memilih yang modern karena hanya mendukung TLSv1.1 dan TLSv1.2 yang tentunya lebih secure. Masalahnya adalah ketika saya test di [Qualys SSL](https://www.ssllabs.com/ssltest) test, saya hanya mendapatkan 95% untuk cipher_strength :( (lihat gambar)

[![protocol support](https://blog.mahyudd.in/wp-content/uploads/2015/04/protocol-support-300x123.png)](https://blog.mahyudd.in/wp-content/uploads/2015/04/protocol-support.png)



Setelah membaca [dokumentasi ](https://www.ssllabs.com/downloads/SSL_Server_Rating_Guide.pdf)dari Qualys, maka saya membuang dukungan untuk key yang kurang dari 128 bit. Dan berikut daftar nya beserta config di nginx:



[code]
  ssl_ciphers               ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!LOW:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS;
[/code]

Hasilnya sekarang saya dapat 100% untuk cipher strength.

[![ciper_strength](https://blog.mahyudd.in/wp-content/uploads/2015/04/ciper_strength.png)](https://blog.mahyudd.in/wp-content/uploads/2015/04/ciper_strength.png)
