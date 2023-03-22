# 构建篇-Jenkins进阶

## 前言

上一章是 Docker 的一些基础用法， 并且我们已经通过 Docker 构建了一个专门用于打包的 Docker 镜像，那么本章，本将借助 Jenkins 的 pipeline 流水线，构建一套适配多端的 job。

## 技术方案设计

照例，在正式开发之前进行了一轮技术预研，先将预研的方案理一下。

### 脚本全量流程 + when 条件

一个 pineline 流水线将所有的状态流程都是预设好的，例如全量的流程从 dev -> test -> deploy 这种，可以通过参数 + when 条件语句跳过指定流程。

* 优势：这个方案是最简单的，同时开发成本最低。

* 劣势：虽然是简单的方案，但是脚本相对于固定，如果有全新的流程是需要重新开发新的 pipeline 流水线。

### pipeline scm

通过 pipeline scm 在拉取 git 项目的同时读取 git 项目中的配置文件（Jenkinsfile），进行项目构建。

* 优势：相比第一种比较灵活，在项目构建之前通过 gitlab api 的方式去修改 Jenkinsfile，达到一个动态生成流水线的目的。

* 劣势：需要通过 gitlab api 去修改 Jenkinsfile，容易引起冲突。

### 修改 Jenkinsfile

创建 10 个 job，关闭单 job 的并发功能，直接通过 Jenkins Api 修改对应的 Jenkinsfile，然后手动维护任务队列。

* 优势：自定义化程度非常高，且与项目代码完全隔离，不需要修改项目中的配置文件。

* 劣势：Jenkins 的 job 自带并发队列，手动维护队列增加开发成本。

### blue ocean

使用 blue ocean 关联源码仓库，修改 Jenkinsfile 再运行，这种方案与第二种虽然过程不同但结果基本类似，所以优缺点基本相通。

### 最后方案

根据上述 4 个方案的优缺点，结合现有的人力可以针对性的选择，那么对我们来说，第一种方案的性价比是最高的。

### Jenkinsfile

选定方案之后，我们就需要开发对应的 pipeline 脚本了。

> 这里也不过多介绍语法的详细，想要了解更多的同学们可以点击 [API 文档](https://www.jenkins.io/zh/doc/book/pipeline/syntax/)地址查看更多。

#### 创建 stage

首先创建全量 stage。

```ts
pipeline {
    agent any 
    stages {
        stage('Pre Git') {
            steps {
                script {
                    echo "pre git"
                }
            }
        }
        stage('Pre Dependencies') {
            steps {
                script {
                    echo "check node_modules,${params.CACHE}"
                }
            }
        }
        stage('build') {
            steps {
                script {
                    echo "build project"
                }
            }
        }
        stage('test') {
            steps {
                script {
                    echo "test case"
                }
            }
        }
        stage('deploy') {
            steps {
                script {
                    echo "deploy project"
                }
            }
        }
    }
}
```

如上，我们创建了 5 个 stage：

* Pre Git：拉取项目
* Pre Dependencies：安装依赖
* build：构建
* test：测试
* deploy: 发布

#### Pre Git 拉取项目

拉取项目分两种。

* 项目未拉取，这种情况很简单，直接使用如下命令即可：

```sh
sh "git clone ${params.PROJECT_GIT_PATH}"
sh "git checkout ${params.BRANCH_NAME}"
```

* 项目已存在 如果项目已经被 clone 过了，那么有可能在安装依赖的之后，拉取切换分支出现冲突，或者分支删除导致拉取异常，这个时候需要重置本地 git。

```sh
sh "git fetch --all"
sh "git reset --hard origin/${params.BRANCH_NAME}"
sh "git checkout ${params.BRANCH_NAME}"
```

#### Pre Dependencies 安装依赖

这一步，我们可以直接使用简单的 yarn 命令，所有项目直接使用 yarn，依靠 yarn 本身的属性帮我们缓存 + 校正依赖。

#### build 构建项目

这一步就可以使用到我们上一章构建好的打包镜像。

```sh
sh "docker run -i --rm \
-v /home/build/${params.PROJECT_NAME}:/home/${params.PROJECT_NAME} \
${params.DOCKER_PUBLISHER} sh -c \
'cd /home/app && CONFIG_PATH=/home/${params.PROJECT_NAME}/.config.json node ./src/build.js  && exit'"
```

整体的流程是根据传入的 docker 镜像名称，拉取对应的镜像，将本地的项目路径挂载到 docker 当中，然后再在 docker 中进行项目构建。

这样的优势还是不错的，这里重申一下：

1. docker 是环境隔离的，这样如果出现非法指令或者异常，崩掉的只是当前容器，而不会影响宿主系统，最多影响到当前挂载到 docker 的项目。
2. 同时得益于环境隔离，docker 构建出来的打包镜像是任意的，也就是它可以为所欲为。构建环境与命令都是自定义的，借助这个特性，我们系统构建的项目将不不仅仅限制于前端项目。

#### deploy 发布项目

与构建相通，对于发布来说，我们也可以使用 docker 来解决，因为每个项目的发布地址、方式可以不尽相同。

```sh
sh "docker run -i --rm \
-v /home/build/${params.PROJECT_NAME}:/home/${params.PROJECT_NAME} \
${params.DOCKER_PUBLISHER} sh -c \
'cd /home/app && CONFIG_PATH=/home/${params.PROJECT_NAME}/.config.json node ./src/build.js  && exit'"
```

所以上述的命令都是一样的，可以由多个任意的 builder 与 publisher docker 镜像组合使用。

#### Gitlab 信息同步

对于流水线来说，可以使用 gitlab api 进行消息推送，在 Jenkinsfile 的 post 语法中做最后的信息同步。

```js
post {
    always {
        echo '构建结束...'
    }
    success {
        echo '恭喜您，构建成功！！！'
        sh "curl --request POST --header \"PRIVATE-TOKEN: ${PRIVATE_TOKEN}\" \"${GITLAB_URL}/api/v4/projects/${PROJECT_ID}/statuses/${COMMITS_ID}?state=success\""
     }
    failure {
        echo '抱歉，构建失败！！！'
        sh "curl --request POST --header \"PRIVATE-TOKEN: ${PRIVATE_TOKEN}\" \"${GITLAB_URL}/api/v4/projects/${PROJECT_ID}/statuses/${COMMITS_ID}?state=failed\""
    }
    unstable {
        echo '该任务已经被标记为不稳定任务....'
    }
}
```

#### when 语法接入

when 语法使用比较简单，使用方法如下，在 stage 中直接添加对应的规则即可。

```js
stage('test') {
    when { expression { return PIPELINE_TEST == true } }
    steps {
        script {
            echo "test case"
        }
    }
}
```

## 本章小结

本章是 Jenkins 的一个进阶使用。

可以看到整个构建流程，我们合理的利用了 docker 的特性，构建了一个通用性非常高的脚本，对应的构建配置可以放在 devops 系统中维护，通过对每个项目配置不同的 builder 与 publisher，理论上可以做到构建任意项目。

同时 Jenkins 还有更多的高级用法，比如使用 groovy 语法拓展 pipeline 的功能、blue ocean 插件以及更多优秀的插件使用，可以尝试自定义更高级的用法。

