---
layout: post
title: "Install RVM di Ubuntu"
date: 2016-07-27T01:46:14+07:00
categories:
 - Linux
 - Ubuntu
tags:
 - ruby
---

## Install RVM di Ubuntu

Dalam keseharian, terkadang ada aplikasi yang memerlukan ruby versi tertentu. Sebagai contoh ketika
kemarin saya melakukan migrasi dari wordpress ke jekyll saya memerlukan ruby minimal versi 2.0 untuk 
memasang jekyll. Server saya menggunakan Ubuntu 14.04 LTS, secara default Ubuntu 14.04 menggunakan 
ruby versi 1.9.1 sehingga saya tidak bisa menggunakan jekyll versi terakhir. 

Solusi dari permasalahan ini adalah menggunakan RVM, RVM merupakan singkatan dari
**Ruby Version Manager** yang bertugas untuk mengatur versi ruby di sebuah system, sehingga antar 
versi tidak salah tercampur. Hal ini mirip dengan python virtual environment.

Berikut adalah langkah-langkah cara pemasangan RVM di Ubuntu.

## Persiapan

### Pengaturan repository

Sebelum melakukan pemasangan, moghon pastikan jika ubuntu anda memiliki menggunakan repository yang 
benar. Pengaturan repository di Ubuntu dapat di cek di `/etc/apt/sources.list`, berikut adalah isi 
dari berkas `/etc/apt/sources.list` di system saya:

```
deb http://archive.ubuntu.com/ubuntu trusty main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu trusty-updates main restricted universe multiverse
deb http://security.ubuntu.com/ubuntu trusty-security main restricted universe multiverse
```

### Upgrade paket ke versi terakhir

Sebelum melakukan pemasangan, alangkah baiknya bila kita melakukan update database paket dan upgrade 
paket ke versi terakhir, untuk itu silakan ketik perintah dibawah ini:


```bash
:~$ sudo apt-get update
:~$ sudo apt-get dist-upgrade -y
```

### Install curl

Paket curl ini dibutuhkan nantinya untuk pemasangan RVM

```bash
:~$ sudo apt-get install curl -y
```

## Pemasangan RVM

Setelah melakukan persiapan dasar, langkah selanjutnya adalah pemasangan RVM, pada pemasangan ini
kita perlu mengimport kunci GPG dari developer RVM.

```bash
:~$ gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
```

Output:

```bash
gpg: directory `/home/mahyuddin/.gnupg' created
gpg: new configuration file `/home/mahyuddin/.gnupg/gpg.conf' created
gpg: WARNING: options in `/home/mahyuddin/.gnupg/gpg.conf' are not yet active during this run
gpg: keyring `/home/mahyuddin/.gnupg/secring.gpg' created
gpg: keyring `/home/mahyuddin/.gnupg/pubring.gpg' created
gpg: requesting key D39DC0E3 from hkp server keys.gnupg.net
gpg: /home/mahyuddin/.gnupg/trustdb.gpg: trustdb created
gpg: key D39DC0E3: public key "Michal Papis (RVM signing) <mpapis@gmail.com>" imported
gpg: no ultimately trusted keys found
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
```

### Install RVM

Langkah selanjutnya adalah memasang RVM

```bash
:~$ curl -sSL https://get.rvm.io | bash -s stable
```

Output:

```bash
Downloading https://github.com/rvm/rvm/archive/1.27.0.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.27.0/1.27.0.tar.gz.asc
gpg: Signature made Tue 29 Mar 2016 01:49:47 PM UTC using RSA key ID BF04FF17
gpg: Good signature from "Michal Papis (RVM signing) <mpapis@gmail.com>"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 409B 6B17 96C2 7546 2A17  0311 3804 BB82 D39D C0E3
     Subkey fingerprint: 62C9 E5F4 DA30 0D94 AC36  166B E206 C29F BF04 FF17
GPG verified '/home/mahyuddin/.rvm/archives/rvm-1.27.0.tgz'

Installing RVM to /home/mahyuddin/.rvm/
    Adding rvm PATH line to /home/mahyuddin/.profile /home/mahyuddin/.mkshrc /home/mahyuddin/.bashrc /home/mahyuddin/.zshrc.
    Adding rvm loading line to /home/mahyuddin/.profile /home/mahyuddin/.bash_profile /home/mahyuddin/.zlogin.
Installation of RVM in /home/mahyuddin/.rvm/ is almost complete:

  * To start using RVM you need to run `source /home/mahyuddin/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.

# mahyuddin,
#
#   Thank you for using RVM!
#   We sincerely hope that RVM helps to make your life easier and more enjoyable!!!
#
# ~Wayne, Michal & team.

In case of problems: https://rvm.io/help and https://twitter.com/rvm_io
```

### Setup environment

Untuk melanjutkan setup RVM, kita perlu membuat RVM kedalam environment bash. Pada beberapa
case tertentu, kita harus memuat RVM pada sesi shell sebagai function. Untuk itu pastikan
bahwasanya pada berkas `~/.bashrc` mengandung dua baris berikut:

```bash
export PATH="$PATH:$HOME/.rvm/bin" # Add RVM to PATH for scripting
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"
```

Setelah itu, load berkas `~/.bashrc` kedalam sesi sekarang dengan perintah sebegai berikut:

```bash
:~$ source ~/.bashrc
```

### Install paket dependency ruby

Untuk memasang RVM, beberapa dependency juga perlu dipasang. Untuk pemasangan nya silakan
lakukan perintah dibawah ini:

```
:~$ rvm requirements
```

Output:

```bash
Checking requirements for ubuntu.
Installing requirements for ubuntu.
Updating system.......
Installing required packages: patch, gawk, g++, gcc, make, libc6-dev, patch, libreadline6-dev, zlib1g-dev, libssl-dev, libyaml-dev, libsqlite3-dev, sqlite3, autoconf, libgmp-dev, libgdbm-dev, libncurses5-dev, automake, libtool, bison, pkg-config, libffi-dev................................
Requirements installation successful.
:~$
```

### Memilih versi ruby

Untuk melakukan cek versi berapa saja versi ruby yang tersedia, kita dapat melakukan cek
dengan perintah dibawah ini

```
:~$ rvm list known
```

Output:

```bash
# MRI Rubies
[ruby-]1.8.6[-p420]
[ruby-]1.8.7[-head] # security released on head
[ruby-]1.9.1[-p431]
[ruby-]1.9.2[-p330]
[ruby-]1.9.3[-p551]
[ruby-]2.0.0[-p648]
[ruby-]2.1[.8]
[ruby-]2.2[.4]
[ruby-]2.3[.0]
[ruby-]2.2-head
ruby-head
```

Pada kali ini kita akan meenggunakan ruby versi 2.3, jika anda menginkan versi lain,
pastikan bahwa versi nya ada dalam daftar.


```
:~$ rvm install 2.3
```

Output:

```bash
Searching for binary rubies, this might take some time.
Found remote file https://rubies.travis-ci.org/ubuntu/14.04/x86_64/ruby-2.3.0.tar.bz2
Checking requirements for ubuntu.
Requirements installation successful.
ruby-2.3.0 - #configure
ruby-2.3.0 - #download
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 25.1M  100 25.1M    0     0  1373k      0  0:00:18  0:00:18 --:--:-- 3681k
No checksum for downloaded archive, recording checksum in user configuration.
ruby-2.3.0 - #validate archive
ruby-2.3.0 - #extract
ruby-2.3.0 - #validate binary
ruby-2.3.0 - #setup
ruby-2.3.0 - #gemset created /home/mahyuddin/.rvm/gems/ruby-2.3.0@global
ruby-2.3.0 - #importing gemset /home/mahyuddin/.rvm/gemsets/global.gems....................................
ruby-2.3.0 - #generating global wrappers........
ruby-2.3.0 - #gemset created /home/mahyuddin/.rvm/gems/ruby-2.3.0
ruby-2.3.0 - #importing gemsetfile /home/mahyuddin/.rvm/gemsets/default.gems evaluated to empty gem list
ruby-2.3.0 - #generating default wrappers........
```

Langkah selanjutnya adalah memastikan ruby versi 2.3 digunakan sebagai versi ruby default
untuk user. Untuk melakukannya, apat mengeksekusi perintah dibawah ini:

```bash
:~$ rvm use 2.3 --default
mahyuddin@ubuntu:~$ rvm use 2.3 --default
Using /home/mahyuddin/.rvm/gems/ruby-2.3.0
```

### Cek versi ruby

Untuk melakukan pengecekkan versi ruby yang sedang digunakan oleh sesi user sekarang,
silakan ketik perintah dibawah ini dan pastikan bahwasanya output dari kedua peintah mengandung versi 2.3

```
:~$ which ruby
:~$ ruby --version
```

Output

```
:~$ which ruby
/home/mahyuddin/.rvm/rubies/ruby-2.3.0/bin/ruby
:~$ ruby --version
ruby 2.3.0p0 (2015-12-25 revision 53290) [x86_64-linux]
```

Hasil dari output diatas menunjukkan bahwa ruby yang digunakan sekarang adalah versi ruby 2.3

## Manajemen ruby menggunakan RVM

### Cek versi ruby yang terinstall

Untuk melakukan cek versi berapa saja ruby yang sudah dipasang, silakabn ketk perintah dibawah ini:

```
:~$ rvm list
```

Output

```
rvm rubies

   ruby-2.0.0-p648 [ x86_64 ]
   ruby-2.1.8 [ x86_64 ]
   ruby-2.2.4 [ x86_64 ]
=* ruby-2.3.0 [ x86_64 ]

# => - current
# =* - current && default
#  * - default
```

### Switch ke versi ruby lain

Jika versi lain sudah terinstall, silakan gunakan perintah `rvm use`, contoh:

```
:~$ rvm use 2.2
Using /home/mahyuddin/.rvm/gems/ruby-2.2.4

:~$ which ruby
/home/mahyuddin/.rvm/rubies/ruby-2.2.4/bin/ruby

:~$ ruby --version
ruby 2.2.4p230 (2015-12-16 revision 53155) [x86_64-linux]
```

### Bash completion

Salah satu fitur dari RVM adalah adanya fitur tab completion
untuk mengaktifkan tab completion, pastikan dalam berkas `~/.bashrc` anda
terdapat baris berikut:

```
[[ -r $HOME/.rvm/scripts/completion ]] && . $HOME/.rvm/scripts/completion
```

Silakan dicoba
