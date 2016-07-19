---
author: udienz
comments: true
date: 2012-05-31 08:30:31+00:00
layout: post
slug: menghemat-baterai-dell-vostro-di-ubuntu
title: Menghemat baterai Dell Vostro di Ubuntu
wordpress_id: 32
categories:
- Ubuntu
tags:
- baterai
- dell
- precise
- vostro
---

Problematika batrei sangat mengganggu pengguna laptop jika menggunakan linux, kadang batrei terasa cepet habis. Di laptop yang saya gunakan yaitu Dell Vostro 131, batrei akan mempunyai 4-5 jam untuk bertahan, sedang di linux (dalam hal ini saya menggunakan Debian/Ubuntu) batrei hanya akan bertahan 2-3 jam saja.

Saya sebenarnya kurang paham kenapa hal ini terjadi, di rilis 12.04 ini memang terjadi peningkatan performa bateri. namun masih belum bisa menyamai performa ketika di windows. Setalah googling di sana-sini, akhirnya saya menemukan cara yang efektif. Sumbernya dari [sini](http://ubuntuforums.org/showthread.php?t=1859945), tapi akan saya tulis ulang saja apa yang saya lakukan:




	
    * Apply PCIE_ASPM



Silakan buka berkas /etc/default/grub, kemudian pada baris GRUB_CMDLINE_LINUX_DEFAULT, buat seperti dibawah ini:

    
    GRUB_CMDLINE_LINUX_DEFAULT="quiet pcie_aspm=force i915.i915_enable_rc6=1 i915.i915_enable_fbc=1"


simpan dan eksekusi perintah berikut:

    
    $ sudo update-grub






	
    * Install Juniper dan paket lainya



Btw, ini bukan merek switch/router lho, ini aseli paket :p

    
    $ sudo add-apt-repository ppa:webupd8team/jupiter
    $ sudo apt-get update
    $ sudo apt-get install jupiter powertop


Reboot dan lihat hasilnya, di saya menunjukkan hasil hampir 2x lipat.

[![](http://log.udienz.web.id/wp-content/uploads/2012/05/Screenshot-from-2012-05-31-1501081.png)](http://log.udienz.web.id/wp-content/uploads/2012/05/Screenshot-from-2012-05-31-1501081.png)

Cukup mudah?
