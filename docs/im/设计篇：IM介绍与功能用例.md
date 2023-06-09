# 设计篇：IM介绍与功能用例

万丈高楼平地起，越是复杂的系统，前期的设计规划工作越是不能马虎。因此，在正式进入学习之前，我们来了解下即时通讯IM的基本概念，同时从系统功能用例角度对本小册及实战项目有个整体认知。

<div class="image-container">
    <img src="./docs/im/images/5.png" alt="图片2-1" title="图片2-1" >
    <span class="image-title">图 2-1 </span>
</div>

## IM介绍

即时通讯（Instant Messaging，IM）即实时通信系统，允许两人或多人使用网络实时的传递文字、图片、语音来交流。比如我们每天使用的微信就属于IM系统，只不过随着需求的增加，现在的通信App都支持了音视频通话功能，不过本小册内容不包括音视频通话相关技术。

在了解IM的功能之前，我们先来看看几种通信相关的业务场景：

1. IM 即时通讯
2. Live 直播聊天室
3. CS 在线客服

> 那么，同样拥有聊天功能的它们之间的有什么差异呢？

IM聊天场景是以人为中心的通信系统。强调人与人之间的关系，因此才有好友与群的概念，这类系统如果用户量与用户活跃度不错的话，通常每天可以产生百万条消息，如果是群的话，消息还会扩散。因此消息转发的可靠性、吞吐量、及时性是业务上的一个难点。

Live直播场景是以群为中心的通信系统，通常称作聊天室。在IM场景中一个群的人数上限通常是500，达到1k就非常高了，这是它的业务特点导致的。而在一个聊天室中，你需要在设计时考虑到一个房间可能有10w+的在线用户，不过在聊天室场景中用户不可能同时在多个room中，因此可以通过路由把相同room的用户切到同一台服务，达到最大化性能的目的。而且这个场景通常不需要考虑离线消息这个头疼的问题。

CS客服场景是以会话为中心的通信系统。也就是沟通都是以会话为单位，在这个会话中，你可能首先与机器人扯了一会皮，然后与售前妹子沟通了一会，发现问题不对，被转给一个技术支持小哥了。可以看出系统的核心逻辑是基于会话的生命周期来设计，而聊天中的人与AI则是被调度的对象。

## 单聊

单聊以人为单位，而群聊以一批人为单位。通常我们说的实时通信是指多方同时在线情况下，可以通过聊天服务实时收发消息，不过在IM这个场景中，极大可能出现一个用户A给另一个用户B发送消息时，用户B不在线，此时，消息就需要存储在服务器上；只要在设定的时间范围内，用户B登录到服务器，此消息就会同步到用户B，这就是离线消息。超过时间范围的消息就会被丢弃，如果不做离线同步或者同步逻辑有漏洞，就会导致消息丢失，这在业务上是零容忍的。

<div class="image-container">
    <img src="./docs/im/images/6.png" alt="图片2-2" title="图片2-2" >
    <span class="image-title">图 2-2 </span>
</div>

## 群聊

群聊比单聊要复杂一些。单聊消息的接收方是一个用户，在服务端可以直接定位出来；而群聊消息的接收者是一群人，难道我们直接在消息头中写上所有人？这样不是不可以，但是对带宽的浪费太大。而且业务上对群聊有更多要求，比如设置群简介，禁言，人员管理，置顶等。因此，在系统中必须定义一个群对象，当服务器收到一条群消息时，服务端需要找到群中在线的成员列表，把消息广播过去。

<div class="image-container">
    <img src="./docs/im/images/7.png" alt="图片2-3" title="图片2-3" >
    <span class="image-title">图 2-3 </span>
</div>

群的信息与成员列表通常是持久在数据库中，因为更新频率不高。而会话（记录用户与连接的关系）随着用户的登录、退出、被踢、连接异常断开、自动重连等情况导致会经常变动，也就是大量的写入和删除操作，通常是存放在高速缓存中。

因此，这里的读取成员列表实际上是有两步：

1. 从数据库中读取成员列表。
2. 从高速缓存中读取每个成员的登录会话信息。

> 假设一个群成员有1千人，每一次消息转发，忽略消息持久化处理时长，仅读取成员列表和会话在性能上就是个考验。因此会话之类的信息是不可能保存在事务类的数据库中的。

## 系统功能用例

实现一个系统，首先就是要把范围定义明确，下面我们列举下系统核心功能。

<div class="image-container">
    <img src="./docs/im/images/8.png" alt="图片2-4" title="图片2-4" >
    <span class="image-title">图 2-4 </span>
</div>

由于是写实战小册，所以功能上尽量精练，同时又不能丢失核心，基本上搞懂了这些核心的逻辑及知识，其它的就是一些扩展内容了。因此，我对整个系统的规划就成了上面的样子。

整个后端分为四部分：通信服务、Web服务、进阶功能、运维相关。

### 通信服务

通信服务是整个系统的心脏。从功能上来说主要考虑如下几点：

* 支持tcp/websocket协议的接入。
* 实现登录、登出、同账号互踢等。
* 单聊：一对一聊天。
* 群聊：一对多聊天。
* 离线消息。
* 敏感词：如涉政、色情等非法词语过滤原理及流程。
* 群管理
    * 创建群
    * 群详情
    * 进群
    * 退群
    * 成员列表

通信服务的整体架构会在后面的章节讲解，包括从单体架构到分布式架构的几次演变，因此这里就不过多描述。其中群管理在业务上涉及到权限控制，由于不是本项目的重点，因此忽略。

### Web服务

Web服务不是本小册的技术重点，更多的是从业务需要考虑，主要为了说明逻辑实现原理。

主要功能：

* 授权服务
* 用户管理
    * 创建用户
    * 查询详情

通常IM系统还有好友的概念，不过它更多是业务上的逻辑，与整个系统核心逻辑关系不大，因此本小册就不涉及好友关系的管理及消息的收发权限处理了。

### 进阶功能

前面介绍的只是即时通讯的基本功能，但是在真实的环境中，需要考虑的方面是非常多的，而且由于是长连接分布式集群，与HTTP服务相比，达到同等级别的SLA（服务可用性）的难度更大，因此本小册还会介绍一些进阶功能，主要内容如下：

* 测试：
   * 单元测试：通过覆盖测试确保逻辑可靠。
   * 基准测试：测试登录、单聊、群聊性能。
* 性能优化：从内存、GC、缓冲等方面优化系统。
* 智能路由：介绍长连服务前端的路由与负载逻辑。
* 多租户：介绍多租户实现原理及服务隔离。
* 灰度发布：介绍灰度发布系统的原理及实战。
* 部署架构：介绍分布式部署架构及要点。

### 运维

把运维也列入开发项，主要是因为它不仅仅是运维来考虑的事，研发在设计时就要把它考虑进去，比如通信服务监控各项指标。主要内容如下：

<div class="image-container">
    <img src="./docs/im/images/9.png" alt="图片2-5" title="图片2-5" >
    <span class="image-title">图 2-5 </span>
</div>

* 日志系统。
    * 程序日志。
    * 业务日志：如登录、退出等事件。
* 监控报警系统。
    * 机器监控。比如CPU、内存、磁盘等。
    * 服务监控。比在线用户、请求时长、GC、占用内存、线程数、转发流量等。

## SDK功能用例

长连服务相对http服务来说，是重客户端逻辑，因为用户与服务端建立的连接是有生命周期的。比如登录退出、自动重连，消息重试等逻辑都是依赖客户端实现。因此，需要开发一个SDK把复杂的逻辑封装，提供相对简单的接口给上层使用，实战篇会介绍web端Typescript的SDK。

<div class="image-container">
    <img src="./docs/im/images/10.png" alt="图片2-6" title="图片2-6" >
    <span class="image-title">图 2-6 </span>
</div>

SDK核心功能如下：

1. 连接管理
2. 会话管理
3. 消息收发

除了正常的登录，登出，及消息收/发。原生系统的SDK还要考虑会话、消息的缓存问题，否则在用户端的体验是很不好的。比如在APP中打开一个会话界面之后还需要从服务端读取消息，那么界面上肯定会有一个空白时间，这个体验是非常差的，而且对服务端压力也会增加很多。不过由于本实战项目只包括Web版本的SDK，因此不会涉及会话与消息的缓存等逻辑。

## 最后总结

本章实际上是一个真正的开篇哈，不涉及太多知识点，主要是帮忙读者对即时通讯系统有个整体了解。当然，本章实际上还是强调了一个重点：在高并发的即时通讯系统中群聊和离线消息是一个难点，在系统的架构设计时要考虑的一个重点，具体内容我们在架构篇：分布式IM架构及演进一章见分晓。

本章完！