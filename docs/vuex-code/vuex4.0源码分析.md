# vuex4.0源码分析

vuex4.0与vuex3.0核心原理都是差不多，区别在于vuex4.0将vuex通过导出一个`createStore`函数。我们来看一下:

```js
export function createStore (options) {
  return new Store(options)
}
```

除此之外，vuex4.0还提供了一个`useStore`方法。

```js
import { inject } from 'vue'

export const storeKey = 'store'

//inject方法获取集成到vue实例中的store实例，key可以是store，也可以是自己集成自定义的store实例的名称
export function useStore (key = null) {
  return inject(key !== null ? key : storeKey)
}
```

除了这些外，就是一些核心的api变更，比如watch方法可以直接从vue中引入，而不需要`store._vm.$watch`这样使用，其它就没有什么呢。