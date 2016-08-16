---
layout: post
title: "Memasang Docker di Linux"
---

Daftar Isi

{:toc}

# Bagaimana memasang docker engine di Linux?

Docker pada saat ini sedang naik daun dikarenakan docker sangat
mudah dalam pengoperasiannya. Dalam tulisan ini akan dibahas bagaimana
cara memasang Docker di Linux.

Persiapan:
 - Linux box, anda bebas menggunakan distro apa saja
 - Distro yang anda gunakan mensupport cgrups dan unionfs

## Install perangkat lunak pendukung

Beberapa perangkat lunak yang perlu dipasang saat pemasangan adalah `curl`
atau `wget`. untuk pemasangan, sialakan mengikuti prosedur pemasangan dari
distro anda.

Contoh apabila menggunakan Debian base:

```bash
sudo apt-get update
sudo apt-get install -y curl wget
```

Contoh apabila menggunakan RedHat basei:

```bash
sudo yum install -y curl wget
```

Langkah selanjutnya adalah memasang docker, petunjuk lengkap dari pemasangan
docker dapat dilihat di [Dokumentasi Docker](https://docs.docker.com/engine/installation/)
hanya saja saya jarang mengikuti prosedur tersebut karena bertele-tele :).

Untuk pemasangan docker, anda cukup mengetikkan perintah dibawah ini:

```
curl -sSL https://get.docker.com/ | sh
```

atau jika menggunakan wget

```
wget -qO- https://get.docker.com/ | sh
```

## Pengaturan tambahan

Berikut adapah pengaturan tambahan untuk docker

### Menambahkan account ke grup docker

Secara bawaanya, docker ***hanya*** bisa dieksekusi oleh root atau menggunakan sudo,
untuk mengakalinya anda harus memasukkan account anda ke grup docker. Untuk menambahkan
account anda ke grup docker silakan mengeksekusi perintah dibawah ini:

```
sudo groupadd docker
sudo usermod -aG docker $(whoami)
```

Kemudian silakan logout dan login kembali, untuk memastikan account anda silakan cek
dengan perintah dibawah ini:

```
id $(whoami)
```

### Penyesuaian pembatasan memory dan swap

Seringkali dalam menjalankan docker, akan menghasilkan pesan seperti dibawah ini:

```
WARNING: Your kernel does not support cgroup swap limit. WARNING: Your
kernel does not support swap limit capabilities. Limitation discarded.
```

Untuk mengatasi masalah tersebut, silakan sunting berkas /etc/default/grub dan update
seperti dibawah ini

```
GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"
```

## Bagaimana memasang docker-compose? (tambahan)

[Docker compose](https://docs.docker.com/compose/overview/) adalah
salah satu peralatan dari Docker yang saya suka. Berikut adalah cara measangan dari docker-compose

```bash
mkdir $HOME/bin
curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-$(uname -s)-$(uname -m) > $HOME/bin/docker-compose
chmod +x $HOME/bin/docker-compose
```

### Alternatif lain

#### Python pip

Docker-compose dapat dipasang menggunakan python-pip, berikut adalah caranya

```bash
sudo apt-get install python-pip
pip install docker-compose
```

#### Sebagai Docker container

Docker-compose juga dapat dijalankan sebagai container. Untuk pemasangan compose, silakan ketik

```bash
mkdir $HOME/bin
curl -L https://github.com/docker/compose/releases/download/1.8.0/run.sh > $HOME/bin/docker-compose
chmod +x $HOME/bin/docker-compose
```

### Verifikasi

Berikut adalah cara verifikasi untuk meastikan versi Docker-compose

```bash
docker-compose -v
docker-compose version 1.7.1, build 6c29830
```

