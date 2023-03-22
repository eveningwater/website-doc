# 基于Node的DevOps实战

## 前言

在正式开发项目之前，需要安装配置各种环境与工具，先简单整理下后期需要使用到的各种工具以及它们的作用是什么。如果有同学已经对下述开发工具、环境非常了解或者已经有配置完成的开发环境，可以直接略过环境篇。


| 工具 or 框架               | 作用             |
| -------------------------- | ---------------- |
| CentOS                     | 构建服务器系统   |
| Egg                        | 后台开发框架     |
| React + Ant Design + UmiJS | 前端管理界面开发 |
| Mysql                      | 数据库           |
| Jenkins && GitLab CI       | 构建工具         |
| GitLab                     | 项目管理仓库     |
| Docker                     | 应用容器         |
| Postman                    | 接口测试工具     |
| Sonar                      | 代码检测工具     |
| Sentry                     | 前端线上预警工具 |

由于整个项目涉及的工具、环境非常多，需要准备多个 Linux 的系统来安装一些必备的工具。

个人第一建议是直接上云服务器，首先是使用简单，可以省去很多配置成本跟时间，其次是方便随时、随地调试，性能更好。如果你已经有可使用的云服务器的话，可以跳过虚拟机安装环节。

但是安装 GitLab 的服务器配置，1 核 2 g 的云服务器基本是带不动的，如果使用中配的服务器作为学习来说无疑成本过高。

> 对于 GitLab 来说，如果团队中有使用到的话（应该是大部门团队都已经在使用 GitLab），可以跳过本章节，这并不是一个必备的环节。不过如果你希望对 Linux 以及从 0 开始搭建整个工程有更深入的了解的话，那么这一章也是一个非常好的学习机会。

所以本章将介绍如何安装虚拟机以及搭建一个 GitLab 环境。同时综合成本问题考虑，上述环境用到的软件都将采用市面常见、易于得到或者有个人免费版的。另外由于 Mac 环境搭建比较简单，小册的软件配置多数都以 Windows 来作为 demo 演示。

> 整个系列教程中不支持、不鼓励使用“科学版软件”。大多软件对个人都是提供免费试用，虽然功能不足但作为学习来说还是足够用的。

## 开发环境准备

### VMware Workstation(虚拟机)

> VMware Workstation 允许操作系统(OS)和应用程序(Application)在一台虚拟机内部运行。虚拟机是独立运行主机操作系统的离散环境。在 VMware Workstation 中，你可以在一个窗口中加载一台虚拟机，它可以运行自己的操作系统和应用程序。你可以在运行于桌面上的多台虚拟机之间切换，通过一个网络共享虚拟机(例如一个公司局域网)，挂起和恢复虚拟机以及退出虚拟机，这一切不会影响你的主机操作和任何操作系统或者其它正在运行的应用程序。

可以在 [VM 下载地址](https://www.vmware.com/products/workstation-player.html) 去下载对应的版本，直接下载 workstation-player 即可，仅学习而言是不需要使用到 pro。

<div class="image-container">
    <img src="./docs/nodeDevops/images/1.png" alt="图片1-1" title="图片1-1" >
    <span class="image-title">图 1-1 </span>
</div>

直接安装完，出现如上界面之后，继续下一个步骤。

> VMware Workstation 作为商业版本虚拟机，性能与稳定性都有一定的保障，但是如后面介绍来看，配置会过于繁琐，有兴趣的同学可以使用 VirtualBox 来替代。当然 Mac 也有更好的 Parallels 虚拟机来使用，这里只是以 VMware 作为列子来介绍。

### CentOS

可以用从[下载地址](https://www.CentOS.org/download/)获取所需要的 CentOS 版本，demo 使用的是 8.0 版本。下载的版本建议选择 dvd1.iso，会内置很多软件跟配置，比较全面，如果想自己搭建全套环境的，也可以选择其他版本。

下载完成后之后直接打开虚拟机选择镜像安装即可，如下图所示：

<div class="image-container">
    <img src="./docs/nodeDevops/images/2.png" alt="图片1-2" title="图片1-2" >
    <span class="image-title">图 1-2 </span>
</div>

<div class="image-container">
    <img src="./docs/nodeDevops/images/3.png" alt="图片1-3" title="图片1-3" >
    <span class="image-title">图 1-3 </span>
</div>

上面也提到，1核 2g 的服务器基本很难带动 GitLab，很容易崩溃或者响应非常慢，需要将内存跟处理器提高一点，一般 4G 以上的内存可以正常带动，现在开发一般 windows 16g 的内存还算是标配，应该能带动。

<div class="image-container">
    <img src="./docs/nodeDevops/images/4.png" alt="图片1-4" title="图片1-4" >
    <span class="image-title">图 1-4 </span>
</div>

配置完成之后，启动出现如下界面可以进入下一步：

<div class="image-container">
    <img src="./docs/nodeDevops/images/5.png" alt="图片1-5" title="图片1-5" >
    <span class="image-title">图 1-5 </span>
</div>

### Xshell

XShell 是一个强大的安全终端模拟软件，它支持 SSH1，SSH2，以及 Microsoft Windows 平台的 TELNET 协议。

虚拟机只是用来替代云服务器的一种简便手段，正常在操作云服务器的时候，用终端模拟软件比较多。这里推荐使用 [Xshell](https://xshell.en.softonic.com/download)，可以选择个人版本，也比较容易上手。一路安装完毕之后出现下述界面即可：


<div class="image-container">
    <img src="./docs/nodeDevops/images/6.png" alt="图片1-6" title="图片1-6" >
    <span class="image-title">图 1-6 </span>
</div>

### SSH 连接

Secure Shell(SSH) 是由 IETF(The Internet Engineering Task Force) 制定的建立在应用层基础上的安全网络协议。它是专为远程登录会话(甚至可以用 Windows 远程登录 Linux 服务器进行文件互传)和其他网络服务提供安全性的协议，可有效弥补网络中的漏洞。通过 SSH，可以把所有传输的数据进行加密，也能够防止 DNS 欺骗和 IP 欺骗。还有一个额外的好处就是传输的数据是经过压缩的，所以可以加快传输的速度。目前已经成为 Linux 系统的标准配置。

现在开始进行配置，使 Xshll 可以使用 SSH 连接 VM 里面的 CentOS 系统。

#### 配置固定 Ip

首先为了避免 IP 有冲突或变动，直接配置固定 Ip。右击虚拟机选择设置选项，打开设置面板修改网络适配器如下图所示：

<div class="image-container">
    <img src="./docs/nodeDevops/images/7.png" alt="图片1-7" title="图片1-7" >
    <span class="image-title">图 1-7 </span>
</div>

#### 全局配置

选择编辑中的虚拟网络控制器选项，授权管理员权限更改设置

<div class="image-container">
    <img src="./docs/nodeDevops/images/8.png" alt="图片1-8" title="图片1-8" >
    <span class="image-title">图 1-8 </span>
</div>

<div class="image-container">
    <img src="./docs/nodeDevops/images/9.png" alt="图片1-9" title="图片1-9" >
    <span class="image-title">图 1-9 </span>
</div>

<div class="image-container">
    <img src="./docs/nodeDevops/images/10.png" alt="图片1-10" title="图片1-10" >
    <span class="image-title">图 1-10 </span>
</div>

上图的对应网关要与去虚拟机设置的 IP 配置相同，所以要记住，192.168.160.2。

#### 修改虚拟机网关

第三步，进入虚拟机，输入 TRL+ALT+T 打开 Terminal 终端，后续的命令一般都是需要管理员权限，所以直接 su 进入管理员模式，密码与你装系统设置的密码相同。可能你的 CentOS 版本不支持这个快捷键命令，那么可以从下图找到打开终端的方法，熟练的同学也可以自己重置快捷键。

<div class="image-container">
    <img src="./docs/nodeDevops/images/11.png" alt="图片1-11" title="图片1-11" >
    <span class="image-title">图 1-11 </span>
</div>

输入 `vi /etc/sysconfig/network-scripts/ifcfg-ens33` 打开，如果不懂 vim 编辑的同学可以点开[这个链接](https://blog.csdn.net/jisuanji198509/article/details/86690617/)，学一下 vim 基本操作。这里直接贴出配置，按照配置直接修改或者全部替换即可（如果前面设置的参数不一样要修改成对应的参数），具体的参数意义可以有兴趣的话可以自行查找。

```ini
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes

IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=3644a3cc-ef54-4886-b4c5-345b1452db43
DEVICE=ens33
ONBOOT=yes 

IPADDR=192.168.160.88
NERMASK=255.255.255.0
GATEWAY=192.168.160.2
DNS1=114.114.114.114
```

<div class="image-container">
    <img src="./docs/nodeDevops/images/12.png" alt="图片1-12" title="图片1-12" >
    <span class="image-title">图 1-12 </span>
</div>

修改完毕之后重启网关服务，重启不会马上生效，需要稍等片刻

```arduino
restart network.service // CentOS 7  重启命令
nmcli c reload // CentOS 8 重启命令
```

再次输入 ip addr，出现如下图标红，查看是否配置正确

<div class="image-container">
    <img src="./docs/nodeDevops/images/13.png" alt="图片1-13" title="图片1-13" >
    <span class="image-title">图 1-13 </span>
</div>

#### 修改主机网络配置

打开 Windows 的网络链接，直接参考下图修改即可

<div class="image-container">
    <img src="./docs/nodeDevops/images/14.png" alt="图片1-14" title="图片1-14" >
    <span class="image-title">图 1-14 </span>
</div>

修改完毕之后，直接 cmd 终端 ping 192.168.160.88，出现下图反馈代表静态 IP 配置成功

<div class="image-container">
    <img src="./docs/nodeDevops/images/15.png" alt="图片1-15" title="图片1-15" >
    <span class="image-title">图 1-15 </span>
</div>

#### 配置 Xshell

选择新建会话属性再根据下图进行配置

<div class="image-container">
    <img src="./docs/nodeDevops/images/16.png" alt="图片1-16" title="图片1-16" >
    <span class="image-title">图 1-16 </span>
</div>


<div class="image-container">
    <img src="./docs/nodeDevops/images/17.png" alt="图片1-17" title="图片1-17" >
    <span class="image-title">图 1-17 </span>
</div>


配置完毕之后，如出现下图，则代表已经成功使用 SSH 连接到虚拟机。

<div class="image-container">
    <img src="./docs/nodeDevops/images/18.png" alt="图片1-18" title="图片1-18" >
    <span class="image-title">图 1-18 </span>
</div>

#### 可能出现问题的解决方案

1.学习使用的话的话，可以直接把虚拟机的防火墙给关了

* 查看防火墙状态 systemctl status firewalld.service
* 开启防火墙 systemctl start firewalld.service
* 关闭防火墙systemctl stop firewalld.service
* 禁用防火墙 systemctl disable firewalld.service

2.如果你使用的是非 dvd 版本，可能没有安装 sshd 服务，需要手动安装一下，或者重启一下。

3.查看 22 端口是否正常开放，嫌麻烦就关闭防火墙

4.重启大法试试看(重启 vm 或者 CentOS)

### Gitlab

GitLab 是一个用于仓库管理系统的开源项目，使用 Git 作为代码管理工具，并在此基础上搭建起来的 web 服务。所以大部分公司都会选择使用 Gitlab 作为私有仓库管理。

#### 安装

整体安装还是很简单的，点击[官网安装手册](https://about.gitlab.com/install/#centos-8)按照顺序下来即可，中间稍微注意一下几点：

1.切记虚拟机配置一定要调高一点，不然会出现各种奇奇怪怪的错误
2.使用这个命令的时候，将sudo EXTERNAL_URL="https://gitlab.example.com" dnf install -y gitlab-ee， EXTERNAL_URL 替换成 http://192.168.160.88:8888/
3.如果你使用的版本是 dvd 的话，8080 会被其他软件占用，所以不要使用 8080 端口

正常连接虚拟机输入官方命令会出现如下图所示：

<div class="image-container">
    <img src="./docs/nodeDevops/images/19.png" alt="图片1-19" title="图片1-19" >
    <span class="image-title">图 1-19 </span>
</div>

虽然你有参考上述的问题，但你访问的时候还是大概率出现下图所示的 502 情况

<div class="image-container">
    <img src="./docs/nodeDevops/images/20.png" alt="图片1-20" title="图片1-20" >
    <span class="image-title">图 1-20 </span>
</div>

如果你出现了 502 的情况，别慌，只是一些配置项出现了问题

输入 `vim /etc/gitlab/gitlab.rb`，修改如下几项内容

<div class="image-container">
    <img src="./docs/nodeDevops/images/21.png" alt="图片1-21" title="图片1-21" >
    <span class="image-title">图 1-21 </span>
</div>

```less
external_url 'http://192.168.160.88:8888' // 这里应该在安装的时候就已经修改过了
unicorn['port'] = 8888
postgresql['shared_buffers'] = "256MB"
postgresql['max_connections'] = 200
```

上述配置很多，分别在不同的地方，请参考 vim 的使用文档，用搜索来查找，效率更高。

更新配置：gitlab-ctl reconfigure

重启：gitlab-ctl restart

重启不会马上生效，需要等待 1 分钟左右，所以不要太心急，感觉没生效就继续改，不断的重启。

<div class="image-container">
    <img src="./docs/nodeDevops/images/22.png" alt="图片1-22" title="图片1-22" >
    <span class="image-title">图 1-22 </span>
</div>

其他的对 GitLab 进行自己团队的个性化定制，这里就不过多阐述了，有兴趣的话，可以自己试试看，怎么去配置。

## 参考文档

[Xshell连接VMware CentOS7](https://blog.csdn.net/weixin_43593086/article/details/90247751)

[GitLab 502](https://www.cnblogs.com/stronger-xsw/p/12804002.html)

## 本章小结

跟着上述所有的步骤进行操作的话，应该在半天到一天的时间是可以完成（熟练者可能更快）。完成基本的环境配置之后，下一篇，我们将学习开发环境的搭建。