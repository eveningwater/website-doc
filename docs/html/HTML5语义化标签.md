# HTML5语义化标签

本章所描述的语义化标签严格意义上也归属上一章，都属于HTML5的实用性标签，只是因为这部分的标签更能够表达标签的含义，也就是所谓的语义化，因而单独总结成了一章。

## HTML5语义化标签介绍及优点

HTML5还提供了一系列语义化标签来帮助布局,使得页面结构更加清晰有层次。良好地使用语义化标签还能提升检索效率，对于新型的“<em class="hover-info" data-title="又称“网络爬虫”、“网页蜘蛛”、“网络机器人”等。是一种按照一定的规则，自动地抓取互联网信息的程序或者脚本。通常是搜索引擎抓取页面信息或数据搜集网站搜集数据所用技术">蜘蛛爬虫</em>”来说更友好。使用语义化标签的优点如下：

* 语义明确，增加代码可读性。
* 增加团队协作，避免歧义。
* 减少对ID或Class属性的依赖。
* 有利于SEO。
* 对移动设备更加友好，用户体验更佳。

在HTML的第5版本及后续的5.1版本规范发布后（目前最新的版本是5.3，于2019年11月22日记录，详见[HTML版本](https://www.w3.org/WebPlatform/WG/PubStatus#api)），涉及到语义化的标签主要有以下。

## `<header>`标签

该标签表示定义页面头部。通常包含网站<em class="hover-info" data-title="LOGOtype的缩写,是一种徽标或者商标">Logo</em>[详见](https://baike.baidu.com/item/logo/32134?fr=aladdin)、导航栏、用户名信息等。它在布局中的位置大致如下：

<iframe class="ew-transparent-iframe" src="./docs/html/other/layout/layout-header.html"></iframe>

## `<main>`标签

该标签表示定义页面主要内容，相当于是一个更内层的`<body>`标签。它在布局中的位置大致如下：

<iframe class="ew-transparent-iframe" src="./docs/html/other/layout/layout-main.html"></iframe>

## `<footer>`标签

该标签表示定义页面脚部。通常包含网站版权信息、友情链接、网站备案信息等。它在布局中的位置大致如下：

<iframe class="ew-transparent-iframe" src="./docs/html/other/layout/layout-footer.html"></iframe>

## `<aside>`标签

该标签表示定义页面内容之外的内容。通常是用于三列布局，右侧那一栏涉及到如：推荐文章、相关要闻、您可能感兴趣的、其他人在搜、排行榜之类的内容。它在布局中的位置大致如下：

<iframe class="ew-transparent-iframe" src="./docs/html/other/layout/layout-aside.html"></iframe>

## `<nav>`标签

该标签通常放置于`<header>`标签对以内。它的主要用于页面的导航列表，页面顶部主导航和左侧内容导航（左侧导航可以放置于`<main>`标签对以内，也可以单独放在外面）均可。它在布局中的位置大致如下：

<iframe class="ew-transparent-iframe" src="./docs/html/other/layout/layout-nav.html"></iframe>

## `<embed>`标签

它是一个单标签，即没有闭合标签，而且它是一个“行内元素”。该标签可用于嵌入图片（包括[GIF](https://baike.baidu.com/item/GIF/217778?fr=aladdin)动态图）、音频、视频、[Flash](https://baike.baidu.com/item/Flash/33054?fr=aladdin)（目前已进入废弃阶段）、插件、网页等内容，和`<iframe>`标签对的使用方式十分类似，但语义不同，它的可用属性如下：

* width：设置宽度。
* height：设置高度。
* src：设置URL地址。
* type：设置MIME类型。

来看如下一个示例:

```html
<!--这只是一个相对路径的图片地址-->
<embed width="400" height="183" type="image/gif" src="../images/little-white-rabbits.gif" />
<embed width="200" height="183" type="text/html" src="https://www.eveningwater.com/" />
```

以上[示例](./docs/html/html/html-code-12-1.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-12-1.html"></iframe>

## figure标签与figcaption标签

`<figure>`标签作为文档中的插图部分的容器使用，而`<figcaption>`是`<figure>`标签的子标签，它通常和img是同级关系，作用为“<em class="hover-info" data-title="或称作“图片标题”、“图注”、“图片说明”等">图片注解</em>”。请看如下一个示例:

```html
<figure>
    <!--这只是一个相对路径的图片地址-->                    
    <img src="../images/calliopsis.jpg" alt="波斯菊加载中" title="花丛里的波斯菊" />
    <figcaption>不论平原与山巅，终日奔往未觉难。会采芬芳蜜成后，无限风光为谁看？</figcaption>
</figure>
```

以上[示例](./docs/html/html/html-code-12-2.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-12-2.html"></iframe>

不过这个标签和表格内的标题标签`<caption>`一样，它们通常都是需要用CSS来进行一定的美化才能显得更搭调，用CSS设计后的效果[示例](./docs/html/html/html-code-12-3.html)如下：

<iframe style="min-height:60px;" src="./docs/html/html/html-code-12-3.html"></iframe>

## `<article>`标签

该标签的作用和`<div>`十分相似，但是它会对标签内的一些带有默认样式的文本类标签进行样式调整，如：`<h1>`标签（`<h1>`标签默认的字体大小为“2em”，但放在`<article>`标签内会变成“1.5em”。有同类作用的标签还有：`<section>`、`<aside>`和`<nav>`），“<em class="hover-info" data-title="指万维网联盟，他是一个会员组织，主要工作是对Web进行标准化，创建并维护WWW标准，标准被称为“W3C推荐”">W3C组织</em>”对它的描述是：`<article>`标签定义外部的内容，外部内容可以是来自一个外部的新闻提供者的一篇新的文章，或者来自博客的文本，或者是来自论坛的文本。亦或是来自其他外部源内容，该标签的内容独立于文档的其余部分。 通过“W3C”的描述，我们应该能明白，它的作用是人为去进行区分的，实践后我们也能发现该标签从目前浏览器版本来看仍还不属于功能性标签。现在国外很多新闻信息类网站是根据其英文译意“文章、条目”之接将其作为每一篇文章的“容器”来使用。

例如以下一个示例:

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="result" data-user="eveningwater"
    data-slug-hash="eYpogXp"
    style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
    data-pen-title="eYpogXp">
    <span>See the Pen <a href="https://codepen.io/eveningwater/pen/eYpogXp">eYpogXp</a> by eveningwater (<a href="https://codepen.io/eveningwater">@eveningwater</a>)
     on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## `<section>`标签

该标签的作用同样和`<div>`十分相似，和`<article>`一样，它也会对标签内的一些带有样式的文本类标签进行样式调整，不过“W3C组织”对它的描述是：`<section>`标签定义文档中的节。比如章节、页眉、页脚或文档中的其他部分。

与`<article>`不同的是，该标签具有一个属性“<em class="hover-info" data-title="英译为“引用、引证、举例”">cite</em>”该属性的值为一个“<em class="hover-info" data-title="统一资源定位符，在这里可以通俗地理解为一个网页的网址">url</em>”，用于指出该段话摘自于哪一个网站，不过现在版本的浏览器并不支持该属性，但现在至少也可作为版权纠纷时的一个说明凭证。来看如下一个示例:

```html
<article>
    <h1>我的诗词</h1>
    <h2>我的仇人</h2>
    <section cite="http://www.zgshige.com/c/2017-11-20/4765123.shtml">
    <p>如果我有一个仇人，这个仇人就是生活。</p>
    <p>如果生活发怒报复我，活的更好就是报复生活最好的方法。</p>
    <p>如果我不快乐，生活势必在阴暗的角落偷偷嘲笑我。</p>
    <p>如果我活的快乐，能让生活沮丧，能让羡慕我快乐的生活羞愧，生活羞愧，我就快乐。</p>
    <p>生活难受，我就兴奋，因为我让我的仇人失落。</p>
    </section>
    <h2>剑阁游记--节选</h2>
    <section cite="http://www.chinapoesy.com/gongxiang518e3794-07de-4a16-89e6-ad74c59577a5.html">
    <p>余与舍友又于此小憩多时，而后方渐前行也。一日高照上空，余即知此时乃正午也，而余与舍友具疲然，虽山道平平，又有憩地，亦不可解余一众疲也。然登山贵于恒，万事等之，若失之，岂可至极而成事乎？余一众岂以疲而弃大好风光不顾焉？故虽休憩须臾，余一众具起，而依旧前行也。午时，余与舍友具至仙女廊，然未留此，舍友即欲行鸟道，余即惊也。然余亦无那，见其不止而又上行，余遂逐其行鸟道也。余稍恐危，故下望鸟道之人，总为之而忧。虽知其不可落，以有铁索阻之也。而闻其居里眺下高叫，心恐也。鸟道者，其实也，太白云可以横绝峨眉巅，余此时知也。虽鸟道岌岌，而依旧人山人海，故余与舍友于鸟道俟多时也。未时，余与舍友具行尽鸟道，至仙女桥，而舍友不觉疲然，又渐行，余又逐之，又行既而，余一众便至梁山寺，固余一众欲入悬空玻璃观景台，然有须耗金，余一众即未去，而至梁山寺。</p>
    </section>
</article>
```

以上[示例](./docs/html/html/html-code-12-4.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-12-4.html"></iframe>