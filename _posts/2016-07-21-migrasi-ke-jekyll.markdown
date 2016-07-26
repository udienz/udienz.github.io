---
layout: post
title: "Migrasi Ke Jekyll"
date: 2016-07-21T03:58:31+07:00
categories:
 - Self
tags:
 - jekyll
 - ruby
 - wordpress
---

Migrasi ke Jekyll

Sudah lama saya menggunakan wordpress, dan saat ini saya memutuskan untuk menggunakan jekyll. Saya
memilih jekyll karena jekyll sangat cepat (karena static) dan support markdown (bahasa yang saya
suka). Beberapa pertimbangan lain yang ada adalah hosting situs ini menggunakan shared hosting, jadi
sangat rentan apabila menggunakan wordpress, seperti yang kita tahu wordpress adalah salah satu cms
favorit untuk dijadikan target serangan. Walau sebenarnya kita bisa melakukan pencegahan, tapi saya
hanya ingin pengaturan minimal untuk situs ini. CMIIW

Untuk migrasi ke dari wordpress ke jekyll pun sangat mudah dan tidak membutuhkan proses yang
bertele-tele dan panjang, saya menggunakan [exitwp](https://github.com/thomasf/exitwp) untuk melakukan
export post dan halaman ke format markdown. Kebetulan saya menggunakan Ubuntu untuk melakukan proses
migrasi ini jadi tinggal mengikuti prosedur yang ada.
