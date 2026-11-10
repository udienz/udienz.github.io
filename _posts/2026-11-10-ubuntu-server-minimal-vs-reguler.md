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
> - Sistem minimized bisa dilengkapi dengan `sudo unminimize` tanpa memasang ulang, tetapi hasilnya belum tentu sama persis dengan reguler.

## Apa kata Canonical

Berkas contoh sumber instalasi di [repositori Subiquity](https://github.com/canonical/subiquity/blob/main/examples/sources/install.yaml) memuat deskripsi kedua opsi:

- **Ubuntu Server (minimized):** "This version has been customized to have a small runtime footprint in environments where humans are not expected to log in."
- **Ubuntu Server:** "The default install contains a curated set of packages that provide a comfortable experience for operating your server."

Di installer namanya *minimized*, dan ID-nya `ubuntu-server-minimal`, jadi "minimal" dan "minimized" di tulisan ini menunjuk opsi yang sama. Pembedanya adalah kenyamanan interaktif. Reguler memuat paket pilihan untuk mengoperasikan server, minimized memuat jejak kecil untuk mesin yang tidak di-login manusia. Di berkas autoinstall, kedua opsi itu bernama `ubuntu-server-minimal` dan `ubuntu-server`; [dokumentasi autoinstall](https://canonical-subiquity.readthedocs-hosted.com/en/latest/reference/autoinstall-reference.html) menyarankan membaca `casper/install-sources.yaml` di ISO untuk nilai yang berlaku, karena ID-nya bisa berubah.

## Perbandingan isi paket

Daftar di bawah mengacu pada seed paket Ubuntu 26.04: [`server-minimal`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server-minimal) dan [`server`](https://ubuntu-archive-team.ubuntu.com/seeds/ubuntu.resolute/server). Seed minimal menyebut dirinya kira-kira set paket terkecil yang masih bisa disebut server Ubuntu.

| Kelompok | Seed `server-minimal` | Seed `server` |
|---|---|---|
| Update otomatis (opsional di kedua seed) | `unattended-upgrades`, `needrestart` | `unattended-upgrades`, `needrestart` |
| Alat disk dan filesystem | `lvm2`, `mdadm`, `btrfs-progs`, `xfsprogs`, `cryptsetup`, `multipath-tools`, `open-iscsi`, `bcache-tools` | `lvm2`, `mdadm`, `btrfs-progs`, `xfsprogs`, `multipath-tools`, `open-iscsi`, `bcache-tools` |
| Editor dan alat kerja | tidak tercantum | `vim`, `git`, `curl`, `tmux`, `patch`, `gnupg` |
| Diagnosa | tidak tercantum | `htop`, `ethtool`, `sos`, `apport` |
| Manajemen paket dan update | tidak tercantum | `software-properties-common`, `update-notifier-common` |

Tabel ini hanya membandingkan dua seed. Seed `server-minimal` dibangun di atas seed `server-cloud-minimal`, dan seed `server` tidak menyebut `cryptsetup` yang ada di seed minimal. Paket yang disebut seed juga belum tentu seluruh isi sistem terpasang, dan `unminimize` (di bawah) memasang `ubuntu-standard` dari seed lain, jadi selisih nyatanya bisa lebih besar dari tabel.

Dokumentasi Canonical untuk image cloud minimal memberi gambaran serupa: "greatly reduced default package set, without many convenience tools for interactive usage", dan image itu "will require fewer security updates over time" ([Ubuntu base and minimal images](https://ubuntu.com/cloud/public-cloud/docs/all-clouds-explanation/ubuntu-base-and-minimal-images/)). Itu berlaku untuk image cloud, bukan untuk opsi di installer ISO.

Untuk melihat selisih nyatanya, pasang keduanya dan bandingkan hasil dua perintah ini:

```bash
dpkg -l | grep -c '^ii'
df -h /
```

## Kapan memilih yang mana

**Minimized** cocok untuk:

- VM atau mesin yang dibuat dan dikonfigurasi otomatis (cloud-init, Ansible, autoinstall).
- Server berfungsi tunggal yang jarang atau tidak pernah di-login manusia.
- Kasus yang ingin jumlah paket sekecil mungkin.

**Reguler** cocok untuk:

- Server yang Anda kelola sendiri lewat SSH dan butuh `vim`, `git`, atau `htop` tersedia saat darurat.
- Pemula yang belum tahu alat apa yang akan dibutuhkan.

Bila Anda akan sering login langsung, pilih reguler.

## Melengkapi sistem minimized

Tidak perlu memasang ulang:

```bash
sudo unminimize
```

Skrip [`unminimize`](https://git.launchpad.net/ubuntu/+source/unminimize/tree/unminimize) menyatakan dirinya "restores content and packages that are found on a default Ubuntu server system in order to make this system more suitable for interactive use". Urutannya: meminta konfirmasi, menjalankan `apt-get update` dan `apt-get upgrade`, mengubah `/etc/dpkg/dpkg.cfg.d/excludes` supaya dokumentasi, man page, dan terjemahan terpasang lagi, lalu memasang `ubuntu-minimal` dan `ubuntu-standard`. Skrip itu juga memperingatkan bahwa pemasangan ulang paket bisa gagal karena konfigurasi yang berubah atau paket pihak ketiga. Skrip memasang `ubuntu-minimal` dan `ubuntu-standard`, bukan seed `server` secara langsung, jadi cek apakah alat yang Anda butuhkan, misalnya `vim`, sudah kembali. Untuk satu atau dua alat saja, `apt install` langsung lebih ringan.

Tulisan ini dibantu oleh AI.
