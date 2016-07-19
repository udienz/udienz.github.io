---
author: udienz
comments: true
date: 2015-06-06 15:01:45+00:00
layout: post
slug: re-nginx-uwsgi-php-pada-debian-jessie
title: 'Re: NGINX, uWSGI, PHP pada Debian Jessie'
wordpress_id: 948
categories:
- Linux
tags:
- nginx
- PHP
- puppet
- uwsgi
---

Saya akan membahas posting [Om JP tentang integrasi Nginx, Uwsgi dan PHP](https://staff.blog.ui.ac.id/jp/2015/06/05/nginx-uwsgi-php-pada-debian-jessie/) dengan cara puppet. Sebelumnya mohon dengan sangat membaca dulu blog di Om JP.

Kemudian silakan [install puppet yang sudah saya jabarkan di blog ini](https://blog.mahyudd.in/2015/05/30/install-puppet-di-debian.html), kemudian install module nginx dengan cara


    
    root@server: ~# puppet module install jfryman-nginx



Dengan asumsi hanya menggunakan satu server (tidak menggunakan node definition ataupun class dan module) maka silakan sunting berkas /etc/puppet/manifests/site.pp. Dan isikan seperti berikut:


    
    package { [
        'uwsgi',
        'uwsgi-plugin-php',
        ]:
        ensure => installed,
        }
    
    service { 'uwsgi':
        ensure => running,
        enable => true,
    }
    file { '/etc/uwsgi/apps-enabled/':
        ensure => present,
        owner => 'root',
        source => 'puppet:///uwsgi/',
        recurse => true,
        require => Package['uwsgi-plugin-php'],
        notify => Service['uwsgi'],
        }
    nginx::resource::vhost { "$::fqdn":
      ensure => 'present',
      www_root => '/srv/www',
      autoindex => 'on',
      try_files => [ '$uri', '$uri/', '/index.php?args' ],
     }
    
    nginx::resource::location { 'location1_fqdn':
     ensure => present,
     vhost => "$::fqdn",
     location => '~.php$',
     www_root => '/srv/www/',
     location_cfg_append => {
        include => 'uwsgi_params',
        uwsgi_modifier1 => '14',
        uwsgi_pass => 'unix:/tmp/uwsgi_webphp.sock',
     },
    }
    
    include nginx
    



Selanjutnya silakan buat foler di /etc/puppet/files/ dan buat berkas init.ini di dalamnya yang berisikan seperti dibawah:


    
    [uwsgi]
    socket=/tmp/uwsgi_webphp.sock
    pidfile2=/tmp/uwsgi_webphp.pid
    daemonize=/var/log/uwsgi/webphp.log
    plugins=php
    
    chdir=/var/www
    cheaper=4
    close-on-exec=1
    harakiri=360
    max-requests=128
    processes=8
    master=1
    uid=www-data
    gid=www-data
    chmod=666
    log-5xx=1
    vacuum=1
    post-buffering=8192M



Simpan dan jalankan puppet agent


    
    sudo puppet agent --test



dan silakan akses http://localhost/index.php maka hasilnya kurang lebih sama dengan punya Om JP.
