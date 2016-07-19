---
author: udienz
comments: true
date: 2012-07-20 17:16:16+00:00
layout: post
slug: server-signature-di-nginx
title: Server signature di nginx
wordpress_id: 686
categories:
- Debian
- Linux
- Ubuntu
tags:
- apache
- nginx
---

Menyambung [tulisan dari mas Dedy](http://milisdad.blogspot.com/2012/07/menghilangkan-signature-di-apache2.html), signature di nginx juga bisa dihilangkan kok. caranya buka /etc/nginx/nginx.conf. Dan pastikan server_tokens off. contoh:

    
    http {
    
            ##
            # Basic Settings
            ##
    
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            types_hash_max_size 2048;
            server_tokens off;
    }


Simpan dan restart nginx. Yay!
