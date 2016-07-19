---
author: udienz
comments: true
date: 2013-08-16 04:06:48+00:00
layout: post
slug: scam-pemanfaatan-google-translate
title: Scam; Pemanfaatan google translate
wordpress_id: 766
categories:
- Komputer
tags:
- email
- scam
- spam
---

Hari ini saya mendapat email yang menarik, walau pada kasus sebelumnya saya sering menerima hal serupa namun scam yang satu ini sungguh unik karena benar-benar memanfaatkan translator.

Subject dalam email adalah '**Sayang pengguna**', mungkin si pembuat mentranslate kata-kata '**dear honey**' hihihi. Saya teringat akan posting [om JP](http://staff.blog.ui.ac.id/jp/2013/02/12/spam-pencurian-identitas-dan-teknologi-sistem-temu-kembali/) [tentang](http://staff.blog.ui.ac.id/jp/2010/08/23/another-phishing-attempt/) [ini](http://staff.blog.ui.ac.id/jp/2010/06/08/nigerian-scam-versi-indonesia/). Berikut initipan emailnya:


    
    
    Subject: sayang pengguna
    To: x <x>
    From: "ADMIN" <anaclaudias@pmm.am.gov.br>
    Date: Thu, 15 Aug 2013 19:39:38 +0100
    Reply-To: 1497179306@qq.com
    Message-Id: <2013__________________DA3F@webmail.manaus.am.gov.br>
    
    sayang pengguna
    E-mail Anda telah melampaui 2 GB, yang diciptakan oleh webmaster kami, Anda=
     sedang berjalan di 2.30GB, Anda tidak dapat mengirim atau menerima pesan b=
    aru sampai Anda memeriksa account Anda. Isi formulir untuk memvalidasi acco=
    unt Anda.
    
    Lengkapi formulir di bawah ini untuk mengkonfirmasi e-mail Anda:
    
    (1) E-mail:
    (2) Nama:
    (3) Password:
    (4) Konfirmasi Password:
    
    terima kasih
    sistem Administrator



Eh... ayo kita intip header emailnya

    
    Received: from webmail.manaus.am.gov.br (taruma.pmm.am.gov.br [200.242.41.132]) by Firewall6.rad.net.id with ESMTP id xFW5AV9BuNBP35LF for <x>; Fri, 16 Aug 2013 01:39:53 +0700 (WIT)
    Received: from localhost (localhost [127.0.0.1])
            by webmail.manaus.am.gov.br (Postfix) with ESMTP id 54A8B1ADA3F;
            Thu, 15 Aug 2013 14:39:49 -0400 (AMT)
    Received: from webmail.manaus.am.gov.br ([127.0.0.1])
            by localhost (taruma.manaus.am.gov.br [127.0.0.1]) (amavisd-new, port 10024)
            with ESMTP id kJ0v63WJigbh; Thu, 15 Aug 2013 14:39:49 -0400 (AMT)
    Received: from [10.186.168.112] (unknown [41.203.69.5])
            (using TLSv1 with cipher DHE-RSA-AES256-SHA (256/256 bits))
            (No client certificate requested)
            by webmail.manaus.am.gov.br (Postfix) with ESMTPSA id EB9961AC1C7;
            Thu, 15 Aug 2013 14:39:39 -0400 (AMT)



Ketemu ip nya adalah 200.242.41.132. Saya lihat lihat di [senderbase](http://www.senderbase.org/lookup?search_string=200.242.41.132) ip ini memiliki reputasi yang buruk. Sayangnya [Spamhaus](http://www.spamhaus.org/), [CBL](http://cbl.abuseat.org/lookup.cgi?ip=200.242.41.132), [Sorbs](http://www.sorbs.net/lookup.shtml?200.242.41.132) dan layanan lain tidak melakukan blocking terhadap IP ini. Akhirnya ya sudah saya lapor saja ke [spamcop](http://www.spamcop.net/) hehehe.

Kenapa ini bisa lolos? silakan lihat dibawah ini

    
    
    X-Relay-Countries: ID ** ** ID ID BR ** ** NG
    X-Spam-Languages: ms id
    X-Virus-Scanned: AntiVirus n AntiSPAM at x.pusatdns.com (IndoCENTER)
    X-Spam-Flag: NO
    X-Spam-Score: 0.35
    X-Spam-Level:
    X-Spam-Status: No, score=0.35 tagged_above=-999 required=4.5
            tests=[BAYES_20=-1, RCVD_IN_BL_SPAMCOP_NET=1.347, SPF_FAIL=0.001,
            TO_EQ_FM_DOM_SPF_FAIL=0.001, TO_EQ_FM_SPF_FAIL=0.001] autolearn=no
    



Mungkin karena berbahasa Indonesia jadi si spamassassin nya ga akurat kali yah?
