---
author: udienz
comments: true
date: 2008-05-25 16:27:37+00:00
layout: post
link: https://blog.mahyudd.in/2008/05/25/membuat-daftar-paket-pribadi.html
slug: membuat-daftar-paket-pribadi
title: Membuat daftar paket pribadi
wordpress_id: 187
categories:
- Komputer
- Linux
tags:
- bash
- Debian
- Linux
- programming
- repo
- script
- shell
- ubuntu
---

paket-paket binary yang telah kita unduh dalam instalasi atau koleksi dapat kita bangun ulang untuk di buat mirror pribadi. ini sangat berguna apabila kita miskin bandwith atau kita ingin membagikan update paket terbaru di repository. bagaimana caranya?

oke silakan buat folder di manapun anda suka (saya menggunakan ~/repo

`$ mkdir ~/repo`

kemudian salin paket-paket yang ada di /var/cache/apt/archives/

    
    $ cd ~/repo
    $ mkdir pool
    $ cp /var/cache/apt/archives/*.deb pool/


kemudian buat folder dists, nama distro yang akan anda namai, dan komponen nya, saya menggunakan nama koleksi sebagai distro dan extra untuk komponennya.

    
    $ mkdir dists
    $ mkdir dists/koleksi
    $ mkdir dists/koleksi/extra/
    $ mkdir dists/koleksi/extra/binary-i386


oke setalah itu...

    
    $ pwd
    /home/udienz/repo


$ dpkg-scanpackages pool /dev/null > Packages && gzip -9c Packages >Packages.gz && bzip2 Packages > Packages.bz2

kemudian pindahkan ke direktory dists/koleksi/extra/binary-i386/

    
    $ mv Packages dists/koleksi/extra/binary-i386
    $ mv Packages.gz dists/koleksi/extra/binary-i386
    $ mv Packages.bz2 dists/koleksi/extra/binary-i386


dan tambahkan ke sources.list anda

    
    $ echo 'deb file:///media/udienz/repo koleksi extra' >> /etc/apt/sources.list
    $ apt-get update


selesai

untuk kemudahan scanning paket saya sertakan file buatan saya

========== start ===========
[sourcecode language='cpp'] #!/bin/bash
# script untuk scan paket debian/ubuntu
# perhatian! tolong pindahkan semua file .deb di direktory $BASE/pool yah
DPKG=/usr/bin/dpkg-scanpackages

# cek dpkg nya
if test -e  $DPKG;
    then
    # this is most important :p
    echo "Debian/Ubuntu scanning packages for own repository"
    echo "Created by Mahyuddin Susanto aka udienz"
    echo "udienz@debian-id.org http://udienz.wordpress.com"
    echo "Use Your Own Risk"
else
    echo "Currently, package dependency is not installed on your system, please install first"
    echo "using apt-get install dpkg-dev"
    exit 1
fi

echo "whese is the local directory who have a local package?"
read BASE

if test -d $BASE/pool;
    then EXISTS="yes"
else
    echo "it seems you don't have pool directory, create first!"
    exit 1
fi

echo "please insert your distro name? ie gutsy"
read BUILD

echo "please insert your section name? ie private/non-free"
read SERI

# checking direcoty, if exits it will jump to another proses
if test -d $BASE/dists/$BUILD;
    then EXISTS="yes"
else
    mkdir $BASE/dists/$BUILD
fi

if test -d $BASE/dists/$BUILD/$SERI;
    then EXISTS="yes"
else
    mkdir $BASE/dists/$BUILD/$SERI
fi

# hm... just i386 eh!
if test -d $BASE/dists/$BUILD/$SERI/binary-i386;
    then EXISTS="yes"
else
    mkdir $BASE/dists/$BUILD/$SERI/binary-i386
fi

# pindah ke direktory yang ada paketnya
cd $BASE

echo "please insert location at directory wehre it scanned, starting with pool"
echo "if you want scan at pool direcory just wrote pool"
read SOURCE

#lets scan the packages!
$DPKG $SOURCE /dev/null > Packages

# compress nih!
gzip -9c Packages > Packages.gz
bzip2 -9c Packages > Packages.bz2

# pindah kan ke dir dists je...
mv Packages dists/$BUILD/$SERI/binary-i386/
mv Packages.gz dists/$BUILD/$SERI/binary-i386/
mv Packages.bz2 dists/$BUILD/$SERI/binary-i386/

find . -type f -print0 | xargs -0 md5sum > MD5SUM

exit 0[/sourcecode]
========= end =========
silahkan menikmati dan mencoba
