---
layout: post
title: "Ubuntu Server Minimal vs Reguler: Apa Bedanya?"
description: "Perbedaan opsi Ubuntu Server (minimized) dan Ubuntu Server reguler di installer: isi paket, siapa yang cocok memakainya, dan cara mengembalikannya dengan unminimize."
image: "/img/ubuntu-server-minimal-vs-reguler.png"
date: 2026-11-10
categories:
    - Linux
tags:
    - ubuntu
    - ubuntu-server
    - installer
    - minimal
---

Installer Ubuntu Server menawarkan dua pilihan di langkah pemilihan basis: *Ubuntu Server* dan *Ubuntu Server (minimized)*. Keduanya memakai kernel dan repositori yang sama. Bedanya ada di paket yang terpasang sejak awal dan di siapa yang dianggap akan memakai mesinnya.

<!--more-->

> **Poin Penting**
>
> - Versi reguler berisi paket yang membuat admin nyaman bekerja langsung di server. Versi minimized dipangkas untuk mesin yang jarang atau tidak pernah di-login manusia.
> - Alat disk dan filesystem seperti `lvm2`, `mdadm`, dan `btrfs-progs` ada di kedua versi. Yang tidak tercantum di seed minimized adalah alat harian seperti `vim`, `git`, `curl`, `tmux`, dan `htop`.
> - Sistem minimized bisa dikembalikan ke kondisi reguler dengan `sudo unminimize`.

## Apa kata Canonical

Berkas contoh sumber instalasi di [repositori Subiquity](https://raw.githubusercontent.com/canonical/subiquity/main/examples/sources/install.yaml) memuat deskripsi resmi kedua opsi:

- **Ubuntu Server (minimized):** "This version has been customized to have a small runtime footprint in environments where humans are not expected to log in."
- **Ubuntu Server:** "The default install contains a curated set of packages that provide a comfortable experience for operating your server."

Jadi pembedanya adalah kenyamanan interaktif. Reguler menyediakan alat untuk admin yang login lewat SSH, minimized hanya menyediakan yang dibutuhkan agar server berjalan. Di berkas autoinstall, kedua opsi itu bernama `ubuntu-server-minimal` dan `ubuntu-server`; [dokumentasi autoinstall](https://canonical-subiquity.readthedocs-hosted.com/en/latest/reference/autoinstall-reference.html) menyarankan membaca `casper/install-sources.yaml` di ISO untuk nilai yang berlaku, karena ID-nya bisa berubah.

## Perbandingan isi paket

Daftar di bawah mengacu pada seed paket Ubuntu 26.04: [`server-minimal`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server-minimal) dan [`server`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server). Seed minimal menyebut dirinya kira-kira set paket terkecil yang masih bisa disebut server Ubuntu.

| Kelompok | Minimized | Reguler |
|---|---|---|
| Update otomatis dan sinkron waktu | `unattended-upgrades`, `needrestart`, `chrony` | ada |
| Alat disk dan filesystem | `lvm2`, `mdadm`, `btrfs-progs`, `xfsprogs`, `cryptsetup`, `multipath-tools`, `open-iscsi`, `bcache-tools` | ada |
| Editor dan alat kerja | tidak tercantum | `vim`, `git`, `curl`, `tmux`, `patch`, `gnupg` |
| Diagnosa | tidak tercantum | `htop`, `ethtool`, `sos`, `apport` |
| Manajemen paket dan update | tidak tercantum | `software-properties-common`, `update-notifier-common` |

Dokumentasi Canonical untuk image cloud minimal menyebut pengurangan serupa: "greatly reduced default package set, without many convenience tools for interactive usage". Di sana Canonical juga melaporkan jumlah paket turun dari 426 ke 288 dan unduhan QCOW2 turun dari 337,19 MiB ke 226,75 MiB ([Ubuntu base and minimal images](https://ubuntu.com/cloud/public-cloud/docs/all-clouds-explanation/ubuntu-base-and-minimal-images/)). Itu angka untuk image cloud, bukan untuk ISO installer, jadi jangan dipakai sebagai ukuran instalasi di mesin Anda.

Untuk membandingkan di mesin sendiri, hitung paket terpasang di masing-masing:

```bash
dpkg -l | grep -c '^ii'
df -h /
```

## Dokumentasi dan man page

Sistem minimized juga memangkas dokumentasi. Skrip `unminimize` mengubah berkas `/etc/dpkg/dpkg.cfg.d/excludes` supaya dpkg kembali memasang dokumentasi, lalu memasang ulang paket yang berkas man page, dokumen, dan terjemahannya hilang.

## Kapan memilih yang mana

**Minimized** cocok untuk:

- VM atau mesin yang dibuat dan dikonfigurasi otomatis (cloud-init, Ansible, autoinstall).
- Server tunggal-fungsi yang tidak pernah di-login manusia, atau jarang.
- Kasus yang peduli pada permukaan serangan dan jumlah paket yang perlu di-patch.

**Reguler** cocok untuk:

- Server yang Anda kelola sendiri lewat SSH dan butuh `vim`, `git`, `htop`, atau `man` tersedia saat darurat.
- Pemula yang belum tahu alat apa yang akan dibutuhkan.

Canonical sendiri menulis bahwa instans minimal "are not intended to be comfortable to use at the command line". Bila Anda akan sering login langsung, pilih reguler.

## Mengubah minimized menjadi reguler

Tidak perlu memasang ulang:

```bash
sudo unminimize
```

Skrip ini meminta konfirmasi, menjalankan `apt-get update` dan `apt-get upgrade`, memulihkan dokumentasi, lalu memasang `ubuntu-minimal` dan `ubuntu-standard` ([sumber skrip](https://git.launchpad.net/ubuntu/+source/unminimize/tree/unminimize)). Pemasangan ulang paket bisa gagal bila sistem sudah banyak berubah, dan skrip sendiri memperingatkan hal itu.

Arah sebaliknya tidak ada skripnya. Dari reguler ke minimized Anda harus memasang ulang atau mencopot paket satu per satu.

## Ringkasan

Pilihan ini bukan soal fitur yang hilang selamanya. Repositori dan dukungan update sama, dan paket yang tidak ada tinggal dipasang dengan `apt`. Yang berubah adalah titik awal: reguler siap dipakai manusia, minimized siap dipakai mesin.

Tulisan ini dibantu oleh AI.
