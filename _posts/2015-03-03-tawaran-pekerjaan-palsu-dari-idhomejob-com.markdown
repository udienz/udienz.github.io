---
author: udienz
comments: true
date: 2015-03-03 08:28:41+00:00
layout: post
link: https://blog.mahyudd.in/2015/03/03/tawaran-pekerjaan-palsu-dari-idhomejob-com.html
slug: tawaran-pekerjaan-palsu-dari-idhomejob-com
title: Tawaran pekerjaan palsu dari idhomejob.com
wordpress_id: 899
categories:
- MySelf
tags:
- spam
- spamasassin
---

Ada berbagai spam yang terkirim ke beberapa email client dan saya, salah satunya adalah spam tentang tawaran pekerjaan. Informasi tentang spam ini pernah di buat olehÂ [dynamoo diÂ blog nya](http://blog.dynamoo.com/2015/03/fake-job-offer-ukhomejobcom-and-many.html).

Tipikan dari spam ini adalah:




    
  1. Pengirim adalah kita sendiri

    
  2. Melakukan penawaran pekerjaan yang menyuruh kita untuk membalas ke email lain



Contoh:


    
    From: saya
    To: saya
    Subject: Penawaran terbaik
    Date: 2 Mar 2015 20:52:48 +0600
    Message-ID: <002301d054fc$03b3d226$2da20587$@udienz.web.id>
    MIME-Version: 1.0
    Content-Type: text/plain;
            charset="windows-1252"
    Content-Transfer-Encoding: 8bit
    X-Mailer: Microsoft Outlook 14.0
    Thread-Index: Ac0fi9o9dj7c55fh0fi9o9dj7c55fh==
    Content-Language: en
    
    Perhatian!
    Perusahaan internasional membutuhkan karyawan di Indonesia!
    Kita membutuhkan orang dengan keterampilan organisasi, pengetahuan tentang Internet, Office.
    
    ika Anda adalah orang yang keputusan dan tahu bagaimana bekerja dalam sebuah tim,
    Anda adalah seorang pekerja yang handal dan penuh keinginan untuk sukses - kami membutuhkan Anda.
    
    Pekerjaan yang stabil dan penghasilan yang layak dijamin.
    Silakan jika Anda tertarik pada lowongan ini, silahkan kirim informasi kontak Anda:
    Nama Depan:
    negara:
    kota:
    E-mail:
    
    Kontak kami: alexandre@idhomejob.com
    





**Jangan sekali kali** membalas email tersebut! Untuk mengatasinya saya menyarankan untuk:




    
  * Jika anda mempunyai kuasa atas domain anda maka mohon menambahkan SPF dan DMARC record. Tujunya adalah membantu email server dalam mengidentifikasi bahwa email yang datang/pergi memang benar-benar dari network/system kita.

    
  * Dalam DMARC record perlu di tambahkan opsi agar selalu menggunakan kunci DKIM.

    
  * Melakukan optimasi spamassassin.



Untuk petunjuk melakukan pemasangan SPKF, DKIM dan DMARC silakan merujuk ke blog [Bapak Vavai berikut](http://vavai.com/2010/12/21/menangkal-spoofing-phising-spam-menggunakan-spf-sender-policy-framework/). Dalam domain saya yaitu udienz.web.id dan mahyudd.in sudah terpasang SPF dan DKIM yang berguna untuk menangkal phising dan sproffing email tersebut. Berikut adalah tangkapan layar spam yang sempat terjaring oleh Gmail.

[![11044631_10153169266213281_6392055027775203511_n](https://blog.mahyudd.in/wp-content/uploads/2015/03/11044631_10153169266213281_6392055027775203511_n-300x203.png)](https://blog.mahyudd.in/wp-content/uploads/2015/03/11044631_10153169266213281_6392055027775203511_n.png)

Untuk spamassassin saya menggunakan rules sebagai berikut yang sudah [saya push ke github](https://github.com/udienz/public-sa/commit/59d18a19c34b0716dd6a253917ce14b4c0aed46c):

[git:pre_bash@https://github.com/udienz/public-sa/blob/master/sa.cf{314:317}]
Sekali lagi, **jangan** pernah membalas email tersebut!

**UPDATE**, berikut adalah daftar domain yang digunakan:




    
  * globbalpresence.com

    
  * recognizettrauma.net

    
  * gbearn.com

    
  * comercioes.com

    
  * eurohomejob.com

    
  * fastestrades.com

    
  * usaearns.com

    
  * idhomejob.com

    
  * ukhomejob.com

    
  * eurhomejob.com


