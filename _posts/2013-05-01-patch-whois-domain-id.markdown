---
author: udienz
comments: true
date: 2013-05-01 08:46:43+00:00
layout: post
slug: patch-whois-domain-id
title: '[patch] whois domain ID'
wordpress_id: 751
categories:
- Debian
- Linux
- Ubuntu
tags:
- pandi
- whois
---

Pada rilis Ubuntu kita tidak bisa melakukan whois dari terminal, hal ini dikarenakan server whois yang terdaftar di paket whois melakukan query ke whois.pandi.or.id yang (tidak tau kenapa) tidak bisa memberikan informasi whois :(

```
$ whois udienz.web.id
Not found: -V Md5.0 udienz.web.id
```
Intip intip kode sumber whois, akhirnya saya melakukan patching pada berkas yang mencantumkan server whois PANDI. Jika mau silakan unduh paket whois berikut:

**Lucid 64bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.0ubuntu3.0~ppa1_amd64.deb
```


**Lucid 32bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.0ubuntu3.0~ppa1_i386.deb
```

**Precise 64bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.15ubuntu2.0.1~ppa2_amd64.deb
```


**Precise 32bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.15ubuntu2.0.1~ppa2_i386.deb
```

**Quantal 64bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.19ubuntu0.1~ppa1_amd64.deb
```


**Quantal 32bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.19ubuntu0.1~ppa1_i386.deb
```

**Raring 64bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.20ubuntu1.0~ppa1_amd64.deb
```


**Raring 32bit**:

```
wget http://ppa.launchpad.net/udienz/ngoprek/ubuntu/pool/main/w/whois/whois_5.0.20ubuntu1.0~ppa1_i386.deb
```

As usual, Kemudian install via dpkg

```
sudo dpkg -i whois_*.deb
```

Cek pada sebuah domain, contohnya udienz.my.id

```
whois udienz.my.id
Whois Results for "udienz.my.id".

Domain Name: udienz.my.id
Creation Date: 2013-04-24T03:44:49.0Z
Last Updated On: 2013-05-01T02:51:44.0Z
Expiration Date: 2015-04-24T03:44:49.0Z
Sponsoring Registrar: Rahajasa Media Internet
Status: serverTransferProhibited
Registrant ID: 11-mahyu2
Tech Contact ID: 11-mahyu2
Admin Contact ID: 11-mahyu2
Billing Contact ID: 11-mahyu2
Name Server: dns1.pusatdns.com
Name Server: dns2.pusatdns.com
Name Server: dns3.pusatdns.com
Name Server: ns1.pusatdns.com

Access to WHOIS information is provided to assist persons in determining
the contents of a domain name registration record in the registry database.
The data in this record is provided for informational purposes only without
any accuracy guarantee.
```

Sudah berhasil bukan?

Update 2 Mei 2013: Menambahkan link untuk Lucid.
