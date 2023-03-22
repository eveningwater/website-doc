# 构建篇-Docker

## 前言

本章开始都是对之前的 DevOps 流程的进一步升级，所以内容跟前端的关联已经越来越少，可能读起来会有一定的学习成本，尽可能用最简单的方式阐述。

## Docker

### 什么是 Docker

> Docker 是一个[开源](https://baike.baidu.com/item/%E5%BC%80%E6%BA%90/20720669)的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的[镜像](https://baike.baidu.com/item/%E9%95%9C%E5%83%8F/1574)中，然后发布到任何流行的[Linux](https://baike.baidu.com/item/Linux)或[Windows](https://baike.baidu.com/item/Windows/165458)机器上，也可以实现[虚拟化](https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E5%8C%96/547949)。容器是完全使用[沙箱](https://baike.baidu.com/item/%E6%B2%99%E7%AE%B1/393318)机制，相互之间不会有任何接口。

Docker 优点如下：

* 运行速度快，启动，停止，开始，重启等等操作都是以秒或毫秒为单位的；
* 轻量，最小的成本完成一个虚拟机带来的效果；
* 环境隔离，每个 Docker 都可以单独启动，天然的环境隔离优势；
* 跨段运行，Docker 的运行不限于宿主系统，可以运行在多种宿主系统中；
* 集成，使用 Docker compose 可以集成一整套项目运行环境；
* 云端，Docker 目前在各大云服务里面是集成比较简单也友好的。

### 为什么要使用 Docker

虽然 Docker 的优点非常多，比如上面所说的环境隔离、跨端运行等等。但是要思考一个问题，在我们的 DevOps 中为什么要引入 Docker？

首先任何一种技术的引入或者流程的改进都是需要成本的，如果引入新技术的成本远大于目前的可接受范围，那么这个技术是否依然值得引入？

假如只是为了单纯使用的新技术，那么新技术引入带来的副作用是否能承受，有没有预备方案进行兜底，这都是需要去考虑的。

在完成上述一系列简单的思考确认可以进行下一步之后，再考虑接入 Docker。

市面上不少前端发布都是将项目代码在 Docker 进行构建，再在 Docker 里面启动一个 Nginx 服务，提供静态资源访问，这样确实没问题，但是如果仅仅是静态资源的话，这种操作是有点过于沉重的。构建完成直接将静态资源上传到文件服务器例如 COS 或者 OSS 中，显然是更为方便省事。

> 当然如果发布的是 Nodejs 这种的后端系统，那么采用这种构建模式配合 k8s 是很正常。

在我们的 DevOps 设计中，是想尽可能的减少 Jenkins job 的构建脚本开发，使用一套、或者最少的 job 去适配所有的项目构建与部署。所以 Docker 对我们来说，最大的优势就是环境隔离，它可以将我们的之前设计的构建 CLI 封装到一个独立的环境中去，如此我们可以重复利用一套流程脚本，通过引用不同的 Builder Docker，达到适配多项目部署的目的。

### Docker && DevOps 流程

#### Docker 安装

Docker 的安装很简单，无论是 windows 还是 mac 用户，最方便的直接点击[下载](https://www.docker.com/products/docker-desktop)一个 Desktop 版本就行了。

<div class="image-container">
    <img src="./docs/nodeDevops/images/127.png" alt="图片15-1" title="图片15-1" >
    <span class="image-title">图 15-1 </span>
</div>

安装完毕，命令行输入 `docker`，出现如下界面即代表安装成功。

<div class="image-container">
    <img src="./docs/nodeDevops/images/128.png" alt="图片15-2" title="图片15-2" >
    <span class="image-title">图 15-2 </span>
</div>

> window 安装 docker 的时候可能需要 下载 [Linux 内核更新包](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package)，参考链接配置即可。

#### 封装构建 Docker 镜像

首先打开我们的 CLI 项目，然后新建一个 Dockerfile，构建我们的镜像。

```docker
FROM node:alpine

WORKDIR /home/app

COPY . /home/app

RUN npm link
```

输入上述脚本之后，我们运行 `docker build -f ./Dockerfile -t boty-builder:0.0.1.` 来打包我们的构建镜像。

<div class="image-container">
    <img src="./docs/nodeDevops/images/129.png" alt="图片15-3" title="图片15-3" >
    <span class="image-title">图 15-3 </span>
</div>

我们可以看到此时，已经在拉取 `node:alpine` 镜像构建了。

构建完毕之后，输入命令 `docker images` 可以看到我们打包的镜像了。

<div class="image-container">
    <img src="./docs/nodeDevops/images/130.png" alt="图片15-4" title="图片15-4" >
    <span class="image-title">图 15-4 </span>
</div>

#### 使用镜像构建项目

再完成构建镜像的打包之后，现在我们打开之前创建的 react-tpl 项目，运行命令 `docker run -it -v D:\self_git\react-tpl:/home/app/react boty-builder:0.0.1 sh`。

<div class="image-container">
    <img src="./docs/nodeDevops/images/131.png" alt="图片15-5" title="图片15-5" >
    <span class="image-title">图 15-5 </span>
</div>

进入之后，进入到 Docker 挂载目录，运行构建命令 `NODE_ENV=production boty webpack`， 此时可以看到构建完成之后，宿主目录里面已经正常生成构建产物。

<div class="image-container">
    <img src="./docs/nodeDevops/images/132.png" alt="图片15-6" title="图片15-6" >
    <span class="image-title">图 15-6 </span>
</div>

当然，我们不可能手动去做这件事，所以在项目根路径创建一个 shell 脚本 `build.sh`，写入如下脚本。

```sh
docker run -it -v D:\self_git\react-tpl:/home/app/react boty-builder:0.0.1 sh -c 'cd /home/app/react && NODE_ENV=production boty webpack && exit'
```

然后直接运行即可，但是这样有个缺点，我们输入 `docker ps -a` 看看会出现什么。

<div class="image-container">
    <img src="./docs/nodeDevops/images/133.png" alt="图片15-7" title="图片15-7" >
    <span class="image-title">图 15-7 </span>
</div>

emm，我们每一次运行 `boty-builder:0.0.1` 都会出现一个容器，那么每一次构建都有一次容器残留，很明显是不合理的，所以我们可以在 docker 的命令中加入 --rm，这样运行之后会直接删除容器。

接下来，我们在测试一遍正式流程，首先使用 `docker rm $(docker ps -aq)`，删除所有容器。

<div class="image-container">
    <img src="./docs/nodeDevops/images/134.png" alt="图片15-8" title="图片15-8" >
    <span class="image-title">图 15-8 </span>
</div>

再次运行改造后的脚本`docker run -it --rm -v D:\self_git\react-tpl:/home/app/react boty-builder:0.0.1 sh -c 'cd /home/app/react && NODE_ENV=production boty webpack && exit'`。

<div class="image-container">
    <img src="./docs/nodeDevops/images/135.png" alt="图片15-9" title="图片15-9" >
    <span class="image-title">图 15-9 </span>
</div>

此时可以看到，构建完成之后，自动退出容器且容器已经被删除了。

## 本章小结

在本章，我们利用了 Docker 生成了构建镜像来打包项目，同时利用快速启动以及环境隔离的能力，我们可以针对不同的项目生成不同的构建镜像。

此时肯定也有同学有疑问，为什么要这么辛苦生成一个专门构建项目的镜像，直接下载源码构建不是更为方便吗？针对这些问题，在下一章节的 Jenkins 进阶中会有展述。

本章的学习针对于 Docker 新手来说，会有诸多问题，但 Docker 总体的学习成本不算很高，大部分都是命令相关的熟悉，同时这些也是作为 Docker 开发的基础功能，所以并没有过多的介绍命令相关的内容。