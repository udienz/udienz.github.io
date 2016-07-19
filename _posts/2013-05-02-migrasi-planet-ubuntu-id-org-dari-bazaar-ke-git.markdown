---
author: udienz
comments: true
date: 2013-05-02 04:40:49+00:00
layout: post
slug: migrasi-planet-ubuntu-id-org-dari-bazaar-ke-git
title: Migrasi planet.ubuntu-id.org dari bazaar ke git
wordpress_id: 757
categories:
- Komunitas
- Ubuntu
tags:
- bazaar
- git
- github
- Launchpad
- planetplanet
- ubuntu-id
---

Seperti yang kita tahu, [planet.ubuntu.or.id](http://planet.ubuntu.or.id) atau [planet.ubuntu-id.org](http://planet.ubuntu-id.org) untuk template dan pengaturannya menggunakan bazaar sebagai Version Control nya agar lebih mudah memeliharanya ([lihat di sini](http://https://code.launchpad.net/~ubuntu-id-council/ubuntu-id-web/planet-uid)). Seiring berjalan waktu, akhirnya saya memutuskan untuk ganti ke git saja dan di hostingkan ke [github](https://github.com/ubuntu-id/planet) dengan tetap di [mirroringkan ke launchpad](https://code.launchpad.net/~ubuntu-id-council/ubuntu-id-web/trunk).

Saya mau cerita bagaimana caranya migrasi dari bazaar (bzr) ke git. Langsung saja, silakan install bazaar dan gitnya dulu:

```$ sudo apt-get install bzr-git bzr git```

Kemudian copy repository bazaar dari launchpad ke komputer kita.

```$ bzr branch lp:~ubuntu-id-council/ubuntu-id-web/planet-uid planet.ubuntu-id.org```

Kemudian buat repostory git di dalam repository bazaarnya.

```$ cd planet.ubuntu-id.org
$ git init```

Langkah selanjutnya adalah mengexport dari bazaar dan kemudian ditangkap oleh git, setelah itu buang direktori .bzr/ yang sudah tidak digunakan lagi karena kita sudah menggunakan git.

```$ bzr fast-export $(pwd) | git fast-import
11:20:49 Calculating the revisions to include ...
11:20:49 Starting export of 17 revisions ...
11:20:49 Exported 17 revisions in 0:00:00
git-fast-import statistics:
---------------------------------------------------------------------
Alloc'd objects:       5000
Total objects:          157 (         2 duplicates                  )
      blobs  :          118 (         2 duplicates         28 deltas of        117 attempts)
      trees  :           22 (         0 duplicates         17 deltas of         21 attempts)
      commits:           17 (         0 duplicates          0 deltas of          0 attempts)
      tags   :            0 (         0 duplicates          0 deltas of          0 attempts)
Total branches:           1 (         1 loads     )
      marks:           1024 (        17 unique    )
      atoms:            105
Memory total:          2344 KiB
       pools:          2110 KiB
     objects:           234 KiB
---------------------------------------------------------------------
pack_report: getpagesize()            =       4096
pack_report: core.packedGitWindowSize = 1073741824
pack_report: core.packedGitLimit      = 8589934592
pack_report: pack_used_ctr            =         76
pack_report: pack_mmap_calls          =         19
pack_report: pack_open_windows        =          1 /          1
pack_report: pack_mapped              =     466281 /     466281
---------------------------------------------------------------------
$ git reset HEAD
$ rm .bzr -rf
```

Kemudian tambahkan alamat repo git dan upload ke github

```
$ git remote add github git@github.com:ubuntu-id/planet.git
$ git push -u github master
```

Done, silakan lihat ke halaman [githubnya](https://github.com/ubuntu-id/planet).

Dan untuk proses pendaftarand dan revisi email masih tetap menggunakan launchpad.
