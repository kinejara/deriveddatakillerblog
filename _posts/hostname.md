---
title: Updating Raspberry pi hostname
date: 2017-04-14 01:24:12
tags: raspberrypi,pi
---

If you are fan of this powerfull micro computer you will know that mostly all the work you do in them is via ssh connection, one of the things I hate about using ssh is that I'm always forgetting the ip of my raspberry pi for that reason I decided to figure out a way to configure a hostname in my raspberry pi so I can easily connect via ssh by executing a command like this one:

>ssh pi@weatherpi.local

1. Install the name broadcaster:
```sh
sudo apt-get update
sudo apt-get install avahi-daemon
```
2. From your remote computer test the connection
```sh
ping weatherpi.local
```

3. if you get ping back then try to run the next ssh command
```sh
ssh pi@weatherpi.local
```




