---
author: udienz
comments: true
date: 2012-07-20 17:05:17+00:00
layout: post
link: https://blog.mahyudd.in/2012/07/21/agar-otentifikasi-ssh-key-di-centos-6-x-berjalan.html
slug: agar-otentifikasi-ssh-key-di-centos-6-x-berjalan
title: 'Agar otentifikasi ssh-key di Centos 6.x berjalan '
wordpress_id: 682
categories:
- Linux
tags:
- authentication
- centos
- password
- ssh-key
---

Problem utama otentifikasi ssh-key di Centos 6.x tidak jalan adalah selinuxnya di set secara enforced. Trik ini yang sering saya lupa :(. Caranya sebenarnya mudah cukup disable atau set ke mode permassive.

Dari:

    
    # This file controls the state of SELinux on the system.
    # SELINUX= can take one of these three values:
    # enforcing - SELinux security policy is enforced.
    # permissive - SELinux prints warnings instead of enforcing.
    # disabled - No SELinux policy is loaded.
    SELINUX=enforcing# SELINUXTYPE= can take one of these two values:
    # targeted - Targeted processes are protected,
    # mls - Multi Level Security protection.
    SELINUXTYPE=targeted


Ke

    
    # This file controls the state of SELinux on the system.
    # SELINUX= can take one of these three values:
    # enforcing - SELinux security policy is enforced.
    # permissive - SELinux prints warnings instead of enforcing.
    # disabled - No SELinux policy is loaded.
    SELINUX=permissive
    # SELINUXTYPE= can take one of these two values:
    # targeted - Targeted processes are protected,
    # mls - Multi Level Security protection.
    SELINUXTYPE=targeted


Reload dengan

    
    # setenforce 0


kemudian cek dengan:

    
    # sestatus 
    SELinux status:                 enabled
    SELinuxfs mount:                /selinux
    Current mode:                   permissive
    Mode from config file:          permissive
    Policy version:                 24
    Policy from config file:        targeted


Note: selinux tetap jalan, hanya saja ssh-key sudah bisa aktif.
