# HTML超链接

## 超链接的定义

经常逛网页的人应该会看到,如果一个按钮或者文本能够被点击,而且点击了之后还会跳转到另一个页面,或者说是弹出一个弹出框,又或者是打开邮件,打开图片,打开音频资源等等,所用到的html标签就叫超链接。(虽然超链接的效果可以使用js加其它标签来实现,但是这里主要是说html标签)。当然图片也可以被设置成超链接。而且超链接里面可以包含任何类型的html标签以及内容。如:

```html
<a href="https://www.eveningwater.com/static/resouces/audio/3.mp3">今生、他生-陈启泰</a>
<a href="https://v.qq.com/txp/iframe/player.html?vid=x1326h72ze5">视频</a>
<a href="https://www.eveningwater.com/my-web-projects/js/26/img/10.jpg">美女</a>
<a href="mailto:854806732@qq.com">邮箱</a>
<a href="https://www.eveningwater.com">夕水的个人网页</a>
```

以上[示例](./docs/html/html/html-code-5-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-1.html"></iframe>

从以上的示例，我们可以看出，超链接实际上就是一个`<a>`标签。并且这个标签默认会加下划线，字体颜色为蓝色，而且它还有一个href属性,这个属性表示要跳转的url。

## 超链接的target属性

除了href属性之外,超链接还有一个属性target,它指定超链接是以何种方式进行跳转。 主要有四个值:

* _blank: 在一个新的标签页或窗口中打开。
* _self: 在当前浏览器窗口打开。
* _parent: 在子窗口的父窗口中打开。
* _top: 在窗口的顶层中打开。

让我们将以上的示例加上这个属性看看。

```html
<a href="https://www.eveningwater.com/static/resouces/audio/3.mp3" target="_blank">今生、他生-陈启泰</a>
<a href="https://v.qq.com/txp/iframe/player.html?vid=x1326h72ze5" target="_self">视频</a>
<a href="https://www.eveningwater.com/my-web-projects/js/26/img/10.jpg" target="_parent">美女</a>
<a href="mailto:854806732@qq.com">邮箱</a>
<a href="https://www.eveningwater.com" target="_top">夕水的个人网页</a>
```

以上[示例](./docs/html/html/html-code-5-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-2.html"></iframe>

## 图片超链接

本质上图片超链接就是`<a>`标签里添加一个`<img>`标签而已，让我们来看一个图片链接的示例:

```html
<a href="https://www.eveningwater.com" target="_top">
    <img src="https://www.eveningwater.com/my-web-projects/CSS/4/img/testImg-01.jpg" alt="图片链接" width="45" height="45" />
</a>
```

以上[示例](./docs/html/html/html-code-5-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-3.html"></iframe>

## 超链接实现锚点

超链接还可以设置指定跳转的锚点,就是通过指定href属性的值为一个元素的id属性的值。 如下一个示例(核心的代码):

```html
<a href="#chapter-1">第一章:抢劫</a>
<a href="#chapter-2">第二章:初到林家</a>
```

以上[示例](./docs/html/html/html-code-5-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-4.html"></iframe>

也就是说,只要我们点击href属性值与页面内id属性值相同的超链接的时候,页面会自动跳到id属性值与href属性值相同的对应元素的位置上。例如,以上我们点击#chapter-1的时候,就会跳到第一章的内容上。

## 超链接实现下载文件

超链接还可以实现下载指定的文件。如下例:

```html
<a href="../images/img-distortion.jpg" download="1" >下载图片</a>
```

以上[示例](./docs/html/html/html-code-5-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-5.html"></iframe>

当我们点击下载图片的时候,就会给我们自动下载一张图片。也就是说,我们只需要为超链接的href 属性指定为一张图片的路径，然后加上download属性即可。

> 注意: download属性的值表示的就是你要下载的文件名。

除此之外,href属性值不能指定为服务器上的图片路径,如果指定的是服务器上的路径,那么只会打开该图片,而不会下载。如下例所示:

```html
<a href="https://www.eveningwater.com/my-web-projects/js/26/img/7.jpg" download="7" >下载图片</a>
```

以上[示例](./docs/html/html/html-code-5-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-6.html"></iframe>

## 超链接实现回到顶部

超链接还可以实现页面回到顶部的效果，代码如下:

```html
<a href="#top">回到顶部</a>
```

通常是使用CSS控制这个按钮显示在页面右下角。另外如果使用这种方式,需要主要页面内的任何标签的id属性都不能设置为top,否则这个回到顶部功能就会失效。 还有这个回到顶部功能,不能对iframe标签的src内的属性指定的页面所产生的滚动条产生回到顶部的效果。另外后期使用JavaScript的ajax加载页面内容所产生滚动条的也不能产生效果, 因为这并不是body标签所产生的滚动条。所以如果出现这两种情况,就只能使用JavaScript去实现回到顶部按钮的功能呢。

我们来看如下的一个[示例](./docs/html/html/html-code-5-7.html):

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-7.html"></iframe>

## 超链接的rel属性

该属性规定当前文档与被链接文档之间的关系，仅当超链接中包含“href”属性时可用。在新的W3C规范当中，为该属性增加了一些用于在网络安全、隐私安全和搜索引擎优化（SEO）方面的属性值，使得该属性开始成为网页规范审核（Audits）中的一个必要项。

在新的<em class="hover-info" data-title="用于检查JavaScript编写的一种规范，一般可以作为代码编辑器插件在项目引入使用，而且这个规范是可以被开发者配置的">“JSHint”</em>规范中，如果超链接含有“target="_blank"”而没有“rel="noopener noreferrer"”这样的属性“JSHint”就会报出错误。该属性可以同时设置多个值，每个值中间用空格进行分割。目前可用的值有：

* alternate: 链接到文档的替代版本（例如打印页、翻译或镜像）。
* help: 链接到帮助文档。
* prev: 链接到集合中的上一个文档。
* next: 链接到集合中的下一个文档。
* archives: 链接到文档集或历史数据。
* author: 链接到文档的作者。
* bookmark: 用作书签的永久URL。
* external: 链接到外部文档。
* first: 链接到集合中的第一个文档。
* last: 链接到集合中最后一个文档。
* index: 链接到文档的索引。
* license: 链接到文档的版权信息。
* search: 链接到文档的搜索工具。
* sidebar: 链接到应该在浏览器边栏中显示的文档。
* tag: 当前文档的标签名。
* up: 提供指向一个文档的链接。该文档提供当前文档的上下文关系。
* <em class="hover-info" data-title="拥有特殊功能">no follow：</em>链接到未认可的文档，比如付费链接。现在，以Google为首的公司使用该值来规定其搜索引擎不跟踪该链接。
* <em class="hover-info" data-title="新规范推荐添加，拥有特殊功能">noopener：</em>阻止浏览器读取访问来源信息。可以用来防止<em class="hover-info" data-title="钓鱼网站是指欺骗用户的虚假网站。“钓鱼网站”的页面与真实网站界面基本一致，欺骗消费者或者窃取访问者提交的账号和密码信息。钓鱼网站一般只有一个或几个页面，和真实网站差别细微">“钓鱼网站”</em>利用安全漏洞来进行攻击。
* <em class="hover-info" data-title="新规范推荐添加，拥有特殊功能">noreferrer: </em> 阻止浏览器发送访问来源信息。

这个属性的大部分值是不被浏览器使用的，只是搜索引擎可以利用该属性获得更多有关链接的信息。而新规范中指出的“noopener”和“noreferrer”是在指定情况，即当超链接的“target”值为“_blank”的时候是必须使用的。

另外，升级到HTML第5版之后，原来版本的一些值已经被删除，由于不再被推荐使用只需要作了解即可。它们是：`appendix、chapter、contents、copyright、glossary、section、start、subsection`。

让我们来看一下加上这个属性的超链接是什么样的吧!

```html
<a href="https://www.eveningwater.com/" target="_blank" rel="noopener noreferrer">夕水的个人网页</a>
```

我们来看如下的一个[示例](./docs/html/html/html-code-5-8.html):

<iframe style="min-height:200px;" src="./docs/html/html/html-code-5-8.html"></iframe>