---
author: udienz
comments: true
date: 2014-08-28 06:11:21+00:00
layout: post
link: https://blog.mahyudd.in/2014/08/28/replikasi-master-slave-di-mysql.html
slug: replikasi-master-slave-di-mysql
title: Replikasi master slave di Mysql
wordpress_id: 838
categories:
- Linux
- Ubuntu
tags:
- mysql
- replica
- ubuntu
---

## Intro



Pada tulisan kali ini, saya akan membahas tentang replikasi master-slave di mysql pada Ubuntu (Catatan: Di debian pun dengan cara yang sama). Untuk melakukan replikasi kita membutuhkan setidaknya dua buah host, pada kali ini saya menggunakan dua mesin dengan rincian:




    
  * **master 192.168.57.27**

    
  * **slave 192.168.57.7**





## Setup mysql



Dengan asumsi kita mempunyai hak ases sudo dan belum terpasang maka kita harus melakukan pemasangan mysql server dengan cara sebagai berikut:


    
    udienz@ubuntu:~$ sudo apt-get install mysql-server -y





## Membuat pengguna replika



Dalam replikasi, kita membutuhkan user yang mempunyai hak untuk melakukan ke semua/satu database. Untuk itu silakan lakukan perintah dibawah ini pada master dan slave:


    
    udienz@ubuntu:~$ mysql -u root -p



Anda akan di tanyakan kata sandi dari root, silakan isi kata sandi root anda. Setelah itu silakan ketik perintah dibawah ini:


    
    mysql> create user 'penyalin'@'%' identified by '17agustusmerdeka!';
    Query OK, 0 rows affected (0.00 sec)
    
    mysql> grant replication slave on *.* to 'penyalin'@'%';
    Query OK, 0 rows affected (0.00 sec)
    
    mysql> flush privileges;
    Query OK, 0 rows affected (0.00 sec)
    
    mysql> 
    





## Mengatur master



Untuk mengatur salah satu mesin menjadi master, silakan mengikuti langkah berikut:


    
    udienz@master:~$ sudo cp /etc/mysql/my.cnf /etc/mysql/my.cnf.orig
    udienz@ubuntu:~$ sudo vim /etc/mysql/my.cnf



Langkah selanjutnya adalah mengubah harga dari variabel berikut:




    
  * server-id, silakan tanda # dibuang (yang biasanya di sebut dengan tanda komentar) dan diberikan nilai idientik dan tidak boleh sama dengan server lain

    
  * log_bin, silakan menghilangkan tanda # sehingga menjadi log_bin = /var/log/mysql/mysql-bin.log

    
  * bind-address, silakan di isi dengan ip yang ada atau 0.0.0.0 untuk running di semua ip yang tersedia di mesin.

    
  * Saya menambahkan isian untuk mengatur agar mysql tidak mereplikasi dan tidak memasukkan beberapa database ke log.



Dan berikut adalah perbedaan dari pengaturan yang saya buat

[code language="diff"]
udienz@master:~$ diff -Nurp /etc/mysql/my.cnf.orig /etc/mysql/my.cnf
--- /etc/mysql/my.cnf.orig	2014-08-28 11:48:09.054434158 +0700
+++ /etc/mysql/my.cnf	2014-08-28 11:50:40.920524933 +0700
@@ -44,7 +44,7 @@ skip-external-locking
 #
 # Instead of skip-networking the default is now to listen only on
 # localhost which is more compatible and is not less secure.
-bind-address		= 127.0.0.1
+bind-address		= 192.168.57.27
 #
 # * Fine Tuning
 #
@@ -84,10 +84,18 @@ log_error = /var/log/mysql/error.log
 # The following can be used as easy to replay backup logs or for replication.
 # note: if you are setting up a replication slave, see README.Debian about
 #       other settings you may need to change.
-#server-id		= 1
-#log_bin			= /var/log/mysql/mysql-bin.log
+server-id		= 1921685727
+log_bin			= /var/log/mysql/mysql-bin.log
 expire_logs_days	= 10
 max_binlog_size         = 100M
+
+binlog-ignore-db=information_schema
+binlog-ignore-db=phpmyadmin
+binlog-ignore-db=performance_schema
+replicate-ignore-db=performance_schema
+replicate-ignore-db=test
+replicate-ignore-db=information_schema
+
 #binlog_do_db		= include_database_name
 #binlog_ignore_db	= include_database_name
 #
[/code]

Kemudian cek kondisi master dengan perintah berikut:

[code language="sql"]
mysql> show master status;
+------------------+----------+--------------+--------------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB                                 |
+------------------+----------+--------------+--------------------------------------------------+
| mysql-bin.000001 |      969 |              | information_schema,phpmyadmin,performance_schema |
+------------------+----------+--------------+--------------------------------------------------+
1 row in set (0.01 sec)
[/code]

Dari hasil diatas mohon untuk mengingat hasil dari File yaitu **mysql-bin.000001** dan Position yaitu **969** karena nantinya akan berguna bagi slave.

Langkash selanjutnya adalah mengexport database yang ada pada mesin master untuk diimport pertamakali di slave. Kenapa? dengan asumsi database sudah ada di master yang kemudian di slave, maka slave membutuhkan posisi start awal untuk melakukan replikasi, buka dari posisi awal database di master melainkan posisi sekarang di master.


    
    udienz@master:/tmp$ mysqldump -u root -p pdns > pdns.sql
    Enter password: 
    udienz@master:/tmp$ ls -lah
    total 16K
    drwxrwxrwt  2 root   root   4.0K Aug 28 12:23 .
    drwxr-xr-x 22 root   root   4.0K Aug 27 11:30 ..
    -rw-rw-r--  1 udienz udienz 5.7K Aug 28 12:23 pdns.sql
    





## Pengaturan slave



Silakan mengatur mysql di slave, pada intinya hampir sama dengan master, namun terdapat penambahan opsi relay-log dan server-id yang berbeda. Pada slave saya perbedaan dari config awal adalah sebagai berikut:

[code language="diff"]
udienz@slave:~$ diff -Nurp /etc/mysql/my.cnf.orig /etc/mysql/my.cnf
--- /etc/mysql/my.cnf.orig	2014-08-28 12:25:37.864440783 +0700
+++ /etc/mysql/my.cnf	2014-08-28 12:27:19.495167636 +0700
@@ -44,7 +44,7 @@ skip-external-locking
 #
 # Instead of skip-networking the default is now to listen only on
 # localhost which is more compatible and is not less secure.
-bind-address		= 127.0.0.1
+bind-address		= 192.168.57.7
 #
 # * Fine Tuning
 #
@@ -84,10 +84,17 @@ log_error = /var/log/mysql/error.log
 # The following can be used as easy to replay backup logs or for replication.
 # note: if you are setting up a replication slave, see README.Debian about
 #       other settings you may need to change.
-#server-id		= 1
-#log_bin			= /var/log/mysql/mysql-bin.log
+server-id		= 192168577
+log_bin			= /var/log/mysql/mysql-bin.log
+relay-log               = /var/log/mysql/mysql-relay-bin.log
 expire_logs_days	= 10
 max_binlog_size         = 100M
+binlog-ignore-db=information_schema
+binlog-ignore-db=phpmyadmin
+binlog-ignore-db=performance_schema
+replicate-ignore-db=performance_schema
+replicate-ignore-db=test
+replicate-ignore-db=information_schema
 #binlog_do_db		= include_database_name
 #binlog_ignore_db	= include_database_name
 #
[/code]

Restart daemon dari mysql dan import database dari master.
[code language="bash"]
udienz@slave:~$ scp -r 192.168.57.27:~/pdns.sql . 
The authenticity of host '192.168.57.27 (192.168.57.27)' can't be established.
ECDSA key fingerprint is 4a:2b:a5:69:ee:98:72:f2:7a:e1:ff:22:09:83:ee:73.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.57.27' (ECDSA) to the list of known hosts.
udienz@192.168.57.27's password: 
pdns.sql                                                                                                                          100% 5827     5.7KB/s   00:00    
udienz@slave:~$ sudo /etc/init.d/mysql restart
 * Stopping MySQL database server mysqld                                                           [ OK ] 
 * Starting MySQL database server mysqld                                                                                                                     [ OK ] 
 * Checking for tables which need an upgrade, are corrupt or were 
not closed cleanly.
udienz@slave:~$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
mysql&gt; create database pdns;
Query OK, 1 row affected (0.00 sec)

mysql&gt; exit
Bye
udienz@slave:~$ mysql -u root -p pdns &lt; pdns.sql 
Enter password: 
[/code]
Masuk lagi ke mysql di slave untuk mengatur server master yang akan di replika


    
    udienz@slave:~$ mysql -u root -p
    mysql> slave stop; 
    Query OK, 0 rows affected, 1 warning (0.00 sec)
    
    mysql> CHANGE MASTER TO MASTER_HOST = '192.168.57.27', MASTER_USER = 'penyalin', MASTER_PASSWORD = '17agustusmerdeka!', MASTER_LOG_FILE = 'mysql-bin.000001', MASTER_LOG_POS = 969; 
    Query OK, 0 rows affected (0.07 sec)
    
    mysql> slave start;
    Query OK, 0 rows affected (0.00 sec)
    



Kemudian cek status dari slave, pastikan bahwa Slave_IO_Running dan Slave_SQL_Running mempunyai nilai YES


    
    mysql> show slave status \G
    *************************** 1. row ***************************
                   Slave_IO_State: Waiting for master to send event
                      Master_Host: 192.168.57.27
                      Master_User: penyalin
                      Master_Port: 3306
                    Connect_Retry: 60
                  Master_Log_File: mysql-bin.000001
              Read_Master_Log_Pos: 969
                   Relay_Log_File: mysql-relay-bin.000002
                    Relay_Log_Pos: 253
            Relay_Master_Log_File: mysql-bin.000001
                 Slave_IO_Running: Yes
                Slave_SQL_Running: Yes
                  Replicate_Do_DB: 
              Replicate_Ignore_DB: performance_schema,test,information_schema
               Replicate_Do_Table: 
           Replicate_Ignore_Table: 
          Replicate_Wild_Do_Table: 
      Replicate_Wild_Ignore_Table: 
                       Last_Errno: 0
                       Last_Error: 
                     Skip_Counter: 0
              Exec_Master_Log_Pos: 969
                  Relay_Log_Space: 409
                  Until_Condition: None
                   Until_Log_File: 
                    Until_Log_Pos: 0
               Master_SSL_Allowed: No
               Master_SSL_CA_File: 
               Master_SSL_CA_Path: 
                  Master_SSL_Cert: 
                Master_SSL_Cipher: 
                   Master_SSL_Key: 
            Seconds_Behind_Master: 0
    Master_SSL_Verify_Server_Cert: No
                    Last_IO_Errno: 0
                    Last_IO_Error: 
                   Last_SQL_Errno: 0
                   Last_SQL_Error: 
      Replicate_Ignore_Server_Ids: 
                 Master_Server_Id: 1921685727
    1 row in set (0.00 sec)
    
    mysql> 
    



Dan pastikan di master sudah ada slave yang tersambung


    
    mysql> show slave hosts;
    +-----------+------+------+------------+
    | Server_id | Host | Port | Master_id  |
    +-----------+------+------+------------+
    | 192168577 |      | 3306 | 1921685727 |
    +-----------+------+------+------------+
    1 row in set (0.00 sec)
    



Jika terdapat problem silakan ketik


    
    SET GLOBAL SQL_SLAVE_SKIP_COUNTER = 1; SLAVE START;



Bagaimana membuktikan kalau replikasi master-slave nya berhasil? silakan membuat database baru di master, atau membuat record baru di master. maka akan tampil di slave.

master
[code language="sql"]
mysql> INSERT INTO domains (id, name, master, last_check, type, notified_serial, account) VALUES ('', 'ubuntu-xxx.com', NULL, NULL, 'NATIVE', NULL, NULL);
Query OK, 1 row affected, 1 warning (0.10 sec)
[/code]
slave
[code language="sql"]
mysql> select * from domains;
+----+----------------+--------+------------+--------+-----------------+---------+
| id | name           | master | last_check | type   | notified_serial | account |
+----+----------------+--------+------------+--------+-----------------+---------+
|  2 | ubuntu-xxx.com | NULL   |       NULL | NATIVE |            NULL | NULL    |
+----+----------------+--------+------------+--------+-----------------+---------+
1 row in set (0.00 sec)
[/code]
