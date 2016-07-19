---
author: udienz
comments: true
date: 2008-06-15 11:50:27+00:00
layout: post
link: https://blog.mahyudd.in/2008/06/15/trying-highly-anonymouse-proxy.html
slug: trying-highly-anonymouse-proxy
title: Trying anonymouse proxy
wordpress_id: 201
categories:
- Komputer
- Linux
- Ubuntu
tags:
- anonymouse
- network
- proxy
---

Following great post from [Harry Sufehmi](http://harry.sufehmi.com/archives/2007-06-12-1493/), you can improved your connction up to 10x. Yup 10x. Just typing  at terminal:

    
    $ ssh -o â€œCompressionLevel=9? -C -D 9999 -p 222 -N net@cepat.abangadek.com


when ask password just typing **cepat123**, if your terminal doesnâ€™t appear anything it mean yau sucsess connected to proxy. example:

    
    $ ssh -o "CompressionLevel=9" -C -D 9999 -p 222 -N net@cepat.abangadek.com
    Password:


finally set your firefox and GNOME proxy like this:

[![gambar-layar-pengaturan-sambungan](http://farm4.static.flickr.com/3120/2580431692_49d9c680f0.jpg)](http://www.flickr.com/photos/udienz/2580431692/)

[![gambar-layar-pengaturan-proksi-jaringan](http://farm4.static.flickr.com/3049/2580431690_a1b72bd3bd.jpg)](http://www.flickr.com/photos/udienz/2580431690/)

and the result isâ€¦.

[![proxy](http://farm4.static.flickr.com/3087/2580431698_f819ee74c0.jpg)](http://www.flickr.com/photos/udienz/2580431698/)

**Cool**! with no HTTP_Client_Ip and HTTP_Proxy
