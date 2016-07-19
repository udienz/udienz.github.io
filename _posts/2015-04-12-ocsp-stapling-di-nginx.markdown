---
author: udienz
comments: true
date: 2015-04-12 09:47:56+00:00
layout: post
slug: ocsp-stapling-di-nginx
title: OCSP Stapling di nginx
wordpress_id: 917
categories:
- Linux
tags:
- nginx
- ssl
---

Dalam artikel ini saya akan mengaktifkan OCSP Stapling di nginx, syaratnya nginx harus mempunyai versi minimal 1.3.7.

Saya menggunakan startSSL dalam praktek kali ini. Baiklah kita mulai dengan mengunduh CA bundle dari startSSL.

```
mkdir /etc/nginx/ssl
cd /etc/nginx/ssl
wget -O - https://www.startssl.com/certs/ca.pem https://www.startssl.com/certs/sub.class1.server.ca.pem | tee -a ca-startssl.pem> /dev/null
```
Langkah selanjutnya adalah menambahkan parameter di vhost nginx, karena saya menggunakan vhost domain **mahyudd.in** maka biasanya filenya akan terletak di _/etc/nginx/site-avaliable/mahyudd.in.conf_. Silakan sesuaikan dengan config anda.

```
  ssl_stapling              on;
  ssl_stapling_verify       on;
  ssl_trusted_certificate   /etc/nginx/ssl/ca-startssl.pem;
```

Simpan dan test dari terminal

```
$ echo QUIT | openssl s_client -connect mahyudd.in:443 -servername mahyudd.in -status 2> /dev/null | grep -A 17 'OCSP response'| grep -B 17 'Next Update'
OCSP response:
======================================
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: C = IL, O = StartCom Ltd. (Start Commercial Limited), CN = StartCom Class 1 Server OCSP Signer
    Produced At: Apr 11 13:33:15 2015 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: 6568874F40750F016A3475625E1F5C93E5A26D58
      Issuer Key Hash: EB4234D098B0AB9FF41B6B08F7CC642EEF0E2C45
      Serial Number: 056CADC897AF49
    Cert Status: good
    This Update: Apr 11 13:33:15 2015 GMT
    Next Update: Apr 13 13:33:15 2015 GMT
```

Test secara online dapat dilakukan di [Qualys](https://www.ssllabs.com/ssltest/analyze.html?d=mahyudd.in&s=202.154.22.5). Hasilnya adalah sebagai berikut:

[![ocsp](https://udienz.github.io/images/ocsp.png)](https://udienz.github.io/images/ocsp.png)



Selamat mencoba
