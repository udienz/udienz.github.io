---
author: udienz
comments: true
date: 2016-07-01 20:49:23+00:00
layout: post
link: https://blog.mahyudd.in/2016/07/01/puppet-lint-as-docker.html
slug: puppet-lint-as-docker
title: puppet-lint as Docker
wordpress_id: 963
categories:
- Linux
- Ubuntu
tags:
- docker
- puppet
---

Hi readers,

Just want to let you know that i have created a docker container for puppet syntax checker. You can found the container at [here](https://hub.docker.com/r/udienz/puppet-lint/), and if you interest to use this container please follow below instructions:




    
  1. Assumed if you have own puppet module (or you can for popular modules, let say puppetlabs-apt)

    
  2. Your own module located in ~/puppet/module and you are now in there



To check your module just type below in your terminal


    
    $ docker run -v $(pwd):/code udienz/puppet-lint



You may see te output like below:


    
    
    Don't run Bundler as root. Bundler can ask for sudo if it is needed, and
    installing your bundle as root will break this application for all non-root
    users on this machine.
    Fetching gem metadata from https://rubygems.org/
    Fetching version metadata from https://rubygems.org/
    Installing rake 11.2.2
    Installing CFPropertyList 2.2.8
    Installing ast 2.3.0
    Installing diff-lcs 1.2.5
    Installing facter 2.4.6
    Installing json_pure 2.0.1
    Installing json 2.0.1 with native extensions
    Installing metaclass 0.0.4
    Installing spdx-licenses 1.1.0
    Installing powerpack 0.1.1
    Installing puppet-lint 1.1.0
    Installing rspec-support 3.5.0
    Installing rainbow 2.1.0
    Installing ruby-progressbar 1.8.1
    Installing unicode-display_width 1.1.0
    Using bundler 1.12.5
    Installing puppet-syntax 2.1.0
    Installing parser 2.3.1.2
    Installing hiera 3.2.0
    Installing mocha 1.1.0
    Installing metadata-json-lint 0.0.11
    Installing puppet-lint-absolute_template_path 1.0.0
    Installing puppet-lint-strict_indent-check 2.0.2
    Installing puppet-lint-trailing_newline-check 1.0.0
    Installing puppet-lint-unquoted_string-check 0.3.0
    Installing puppet-lint-variable_contains_upcase 1.0.0
    Installing rspec-core 3.5.0
    Installing rspec-expectations 3.5.0
    Installing rspec-mocks 3.5.0
    Installing rubocop 0.41.1
    Installing puppet 4.5.2
    Installing rspec 3.5.0
    Installing rspec-puppet 2.4.0
    Installing puppetlabs_spec_helper 1.1.1
    Bundle complete! 12 Gemfile dependencies, 34 gems now installed.
    Use `bundle show [gemname]` to see where a bundled gem is installed.
    ---> syntax:manifests
    ---> syntax:templates
    ---> syntax:hiera:yaml
    puppet-lint manifests/account.pp
    WARNING: line has more than 80 characters on line 33
    WARNING: line has more than 80 characters on line 39
    WARNING: line has more than 80 characters on line 45
    WARNING: line has more than 80 characters on line 51
    WARNING: line has more than 80 characters on line 57
    WARNING: line has more than 80 characters on line 63
    puppet-lint manifests/debian/sourceslist/ubuntu.pp
    puppet-lint manifests/debian/sourceslist/debian.pp
    puppet-lint manifests/fqdn/vpswow1.pp
    puppet-lint manifests/fqdn/vpswow2.pp
    puppet-lint manifests/fqdn/vpswow3.pp
    puppet-lint manifests/fqdn/sealabs.pp
    puppet-lint manifests/fqdn/vpswow4.pp
    puppet-lint manifests/fqdn.pp
    puppet-lint manifests/package.pp
    puppet-lint manifests/init.pp
    puppet-lint manifests/package/nginx.pp
    puppet-lint manifests/package/common.pp
    puppet-lint manifests/package/ssh.pp
    WARNING: line has more than 80 characters on line 41
    WARNING: line has more than 80 characters on line 47
    WARNING: line has more than 80 characters on line 53
    puppet-lint manifests/redhat.pp
    puppet-lint manifests/debian.pp
    puppet-lint manifests/centos.pp
    puppet-lint manifests/osfamily.pp
    puppet-lint manifests/docker.pp
    ruby -c spec/spec_helper.rb
    Syntax OK
    ruby -c spec/classes/init_spec.rb
    Syntax OK
    



You might fix ERROR/WARNING messages :)
Happy hacking
