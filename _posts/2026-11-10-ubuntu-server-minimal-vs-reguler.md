---
layout: post
title: "Ubuntu Server Minimized vs Reguler: Apa Bedanya?"
description: "Perbedaan Ubuntu Server (minimized) dan reguler di installer: isi paket, kapan memilih masing-masing, dan cara melengkapinya dengan unminimize."
image: "/img/ubuntu-server-minimal-vs-reguler.png"
date: 2026-11-10
categories:
    - Linux
tags:
    - ubuntu
    - ubuntu-server
    - installer
    - minimized
---

Installer Ubuntu Server menawarkan dua pilihan di langkah pemilihan basis: *Ubuntu Server* dan *Ubuntu Server (minimized)*. Bedanya ada di paket yang terpasang sejak awal dan di siapa yang dianggap akan memakai mesinnya.

<!--more-->

> **Poin Penting**
>
> - Versi reguler berisi paket yang membuat admin nyaman bekerja langsung di server. Versi minimized dipangkas untuk mesin yang jarang atau tidak pernah di-login manusia.
> - Alat disk dan filesystem seperti `lvm2`, `mdadm`, dan `btrfs-progs` tercantum di seed kedua versi. Yang hanya tercantum di seed reguler adalah alat harian seperti `vim`, `git`, `curl`, `tmux`, dan `htop`.
> - Sistem minimized bisa dilengkapi tanpa memasang ulang dengan `sudo unminimize`.

## Apa kata Canonical

Berkas contoh sumber instalasi di [repositori Subiquity](https://github.com/canonical/subiquity/blob/main/examples/sources/install.yaml) memuat deskripsi kedua opsi:

- **Ubuntu Server (minimized):** "This version has been customized to have a small runtime footprint in environments where humans are not expected to log in."
- **Ubuntu Server:** "The default install contains a curated set of packages that provide a comfortable experience for operating your server."

Pembedanya adalah kenyamanan interaktif. Reguler memuat paket pilihan untuk mengoperasikan server, minimized memuat jejak kecil untuk mesin yang tidak di-login manusia. Di berkas autoinstall, kedua opsi itu bernama `ubuntu-server-minimal` dan `ubuntu-server`; [dokumentasi autoinstall](https://canonical-subiquity.readthedocs-hosted.com/en/latest/reference/autoinstall-reference.html) menyarankan membaca `casper/install-sources.yaml` di ISO untuk nilai yang berlaku, karena ID-nya bisa berubah.

## Perbandingan isi paket

Daftar di bawah mengacu pada seed paket Ubuntu 26.04: [`server-minimal`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server-minimal) dan [`server`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server). Seed minimal menyebut dirinya kira-kira set paket terkecil yang masih bisa disebut server Ubuntu.

| Kelompok | Seed `server-minimal` | Seed `server` |
|---|---|---|
| Update otomatis | `unattended-upgrades`, `needrestart` | `unattended-upgrades`, `needrestart` (keduanya opsional) |
| Alat disk dan filesystem | `lvm2`, `mdadm`, `btrfs-progs`, `xfsprogs`, `cryptsetup`, `multipath-tools`, `open-iscsi`, `bcache-tools` | `lvm2`, `mdadm`, `btrfs-progs`, `xfsprogs`, `multipath-tools`, `open-iscsi`, `bcache-tools` |
| Editor dan alat kerja | tidak tercantum | `vim`, `git`, `curl`, `tmux`, `patch`, `gnupg` |
| Diagnosa | tidak tercantum | `htop`, `ethtool`, `sos`, `apport` |
| Manajemen paket dan update | tidak tercantum | `software-properties-common`, `update-notifier-common` |

Tabel ini hanya membandingkan dua seed. Paket yang disebut seed belum tentu seluruh isi sistem terpasang, dan `unminimize` (di bawah) juga memasang `ubuntu-standard` dari seed lain, jadi selisih nyatanya bisa lebih besar dari tabel.

Dokumentasi Canonical untuk image cloud minimal memberi gambaran serupa: "greatly reduced default package set, without many convenience tools for interactive usage", dan image itu "will require fewer security updates over time" ([Ubuntu base and minimal images](https://ubuntu.com/cloud/public-cloud/docs/all-clouds-explanation/ubuntu-base-and-minimal-images/)). Itu berlaku untuk image cloud, bukan untuk opsi di installer ISO.

Untuk melihat selisih nyatanya, pasang keduanya dan bandingkan hasil dua perintah ini:

```bash
dpkg -l | grep -c '^ii'
df -h /
```

## Dokumentasi dan man page

Canonical menyebut `unminimize` memulihkan dokumentasi, man page, dan terjemahan pada image minimal. Skripnya mengubah `/etc/dpkg/dpkg.cfg.d/excludes` supaya dpkg kembali memasang dokumentasi, lalu memasang ulang paket yang berkas man page, dokumen, dan terjemahannya hilang.

## Kapan memilih yang mana

**Minimized** cocok untuk:

- VM atau mesin yang dibuat dan dikonfigurasi otomatis (cloud-init, Ansible, autoinstall).
- Server tunggal-fungsi yang tidak pernah di-login manusia, atau jarang.
- Kasus yang ingin jumlah paket sekecil mungkin.

**Reguler** cocok untuk:

- Server yang Anda kelola sendiri lewat SSH dan butuh `vim`, `git`, atau `htop` tersedia saat darurat.
- Pemula yang belum tahu alat apa yang akan dibutuhkan.

Untuk image cloud minimal, Canonical menulis bahwa instans minimal "are not intended to be comfortable to use at the command line". Bila Anda akan sering login langsung, pilih reguler.

## Melengkapi sistem minimized

Tidak perlu memasang ulang:

```bash
sudo unminimize
```

Skrip ini meminta konfirmasi, menjalankan `apt-get update` dan `apt-get upgrade`, memulihkan dokumentasi, lalu memasang `ubuntu-minimal` dan `ubuntu-standard` ([sumber skrip](https://git.launchpad.net/ubuntu/+source/unminimize/tree/unminimize)). Pemasangan ulang paket bisa gagal bila sistem sudah banyak berubah, dan skrip sendiri memperingatkan hal itu.

## Ringkasan

Paket yang tidak ada di minimized tinggal dipasang dengan `apt`, jadi pilihan ini menentukan titik awal. Kalau Anda sering login langsung, mulai dari reguler.

Tulisan ini dibantu oleh AI.
