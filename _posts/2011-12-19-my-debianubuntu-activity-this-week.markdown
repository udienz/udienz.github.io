---
author: udienz
comments: true
date: 2011-12-19 16:21:57+00:00
layout: post
slug: my-debianubuntu-activity-this-week
title: My Debian/Ubuntu activity this week
wordpress_id: 640
categories:
- Debian
- Komputer
- Linux
- planet-planet
- Ubuntu
tags:
- bugs
- cve
- Debian
- debian-maintainer
- merge
- motu
- sru
- ubuntu
---

Inspired from [RC bugs 2011/50](http://info.comodo.priv.at/blog/archives/2011/12/#e2011-12-18T19_56_58.txt),

Here is my Debian activity:



	
  1. [652371](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=652371), [CVE-2011-4824] SQL injection issue in auth_login.php. [Committed](http://anonscm.debian.org/gitweb/?p=pkg-cacti/cacti.git;a=commitdiff;h=c798713dd8188e590f630659c2689f8bb8437108) in git and forwarded to Sean and Security Team via [RT](http://rt.debian.org) #3538

	
  2. [624516](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=624516), CVE-2010-1644: cacti: XSS issues in host.php and data_sources.php, [Committed](http://anonscm.debian.org/gitweb/?p=pkg-cacti/cacti.git;a=commitdiff;h=f85ba87b2476eb1edc01e4257e689fdf59ab18d4) in git and forwarded to Sean and Security Team via [RT](http://rt.debian.org) #3538


And here is my Ubuntu activity:

	
  1. <del>[905662](https://launchpad.net/bugs/905662)</del>, Merge dasher 4.11-1.1 (universe) from Debian testing (main)

	
  2. <del>[905671](https://launchpad.net/bugs/905671)</del>, Merge mini-dinstall 0.6.29 (universe) from Debian testing (main). [I got 100 times upload for this](http://tripledin.wordpress.com/2011/12/17/100-times-upload-to-ubuntu/)!

	
  3. <del>[905665](https://launchpad.net/bugs/905665)</del>, Merge dbus-java 2.8-2 (universe) from Debian testing (main)

	
  4. [905252](https://launchpad.net/bugs/905252), CVE-2011-4130 in lucid, maverick, natty

	
  5. [906291](https://launchpad.net/bugs/906291), Merge laptop-mode-tools 1.60-1 (universe) from Debian testing (main)

	
  6. [906340](https://launchpad.net/bugs/906340), Merge meta-gnome3 1:3.0+6 (universe) from Debian testing (main)

	
  7. [906368](https://launchpad.net/bugs/906368), Merge udftools 1.0.0b3-14.2 (universe) from Debian testing (main)

	
  8. [906369](https://launchpad.net/bugs/906369), Merge avfs 1.0.0-2 (universe) from Debian testing (main)


What next? Fixing [CVE-2011-4824](http://security-tracker.debian.org/tracker/CVE-2011-4824) in Lucid, Maverick, Natty, Oneiric. I don't want to fixing in precise because i still waiting 0.8.7i from debian which already committed in git repos.
