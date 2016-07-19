---
author: udienz
comments: true
date: 2014-01-21 06:18:36+00:00
layout: post
link: https://blog.mahyudd.in/2014/01/21/membuat-spamassassin-rules-sendiri.html
slug: membuat-spamassassin-rules-sendiri
title: Membuat spamassassin rules sendiri
wordpress_id: 808
categories:
- Linux
- Networking
tags:
- email
- spam
- spamasassin
---

Spamassassin terdiri dari banyak rules untuk mendeteksi spam, di Debian/Ubuntu default nya berada di direktori /var/lib/spamassassin/, nah masalahnya terkadang ada spam yang lolos dari spamassassin. Biasanya karena spamasassin belum mendefinisikan rules tersebut, atau kita ingin menerapkan rules sendiri. Contohnya saya pengen:



	
  1. Saya pengen ngeblok semua email dengan header "Aku Ganteng"

	
  2. Saya pengen ngeblok semua email dengan isi yang mengandung tautan ke mahyudd.in

	
  3. Saya pengen membuat aturan yang ketat ke email yang di tujukan ke me@udienz.my.id


Bagaimana solusinya?

Jelas bahwa spamassassin tidak akan memahami keinginan kita tentang tiga point diatas :) solusinya adalah kita harus membuat rules sendiri. Pertama tama kita buat rules baru ini di /etc/spamassassin/local/test.cf. Detail dari langkahnya adalah sebgai berikut:

    
    mkdir /etc/spamassassin/local
    echo "include /etc/spamassassin/local/test.cf" >> /etc/spamassassin.local.cf


Dalam file /etc/spamassassin/local/test.cf, untuk nomer satu kita dapat membuat rules sebagai berikut:

    
    header COBA1 Subject =~ /Aku\ Ganteng/i
    score COBA1 2.0


Untuk nomer dua, kita dapat membuat rules sebagai berikut:

    
    uri COBA2 /mahyudd\.in/
    score COBA2 /google\.com/


Untuk nomer tiga, kita dapat membuat rules sebagai berikut:

    
    header TOMEID To =~ /me\@udienz\.my\.id/
    score TOMEID


Untuk melakukan ujicoba pada email, yaitu dengan cara membuat file dari sebuah email (biasanya klik show source) kemudian eksekusi dengan spamassassin. Contoh

    
    spamassassin -D -dt < /tmp/spam1.txt


**Meta rules**

Meta rules digunakan untuk mengkombinasikan ketiga rules tersebut menjadi satu. Contoh

    
    header __COBA1__ Subject =~ /Aku\ Ganteng/i
    uri __COBA2__ /mahyudd\.in/
    header __TOMEID__ To =~ /me\@udienz\.my\.id/
    meta DARIBLOG (__COBA1__ && __COBA2__ && __TOMEID__)
    describe DARIBLOG See http://blog.mahyudd.in/
    score DARIBLOG 4



Bagaimana dengan rules berbasiskan IP? Asumsi dari ip 172.17.243.125 maka lihat rules berikut:

    
    header COBA4 Received =~ /\[172\.17\.243\.125\]/
    score COBA4 1.0
    



Silakan dicoba!
