---
layout: post
title: "Bagaimana cara menginstall Docker-swarm"
date: 2016-08-19T05:39:53+07:00
categories:
    - Linux
tags:
    - docker
    - virtualization
---

Bagaimana cara menginstall docker swarm?

[Docker swarm](https://docs.docker.com/swarm/overview/)
default sudah dimasukkan kedalam versi 1.12, kebar baiknya
adalah untuk konfigurasinya sangat mudah. Anda tidak perlu bersusah payah
melakukan [konfigurasi](https://docs.docker.com/swarm/install-manual/) seperti
di versi sebelum versi 1.12.

Kali ini saya akan mendemontrasikan betapa mudahnya melakukan setup docker swarm
di versi 1.12, pada saat menulis ini saya menggunakan Ubuntu Xenial (16.04 LTS)
dan menggunakan repository dari docker. dalam lab ini saya menggunakan lima
server dengan dua sebagai manager dan tiga sebagai worker. Dalam penamaan node,
sayamenggunakan nama manager-X dan worker-Y untuk menunjukkan fungsi dari node
itu sendiri.

Untuk pengaturan IP, pada manager akan dibari IP 192.168.0.11 sampai dengan 192.168.0.99,
dan worker akan mempunyai ip mulai dari 192.168.0.101 sampai dengan 192.168.0.254.

Sebelum melakukan konfigurasi docker swarm, silakan install docker dulu pada
[tulisan saya sebelumnya](https://udienz.github.io/2016/08/17/memasang-docker.html)

## Memastikan versi docker

Silakan pastikan bahwa docker anda mempunyai versi 1.12 atau lebih tinggi.

```
$ docker version
Docker version 1.12.1, build 23cf638
```

Dari hasil diatas menunjukkan bahwa docker saya adalah versi 1.12.1 sehingga
pemasangan akan mudah.

atau jika anda belum memasang docker baik itu di manager maupun di worker, anda
dapat menggunakan docker-machine untuk melakukan pemasangan docker-engine. Sebelumnya
pastikan bahwa anda dapat login dengan seh key sehingga anda dapat melakukan
login dengan passwordless

Untuk melakukan setup sshkey silakan ketik:

```
ssh-keygen -t ecdsa
Generating public/private ecdsa key pair.
Enter file in which to save the key (/home/ubuntu/.ssh/id_ecdsa):
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/ubuntu/.ssh/id_ecdsa.
Your public key has been saved in /home/ubuntu/.ssh/id_ecdsa.pub.
The key fingerprint is:
20:96:c8:f6:5a:5c:cc:cd:8c:33:45:97:de:a3:55:61 ubuntu@localhost
The key's randomart image is:
+--[ECDSA  256]---+
|       .o ..  E. |
| . . + * ..  ..  |
|  + + O +. . .   |
| . + o +  . +    |
|    +   S  o .   |
|   o      .      |
|  .              |
|                 |
|                 |
+-----------------+

```

Selanjutnya silakan copy ssh key ke mesin manager dan worker dengan perintah berikut:

```
ssh-key-id 192.168.0.11
```

Anda akan dimintai password untuk login. silakan masukkan password dari user anda

Selanjutnya adalah melakukan pemasangan dengan docker-machine:

```
docker-machine create --driver generic --generic-ip-address=$IP-ADDPRESS \
 --generic-ssh-key ~/.ssh/$KEY --generic-ssh-user $USER manager-1
```

Contoh bila ingin menginstall manager-1 dengan user ubuntu dan ssh ecdsa contohnya adalah sebagai berikut:

```
docker-machine create --driver generic --generic-ip-address=192.168.0.11 \
 --generic-ssh-key ~/.ssh/id_ecdsa --generic-ssh-user ubuntu manager-1
```
Silakan ulangi pada manager-2 dan worker1 sampai worker-3, kemudian verifikasi dengan perintah berikut:

```
$ docker-machine ls
NAME		ACTIVE	DRIVER    	STATE     URL						SWARM	DOCKER    ERRORS
worker-1	-		generic		Running   tcp://192.168.0.101:2376			v1.12.1   
worker-2	-		generic		Running   tcp://192.168.0.102:2376			v1.12.1   
worker-3	-		generic		Running   tcp://192.168.0.103:2376			v1.12.1   
manager-2	-		generic		Running   tcp://192.168.0.12:2376			v1.12.1   
manager-1   *		generic		Running   tcp://192.168.0.11:2376			v1.12.1   

```

## Memulai setup docker swarm

Untuk memulainya, silakan login di node yang bertugas sebiagai manager,
dan ketikkan perintah dibawah ini:

```
docker swarm init --advertise-addr 192.168.0.11
```

Hasilnya:
```
Swarm initialized: current node (erk63hyz95hy7s1giwd0mjjmp) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-6b7ymr9y759fbtfggbh3dp2wst0vrezo2sw3dv6iz79otkdsc6-d9a8l921hjyql4mub3oh1117g \
    192.168.0.11:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
hanya itu? ya hanya itu, perintah diatas untuk membuat inisial dari docker swarm di manager.

Verifikasi dengan perintah docker info

```
$ docker info
Containers: 73
 Running: 0
 Paused: 0
 Stopped: 73
Images: 103
Server Version: 1.12.1
Storage Driver: aufs
 Root Dir: /var/lib/docker/aufs
 Backing Filesystem: extfs
 Dirs: 592
 Dirperm1 Supported: true
Logging Driver: json-file
Cgroup Driver: cgroupfs
Plugins:
 Volume: local
 Network: null bridge overlay host
Swarm: active
 NodeID: erk63hyz95hy7s1giwd0mjjmp
 Is Manager: true
 ClusterID: 30ty62s2py73okcei9kmr95o5
 Managers: 1
 Nodes: 1

$ docker node ls
ID                           HOSTNAME            STATUS  AVAILABILITY  MANAGER STATUS
erk63hyz95hy7s1giwd0mjjmp *  manager-1			 Ready   Active        Leader

```

terlihat bahwa docker swarm sudah aktif meskipun hanya satu node yang aktif
## Konfigurasi client

Silakan login ke manager-1 untuk mendapatkan toket manager:

```
$ docker swarm join-token manager
To add a manager to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-6b7ymr9y759fbtfggbh3dp2wst0vrezo2sw3dv6iz79otkdsc6-0ou18lotoo36mjq0e4s0apuo5 \
    192.168.0.11:2377
```

Silakan login ke manager-2 dan ketikkan perintah diatas:

```
$ docker swarm join \
    --token SWMTKN-1-6b7ymr9y759fbtfggbh3dp2wst0vrezo2sw3dv6iz79otkdsc6-0ou18lotoo36mjq0e4s0apuo5 \
    192.168.0.11:2377
This node joined a swarm as a manager.
```

Langkah selanjutnya adalah login ke worker-1 sampai dengan worker-3 dan ketikkan perintah yang didapat
saat melakukan inisialisasi docker swarm

```
$ docker swarm join \
    --token SWMTKN-1-6b7ymr9y759fbtfggbh3dp2wst0vrezo2sw3dv6iz79otkdsc6-d9a8l921hjyql4mub3oh1117g \
    192.168.0.11:2377
```

## Verifikasi swarm

Setelah melakukan testing dari semua manager dan node, silakan
verifikasi dari manager dengan perintah berikut:

```
eval $(docker-machine env --swarm manager-1)
$ docker info
Containers: 6
 Running: 2
 Paused: 0
 Stopped: 4
Images: 31
Server Version: swarm/1.2.4
Role: primary
Strategy: spread
Filters: health, port, containerslots, dependency, affinity, constraint
Nodes: 5
 manager-2: 192.168.10.12:2376
  └ ID: 3KQB:C4DQ:AV46:NX7O:XN6Y:EP24:3XLH:UO4D:5N2R:SDAX:AJR6:CI3T
  └ Status: Healthy
  └ Containers: 1 (0 Running, 0 Paused, 1 Stopped)
  └ Reserved CPUs: 0 / 4
  └ Reserved Memory: 0 B / 8.185 GiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=generic, storagedriver=aufs
  └ UpdatedAt: 2016-08-18T21:26:24Z
  └ ServerVersion: 1.12.1
 worker-1: 192.168.10.111:2376
  └ ID: VO22:NU4C:ODDV:R2TL:HVV2:2E4I:MKAW:SBRO:WWFD:T265:HPNY:JKZI
  └ Status: Healthy
  └ Containers: 1 (0 Running, 0 Paused, 1 Stopped)
  └ Reserved CPUs: 0 / 4
  └ Reserved Memory: 0 B / 8.185 GiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=generic, storagedriver=aufs
  └ UpdatedAt: 2016-08-18T21:26:37Z
  └ ServerVersion: 1.12.1
 worker-2: 192.168.10.112:2376
  └ ID: AFYB:C2IM:Z276:RWMN:CODJ:SHKM:IFX6:POWT:VZKO:BHVS:UBAQ:QVJC
  └ Status: Healthy
  └ Containers: 1 (0 Running, 0 Paused, 1 Stopped)
  └ Reserved CPUs: 0 / 4
  └ Reserved Memory: 0 B / 8.185 GiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=generic, storagedriver=aufs
  └ UpdatedAt: 2016-08-18T21:26:25Z
  └ ServerVersion: 1.12.1
 worker-3: 192.168.10.113:2376
  └ ID: PGC3:TJJR:GCRG:5RKA:Q4N3:LWHF:3TAO:FDD2:TY6F:DOUK:27WS:76MQ
  └ Status: Healthy
  └ Containers: 1 (0 Running, 0 Paused, 1 Stopped)
  └ Reserved CPUs: 0 / 4
  └ Reserved Memory: 0 B / 8.185 GiB
  └ Labels: kernelversion=4.4.0-31-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=generic, storagedriver=aufs
  └ UpdatedAt: 2016-08-18T20:18:37Z
  └ ServerVersion: 1.12.1
 manager-1: 192.168.10.11:2376
  └ ID: HEN3:HWX4:2XTZ:EL5B:YUK3:JUH2:YZ2N:XD77:OTPW:ZONP:UYVP:MYDG
  └ Status: Healthy
  └ Containers: 2 (2 Running, 0 Paused, 0 Stopped)
  └ Reserved CPUs: 0 / 8
  └ Reserved Memory: 0 B / 8.087 GiB
  └ Labels: kernelversion=4.4.0-21-generic, operatingsystem=Ubuntu 16.04.1 LTS, provider=generic, storagedriver=aufs
  └ UpdatedAt: 2016-08-18T21:26:45Z
  └ ServerVersion: 1.12.1
Plugins:
 Volume: 
 Network: 
Swarm: 
 NodeID: 
 Is Manager: false
 Node Address: 
Security Options:
Kernel Version: 4.4.0-21-generic
Operating System: linux
Architecture: amd64
CPUs: 24
Total Memory: 40.83 GiB
Name: 6f894401a6f4
Docker Root Dir: 
Debug Mode (client): false
Debug Mode (server): false
WARNING: No kernel memory limit support
```

Selamat docker-swarm telah terpasang!

## Deploy service di swarm

Setelah membuat cluster swarm, kita akan mencoba membuat service di swarm. kita
akan membuat nginx di cluster. Silakan login di manager-1

```
docker service create --replicas 3 --name nginx nginx
```

Berikut adalah hasil dari docker services diatas:

```
$ docker service ls
ID            NAME   REPLICAS  IMAGE  COMMAND
cp2er0hu010r  nginx  3/3       nginx  

$ docker service inspect nginx 
[
    {
        "ID": "cp2er0hu010rl0qbv0714t8pw",
        "Version": {
            "Index": 21053
        },
        "CreatedAt": "2016-08-18T22:28:01.748449495Z",
        "UpdatedAt": "2016-08-18T22:28:01.748449495Z",
        "Spec": {
            "Name": "nginx",
            "TaskTemplate": {
                "ContainerSpec": {
                    "Image": "nginx"
                },
                "Resources": {
                    "Limits": {},
                    "Reservations": {}
                },
                "RestartPolicy": {
                    "Condition": "any",
                    "MaxAttempts": 0
                },
                "Placement": {}
            },
            "Mode": {
                "Replicated": {
                    "Replicas": 3
                }
            },
            "UpdateConfig": {
                "Parallelism": 1,
                "FailureAction": "pause"
            },
            "EndpointSpec": {
                "Mode": "vip"
            }
        },
        "Endpoint": {
            "Spec": {}
        },
        "UpdateStatus": {
            "StartedAt": "0001-01-01T00:00:00Z",
            "CompletedAt": "0001-01-01T00:00:00Z"
        }
    }
]

$ docker service ps nginx
ID                         NAME     IMAGE  NODE			DESIRED STATE  CURRENT STATE          ERROR
8ihthj14i9qitl792vatmrqjj  nginx.1  nginx  worker-1		Running        Running 2 minutes ago  
48eq2nah2txv7yxthk5y3158m  nginx.2  nginx  worker-2		Running        Running 2 minutes ago  
8yv7z3bk25h7jf06yf6y9hivm  nginx.3  nginx  manager-1	Running        Running 3 minutes ago  
```


Nah mudah bukan? silakan dicoba
