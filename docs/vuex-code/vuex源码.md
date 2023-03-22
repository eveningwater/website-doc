# vuex源码

讲了这么多大白话，估计大家听着也挺无语的，我们来带你实战，开始敲代码。我们根据我们前面所分析的思想将实现一个vuex分成了5个步骤，如下:

* 实现vuex的注册
* 实现vuex的数据响应式(计算属性)
* 实现vuex的模块
* 实现vuex的action与mutation
* 实现vuex的插件机制

注:我在这里直接将vuex的仓库clone下来了，并且我也把示例给添加进来，还多加了一个动态模块示例，但是src目录我是没有复制过来，因为那是我们接下来要写的东西。关于vuex的架构搭建部分我暂时不分析,不过可以大致简单给大家介绍一下每一个目录所代表的意思。

* .circleci目录——前端项目自动部署的配置
* .github——github配置
* dist——打包后的js
* docs——官方文档（vuepress）
* docs-gitbook——gitbook搭建的官方文档
* examples——使用示例
* scripts——打包构建文件
* src——vuex源码
* test——测试目录
* types——typescript类型定义
* .babelrc——babel配置文件
* .eslintrc.json——eslint配置文件
* .gitignore——git提交忽略的配置文件
* CHANGELOG——更新日志文件
* jest.config.js——jest测试框架的配置文件
* LICENSE——许可证
* package.json——依赖配置文件
* README.md——介绍文档
* rollup.config.js——rollup打包基本配置文件
* rollup.logger.config.js——rollup打包打印调试的配置文件
* rollup.main.config.js——rollup打包的主要配置文件(这里是区分模块化各个打包的配置)

## 实现注册

首先我们来看第一步，如何实现一个vuex的注册？事实上我们前面已经分析过了，我们是创建一个store实例，然后通过混入到vue中就实现了vuex的注册。

```js
// 定义一个全局变量，获取Vue对象
let Vue;
function install(_Vue){
    if(Vue && _Vue === Vue){
       //则代表初始化了很多次vuex，只需要初始化一次，即Vue.use(Vuex);
       console.error("[vuex] already installed. Vue.use(Vuex) should be called only once.");
    }
    // 赋值
    Vue = _Vue;
    // 混入
    applyMixin(Vue);
}
function applyMixin(Vue){
  // 获取版本号，因为只有2.X才会有Vue.mixin方法
  // Vue版本号结构类似2.0.1
  const version = Number(Vue.version.split(".")[0]);
  // 判断版本号
  if(version >= 2){
    // 在beforeCreate生命周期中注入
    Vue.mixin({ beforeCreate:VuexInit })
  }else{
      // 1.X版本的实际上是重写Vue原型上的_init方法
      // 根据这里我们也能正确的推导出Vue.mixin方法的实现
      const _init = Vue.prototype._init;
      Vue.prototype._init = function(options = {}){
        //  如果存在init属性则将VuexInit方法合并到属性中，否则直接返回VuexInit方法
        options.init = options.init ? [VuexInit].concat(options.init) : VuexInit;
        // 重新调用
        _init.call(this,options);
      }
  }
}
/*
* Vuex初始化，实际上就是将$store绑定到vue实例上
*/
function VuexInit(){
  // 获取$options
  const options = this.$options;
  // 判断options对象上是否含有store属性
  // 否则找父级上是否有$store属性
  if(options.store){
    // 判断store是否是一个函数
    this.$store = typeof options.store === "function" ? options.store() : options.store;
  }else if(options.parent && options.parent.$store){
    // 这行代码保证了所有的store实例都是同一个store实例，因为store实例按照架构思想本身就被定义成全局实例
    this.$store = options.parent.$store;
  }
}
```

## 实现响应式

第一步我们就算是完成了，接下来我们再来看一下响应式的实现，首先我们需要定义一个Store类。其次我们脑海里想想，如果让我们实现这样一个类，它的状态是响应式的，那么我们应该如何做？试想一下，Vue的data对象就是一个响应式对象，那么我们为什么不可以借助这个响应式对象来实现呢？所以，我们可以将store的state存储到Vue实例的data对象上作为一个属性。如此一来，我们就实现了store的响应式。

```js
let __DEV__ = true;
class Store {
    // 配置对象
    constructor(options = {}) {
        //  判断用户如果使用cdn引入了Vue，则代表window对象上有Vue，所以我们就重新install一下Vue，也就是重新初始化
        // 这也就代表如果用户是直接引入的vuex.js，我们无需使用Vue.use方法初始化vuex
        if (!Vue && typeof window !== "undefined" && window.Vue) {
            install(window.Vue);
        }
        // 接下来也是一些错误的提示,这时我们需要定义一个工具方法assert
        // __DEV__变量定义在rollup.config.js中
        // config.format !== 'umd' && !config.browser
        // ? `(process.env.NODE_ENV !== 'production')`
        // : config.env !== 'production'
        // 也就是说如果不是umd模式并且不是浏览器环境中，并且是开发环境，该值就为true，这里我们就暂定它为true就行了
        if (__DEV__) {
            // 在创建store实例之前需要调用Vue.use(Vuex)方法
            assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`);
            // 如果不存在Promise，则需要一个Promise的兼容实现
            assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`);
            // Store必须是通过new来实例化
            assert(this instanceof Store, `store must be called with the new operator.`);
        }
        //  从属性对象中拿到插件，以及是否在严格模式下,拿不到则赋一个默认值，插件为空数组，默认非严格模式
        const { plugins = [], strict = false } = options;
        //  store实例内部的一些状态,为了区分是内部私有属性，全部都加_
        this._committing = false;//是否处于提交状态
        // actions与actions订阅者
        this._actions = createObj();
        this._actionsSubscribers = [];
        // mutations
        this._mutations = createObj();
        // getters
        this._wrapperGetters = createObj();
        //modules与modulesNameSpace
        // modules是一个类，所以需要实例化,后面会分析到这一个类
        this._modules = new ModuleCollection();
        // modules的命名空间
        this._modulesNamespaceMap = createObj();
        // mutation的订阅者
        this._subscribers = [];
        // 一个空的Vue实例
        this._watcherVM = new Vue();
        // 当前的getter的一个缓存
        this._makeWrapperGettersCache = createObj();
        // 获取当前执行上下文以及执行上下文中的提交与分发函数属性，然后做一次绑定
        const store = this;
        const { dispatch, commit } = this;
        // 绑定分发函数
        // 注意参数
        // 我们在使用dispatch方法做分发的时候，应该知道我们是如何使用的类似如下
        // this.$store.dispatch("addCount",{ count:10 });
        // 因此我们知道了第一个参数就分发函数名，第二个就是一个分发方法的载荷
        // 详见使用文档:https://vuex.vuejs.org/zh/api/#dispatch
        this.dispatch = function boundDispatch(type, payload) {
            // 做一次绑定，是为了防止用户使用的this指向不对
            return dispatch.call(store, type, payload);
        }
        // 绑定提交函数,注意提交方法的参数，详见文档:https://vuex.vuejs.org/zh/api/#commit
        this.commit = function boundCommit(type, payload, options) {
            // 原因同dispatch
            return commit.call(store, type, payload, options);
        }
        // 设置严格模式
        this.strict = strict;
        // 拿到模块的根状态
        const state = this._modules.root.state;
        // 初始化根模块
        // 这个方法同样也会注册模块的所有子模块
        // 并且在this._wrapperGetters里收集所有的模块getters，也就是模块的计算属性
        // 4个参数，当前store实例，模块的根状态，一个空数组以及根模块,空数组应该是所有子模块的名字，可以使一个或者多个，这里传空数组，代表是多个
        // 这里后续分析
        installModule(this,state,[],this._modules.root);
        // 这一步骤要分析的最重要的一步，也就是初始化一个store实例，让store实例中的state变成响应式，同时也会注册getter
        // 2个参数，当前store实例与状态
        resetStoreVM(this,state);
        // 调用插件
        plugins.forEach(plugin => plugin(this));
        // 使用vue devtools
        const useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
        if(useDevtools){
           devToolPlugin(this,state);
        }
    }
    dispatch() {
       //这里省略了代码，后续分析
    }
    commit() {
       //这里省略了代码，后续分析
    }
    // 开发小技巧，用于判断函数是否调用完成
    _withCommit(fn){
       const committing = this._committing;
       this._committing = true;
       fn();
       this._committing = committing;
    }
}
// 先写一个类结构
class ModuleCollection {
    constructor(){
      //省略了代码
    }
}
// 2个参数，第一个是判断条件，第二个则是提示信息
function assert(condition,msg){
   if(!condition)throw new Error(`[Vuex] ${ msg }`);
}
function createObj(params = null){
   return Object.create(params);
}
// 先写一个结构
function installModule(store,rootState,path,module,hot){
  // 这里省略了代码，后续分析
}
function devToolPlugin(store,state){
  // 这里省略了代码，后续分析
}
function resetStoreVM(store,state){
    // 拿到旧的Vue实例,_vm属性
    const oldVM = store._vm;
    // 绑定getters，实际上也就是初始化getters
    store.getters = {};
    // 重置缓存的getters
    store._makeWrapperGettersCache = createObj();
    // 获取getters，遍历getters，为每一个getters添加一个getter函数
    const wrapperGetters = store._wrapperGetters;
    const computed = {};
    // forEachValue为内部实现的一个遍历对象值的迭代器函数
    forEachValue(wrapperGetters,function(fn,key){
        //通过一个闭包缓存store在作用域中
        computed[key] = partial(fn,store);
        // 使用Object.defineProperty添加getter
        Object.defineProperty(store.getters,key,{
           get:() => store._vm[key],
           enumerable:true
        })
    })
    // 使用Vue实例来存储store，为了以防用户添加全局mixin，开启vue的警告
    const silent = Vue.config.silent;
    Vue.config.silent = true;
    store._vm = new Vue({
        data:{
           $$state:state
        },
        computed
    });
    // 如果是严格模式，则添加一个监听
    if(store.strict){
      enableStrictMode(store);
    }
    // 当存在旧的Vue实例，并且已经热更新了，就删除这个旧实例，并且重置状态，将重置状态分发给所有的子watcher
    if(oldVM){
      if(hot){
         store._withCommit(() => {
            // 为了区分用户定义state重复，特意加2个$$
            oldVM.$store.$$state = null;
         })
      }
      // 移除Vue实例
      Vue.nextTick(() => oldVM.$destroy());
    }
}
function enableStrictMode(store){
   store._vm.$watch(function() { return this._data.$$state },() => {
      //监听无非就是判断如果store被提交了，则表示用户在mutation 处理器之外提交，这是不被允许的
      // 有一疑点是为什么要在严格模式下才监听并给出错误提示?
      // 因为性能问题，deep设为true，则代表对象会深度递归监听，这种操作很影响性能
      // 参考文档:https://vuex.vuejs.org/zh/guide/strict.html
      if(__DEV__){
         assert(store._committing,`do not mutate vuex store state outside mutation handlers.`);
      }
   },{ deep:true,sync:true});
}
function forEachValue(obj,fn){
  Object.keys(obj).forEach(key => fn(obj[key],key));
}
function partial(fn,args){
  return function(){
     return fn(args);
  }
}
```


## 实现模块

### 静态模块

到目前为止，我们第二步实现数据的响应式也已经完成，接下来我们来实现第三步。实现vuex的getter与setter，事实上，我们在第二步当中就已经实现了getter，无非就是利用了vue实例的computed来实现。但是我们还要额外的实现getter的一些辅助函数，比如getter的注册等,但是这要结合模块等一起实现，所以我们还是先来实现模块吧。
我们都知道每个模块也都可以包含state,mutations,actions,getters，因此，模块我们可以单独创建一个类来管理。为什么要出现这个模块的功能？根据[文档](https://vuex.vuejs.org/zh/guide/modules.html)中描述，当一个store管理太多的state,mutations,actions,getters,这个store会变的十分庞大而且看起来有些臃肿或者说看起来比较复杂，而为了解决这个问题，我们就可以将store分割成多个子store，如此一来，modules也就被发明了出来。

模块我们可以分为2个部分，第一个部分为静态模块，也就是说我们直接在modules对象中写一个模块，而另一个部分就是动态模块，也就是我们可以通过一个注册模块的函数来创建一个动态模块。为此，我们需要有2个类来分别管理静态模块与动态模块的功能，取名为module与moduleCollection。让我们先来看看静态模块。

模块我们应该如何定义呢？请看一个结构:

```js
// 根模块
 const rootModule = {
   modules:{
    //  子模块
     childrenModule:{}
   }
 };
 new Vuex.Store(rootModule);
```

根据以上代码，我们不难得出传进store实例的配置对象，我们给它取一个好听的名字，它就叫做根模块，既然有根模块也就有根状态，有根模块也就有子模块。所以一个模块的需要定义的属性我们就确定了，子模块与根状态。

> 注:这里还有一点，为了区分模块，我们还需要给模块添加一个标志属性，取名runtime。

现在，我们也就知道了，我们需要初始化哪些东西，子模块，标志属性，根状态，请看如下代码:

```js
// 模块类有2个参数，第一个是一个根模块，第二个是为模块添加的一个布尔标志，方便后续做一些操作
class Module {
  constructor(rawModule,runtime){
    // 每一个模块独特的标志，在模块的注销与注册当中会用到，如果子模块没有这个值，则代表子模块无需注销，所以也就停止注销
    // 往下继续看就会明白了
    this.runtime = runtime;
    // 初始化子模块
    this._children = createObj();
    // 初始化根模块
    this._rawModule = rawModule;
    // 获取根状态并初始化
    const rawState = rawModule.state;
    // rawState可能会是一个函数，也有可能是一个对象，如果不是这两者就初始化一个空对象
    this.state = (typeof rawState === 'function' ? rawState() : rawState) : {};
  }
  //后续代码
}
```

模块类的初始化算是完成了，接下来我们需要往模块中注入一些私有方法，例如添加模块，删除模块，查询模块，修改模块，判断根模块中是否含有模块。还会添加一个是否开启命名空间[命名空间](https://vuex.vuejs.org/zh/guide/modules.html#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4)的属性。然后就是循环遍历模块的函数，比如遍历子模块，遍历getter，遍历actions,遍历mutations,还记得之前封装过的`forEachValue`工具函数吗?现在我们在后续代码中继续编写吧。

```js
class Module {
  // constructor部分已省略
  // get访问器访问namespaced配置属性
  get namespaced(){
    return this._rawModule.namespaced;
  }
  // 添加模块,2个参数,模块名以及模块对象
  addChild(key,module){
    return this._children[key] = module;
  }
  // 查询模块
  getChild(key){
    return this._children[key];
  }
  // 删除模块
  removeChild(key){
    delete this._children[key];
  }
  // 判断是否含有子模块
  hasChild(key){
    return key in this._children;
  }
  // 更新模块,传入根模块作为参数
  update(rawModule){
    // 更新实际上就是做一次重新赋值
    this._rawModule.namespaced = rawModule.namespaced;
    // 更新getters
    if(rawModule.getters){
      this._rawModule.getters = rawModule.getters;
    }
    // 更新actions
    if(rawModule.actions){
      this._rawModule.actions = rawModule.actions;
    }
    // 更新mutations
    if(rawModule.mutations){
      this._rawModule.mutations = rawModule.mutations;
    }
  }
  // 循环遍历部分
  // 循环遍历子模块
  forEachChild(fn){
     forEachValue(this._children,fn);
  }
  // 遍历getters
  forEachGetter(fn){
    if(this._rawModule.getters){
       forEachValue(this._rawModule.getters,fn)
    }
  }
  // 遍历actions
  forEachAction(fn){
    if(this._rawModule.actions){
       forEachValue(this._rawModule.actions,fn)
    }
  }
  // 遍历mutations
  forEachMutation(fn){
    if(this._rawModule.mutations){
       forEachValue(this._rawModule.mutations,fn)
    }
  }
}
```

### 动态模块

到目前为止，我们的模块类就算是完成了。接下来我们继续，前面我们讲到的模块是静态模块，试想，有静态就有动态，我们是否可以创建一个动态模块呢？比如说我们创建一个叫做`nested`的模块，然后我们就可以拿到这个动态模块的状态。对于动态模块，我们需要知道它一定有注册与卸载，为了知道这个模块是否被注册了，我们需要添加一个判断是否注册的工具函数，是吧！我们创建一个动态模块，无非是根据模块名，也就是一个字符串值来创建，这个字符串值我们称之为path，也就是访问动态模块的一个路径。关于动态模块注册的作用，我们来看看[文档](https://vuex.vuejs.org/zh/guide/modules.html#%E6%A8%A1%E5%9D%97%E5%8A%A8%E6%80%81%E6%B3%A8%E5%86%8C)中是怎么说明的。为此，我们需要创建一个动态模块类，取名为`moduleCollection`。

再次思考一下，我们需要在动态模块类需要做什么?我们创建一个动态模块是不是需要一个容器或者可以说是载体之类的东西，这个容器或者载体我们以面向对象的编程思维把它当做一个对象，用这个对象来表示它，就像Vue组件一样始终都会有一个根元素，所以这里我们也需要有一个根模块的东西。好的，请看如下代码:

```js 
class moduleCollection {
  constructor(rawModule){
     //在根模块中注册动态模块
    //  注册方法我们需要注意参数，第一个是注册的模块路径，第二个则是根模块，第三个为每一个模块所添加的一个标志
     this.register([],rawModule,false)
  }
  // 注册动态模块函数
  register(path,rawModule,runtime = true){
    //后续代码
  }
}
```

根据以上代码，我们注意到了注册一个模块的参数，首先第一个参数是我们需要注册的动态模块名称所组成的数组，第二个参数则是一个根模块，第三个参数也是我们前面所说的一个标志，这在我们卸载动态模块时会用到。现在我们再想想，我们要注册一个模块首先需要做什么?我们是不是需要先对所注册的模块做一些验证？如下:


```js
 register(path,rawModule,runtime = true){
    if(__DEV__){
       //验证动态模块，传入path与根模块
       assertRawModule(path,rawModule);
    }
 }
```

我们先不着急实现`assertRawModule`方法，我们先再想一下一个模块应该包含哪些东西。

我们不难知道一个模块应该包含state,getters,actions,mutations,而state我们无需做一些验证判断，可是其它三项就必须要做一些约定了，也就是说这三者里面定义的都必须是函数或对象。现在让我们添加一些工具函数来完善这个验证吧。

```js
//函数约定规则
const functionAssert = {
    //约定规则条件
    assert:v => typeof v === 'function',
    //给出错误提示的期待值
    expected:"function"
};
//对象约定规则
const objectAssert = {
   //约定规则条件
   assert:v => typeof v === 'function' || (typeof v === 'object' && typeof v.handler === 'function'),
   //给出错误提示的期待值
   expected:'function or object with "handler" function'
}
const assertTypes = {
    //规定getters必须是函数
    getters:functionAssert,
    //规定同步更改状态的方式也应该是函数
    mutations:functionAssert,
    //规定异步更改状态的方式是函数或者一个包含回调函数的对象
    actions:objectAssert
}
```

添加了以上的约定之后，现在我们再来看一下`assertRawModule`的实现。我们前面已经说明了这个方法就是验证用户使用的方式是否正确，如果不正确就会给出错误提示。比如我在这里写了一个简单的动态模块实例，我们来看一下。

好了示例展示完成，我们回到这里。

```js
function assertRawModule(path,rawModule){
  //我们通过Object.keys方法拿到key,然后判断根模块中是否有这些配置，如果没有直接就不需要验证了
  //key无非指的就是getters,actions,mutations这三个
  Object.keys(assertTypes).forEach(key => {
     if(!rawModule[key])return;
     //拿到我们之前写的验证配置
     const assertOptions = assertTypes[key];
     //遍历对象
     forEachValue(rawModule[key],(value,type) => {
        //调用assert方法给出提示，assert已经在前面定义了
        //value为对象属性值，type为对象属性名
        assert(
          assertOptions.assert(value),
          //注意这里又添加了一个工具方法，即制造错误提示信息的方法
          //参数有点多，模块，模块配置属性，根模块配置属性，根模块配置属性值，约定的期待值
          makeAssertionMessage(path,key,type,value,assertOptions.expected)
        )
     })
  })
}
```

接下来，让我们来看一下`makeAssertionMessage`，无非就是生成一些提示信息，没什么好说的。

```js
function makeAssertionMessage(path,key,type,value,expected){
  //这里的字符串拼接很有意思
  let buf = `${key} should be ${expected} but "${key}.${type}"`;
  //多个配置项
  if(path.length > 0){
    buf += ` in module "${path.join('.')}"`;
  }
  buf += ` is ${JSON.stringify(value)}.`
  return buf;
}
```

验证总算是大功告成了。让我们继续回到`register`方法。验证代码完成之后，接下来的一步我们就需要实例化模块，然后判断如果path没有传，或者传入为空，就创建根模块，否则是创建子模块。

```js
 get(path){
   return path.reduce((module,key) => {
     //通过遍历传入的模块名数组，去根模块中拿到对应模块名的子模块
     return module.getChild(key);
   },this.root);
 }
 getNameSpace(path){
   //拿到根模块
   let module = this.root;
   return path.reduce((namespace,key) => {
     module = module.getChild(key);
     //这里实际上是对模块名做一次修改，如果开启了命名空间选项，即namespaced:true
     return namespace + (module.namespaced ? key + "/" : "")
   },'');
 }
 register(path,rawModule,runtime = true){
    //省略了验证
    //既然要注册模块，肯定要实例化之前已经定义好的模块类
    const newModule = new Module(rawModule,runtime);
    if(path.length === 0){
      //将根模块绑定到root属性上
      this.root = newModule;
    }else{
       //这一块的实现，个人认为还是有问题的
      //这里的逻辑就是从根模块中根据传入的模块名拿到子模块，然后往父模块的_children中添加新的子模块
      //与之相对应的则有获取命名空间的模块
       const parent = this.get(path.slice(0,-1));
       parent.addChild(path[path.length - 1],newModule);
    }
    //注册嵌套模块
    if(rawModules.modules){
      //循环遍历根模块的模块选项，然后递归去为每一个模块添加嵌套模块
      forEachValue(rawModules.modules,(rawChildModule,key) => {
        //嵌套模块名做一次合并
        this.register(path.concat(key),rawChildModule,runtime);
      })
    }
 }
```

有注册就有卸载，现在我们来实现以下模块的下载方法。

```js
  unregister(path){
     //父模块
     const parent = this.get(path.slice(0,-1));
     //子模块的模块名
     const key = path[path.length - 1];
     //拿到子模块
     const child = parent.getChild(key);
     //如果获取子模块失败，则会给出错误提示，说模块未注册
     if(!child){
       if (__DEV__) {
        console.warn(
          `[vuex] trying to unregister module '${key}', which is ` +
          `not registered`
        )
      }
      return
     }
     if(!child.runtime){
       return;
     }
     //这里才是卸载的核心代码
     parent.removeChild(key);
  }
```
现在，我们可以试想一下，如何判断模块有没有注册呢？它的实现还是很简单的，就是根据模块名拿到父模块，然后判断父模块中是否含有子模块即可判断。

```js
isRegistered(path){
   const parent = this.get(path.slice(0,-1));
   const key = path[path.length - 1];

   if(parent){
     //实际上也就是判断_children对象中是否含有对应的属性
     parent.hasChild(key);
   }
   return false;
}
```

最后，也就是动态模块的最后一步，更新操作。我们来实现一下:

```js
update(rawRootModule){
   update([],this.root,rawRootModule);
}
function update(path,targetModule,newModule){
  //更新之前也需要验证一下传入的模块
   if(__DEV__){
     assertRawModule(path,newModule);
   }
   //更新当前模块
   targetModule.update(newModule);
   //判断是否有modules选项，有就递归更新
   if(newModule.modules){
     for(const key in newModule.modules){
       if(!targetModule.getChild(key)){
          if(__DEV__){
            console.warn(
              `[vuex] trying to add a new module '${key}' on hot reloading, ` +
              'manual reload is needed'
            );
            return;
          }
       }
       //一层一层的去更新
       update(path.concat(key),targetModule.getChild(key),newModule.modules[key]);
     }
   }
}
```

模块的动态注册到这里就算是结束了。接下来我们还需要完善store类里的实例方法以及一些辅助方法，让我们继续。

## 完善静态模块的注册方法

我们来看看在store当中是如何注册静态模块的，也就是`installModule`这个方法。

```js

function installModule (store, rootState, path, module, hot) {
  //是否含有模块
  const isRoot = !path.length
  // 获取命名空间
  const namespace = store._modules.getNamespace(path)

  if (module.namespaced) {
    //重复的命名空间
    if (store._modulesNamespaceMap[namespace] && __DEV__) {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    store._modulesNamespaceMap[namespace] = module
  }

  if (!isRoot && !hot) {
    //父级状态
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      //更新状态
      Vue.set(parentState, moduleName, module.state)
    })
  }
  
  //这里应该是拿到缓存的store对象
  const local = module.context = makeLocalContext(store, namespace, path)
  
  //循环遍历并注册mutations,actions,modules与getters
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
function getNestedState (state, path) {
  //拿到嵌套模块的状态与状态值
  return path.reduce((state, key) => state[key], state)
}
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }
  //这里实际上就是一个状态的缓存
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
function makeLocalGetters (store, namespace) {
  //这里很明显是缓存getters
  if (!store._makeLocalGettersCache[namespace]) {
    const gettersProxy = {}
    const splitPos = namespace.length
    Object.keys(store.getters).forEach(type => {
      if (type.slice(0, splitPos) !== namespace) return

      const localType = type.slice(splitPos)

      Object.defineProperty(gettersProxy, localType, {
        get: () => store.getters[type],
        enumerable: true
      })
    })
    store._makeLocalGettersCache[namespace] = gettersProxy
  }

  return store._makeLocalGettersCache[namespace]
}
function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  if (__DEV__) {
    assert(typeof type === 'string', `expects string as the type, but found ${typeof type}.`)
  }

  return { type, payload, options }
}
function registerMutation (store, type, handler, local) {
  //注册mutations就是拿到实例上所定义的mutations方法，然后调用提供的回调函数
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
function registerAction (store, type, handler, local) {
  //这里的思路与mutations是差不多的，区别无非是返回了一个promise
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```

## store实例的重置

静态模块的注册非常复杂，也做了很多拆分，但是细分下来，也还是很好理解的。接下来我们来看如何重置store。

```js
function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // 初始化所有的modules
  installModule(store, state, [], store._modules.root, true)
  //初始化当前vue实例
  resetStoreVM(store, state, hot)
}
```

## 完善store实例方法

好的，在Store当中，我们还需要扩展一些方法，并且我们还有对state做一层get和set。如下:

```js
class Store {
   constructor(){
     //省略了代码
   }
   //获取state
  get state () {
    return this._vm._data.$$state
  }
   //不能这样设置state
  set state (v) {
    if (__DEV__) {
      assert(false, `use store.replaceState() to explicit replace store state.`)
    }
  }
  //替换状态
  replaceState (state) {
    this._withCommit(() => {
      this._vm._data.$$state = state
    })
  }
  //监听函数
  watch (getter, cb, options) {
    if (__DEV__) {
      assert(typeof getter === 'function', `store.watch only accepts a function.`)
    }
    return this._watcherVM.$watch(() => getter(this.state, this.getters), cb, options)
  }
  //判断是否模块被注册
  hasModule (path) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    return this._modules.isRegistered(path)
  }
 //热更新
  hotUpdate (newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  }
  //提交
  commit (_type, _payload, _options) {
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })

    this._subscribers.slice() .forEach(sub => sub(mutation, this.state))

    if (__DEV__ && options && options.silent) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
      )
    }
  }
  //分发
  dispatch (_type, _payload) {
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }

    try {
      this._actionSubscribers.slice().filter(sub => sub.before).forEach(sub => sub.before(action, this.state))
    } catch (e) {
      if (__DEV__) {
        console.warn(`[vuex] error in before action subscribers: `)
        console.error(e)
      }
    }

    const result = entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)

    return new Promise((resolve, reject) => {
      result.then(res => {
        try {
          this._actionSubscribers.filter(sub => sub.after).forEach(sub => sub.after(action, this.state))
        } catch (e) {
          if (__DEV__) {
            console.warn(`[vuex] error in after action subscribers: `)
            console.error(e)
          }
        }
        resolve(res)
      }, error => {
        try {
          this._actionSubscribers.filter(sub => sub.error).forEach(sub => sub.error(action, this.state, error))
        } catch (e) {
          if (__DEV__) {
            console.warn(`[vuex] error in error action subscribers: `)
            console.error(e)
          }
        }
        reject(error)
      })
    })
  }
  
  subscribe (fn, options) {
    return genericSubscribe(fn, this._subscribers, options)
  }
  //从用法上来理解
  subscribeAction (fn, options) {
    const subs = typeof fn === 'function' ? { before: fn } : fn
    return genericSubscribe(subs, this._actionSubscribers, options)
  }
}
```

接下来还有一个辅助方法。即:

```js
function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn)
  }
  return () => {
    const i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
}
```

## vuex工具方法

最后，我们需要实现vuex的一些辅助方法。比如mapState,mapGetter等。如下:

```js

const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  if (__DEV__ && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState () {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    res[key].vuex = true
  })
  return res
})

const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  if (__DEV__ && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation (...args) {
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace)
        if (!module) {
          return
        }
        commit = module.context.commit
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})


const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  if (__DEV__ && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (__DEV__ && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    res[key].vuex = true
  })
  return res
})

const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  if (__DEV__ && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object')
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
//创建辅助函数
const createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
})
//规范化数据结构
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
// 判断是否是一个正确的map数据结构
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}
//对命名空间的规范化处理
function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}
// 通过命名空间获取module
function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (__DEV__ && !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}

```

## 辅助工具方法

一些工具方法如下:

```js
//判断是否是一个对象
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
// 判断是否是一个promise
function isPromise (val) {
  return val && typeof val.then === 'function'
}
// 深度复制对象
function deepCopy (obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  //找到第一项
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,//缓存存的原始对象
    copy,//复制过后的对象
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
// 找到第一项
function find (list, f) {
  return list.filter(f)[0]
}
```

到此为止，vuex的核心原理解析就结束了。

