# Node业务篇-jenkins&Node

## 前言

上一章，一起学习了用户登录、创建项目、创建流程、流程变更等一套业务流程开发。

本章将会衔接上一章的流程，使用 Jenkins Api 发布一个简单的 H5 项目发布，完成整个项目的闭环。

## Jenkins Coding

### 封装基础 Jenkins Api

项目选择 [jenkins](https://www.npmjs.com/package/jenkins) 库来拓展，注意如果你使用 TS 模式的话，需要安装 `@types/jenkins` 依赖。

```js
import * as jenkins from "jenkins";

/**
 * Jenkins连接
 * @param type
 */
const getJenkins = function (
  type: "h5" | "node" | "nodeProduct" | "android" | "java"
) {
  const jenkinsConfig = {
    h5: {
      baseUrl: "http://devOps:118844ffb045d994acf8bb353e8d7b34f0@localhost:9001",
      crumbIssuer: true,
    },
  };
  return jenkins(jenkinsConfig[type]);
};
/**
 * @description: 触发jenkins流水线
 */
const buildJenkins = async ({ type, job, params }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).job.build(
      { name: job, parameters: params },
      (err: any, data: any) => {
        if (err) {
          console.log("err: ", err);
          throw err;
        }
        resolve({ queueId: data });
      }
    );
  });
  return { data: jenkinsCallback };
};
/**
 * @description: 获取当前节点信息
 */
const getQueuedInfo = async ({ type, queueId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).queue.item(queueId, (err: any, data: any) => {
      if (err) {
        console.log("err---->", err);
        throw err;
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};
/**
 * @description: 获取当前构建信息
 */
const getJenkinsInfo = async ({ type, job, buildNumber }) => {
  console.log(type, job, buildNumber);
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.get(job, buildNumber, (err: any, data: any) => {
      console.log("data: ", data);
      console.log("err: ", err);
      if (err) {
        console.log("err---->", err);
        throw err;
      }
      resolve(data);
    });
  });
  const { statusCode } = jenkinsCallback;
  if (jenkinsCallback && statusCode !== 404) {
    return { data: jenkinsCallback };
  } else {
    return { data: jenkinsCallback };
  }
};
/**
 * @description: 获取jenkins console.log 信息
 */
const getJenkinsConsole = async ({ type, job, buildId }) => {
  const jenkinsCallback: any = await new Promise((resolve) => {
    getJenkins(type).build.log(job, buildId, (err: any, data: any) => {
      if (err) {
        return console.log("err---->", err);
      }
      resolve(data);
    });
  });
  return { data: jenkinsCallback };
};

export default {
  buildJenkins,
  getQueuedInfo,
  getJenkinsInfo,
  getJenkinsConsole,
};
```

### 触发 Jenkins 构建任务

上述是对 Jenkins 的基本封装，简单的封装了一些我们需要用到的方法，具体的定制化，可以结合业务自己设计。

各端的业务构建，可以选择多个 Jenkins 项目或者不同的 job 区分，不建议一个 job 适配所有业务，这样脚本的开发与维护会很复杂。

新建 `app/Controller/build.ts`。

```ts
import { Post, Prefix, Get } from "egg-shell-decorators";
import BaseController from "./base";
@Prefix("build")
export default class BuildController extends BaseController {
  /**
   * @description: 创建构建任务
   */
  @Post("/creatJob")
  public async creatJob({
    request: {
      body: { params },
    },
  }) {
    const { ctx, app } = this;
    const { access_token: accessToken } = this.user;
    const {
      projectId,
      branchName,
      projectVersion,
      buildPath,
      type,
      cache,
    } = params;
    const project = await ctx.service.project.getProject({ projectId });
    let projectGitPath = project.projectUrl.replace(
      "http://",
      `https://oauth2:${accessToken}@`
    );
    const callBack = await ctx.service.build.buildProject({
      type,
      projectName: project.projectGitName,
      projectVersion,
      projectGitPath: `${projectGitPath}.git`,
      branchName,
      buildPath,
      cache,
    });
    this.success(callBack);
  }
}
```

新建 `app/Service/build.ts`。

```ts
import { Service } from "egg";
export default class Build extends Service {
  /**
   * @description: 构建项目
   */
  public async buildProject({
    type = "h5",
    projectName,
    projectVersion,
    projectGitPath,
    branchName,
    buildPath,
    cache,
  }) {
    const { ctx } = this;
    const callBack = await ctx.helper.api.jenkins.index.buildJenkins({
      type,
      job: "fe-base-h5",
      params: {
        PROJECT_NAME: projectName,
        PROJECT_VERSION: projectVersion,
        PROJECT_GIT_PATH: projectGitPath,
        BRANCH_NAME: branchName,
        BUILD_PATH: buildPath,
        CACHE: cache,
      },
    });
    return callBack;
  }
}
```

<div class="image-container">
    <img src="./docs/nodeDevops/images/91.png" alt="图片8-1" title="图片8-1" >
    <span class="image-title">图 8-1 </span>
</div>

### 构建信息推送

将上述 Jenkins 的构建 queueId 获取到之后，通过调用 Jenkins Api 获取发布时间跟日志。

<div class="image-container">
    <img src="./docs/nodeDevops/images/92.png" alt="图片8-2" title="图片8-2" >
    <span class="image-title">图 8-2 </span>
</div>

如上图，将 Jenkins 与项目管理系统联合起来，方便用户操作。

### 前端轮询

直接用返回的 queueId 轮询 Jenkins Api，可以直接获取信息。

* 优点：暴力、简单，开发速度最快，较为迅速。

* 缺点：用户离开页面将无法感知，数据落库会中断，且极度消耗性能，多个用户在操作同一个项目时，无法及时通知到位。

### 后台轮询 + socket

Node 后台通过 queueId 直接轮询 Jenkins Api，通过 websocket 推送到前端展示。

* 优点：暴力，开发速度、难度适中，用户即使离开页面，数据依然能够落库，可以同时推送到多个用户。

* 缺点：Node 后台性能消耗增加，需要前后台一起配合开发，大量无用消息需要落库，且节点无法感知。


### webhook + socket

Node 开放 webhook 接口，Jenkins 流水线在每个 stage 推送消息到 Node 后台，再通过 socket 推送到前端展示。

* 优点：最大程度节约资源，且可以自定义有效数据跟节点感知，时效性最高。

* 缺点：需要前端、node、脚本一起配合开发，成本较高。

各位同学可以在实际开发过程中结合业务选择成本低，收益高的方式来配合开发。

由于实际使用中，会涉及到同一个项目多人协作操作，而 Ajax 轮训既消耗性能，实时性也不能完全保证，也会推送大量无效信息。所以项目采用 Websocket 来推送多人协作信息以及后期构建流程的状态推送。

### egg-socket

Egg 框架提供了 egg-socket.io 插件，增加了以下开发规约：

* namespace: 通过配置的方式定义 namespace（命名空间）
* middleware: 对每一次 socket 连接的建立/断开、每一次消息/数据传递进行预处理
* controller: 响应 socket.io 的 event 事件
* router: 统一了 socket.io 的 event 与 框架路由的处理配置方式。

1.安装插件。

```shell
$ npm i egg-socket.io --save
```

2.开启插件： `app/config/plugin.ts`，添加下述代码。

```ts
io: {
    enable: true,
    package: 'egg-socket.io',
}
```

3.创建配置： `config/config.local.ts`。

```ts
// socketio 配置
config.io = {
  init: {}, // passed to engine.io
  namespace: {
    "/": {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
    "/example": {
      connectionMiddleware: [],
      packetMiddleware: [],
    },
  },
};
```

4.配置 io 路由。

```ts
import { Application } from "egg"; // io 路由使用方式
import { EggShell } from "egg-shell-decorators";

export default (app: Application) => {
  const { router, controller, io } = app;
  EggShell(app);
  // socket.io
  io.of('/').route('server', io.controller.nsp.ping);
};
```

> ts 使用中 io.controller.nsp 会报类型未定义，所以需要修改一下 `typings/index.d.ts` 文件。

```ts
import "egg";

declare module "egg" {
  interface Application { }
  interface CustomController {
    nsp: any;
  }

  interface EggSocketNameSpace {
    emit: any
  }
}
```

5.新建 `app/io/controller/nsp.ts` 文件。

```ts
import { Controller } from "egg";

export default class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit("res", `Hi! I've got your message: ${message}`);
  }
}
```

6.修改 `package.json` 的启动命令：`"dev": "egg-bin dev --sticky"`，重启项目。

7.测试 socket 链接是否正确。

* 打开 websocket 在线测试网页 [ws.douqq.com](http://ws.douqq.com/)。
* 输入 `ws://127.0.0.1:7001/socket.io/?room=nsp&userId=client_0.38599487710107594&EIO=3&transport=websocket`之后点击链接。

<div class="image-container">
    <img src="./docs/nodeDevops/images/93.png" alt="图片8-3" title="图片8-3" >
    <span class="image-title">图 8-3 </span>
</div>

出现上述返回值则代表 socket 配置成功，具体的业务代码将在前端界面开发章节中介绍。

## 本章小结

本章主要内容是 Node 对接 Jenkins Api，此时已经完成一套简单的部署流程闭环。