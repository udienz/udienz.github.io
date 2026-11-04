# udienz blog

Sumber kode blog pribadi [www.udienz.web.id](https://www.udienz.web.id/) milik Mahyuddin Susanto (udienz). Dibangun dengan [Jekyll](https://jekyllrb.com/) dan dihosting di GitHub Pages.

## Struktur

| Path | Isi |
| --- | --- |
| `_posts/` | Artikel blog, format `YYYY-MM-DD-judul.md` |
| `_layouts/`, `_includes/` | Template halaman dan potongan HTML |
| `_sass/`, `assets/` | Gaya (SCSS), JavaScript, dan aset statis |
| `img/` | Gambar yang dipakai di artikel |
| `posts/` | Halaman indeks dengan paginasi |
| `about.md`, `categories.md`, `contact.html` | Halaman statis |
| `_config.yml` | Konfigurasi situs |
| `CNAME` | Domain kustom |

## Menjalankan secara lokal

Butuh Ruby (CI memakai 3.3) dan Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Situs tersedia di <http://localhost:4000>. Untuk menyertakan post bertanggal masa depan, tambahkan `--future`.

Build saja, tanpa server:

```bash
bundle exec jekyll build
```

## Menulis artikel

Buat file baru di `_posts/` dengan nama `YYYY-MM-DD-judul-artikel.md` dan front matter berikut:

```yaml
---
layout: post
title: "Judul Artikel"
description: "Ringkasan singkat untuk meta description."
date: 2026-11-04
categories:
    - Kategori
tags:
    - tag
---
```

## Deploy

Push ke branch `master`. Workflow [Jekyll site CI](.github/workflows/jekyll.yml) membangun situs dengan `jekyll build --future` pada setiap push dan pull request ke `master`.
