---
author: udienz
comments: true
date: 2008-10-31 18:49:11+00:00
layout: post
slug: aoe-ata-over-ethernet-di-debianubuntu
title: AOE (ATA Over Ethernet) di Debian/Ubuntu
wordpress_id: 227
categories:
- Debian
- Linux
- Networking
- Ubuntu
tags:
- aoe
- ATA
- Debian
- jaringan
- network
- ubuntu
---

adalah salah satu protokol yang berguna untuk penggunaan hardisk via jaringan, ini sangat berguna untuk keperluan server yang membutuhkan hardisk besar


## Persiapan


silakan cek dahulu apakah kernel anda mendukung AOE


    
    
    # grep ATA_OVER /boot/config-`uname -r`
    CONFIG_ATA_OVER_ETH=m 




bila tidak tampak diatas maka berarti kernel anda belum mendukung AOE. langkah selanjutnya adalah mengaktifkan modul aoe


    
    
    # modprobe aoe




## INSTALASI di server


silakan install vblade


    
    # apt-get install vblade



langkah selanjurnya kita akan menggunakan /dev/hda untuk aoe, maka perintahnya adalah


    
    # vbladed 0 1 eth2 /dev/hda



bila anda ingin menambahkan /dev/hdb maka perintahnya adalah


    
    # vbladed 0 2 eth2 /dev/hdb



Partisi andasudah siap digunakan, mari kita atur klien :D


## INSTALASI di klien


silakan install aoetools dulu


    
    # aptitude install aoetools



kemudian scan device nya


    
    # aoe-discover



dan cek hasilnya dengan


    
    # aoe-stat
    e0.1        41.110GB   eth1 up
    e0.2        80.023GB   eth1 up
    # ls -lh /dev/etherd/
    total 0
    c-w--w---- 1 root disk 152,  3 2008-10-31 18:46 discover
    brw-rw---- 1 root disk 152, 16 2008-10-31 20:19 e0.1
    brw-rw---- 1 root disk 152, 32 2008-10-31 20:36 e0.2
    cr--r----- 1 root disk 152,  2 2008-10-31 18:46 err
    c-w--w---- 1 root disk 152,  6 2008-10-31 18:46 flush
    c-w--w---- 1 root disk 152,  4 2008-10-31 18:46 interfaces
    c-w--w---- 1 root disk 152,  5 2008-10-31 18:46 revalidate
    


silakan gunakan (dan format hardisnya sebelumnya)


    
    
    # mkfs.ext3 /dev/etherd/e0.1
    # mkfs.ext3 /dev/etherd/e0.2
    # mount /dev/etherd/e0.1 /media/mapper1 -t ext3
    # mount /dev/etherd/e0.2 /media/mapper2 -t ext3



Selamat anda telah berhasil!
