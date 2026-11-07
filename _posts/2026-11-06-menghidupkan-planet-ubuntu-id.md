---
layout: post
title: "Menghidupkan Planet Ubuntu-ID dengan Python 3 dan Cloudflare"
description: "Catatan mengganti Planet Venus (Python 2) dengan satu skrip Python 3, membersihkan feed rusak, dan men-deploy Planet Ubuntu-ID ke Cloudflare."
image: "/img/menghidupkan-planet-ubuntu-id.jpg"
date: 2026-11-06
categories:
    - Linux
tags:
    - planet
    - ubuntu
    - python
    - cloudflare
    - rss
---


Planet Ubuntu-ID adalah agregator blog anggota komunitas Ubuntu Indonesia. Saya dulu memelihara repositorinya, [ubuntu-id/planet](https://github.com/ubuntu-id/planet), dan [commit terakhir](https://github.com/ubuntu-id/planet/commit/0f474121dacf05f6382fc52f968119c3769eeaa8) di sana bertanggal Februari 2020. Awal November 2026 saya ingin menghidupkannya lagi. Domain `planet.ubuntu-id.org` waktu itu sudah tidak resolve di DNS, dan kodenya tidak bisa dijalankan.

> **Poin Penting**
>
> - Planet Venus, mesin lama Planet Ubuntu-ID, berbasis Python 2 dan tidak punya commit baru sejak 2017. Saya menggantinya dengan satu skrip Python 3, `build.py`.
> - Hasilnya situs statis, jadi cukup di Cloudflare tanpa server sendiri. Isinya diperbarui tiap 6 jam lewat Deploy Hook yang dipanggil GitHub Actions.
> - Dari 73 feed lama, 35 yang masih bisa diambil. Satu feed ternyata sudah berisi iklan judi slot.

## Kenapa kode lama tidak bisa dipakai

README lama menyuruh memasang `python-libxslt1`, `python-genshi`, dan sejenisnya, lalu menjalankan `python planet.py`. Semuanya Python 2. Mesinnya, [Planet Venus](https://github.com/rubys/venus), tidak punya commit baru sejak Maret 2017 ([riwayat cabang `dev`](https://github.com/rubys/venus/commits/dev)); cabang `master` berhenti pada Februari 2011. Daripada menghidupkan Python 2 di mesin baru, saya menulis ulang pembangunnya dengan [feedparser](https://feedparser.readthedocs.io/) dan [Jinja2](https://jinja.palletsprojects.com/). `config.ini` tetap dipakai apa adanya, dan template tema Ubuntu hanya berpindah dari format htmltmpl ke Jinja2, jadi tampilannya sama.

`build.py` membaca `config.ini`, mengambil semua feed secara paralel, mengambil maksimal 5 entri per feed dan 20 entri untuk halaman utama, lalu menulis `index.html`, `rss20.xml`, dan `opml.xml` ke folder `public/`.

<!--more-->

`feedparser.parse(url)` (feedparser 6.0.14) macet saat menyambung ke beberapa host blogspot, padahal `curl` dan `urllib` lancar di mesin yang sama. Jalan keluarnya, unduh feed sendiri dengan timeout eksplisit, lalu serahkan isinya ke `feedparser`:

```python
AGENT = "PlanetUbuntuID/2.0 (+https://github.com/ubuntu-id/planet)"

req = urllib.request.Request(url, headers={"User-Agent": AGENT})
with urllib.request.urlopen(req, timeout=15) as r:
    d = feedparser.parse(r.read(), response_headers={"content-location": r.geturl()})
```

Feed yang gagal dilewati dan dicatat di stderr, jadi satu blog yang mati tidak menggagalkan seluruh build.

## Membersihkan daftar feed

Pada 6 November 2026 saya mengambil ke-73 feed di `config.ini` satu per satu lewat `build.py`. Saat pemeriksaan pertama, 38 dari 73 gagal diambil. Satu di antaranya blog saya sendiri, yang domainnya sudah pindah, jadi alamat feed-nya saya ganti dan sekarang berhasil. Itu menyisakan 37 yang gagal. Satu feed lain berhasil diambil tetapi kini berisi iklan judi slot, jadi saya keluarkan dari `config.ini`. Hasil akhirnya, dari 73 feed: 35 berhasil, 37 gagal, 1 dikeluarkan.

| Hasil | Jumlah feed |
| --- | --- |
| Berhasil diambil | 35 |
| Domain tidak resolve (DNS) | 14 |
| Bukan feed XML yang valid | 7 |
| HTTP 404, 410, atau 503 | 7 |
| Timeout | 6 |
| Server tidak terjangkau | 2 |
| Respons tanpa Content-Type atau feed kosong | 1 |
| Dikeluarkan karena iklan judi slot | 1 |
| **Total** | **73** |

Feed yang error tidak saya hapus. Ini data komunitas, dan sebagian mungkin hanya timeout sementara. Setiap bagiannya saya komentari lengkap dengan alasannya:

```ini
# ERROR (cek 2026-11-06): domain tidak resolve (DNS)
# [http://feeds.fajran.web.id/all/feed.xml]
# name = Fajran Iman Rusadi
```

Dari 35 feed yang aktif, hanya 2 yang punya tulisan sejak 2025. Sisanya, 33 feed, terakhir menulis antara 2009 dan 2024, jadi isi Planet Ubuntu-ID saat ini didominasi tulisan lama. Umur feed saya hitung dari tanggal entri terbaru di tiap feed.

## Deploy ke Cloudflare

Karena hasilnya statis, saya pakai [static assets di Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/). Satu file `wrangler.jsonc` cukup untuk menunjuk folder yang diunggah:

```jsonc
{
  "name": "planet-ubuntu-id",
  "compatibility_date": "2026-11-06",
  "assets": { "directory": "./public" }
}
```

Pengaturan build-nya: `pip install -r requirements.txt && python build.py` sebagai build command, `npx wrangler deploy` sebagai deploy command, dan Python 3.13 lewat file `.python-version` (versi bawaan [lingkungan build Workers](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) bisa diganti dengan cara itu). Nama project hanya boleh huruf kecil, angka, dan tanda hubung, jadi spasi di nama awal saya harus diganti.

Build pertama gagal dalam 11 detik, saat `master` belum berisi `build.py`. Setelah [pull request #1](https://github.com/ubuntu-id/planet/pull/1) di-merge, build berikutnya lolos.

Kalau Anda lebih suka menjalankan server sendiri daripada memakai Cloudflare, hasil `public/` bisa disajikan nginx biasa. Atur TLS-nya dengan [panduan A+ di SSL Labs untuk nginx](https://www.udienz.web.id/2026/11/05/ssl-labs-a-plus-nginx-id/).

Situs statis tidak ikut berubah saat blog anggota memposting sesuatu. Karena itu [pull request #2](https://github.com/ubuntu-id/planet/pull/2) menambah workflow GitHub Actions yang memanggil Deploy Hook Cloudflare tiap 6 jam. URL hook-nya disimpan sebagai secret repositori, tidak pernah masuk ke kode. [Run manual pertamanya](https://github.com/ubuntu-id/planet/actions/runs/42149231779) sukses.

## Pendaftaran anggota baru

Alur lama lewat tiket Launchpad saya ganti dengan pull request yang mengubah `config.ini`. Template PR meminta:

- nama lengkap dan profil Launchpad,
- alamat feed,
- pernyataan bahwa pemohon sudah menandatangani Ubuntu Code of Conduct.

Pernyataan itu tetap diperiksa manual lewat profil Launchpad sebelum PR di-merge. Selain itu, CI di setiap PR memeriksa sintaks, menjalankan build, dan memastikan `rss20.xml` serta `opml.xml` valid.

Planet Ubuntu-ID sekarang hidup lagi di [planet.ubuntu-id.org](https://planet.ubuntu-id.org/), dan kodenya terbuka di [GitHub](https://github.com/ubuntu-id/planet). Kalau Anda punya blog tentang Ubuntu atau Linux dan sudah menandatangani Ubuntu Code of Conduct, silakan kirim pull request.

---

*Penulis: Mahyuddin Susanto, penulis blog ini dan mantan pemelihara repositori Planet Ubuntu-ID ([tentang penulis](https://www.udienz.web.id/about/), [kontak](https://www.udienz.web.id/contact.html)). Foto sampul oleh [Cong Long Vu](https://unsplash.com/photos/computer-screen-displaying-network-configuration-RUyWmB5e-00) di Unsplash. Tulisan ini dibantu oleh AI.*
