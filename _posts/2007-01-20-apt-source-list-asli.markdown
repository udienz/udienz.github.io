---
author: udienz
comments: true
date: 2007-01-20 18:30:18+00:00
layout: post
slug: apt-source-list-asli
title: APT, Source list asli
wordpress_id: 6
categories:
- Linux
tags:
- Debian
- Linux
- ources.list
- ubuntu
---

sering kali kita kebingungan ketika udah modif system ubuntu kita, apalagi kalo kita sering menambah daftar repo ataupun nemambah program.

celakanya kita bingung untuk kembali ke daftar repository asli, nah ini adalah repository aslinya

---start--

# deb cdrom:[Ubuntu 6.10 _Edgy Eft_ - Release i386 (20061025) - Repository - DVD 1 of 4]/ edgy main restricted

## Major bug fix updates produced after the final release of the
## distribution.

## Uncomment the following two lines to add software from the 'universe'
## repository.
## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## universe WILL NOT receive any review or updates from the Ubuntu security
## team.
# deb http://id.archive.ubuntu.com/ubuntu/ edgy universe
# deb-src http://id.archive.ubuntu.com/ubuntu/ edgy universe

## Uncomment the following two lines to add software from the 'backports'
## repository.
## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
# deb http://id.archive.ubuntu.com/ubuntu/ edgy-backports main restricted universe multiverse
# deb-src http://id.archive.ubuntu.com/ubuntu/ edgy-backports main restricted universe multiverse

# deb http://security.ubuntu.com/ubuntu edgy-security universe
# deb-src http://security.ubuntu.com/ubuntu edgy-security universe

--end here--

lha itukan reponya server luar negeri, kalo dalam negeri???

gampang, cukup ganti aja  semua yang berbau id.archive.ubuntu.com/ubuntu seperti....

deb http://id.archive.ubuntu.com/ubuntu/ edgy-backports main restricted universe multiverse

dengan

deb http://ikambing.vlsm.org/ubuntu edgy-backports main restricted universe multiverse

setelah selesai tinggal ketikkan di konsole

sudo apt-get update
