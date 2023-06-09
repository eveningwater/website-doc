const docDetail = {
    html: {
      title: 'html文档',
      subTitle: '',
      icon: './images/html-icon.png',
      content: { nav: 'html/nav.json', detail: 'html' }
    },
    css: {
      title: 'css文档',
      subTitle: '',
      icon: './images/css-icon.png',
      content: { nav: 'css/nav.json', detail: 'css' }
    },
    javascript: {
      title: 'javascript文档',
      subTitle: '',
      icon: './images/javascript-icon.png',
      content: { nav: 'javascript/nav.json', detail: 'javascript' }
    },
    'vuex-code': {
      title: 'vuex源码分析文档',
      icon: './images/vuex-icon.png',
      subTitle: '',
      content: { nav: 'vuex-code/nav.json', detail: 'vuex-code' }
    },
    'mini-vue': {
      title: 'mini-vue实现文档',
      subTitle: '',
      icon: './images/vuex-icon.png',
      content: { nav: 'mini-vue/nav.json', detail: 'mini-vue' }
    },
    'mini-compiler': {
      title: 'mini-compiler实现文档',
      subTitle: '',
      icon: './images/compiler-icon.png',
      content: { nav: 'mini-compiler/nav.json', detail: 'mini-compiler' }
    },
    'effective-javascript': {
      title: 'effective-javascript文档',
      subTitle: '(编写高质量javascript的68个有效方法)',
      icon: './images/javascript-icon.png',
      content: {
        nav: 'effective-javascript/nav.json',
        detail: 'effective-javascript'
      }
    },
    flutter: {
      title: 'flutter文档',
      subTitle: '',
      icon: './images/flutter-icon.png',
      content: { nav: 'flutter/nav.json', detail: 'flutter' }
    },
    browser: {
      title: '浏览器工作原理与实践文档',
      subTitle: '',
      icon: './images/browser-icon.png',
      content: { nav: 'browser/nav.json', detail: 'browser' }
    },
    regexp: {
      title: '深入浅出正则表达式',
      subTitle: '',
      icon: './images/regexp-icon.png',
      content: { nav: 'regexp/nav.json', detail: 'regexp' }
    },
    nodeDevops: {
      title: '基于 Node 的 DevOps 实战',
      subTitle: '',
      icon: './images/nodeDevops-icon.png',
      content: { nav: 'nodeDevops/nav.json', detail: 'nodeDevops' }
    },
    im: {
      title: '分布式IM原理与实战: 从0到1打造即时通讯云',
      subTitle: '',
      icon: './images/im-icon.png',
      content: { nav: 'im/nav.json', detail: 'im' }
    },
    vueDesignImplement: {
      title: 'Vue.js设计与实现',
      subTitle: '',
      icon: './images/vue-design-implement-icon.png',
      content: {
        nav: 'vueDesignImplement/nav.json',
        detail: 'vueDesignImplement'
      }
    }
  },
  __DEV__ = !1,
  allDocs = Object.keys(docDetail),
  defaultDoc = allDocs.slice(0, 1),
  defaultChapter = 0;
