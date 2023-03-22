# React基础篇-前端界面开发

## 前言

本章节开始，将进入客户端的开发，涉及到的有 Web 前端界面、CLI工具、插件等等。

客户端的具体表现形式并不唯一，最终目的都是为了提高研发效率与质量。小册只是举出了常见的三种进行演示而已。

本章将会介绍 Web 相关界面的功能开发与一些必要的内容。

## 搭建基础框架

由于项目需要快速上手以及上线，对于样式、布局、路由、权限等等一系列的通用性很强的基础框架，自研比较花时间，投入的回报率不高。对于大部分中小型团队，直接选择第三方成熟的中台框架会方便很多，性价比比较高，例如 ANT DESIGN PRO、Element Admin、Iview Admin 等。

本小册采用了 UmiJS + ANT DESIGN PRO 的架构进行研发。

> 同学们可以根据自己团队情况选择第三方或者自研。只要完成功能，开发语言只是完成度的工具。

## UmiJS 是什么？

[UmiJS](https://umijs.org/zh-CN)，中文可发音为乌米，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

## ANT DESIGN PRO 是什么？

[Ant Design Pro](https://pro.ant.design/) 是一个企业级中后台前端/设计解决方案，基于 Ant Design 的设计规范和基础组件的基础上，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。

## 快速搭建基础框架

小册将采用 UmiJS 3.0 + Ant Design Pro 4.0 来构建一个基础的模板。

```shell
yarn create umi

 Select the boilerplate type (Use arrow keys)
❯ ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
  app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.
```

Ant Design Pro 脚手架将会自动安装，安装完依赖之后，一个基础框架就完成了。

## 自定义模块

在完成基础框架之后，通用型的框架为了兼容大部分项目都会融入很多预设的配置项或者功能，对于每个团队来说，有些功能并不是必须的，所以需要对基础框架做一个自定义，增删一些模块完善功能。

## 删除全球化

常规，Ant Design Pro 的国际化在大部分团队意义不大，所以可以先删除，后期有需求再进行添加。

先删除 `@umijs/plugin-locale` 插件，其次删除项目中所有 formatMessage 相关的动态代码，移除 i18n 的相关文件，修改成正常文案即可。

> 如果你是按照上述的模板下来，再删除 `@umijs/plugin-locale` 的配置之后，项目应该会报错，按照报错的指示修正就行。并不会造成很多麻烦。
> 删除全球化 直接命令更好`npm run i18n-remove`。

## 添加开发环境

常规开发环境都需要有 3 套，分别是 dev（开发环境），test（测试环境），prod（生产环境）。如果资源富余的话，可以添加 pre（预发环境）。

Umi 通过环境变量 `UMI_ENV` 可以区分不同环境来指定配置。

```js
// .umirc.js 或者 config/config.js
export default { a: 1, b: 2 };
// .umirc.local.js 或者 config/config.local.js 开发环境
export default { c: 'local' };
// .umirc.test.js 或者 config/config.test.js
export default { b: 'cloud', c: 'cloud' };
```

> 在配置多环境文件的时候，切记 config.js 一定要存在，不然会失效

同时修改命令启动命令：

```json
"start:dev": "cross-env REACT_APP_ENV=dev MOCK=none umi dev",
"build:test": "cross-env UMI_ENV=test umi build",
"build:prod": "cross-env UMI_ENV=prod umi build",
```

这样即可在不同的环境，运行不同的命令，生成对应的版本。举个栗子，测试环境与线上环境的接口不一致，或者有些功能是需要在测试环境使用。

> 毕竟 UmiJS + Ant Design Pro 结合之后的基础框架非常成熟，简单加一些功能即可进行业务开发，如果需要定制的话，可以根据需求再进一步进行定制。

## 前端界面设计

<div class="image-container">
    <img src="./docs/nodeDevops/images/95.png" alt="图片10-1" title="图片10-1" >
    <span class="image-title">图 10-1 </span>
</div>

在前面所有的内容设计与大纲中，紧靠文字描述与架构图，可能同学们对整体的架构了解的还不够清晰，那么借助这个前端的界面，再次为大家介绍一下整个项目的功能模块。

## 工作台

展示快捷入口与一些常用信息，基本大的中台项目都有，不过多展述。

## CICD

这块的内容主要是 GitLab 的项目信息以及 CICD 相关的模块。

<div class="image-container">
    <img src="./docs/nodeDevops/images/96.png" alt="图片10-2" title="图片10-2" >
    <span class="image-title">图 10-2 </span>
</div>

1. 对 GitLab 的项目进行一些必须信息管理。
2. 对 GitLab 的项目分支进行管理。
3. 触发构建、部署、回滚等一系列操作。

## 项目管理

项目管理之前设计的时候也被简化，使用单次流程来管理每次迭代的项目进度。

<div class="image-container">
    <img src="./docs/nodeDevops/images/97.png" alt="图片10-3" title="图片10-3" >
    <span class="image-title">图 10-3 </span>
</div>

## 其他模块

与 GitLab 高度重合的模块，例如用户这种就不需要在本前端重复开发了，注册可以直接链转到 GitLab 的注册页面即可，其他例如 pipeline、issue、commit 等等也是如此。

## 功能开发

<div class="image-container">
    <img src="./docs/nodeDevops/images/98.png" alt="图片10-4" title="图片10-4" >
    <span class="image-title">图 10-4 </span>
</div>

首先，一起来看下基础框架改造之后的目录结构。

* `config/**` 全局属性的配置，对 umi 配置的扩展，例如路由、主题、代理、构建等等相关的配置；
* `mock/**` 模拟接口数据，看自己取舍；
* `public/**` 公共资源存放；
* `src/assets/**` 静态资源存放（无编译要求的资源）；
* `src/constants/**` 公共常量存放；
* `src/locales/**` 无需求可直接删除，多语言配置；
* `src/models/**` 布局组件代码；
* `src/pages/**` 具体页面代码；
* `src/services/**` 请求层代码；
* `src/utils/**` 通用工具类；

以上目录，可以根据自身项目需求与团队规范进行调整。

## 登录（JWT 前端使用）

改造 `utils/request` 模块。

```ts
/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (response.status === 401) {
      window.location.href = '/user/login';
    }
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: '/api',
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    authorization: localStorage.getItem('authorization'), // 读取本地保存的 authorization token
  },
});

export default request;
```

改造 service 模块。

```ts
import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/user/getUserToken', {
    getResponse: true, // 开启可以拿到返回 header 参数，将对应的 authorization token 存入本地使用
    method: 'POST',
    data: { params },
  });
}
```

如上，拿到 response header 里面的 token，后续可以正常请求接口。

## 用户名密码登录

<div class="image-container">
    <img src="./docs/nodeDevops/images/99.png" alt="图片10-5" title="图片10-5" >
    <span class="image-title">图 10-5 </span>
</div>

这一块比较简单，form 表单提交到后端，使用上述 JWT 的 service 请求模块即可。

## GitLab Application 授权

<div class="image-container">
    <img src="./docs/nodeDevops/images/100.png" alt="图片10-6" title="图片10-6" >
    <span class="image-title">图 10-6 </span>
</div>

先添加一个 Icon，之前的章节已经做过了客户端的模拟授权，现在就是对接接口的时候了。

客户端代码。

```html
<a href='http://192.168.160.88:8888/oauth/authorize?client_id=CLIENT_ID&redirect_uri=http://127.0.0.1:7001/user/getTokenByApp&response_type=code' >
    <GitlabOutlined className={styles.icon} />
</a>
```

服务端代码。

```ts
@Get("/getTokenByApp")
public async getTokenByApplications({
  request: {
    query: { code },
  },
}) {
  const { ctx, app } = this;
  // gitLab 获取 access_token
  const userToken = await ctx.service.user.getTokenByApplications({ code });
  // gitLab 获取用户信息
  const userInfo = await ctx.service.user.getUserInfo({
    access_token: userToken.access_token,
  });
  // 用户数据本地落库
  ctx.service.user.saveUser({
    userInfo,
  });
  // 将用户信息及 token 使用 jwt 注册
  const token = app.jwt.sign(
    {
      userToken,
      userInfo,
    },
    app.config.jwt.secret
  );
  ctx.set({ "Access-Control-Expose-Headers": "authorization" });
  ctx.set({ authorization: token }); // 设置 headers
  ctx.cookies.set('authorization', token, {
    maxAge: 1000 * 3600 * 24, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
    httpOnly: true, // 仅允许服务获取,不允许js获取
    domain: '.cookieboty.com' // 设置cookie跨域
  });
  ctx.redirect(`http://fe.cookieboty.com`);
}
```

因为采用了重定向的方法，所以直接将 authorization 信息存入 cookie，同时获取 JWT 验证的中间件获取 authorization token 的方法也要同时兼容 cookie 与 header 的方式。

> 这里涉及到跨域的知识点，想要了解的同学可以自行查找资料。同时对安全性的校验就没那么严格了，实际开发项目的时候，记得要保护一些私有的 client 与 token 信息。

## WebSocket

### socket.io-client 客户端配置

```ts
window.onload = function () {
  // init
  const socket = io('http://127.0.0.1:7001', {
    // 实际使用中可以在这里传递参数
    query: {
      room: 'nsp',
      userId: `client_${Math.random()}`,
    },

    transports: ['websocket'],
  });

  socket.on('connect', () => {
    const id = socket.id;

    log('#connect,', id, socket);

    // 监听自身 id 以实现 p2p 通讯
    socket.on(id, (msg: any) => {
      log('#receive,', msg);
    });
  });

  // 接收在线用户信息
  socket.on('online', (msg: any) => {
    log('#online,', msg);
  });

  // 系统事件
  socket.on('disconnect', (msg: any) => {
    log('#disconnect', msg);
  });

  socket.on('disconnecting', () => {
    log('#disconnecting');
  });

  socket.on('error', () => {
    log('#error');
  });

  window.socket = socket;
};
```

客服端采用 `socket.io-client` 去链接 websocket。上述是基础链接部分，具体的实现要根据业务需求开发。

## Nginx 开启 WS

由于之前已经将项目由 ip 地址改成用 Nginx 代理使用域名访问，此时如果没有对 Nginx 进行配置的话，是没办法正常使用 WS 的功能。

修改 `Nginx config` 配置如下：

```nginx
server{
    listen       80; 
    server_name  devops.cookieboty.com;
    location  / {
        proxy_pass   http://127.0.0.1:7001;
    }
    location  /socket.io/ { ## 配置开启 socket.io
        proxy_pass   http://127.0.0.1:7001;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

修改完毕重启即可。

## 其他功能

其他的例如发布、新建项目、构建等等一些系列的功能，在 Node 篇已经写一部分接口 demo 了并且测试了。由于前端对接没有太大的难度，就不在这里特别说明，后期可以根据开放的前端代码参考一下。

## 本章小结

本章主要内容是 UmiJS + Ant Design Pro 开发的前端界面，熟练的同学可以根据自己的习惯，选择不同的模板与语言，开发自己的专属界面。

