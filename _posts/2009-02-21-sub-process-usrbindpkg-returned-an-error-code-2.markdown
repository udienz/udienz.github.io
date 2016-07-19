---
author: udienz
comments: true
date: 2009-02-21 01:14:15+00:00
layout: post
slug: sub-process-usrbindpkg-returned-an-error-code-2
title: sub-process usr/bin/dpkg returned an error code (2)
wordpress_id: 290
categories:
- BlankOn
- Debian
- Linux
- Ubuntu
tags:
- apt
- catatan
- dpkg
- error
- Linux
---

duh kalo gini pasti mumet.... dan bagaimana cara mengatasinya? coba masukkan perintah

    
    # apt-get -f install



Jikalau tidak bisa

    
    dpkg --clear-avail



Jika MASIH tetep ga bisa (urget!) silakan cari pengaturan paketnya di `/var/lib/dpkg/info/.postrm` atau  `/var/lib/dpkg/info/.prerm`

kemudian lihat berkas tersebut:

    
    #!/bin/sh
    set -e



cobak hilangkan `set +e`, dan ulangi dari atas. semoga bisa :D
**sekedar catatan
