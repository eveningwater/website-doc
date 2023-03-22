# Node新手篇-Egg

## 前言

通过上一章的项目分析与设计之后接下来将进入项目开发阶段，在开发项目之前先一起学习下 Egg 的基本开发。

> 如果对 Egg 熟悉的同学，本章可以快速阅读或跳过，如果对 Egg 不熟悉的同学，可以帮你快速熟悉 Node 开发，顺便过度，避免踩坑。

本章将介绍 Egg 的基本配置与使用，阅读本章将会逐渐熟悉服务端开发与部分 Egg 插件的使用。

## 目录介绍

<div class="image-container">
    <img src="./docs/nodeDevops/images/65.png" alt="图片4-1" title="图片4-1" >
    <span class="image-title">图 4-1 </span>
</div>

上图是第一次初始化的目录，那么对于 Egg 来说，还有一些由框架约定的目录：

* app/router.js 用于配置 URL 路由规则；
* app/controller/** 用于解析用户的输入，处理后返回相应的结果；
* app/service/** 用于编写业务逻辑层；
* app/middleware/** 用于编写中间件；
* app/public/** 用于放置静态资源；
* app/extend/** 用于框架的扩展；
* config/config.{env}.js 用于编写配置文件；
* config/plugin.js 用于配置需要加载的插件；
* test/** 用于单元测试；
* app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。

在后面的配置介绍中，将逐一使用到上述的部分目录。

## 编写一个 Hello World!

<div class="image-container">
    <img src="./docs/nodeDevops/images/66.png" alt="图片4-2" title="图片4-2" >
    <span class="image-title">图 4-2 </span>
</div>

修改 ctx.body = 'Hello World!';，然后刷新页面即可。

## 控制器（Controller）

Controller 的定义是负责解析用户的输入，处理后返回相应的结果。

所以修改了 ctx.body 也就修改了返回给页面的结果。

### 接受参数

#### Query

在 URL 中 ? 后面的部分是一个 Query String，这一部分经常用于 GET 类型的请求中传递参数。

controller/home.ts 可以使用 ctx.query 接受 query 参数。

```ts
ctx.body = `Hello ${ctx.query.name}!`;
```

浏览器输入: `http://127.0.0.1:7001/?name="cookie"`:

<div class="image-container">
    <img src="./docs/nodeDevops/images/67.png" alt="图片4-3" title="图片4-3" >
    <span class="image-title">图 4-3 </span>
</div>

#### Queries

正常情况下，Query String 是不会重复的，但是在查询的时候，也有可能出现同 key 多值的问题，所以 Egg 可以使用 queries 来获取这种参数，将相同 key 的值取出来作为数组传递。

```ts
ctx.body = `Hello ${ctx.queries.name.join(',')}!`;
```

浏览器输入: `http://127.0.0.1:7001/?name="cookie"&name="boty"`:

<div class="image-container">
    <img src="./docs/nodeDevops/images/68.png" alt="图片4-4" title="图片4-4" >
    <span class="image-title">图 4-4 </span>
</div>

#### Router params

如果对 RESTful 有印象的话，应该有这种需求：

```ts
ctx.body = `Hello ${ctx.params.name}!`; // 修改 app/controller

router.get('/:name', controller.home.index); // 修改 router.ts
```

浏览器输入: `http://127.0.0.1:7001/cookie`:

<div class="image-container">
    <img src="./docs/nodeDevops/images/69.png" alt="图片4-5" title="图片4-5" >
    <span class="image-title">图 4-5 </span>
</div>

#### Body params

Web 开发中数据传递最常用的两类格式分别是 JSON 和 Form。

Egg 内置了 bodyParser 中间件来对这两类格式的请求 body 解析成 object 挂载到 ctx.request.body 上。

```ts
ctx.body = `Hello ${ctx.request.body.name}!`; // 修改 app/controller

router.post('/', controller.home.index); // 修改 router.ts
```

HTTP 协议中并不建议在通过 GET、HEAD 方法访问时传递 body，所以无法在 GET、HEAD 方法中按照此方法获取到内容。

POST 请求不方便在浏览器来使用，可以使用上一章已经安装完的 Postman 工具。

<div class="image-container">
    <img src="./docs/nodeDevops/images/70.png" alt="图片4-6" title="图片4-6" >
    <span class="image-title">图 4-6 </span>
</div>

如果跟着步骤走的话，现在你应该出现了如下错误：

<div class="image-container">
    <img src="./docs/nodeDevops/images/71.png" alt="图片4-7" title="图片4-7" >
    <span class="image-title">图 4-7 </span>
</div>

没错，这是 CSRF 攻击 - 伪造用户请求向网站发起恶意请求。

Egg 内置的 egg-security 插件默认对所有『非安全』的方法，例如 POST，PUT，DELETE 都进行 CSRF 校验。

项目还没有发布，开发阶段为了方便测试，可以直接将 csrf 安全校验关闭，等开发完毕或者有需求的时候再根据业务安全等修改配置。

```ts
//app/config/config.local.ts

config.security = {
    csrf: false,
};
```

<div class="image-container">
    <img src="./docs/nodeDevops/images/72.png" alt="图片4-8" title="图片4-8" >
    <span class="image-title">图 4-8 </span>
</div>

再次用 Postman 访问地址，可正常请求到数据了:

<div class="image-container">
    <img src="./docs/nodeDevops/images/73.png" alt="图片4-8" title="图片4-8" >
    <span class="image-title">图 4-8 </span>
</div>

### 服务（Service）

简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

* 保持 Controller 中的逻辑更加简洁。
* 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。
* 将逻辑和展现分离，更容易编写测试用例。

这里就不过多介绍例子，在后面的开发中将会频繁使用到。

### 插件推荐

除了官网推荐常见的插件之外，这里再推荐两款辅助项目开发的插件，如果会使用的同学，可以自己根据文档直接配置。

#### egg-shell-decorators

[egg-shell-decorators](https://www.yuque.com/super2god/open-source/egg-shell-decorators-v1.6.0)可以接管路由，能够在 Controller 方法上使用装饰器生成对应的路由，便于路由管理。

修改 router.js：

```js
import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

// export default (app: Application) => {
//   const { controller, router } = app;
//   router.post('/', controller.home.index);
// };

export default (app: Application) => {
  EggShell(app);
};
```

路由配置则如下所示：

```js
import { Controller } from 'egg';
import { Post, Prefix } from 'egg-shell-decorators';

@Prefix('/home') // 添加网关，方便路由识别
export default class HomeController extends Controller {

  @Post('/')
  public async index() {
    const { ctx } = this;
    ctx.body = `Hello ${ctx.request.body.name}!`;
  }
}
```

这样路由链接可以直接使用 `http://127.0.0.1:7001/home` 访问。

#### egg-helper

[egg-helper](https://www.npmjs.com/package/egg-helper) 在 Egg 项目中，拆分工具函数，对工具函数单独维护。

* 插件目的是分离 app/extend/helper.js，分成 app/helper/**/*.js 的单个文件,便于维护
* 插件自动读取 app/helper/**/ 文件目录下所有文件,并挂载到 ctx.helper
* 插件不会覆盖 app/extend/helper.js

```ts
// 配置插件
const plugin: EggPlugin = {
  helper: {
    enable: true,
    package: 'egg-helper',
  },
};
```

<div class="image-container">
    <img src="./docs/nodeDevops/images/74.png" alt="图片4-9" title="图片4-9" >
    <span class="image-title">图 4-9 </span>
</div>

编写工具函数 /app/helper/util.js：

```js
module.exports = () => {
  return {
    hello() {
      return 'hello helper';
    },
  };
};
```

<div class="image-container">
    <img src="./docs/nodeDevops/images/75.png" alt="图片4-10" title="图片4-10" >
    <span class="image-title">图 4-10 </span>
</div>

使用工具函数：

```ts
public async index() {
   const { ctx } = this;
   ctx.body = `Hello ${ctx.helper.util.hello()}!`;
}
```

关于上述两个插件更多的配置同学们可以自己去发掘，后面有其他优秀插件用到的时候也会介绍推荐。

> Egg 链接 MySQL 插件，项目中使用的是 [Sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)，后续会有详细说明，本篇暂时不需要用到。

## 本章小结

本章只是是对 Egg 一个简单的介绍，帮助不熟悉的同学快速上手，更细节的内容可以从[官网](https://eggjs.org/zh-cn/)获取。

在整个环境配置完成以及熟悉了基本的 Egg 开发与配置后，下一章将正式进入项目开发。