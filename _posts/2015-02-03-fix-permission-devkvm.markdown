---
author: udienz
comments: true
date: 2015-02-03 11:58:46+00:00
layout: post
link: https://blog.mahyudd.in/2015/02/03/fix-permission-devkvm.html
slug: fix-permission-devkvm
title: Fix permission /dev/kvm
wordpress_id: 888
categories:
- Debian
- Linux
- Ubuntu
tags:
- kvm
- qemu
---

Problem ini sangat umum ketika kita memasang qemu-kvm, contohnya ketika akan melakukan pembuatan mesin virtual dengan cara berikut:


    
    /usr/bin/qemu-system-x86_64 -netdev user,id=user.0,hostfwd=tcp::3213-:22 -device virtio-net,netdev=user.0 -drive file=output-qemu/packer-qemu.qcow2,if=virtio,cache=writeback -boot once=d -name packer-qemu -machine type=pc,accel=kvm -cdrom packer_cache/ubuntu.iso -m 512M -vnc 0.0.0.0:47
    Could not access KVM kernel module: Permission denied



Atau error seperti berikut


    
    2015 /02/03 18:33:37 packer-builder-qemu: 2015/02/03 18:33:37 Qemu stderr: Could not access KVM kernel module: Permission denied
    2015/02/03 18:33:37 packer-builder-qemu: 2015/02/03 18:33:37 Qemu stderr: failed to initialize KVM: Permission denied
    2015/02/03 18:33:37 ui error: ==> qemu: Error launching VM: Qemu failed to start. Please run with logs to get more info.
    2015/02/03 18:33:37 ui: ==> qemu: Deleting output directory...
    ==> qemu: Error launching VM: Qemu failed to start. Please run with logs to get more info.
    2015/02/03 18:33:37 ui error: Build 'qemu' errored: Build was halted.
    2015/02/03 18:33:37 Builds completed. Waiting on interrupt barrier...



Hal ini dikarenakan ACL pada berkas /dev/kvm yang belum memasukkan user kita, contohnya:


    
    sudo getfacl /dev/kvm
    getfacl: Removing leading '/' from absolute path names
    # file: dev/kvm
    # owner: root
    # group: kvm
    user::rw-
    group::rw-
    other::---
    



Seharusnya pada kolom user ada user kita :(. Untuk mengatasinya kita perlu melakukan modifikasi ACL pada berkas /dev/kvm dengan cara:


    
    sudo setfacl -m user:$USER:rw- /dev/kvm



contoh jika user adalah udienz:


    
    sudo setfacl -m user:udienz:rw- /dev/kvm
    sudo getfacl /dev/kvm
    getfacl: Removing leading '/' from absolute path names
    # file: dev/kvm
    # owner: root
    # group: kvm
    user::rw-
    user:udienz:rw-
    group::rw-
    mask::rw-
    other::---
    



Silakan dicoba

Referensi:




    
  1. https://bbs.archlinux.org/viewtopic.php?id=69454

    
  2. http://ubuntuforums.org/showthread.php?t=1976606

    
  3. http://forums.debian.net/viewtopic.php?f=10&t=111711&sid=e550c9b1d0a8bec4ff430ec9f3858569&start=15

    
  4. http://stevedowe.me/2014/09/fix-permissions-error-with-kvm-virtual-machine-on-debian.html


