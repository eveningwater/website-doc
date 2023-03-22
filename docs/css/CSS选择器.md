# CSS选择器

## CSS选择器概述

所谓CSS选择器（selector）就是对html页面中的元素实现一对一，一对多或者多对一的控制，从而实现布局调整，元素类型重定义，元素美化，文本、图像美化，完善交互，控制样式过渡，播放动画等一系列的功能。

本章学习的重点是熟练地掌握各种选择器的写法，通过观察html代码结构来灵活地编写适当的选择器，能精确的控制到指定元素而又不影响其它同类元素，同时又能正确计算权重值，将各个选择器权重把握在一个合理的范围。当达到一定熟练度以后，还要学会有效地组织代码，即保证各选择器在CSS文件中的分类合理、组织有序、注释详细且清晰，保证没有明显的冗余代码，已有样式安全不被其它后续样式破坏。

> 关于选择器还有更加详细的文档，目前正在编写中，敬请期待。

## CSS基础选择器

CSS的基础选择器主要有三个：“标签选择器”、“类选择器”和“ID选择器”。

### 标签选择器——weighting（权重）：1

一个完整的html页面是有很多不同的标签组成，而标签选择器，则是决定哪些标签采用相应的CSS样式。写法如下：

```css
/*标签选择器*/
div {
    width:100px;
    height:80px;
}
p {
    line-height:2em;
}
section {
    padding:20px;
}
a {
    margin:0;
    padding:0;
    box-sizing:border-box;
}            
```

但需要注意的是，标签选择器会对该页面所有的标签进行控制，一些我们不需要进行样式设置的标签也会对该选择器设定的样式生效。所以，一般情况不会以标签选择器作为主要的选择器，而是配合后面会学到的类选择器、ID选择器以及一些其它选择器来对元素样式进行控制。

我们来看一个简单的示例:

html代码如下:

```html
<p>愁绪挥不去，苦闷散不去。为何我心一片空虚，感情已失去，一切都失去，满腔恨愁不可消除。为何你的嘴里总是那一句，为何我的心不会死，明白到爱失去，一切都不对，我又为何<em>偏偏喜欢你</em>。</p>
```

CSS代码如下:

```css
p {
    color:#535353;
    text-align:center;
    line-height:2em;
}
em {
    font-size:20px;
    font-weight:450;
    border-bottom:2px dashed #2396ef;
}        
```

以上[示例](./docs/css/html/css-code-2-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-1.html"></iframe>

### 类选择器——weighting：10

类选择器（Class选择器）根据类名来选择，而这个类名是自定义的，但我们在定义这个类名的时候也应该尽量能反应被设置元素的实际功能。比如说，我们是用于显示一张图片的，我们可以取名“show-img”；如果是将一个字体字号设置为16像素的，应该取名为“fz-16”或“fz_16”，命名应该遵循[BEM](./docs/css/other/BEM/index.html)规范（更多命名实例可以查看一些知名[Web UI](https://baike.baidu.com/item/Web%20UI/5701329?fr=aladdin)库的命名方式：[Bootstrap](https://v5.bootcss.com/)、[SUI](https://github.com/sdc-alibaba/sui)、[AmazeUI](http://amazeui.github.io/docs/en/)、[MUI](https://dev.dcloud.net.cn/mui/ui/)、[Layui](https://layui.gitee.io/v2/)（[layui-vue](http://www.layui-vue.com/zh-CN/index)）、[FrozeUI](http://frozenui.github.io/components/components)等）。同一个类名的选择器理论上可以被任意多的标签元素使用。在CSS中，定义类名选择器应该以“.”作为开头，否则，浏览器将视为你自定义的标签名。写法如下：

```css
/*类选择器*/
.show-img{
    width:200px;
    height:100px;
}
.fz-14{
    font-size:14px;
}
.fc-red {
    color:#f00;
}         
```

在html中，同一个标签可以同时存在多个class的值，在CSS里也可以并列的使用多个class来作为选择器。如以下一个示例:

html代码如下:

```html
<div class="card-box card-container">
    <img src="https://www.eveningwater.com/my-web-projects/js/26/img/6.jpg" alt="图片加载中" title="据说这是一个美女哦" />
    <p>这是以上美女的电话:12312334422</p>                        
</div>
```

部分css代码如下:

```css
.card-box{
    width: 400px;
    height: 400px;
    border-radius: 4px;
    padding: 10px;
    border: 1px dashed #bba464;
    background-color: #f8e5d1;
    margin: 2em auto;
}
.card-container {
    box-shadow: 0 0 5px rgba(0,0,0,.5);
}
```

也可以写成如下这样:

```css
.card-box.card-container {
    width: 400px;
    height: 400px;
    border-radius: 4px;
    padding: 10px;
    border: 1px dashed #bba464;
    background-color: #f8e5d1;
    margin: 2em auto;
    box-shadow: 0 0 5px rgba(0,0,0,.5);
}
```

需要注意的是，在CSS中把两个class并列使用作为选择器的时候，两个class的中间不能有空格，否则它将表示的是“后代选择器”这种结构形式的选择了，作用会不一样，这在本章里会学习到。

你可以看到以上[示例](./docs/css/html/css-code-2-2.html)如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-2.html"></iframe>

我们再来看一个简单的示例:

html代码如下:

```html
<div class="ew-container ew-card-box">
    <div class="ew-card">
        <div class="ew-card-body">
            <img src="./images/css-1.jpg" alt="图片加载中" title="一亿个伤心" />
            <p>我总想找个理由 回到相遇的前头 就当我们从来不曾分手 我再见你的时候 你已牵别人的手 旁边还跟着个小朋友</p>
        </div>
    </div>
</div>
```

css代码如下:

```css
* {
    margin: 0;
    padding: 0;
}
.ew-container {
    margin: 2em;
}
.ew-card-box {
    width: 300px;
    height: 300px;
}
.ew-card{
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: .3s;
    
}
.ew-card:hover,.ew-card:active{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.ew-card > .ew-card-body{
    padding: 20px;
}
.ew-card > .ew-card-body > img {
    width: 100%;
    display: block;
}
.ew-card > .ew-card-body p {
    line-height: 1.8em;
}
```

以上[示例](./docs/css/html/css-code-2-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-3.html"></iframe>

### ID选择器——weighting：100

和类选择器一样，名称也是自定义的，命名原则也应该尽量能反应该元素的实际功能，或者一些唯一的特质。但它和Class的不同，它应该是页面里唯一的，即同一个页面内只能出现一个ID，否则，不仅违反了ID命名的基本规则，也会在JavaScript（其它JavaScript框架皆是如此）进行操作时，始终都只能获取到第一个ID，之后的相同ID的元素则不会生效。定义一个ID选择器应该以“#”开头。写法如下：

```css
#userName {
    color:#f00;
}
#blockElement{
    display:block;
}
```

由于每个ID应该是页面内唯一的，又因为它的权重过高，所以不是迫不得已的时候一般不推荐使用ID作为CSS选择器，否则会造成样式权重过高，后期修改维护困难的问题。让我们来看一个示例:

html代码如下:

```html
<div>把你捧在手上虔诚地焚香。剪下一段烛光将经纶点亮。不求荡气回肠只求爱一场。爱到最后受了伤哭得好绝望。</div>
<div class="test">你见或者不见我，我就在那里不悲不喜。你念或者不念我，情就在那里不来不去。</div>
<div id="third" class="test">明月几时有？把酒问青天。不知天上宫阙，今夕是何年。</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
body {
    font: 16px "微软雅黑",sans-serif;
}
div {
    color: #ff0000;
}
.test {
    font-size: 24px;
}
#third {
    font-style: italic;
    color: #0000ff;
    font-size: 36px;
}
```

以上[示例](./docs/css/html/css-code-2-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-4.html"></iframe>

> 观察以上示例效果:思考为什么给class同为“test”设置的24像素字号会被第三个`<div>`设置的36像素字号覆盖；给所有`<div>`设置的红色字体在第三个`<div>`上会被蓝色覆盖？鼠标移到<em class="hover-info" data-title="根据选择器的权重来分析以上问题。">这里</em>查看思路提示。

### 通用选择器——weighting：0

通用选择器使用“*”表示。它的作用是选择页面中所有的标签元素，但业内很多Web前端优化师都认为该选择符存在性能问题，而且它一旦使用后父选择器与后代选择器的搭配容易出现浏览器不能解析的Bug，所以一般在高质量的Web页面中基本是看不到该选择符的。它一般只用于在<em class="hover-info" data-title="即对在浏览器中可能存在表现不一致的标签进行统一设置，另外也可以包括诸如对页面背景、字体系列、字体大小、字体颜色、表格风格、表单风格等内容进行样式上的统一">CSS初始化文件</em>（可以通过查看业界“最享盛名”的CSS初始化文件[Normalize.css](http://necolas.github.io/normalize.css/)源码来学习了解CSS初始化的相关内容）中控制盒子模型，而不再被推荐在其它地方使用。

[<em class="hover-info" data-title="已更名为view UI">iview</em>](https://www.iviewui.com/)框架中还使用该选择器让页面所有元素使用IE6[盒子模型](https://baike.baidu.com/item/CSS%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B/9814562?fr=aladdin)。代码结构如下:

```css
* {
    box-sizing: border-box;
    /*该属性是一个没有标准化的属性,能够设置点击链接的时候出现的高亮颜色*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:before,*:after {
    box-sizing: border-box;
}
```

可通过查看该框架[源码](https://github.com/view-design/ViewUI/blob/master/src/styles/common/base.less)查看样式。

## 后代选择器

后代选择器是对某元素所嵌套的指定元素进行选择，每个选择符之间用<strong>空格</strong>进行分割，多个嵌套层次应该以多个空格进行分割（多层嵌套难免会增加选择器带来高权重，这样在处理一些元素的特殊样式的时候会带来些困难，所以在实际开发中我们还是应该避免出现多层嵌套的后代选择器的存在）。如以下一个示例:

html代码如下:

```html
<main>
    <section>
        <article>
            <h1>别怕我伤心</h1>
            <p>一颗爱你的心，时时刻刻为你转不停。我的爱也曾经，深深温暖你的心灵。你和他之间，是否已经有了真感情，别隐瞒对我说，<em>别怕我伤心</em>。</p>
        </article>
    </section>
    <section class="song-section">
        <article class="song-article">
            <h1>丁香花</h1>
            <p>你说你最爱<em>丁香花</em>，因为你的名字就是它。多么忧郁的花，多愁善感的人啊！</p>
        </article>
    </section>
</main>
```

css代码如下:

```css
main section article h1 {
    text-align:center;
    font-size:20px;
}
main section article p {
    line-height:1.8em;
}
main .song-section .song-article h1 {
    font-size:25px;
}
main .song-section .song-article p {
    line-height:2em;
    color:#334455;
}
```

以上[示例](./docs/css/html/css-code-2-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-5.html"></iframe>

需要注意的是，这一类的选择器设置的样式只对选择器最后一个元素生效，如“section p span {...}”这样一个选择器，它只对span这个标签生效样式，而前面的section和p标签选择器都只是表示所控制的范围。这样做的目的是为了防止影响到一些本不需要设置该样式的span标签，如“div p span {...}”、“table td span”等。

## 子选择器

子选择器区别与后代选择器的地方就是，后代选择器可以选择嵌套在标签内部任意层级的标签元素，而子选择器只能选择当前标签往内一层的元素。每个选择符之间用“<strong>></strong>”进行分割。如一个示例如下:

html代码如下:

```html
<main>
    <section>
        <article>
            <h1>愚爱</h1>
            <p>爱你爱得心好累，你让我疲惫。为你我快要崩溃，你让我伤悲。为了你我宁愿再爱一回，享受这<em>愚爱</em>的滋味。</p>
        </article>
    </section>
    <section class="song-section">
        <article class="song-article">
            <h1>原谅我一次</h1>
            <p>Baby So Sorry，Baby别伤心，我依然爱着你，想着你，别离去，没有你的日子真的好空虚。</p>
        </article>
    </section>
</main>
```

css代码如下:

```css
main > section > article > h1 {
    text-align:center;
    font-size:20px;
}
main > section > article > p {
    line-height:1.8em;
}
main .song-section .song-article > h1 {
    font-size:25px;
}
main .song-section .song-article > p {
    line-height:2em;
    color:#2396ef;
}
```

以上[示例](./docs/css/html/css-code-2-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-6.html"></iframe>

和后代选择器相比，这个选择器在结构控制上会更加精确，在处理一些html代码结构比较复杂，担心会破坏其它同名元素的样式时可以派上用场。虽然说这个选择器在选择精度上更高，但也应该避免滥用。

如之前后代选择器的示例“section p span”，在那个页面所有的section标签里就只有一处出现了span标签，而且按目的来说只要在section里出现的span我们希望使用同一个样式，也就没有必要在中间写上p选择器了，可以直接写成“section span”就可以了，而子选择器就必须要写成“section > p > span”，后者的写法增加了一定代码量，也会增大权重值，不利于后续的维护。

## 伪类选择器

该选择器的权重值为“10”，伪类选择器和其它选择器有所不同，它是通过触发一定的“事件”来实现效果，也就是说如果不进行任何操作是看不到该选择器的CSS样式设置的。以Google Chrome浏览器开发者工具为例，要想看到所设置的伪类选择器样式需通过点击“ Element”标签栏下“Style”标签栏中的“:hov”按钮，然后勾选需要查看的操作事件进行样式查看。如下图所示:

<div class="image-container">
    <img src="./docs/css/images/css-2.png" alt="图片2-1" title="图片2-1" >
    <span class="image-title">图 2-1 </span>
</div>

目前支持的操作事件有，“hover”，“active”，“visited”和“focus”，“target”:

* :hover：鼠标悬浮于该元素上设置的样式。
* :active：鼠标悬点击时该元素上设置的样式。
* :visited（不建议使用）：鼠标悬点击后该元素上设置的样式。
* :focus：表单元素获得焦点后设置的样式。
* :target：是CSS3新增的一个伪类，可用于选取当前活动的目标元素。当然URL末尾带有锚名称#，就可以指向文档内某个具体的元素。这个被链接的元素就是目标元素(target element)。它需要一个id去匹配文档中的target。

如以下就是利用该选择器实现的一个选项卡切换功能[示例](./docs/css/other/css-tab.html):

<iframe class="ew-transparent-iframe" src="./docs/css/other/css-tab.html"></iframe>

html代码结构不复杂，如下:

```html
<div id="wrapper">
    <div id="content1">这是首页</div>
    <div id="content2">联系我们:XXXXXXX</div>
    <ul>
        <li><a href="#content1">首页</a></li>
        <li><a href="#content2">联系我们</a></li>
    </ul>
</div>
```

css代码如下:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body,html {
    height: 100%;
    min-height: 300px;
    background-color: #ffffff;
}
#wrapper {
    width: 100%;
    height:300px;
    margin: 0 auto;
    border: 2px dashed #f1d989;
    padding: 8px;
    position: relative;
    overflow: hidden;
}
#wrapper > ul {
    width: 100%;
    list-style: none;
    position: absolute;
    left: 0;
    top: 0;
}
#wrapper > ul:after {
    content: "";
    height: 0;
    display: block;
    visibility: hidden;
    clear: both;
}
#wrapper > ul>li {
    width: 50%;
    padding: 4px 16px;
    font: 18px "华文琥珀";
    text-align: center;
    background-color: #efefef;
    border-radius: 5px;
    float: left;
    transition: all .3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
#wrapper > ul>li>a {
    width: 100%;
    height: 100%;
    display: block;
    color: #002355;
    text-decoration: none;
}
#wrapper > #content1,
#wrapper > #content2 {
    width: 100%;
    border: 10px solid #fefefe;
    padding: 20px;
    color: #535354;
    font-size: 16px;
    display: none;
    position: absolute;
    left: 0;
}
/* 核心代码 */
#wrapper > #content1:target,
#wrapper > #content2:target {
    display: block;
}
#wrapper > #content1:target~ul li:first-of-type {
    border-bottom: 2px solid #2396ef;
}
#wrapper > #content1:target~ul li:first-of-type a,
#wrapper > #content2:target~ul li:last-of-type a {
    color: #e0c757;
}
#wrapper > #content2:target~ul li:last-of-type {
    border-bottom: 2px solid #2396ef;
}
```


来看一个简单的使用伪类选择器的示例:

html代码如下:

```html
<a href="https://baike.baidu.com/item/%E4%BD%A0%E6%98%AF%E6%88%91%E7%9A%84%E7%9C%BC/7056614" target="_blank" rel="noopener noreferrer">
    你是我的眼，带我领略四季的变换。你是我的眼，带我穿越拥挤的人潮。你是我的眼，带我阅读浩瀚的书海。因为你是我的眼，让我看见这世界就在我眼前，就在我眼前。
</a>
<input type="text" value="想你，爱你，留不住你，亲爱的你，我已用尽我的力气，去爱去接受你。" />
```

部分css代码如下:

```css
a:hover{
    color:#2396ef;
}
a:active {
    border-bottom:1px dashed #223344;
}
input:focus {
    box-shadow:0 0 2px 4px #f87691;
}
a:visited{
    border:1px double #186978;
}
```

以上[示例](./docs/css/html/css-code-2-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-7.html"></iframe>

## 群组选择器

所谓的群组选择器就是多个选择器所组成的一组选择器，每个选择器之间用“<em class="hover-info" data-title="注意是英文下的逗号">,</em>”隔开。群组选择器的使用范畴是，多个选择器使用同一个样式或者同一组样式。这在做CSS样式初始化，CSS框架设计以及后期CSS代码优化时会经常使用。另外，群组选择器写在一起并不会叠加权重值，每个逗号之间选择器的权重值是独立计算的。

例如我的个人网站的CSS初始化，如下图所示:

<div class="image-container">
    <img src="./docs/css/images/css-3.png" alt="图片2-2" title="图片2-2" >
    <span class="image-title">图 2-2 </span>
</div>

以上代码做了缩进处理，样式表达的含义也比较简单，就是为已知的标签元素重置margin和padding为0。我们再动手自己写一个示例:

html代码如下:

```html
 <div>好想好想和你在一起，和你一起数天上的星星，收集春天的细雨。好想好想和你在一起，听你诉说古老的故事，细数你眼中的情意。<div>
    <p>珍重再见，今宵有酒今宵醉。对酒当歌，长忆蝴蝶款款飞。莫再留恋，富贵荣华都是假。</p>
    <a href="https://baike.baidu.com/item/%E6%88%91%E7%88%B1%E7%9A%84%E4%BA%BA/3725?fr=aladdin" target="_blank" rel="noopener noreferrer">
    我知道，故事不会太曲折。我总会，遇见一个什么人。陪我过，没有她的人生，成家立业之类的等等。
    </a>
    <input type="text" value="往事不要再提，人生已多风雨。纵然记忆抹不去，爱与恨都还在心里。真的要断了过去，让明天好好继续。你就不要再苦苦追问我的消息。" />
    <span class="song-name">你出现就沉醉了时间。没有酒我像个荒诞的可怜人。可是你却不曾施舍二两。<span>
```

部分css代码如下:

```css
div,
p,
a,
input,
.song-name {
    color: #535455;
    text-align: center;
    font-size: 14px;
}
```

以上[示例](./docs/css/html/css-code-2-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-8.html"></iframe>

群组选择器在实际项目中一定要多加运用，它不仅可以有效的分类管理样式代码、提升代码可维护性，还能更大限度地节省代码量，减小CSS文件的总体传输体积，使得页面加载的速度更快。群组选择器是有效组织管理CSS代码的关键，在CSS入门期间就有意识的观察各类元素共同的样式，养成对CSS分门别类群组管理的习惯，在刚开始的时候可能会减慢我们的开发时间效率，但这对我们以后写出高质量的CSS代码很有帮助。

## 同级元素选择器

该选择器能选定指定元素同级的下一个元素或同级之后匹配选择器的所有元素，它不会对权重造成影响。配合伪类选择器经常可以做出一些很有“新意”的效果，也能减少对JavaScript的依赖。同级元素有两种，即“`+`”和“`~`”，“+”只能选择该选择器相邻的下一个选择器，而“~”能选择该选择器后的所有同级选择器。

来看一个示例如下（“+”的示例）:

html代码如下:

```html
<div class="control-div">鼠标悬浮上来，会有惊喜发生</div>
<div class="rotate-div">转啊转啊转啊转啊转</div>
<div class="no-rotate-div">转不动咋办呢</div>
```

部分css代码如下:

```css
.control-div:hover + .rotate-div {
    transform: rotateY(180deg);
}
.control-div:hover + .no-rotate-div {
    transform: rotateY(180deg);
}
```

以上[示例](./docs/css/html/css-code-2-9.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-9.html"></iframe>

一个示例如下（“~”的示例）:

```html
<div class="control-div">鼠标悬浮上来，会有惊喜发生</div>
<div class="rotate-div">转啊转啊转啊转啊转</div>
<div class="no-rotate-div">转啊转啊转啊转啊转，我还能转的更多</div>
```

部分css代码如下:

```css
.control-div:hover ~ .rotate-div {
    transform: rotateY(180deg);
}
.control-div:hover ~ .no-rotate-div {
    transform: rotateY(240deg);
}
```

以上[示例](./docs/css/html/css-code-2-10.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-10.html"></iframe>

## 属性选择器

该选择器的权重值为“10”，它所针对的既不是某个标签，也不是类名，或者ID，它是将一个标签的属性作为选择器来使用，最常用的地方就是涉及到属性多而杂的表单元素。基本写法是“[” + “属性名” + “]”的格式，该选择器的定义方式如下：

* [属性名]{...样式设置内容...}：将标签中的一个属性作为选择选择器。例如:

```css
/*为含有src属性的所有标签消除边框，例如:<img src="XXX.png" />*/
[src] { 
    border:none;
}
```

* [属性名="属性值"]{...样式设置内容...}：将标签中的一个属性名值对作为选择器。例如:

```css
/*为class类名值为col-1的标签元素设置左浮动，例如:<div class="col-1"></div>*/
[ class = "col-1"] {
    float:left;
}        
```

* [属性名 ^= 属性值]{...样式设置内容...}：将标签中的一个属性名名为你自己所定义的属性名，属性值以你自己所定义的属性值开头的属性名值对作为一个选择器。“^”这个符号在这里表示的意义有点类似<em class="hover-info" data-title="有关正则表达式的概念可以在javascript中学到">正则表达式</em>中的同样的这个符号所表达的含义。例如:

```css
/*为class类名值包含有ew-col-的标签元素设置相对定位与块级元素，例如:<div class="ew-col-1"></div><p class="ew-col-"></p>*/
/*还可以是<span class="ew-col-span"></span>这样的标签元素,意思就是属性值必须要以ew-col-开头，这样就会生效*/
/*属性值也可以是中文字符或者特殊符号*/
[ class ^= "ew-col-"] {
    position:relative;
    display:block;
}
```

* [属性名 $= 属性值 ]{...样式设置内容...}：将标签中的一个属性名名为你自己所定义的属性名，属性值以你自己所定义的属性值结束的属性名值对作为一个选择器。“$”这个符号在这里表示的意义有点类似正则表达式中的同样的这个符号所表达的含义。例如:

```css
[ title $= "red" ] {
    color:#f00;
}           
```

以上代码意思是: 为title属性值为red结束的标签元素设置字体颜色为红色，例如:`<div title="red"></div><div title="test-red"></div>`,如这样的标签是不行的`<div title="test-red-5">测试文本7</div>`，因为title的属性值并不是以red字母结束，属性值也可以是中文字符或者特殊符号。 

* [ 属性名 \*= 属性值]{...样式设置内容...}：将标签中的一个属性名名为你自己所定义的属性名，属性值含有以你自己所定义的属性值属性名值对作为一个选择器。“*”这个符号在这里表示的意义有点类似正则表达式中的同样的这个符号所表达的含义。例如:

```css
[ id *= "font-" ] {
    font-size:18px;
}
```

以上代码表示：id属性只要含有font-字符，就为该标签元素设置字体大小为18px，例如:`<div id="font-1"></div><div id="my-font-2"></div>`，哪怕是这样的也行`<div id="字体大小font-2"></div>`不过还是不要这么写，id属性值为中文字符加字母也太不规范了吧，属性值也可以是中文字符或者特殊符号。

* [ 属性名 ~= 属性值]{...样式设置内容...}：将标签中的一个属性名名为你自己所定义的属性名，属性值如果含有词为你自己所定义的属性值其后需要出现一个或多个空格，属性值如果直接等于你自己所定义的属性值，那么其后可以出现也可以不出现空格的属性名值对作为一个选择器。例如:

```css
[ href ~= "www"] {
    text-decoration:none;
}
```

href属性值如果含有www字母，那么www之后必须要出现空格，如果直接等于www那么可不必出现空格，此时样式才会生效，也就是消除文本装饰线，例如:`<a href="www>"</a><a href="www .baidu.com"></a><a href="www   .baidu.com"></a>`这样的有效，而`<a href="www.baidu.com"></a>`类似这样的无效，属性值也可以是中文字符或者特殊符号。

```css
[ title ~= "is"] {
    display:block;
}
```

当然一般说来如上写法是不规范的，我们可以为带title属性的标签元素设置,就是说如果title属性值含有is字符，那么is字符其后必须出现空格，is字符的前面可出现可不出现空格，如果title属性值等于is字符，则无需空格即生效，例如:`<img src="dog.png" title="this is a dog" alt="dog" />`是有效的。

* [ 属性名 |= 属性值]{...样式设置内容...}：将标签中的一个属性名名为你自己所定义的属性名，属性值等于你自己所定义的属性值或属性值等于你自己所定义的属性值加上-符号，并且该符号之后可以是任意字符的属性名值对作为一个选择器。例如:

```css
[ class |= "font" ] {
    font-size:25px;
    color:#999;
}
```

以上代码表示为class的值为font时，或者class的值为font-,-之后可以是任意字符的标签元素设置字体大小为25px，字体颜色为#999，例如:`<div class="font"></div><div class="font-1"></div><div class="font-""></div><div class="font-test"></div>`等都是有效的，而类似这样的`<div class="testfont"></div><div class="test-font-test"></div><div class="testfont-1"></div>`等都无效，属性值也可以是中文字符或者特殊符号。

当然很多时候为了避免产生歧义，我们总是会在属性选择器前方加上该元素的标签名来明确选择器的控制范围。表现如下：

```css
input[type="text"] {
    height:32px;
}
img[src $=".jpg"] {
    display:block;
}
```

尽管使用属性选择器有一些让人意料不到的效果，例如设置属性值是中文字符也可以匹配到。但更多时候为了规范化，我们还是尽量避免使用太复杂的属性选择器。

我们来看一个示例如下:

```html
<!-- 客户信息 -->
<form name="customerInfo" class="customer-info">
    <table>
        <thead>
            <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>职业</th>
                <th>验证密码</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Cus-001</td>
                <td>
                    <input name="userName" type="text" value="张三丰" />
                </td>
                <td>男</td>
                <td>
                    <input name="userAge" type="number" value="56" />
                </td>
                <td>
                    <input name="userProfession" type="text" value="互联网" />
                </td>
                <td>
                    <input name="userPwd" type="password" value="123456" />
                </td>
            </tr>
            <tr class="tr-even">
                <td>Cus-002</td>
                <td>
                    <input name="userName" type="text" value="王重阳" />
                </td>
                <td>男</td>
                <td>
                    <input name="userAge" type="number" value="46" />
                </td>
                <td>
                    <input name="userProfession" type="text" value="建筑" />
                </td>
                <td>
                    <input name="userPwd" type="password" value="zxcfbn" />
                </td>
            </tr>
            <tr>
                <td>Cus-003</td>
                <td>
                    <input name="userName" type="text" value="令狐冲" />
                </td>
                <td>男</td>
                <td>
                    <input name="userAge" type="number" value="32" />
                </td>
                <td>
                    <input name="userProfession" type="text" value="运输" />
                </td>
                <td>
                    <input name="userPwd" type="password" value="1a2b3c" />
                </td>
            </tr>
            <tr class="tr-even">
                <td>Cus-004</td>
                <td>
                    <input name="userName" type="text" value="韦小宝" />
                </td>
                <td>男</td>
                <td>
                    <input name="userAge" type="number" value="22" />
                </td>
                <td>
                    <input name="userProfession" type="text" value="特殊服务" />
                </td>
                <td>
                    <input name="userPwd" type="password" value="abcdef" />
                </td>
            </tr>
        </tbody>
    </table>
</form>
```

部分css代码如下:

```css
form[name="customerInfo"] {
    min-width: 600px;
    max-width: 100%;
    border-collapse: collapse;
}

[ class ^="customer"] table,[ class ^="customer"] td,[ class ^="customer"] th {
    border: 1px solid #acacac;
}

form[ name $="Info"] td,form[ name $="Info"] th {
    padding: 4px 10px;
    text-align: left;
}

form[ class *="-info"] thead {
    background-color: #333333;
    color: #eeeeee;
}

[ class~="tr-even"] {
    background-color: #dddddd;
}

form table tr td{
    max-width: 100px;
}
form table tr td:hover{
    background-color: #3181cc;
}
form table tr td:hover + td {
    color: #85abf5;
}
form table tr:hover {
    background-color: #555555;
    color: #dddddd;
}
form table input {
    width: 100%;
    height: 100%;
    padding: 6px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: inherit;
    color: inherit;
}
input[name |= "userPwd"] {
    color: #4ea16e;
}
```

以上[示例](./docs/css/html/css-code-2-11.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-2-11.html"></iframe>

## CSS权重

权重值是CSS里面一个虽然看不见，但是却十分重要的隐藏属性，对它的运用理解直接决定了一个Web前端开发者是CSS的入门水平还是进阶水平。熟练的掌握CSS的权重值，不仅可以让一个开发者在编写自己的CSS的时候可以游刃有余，还能让他在以后运用Web UI库的时候能更加的操纵自如。

前面已经为涉及到权重值的选择器加上了权重值的说明，但如果你比较懒，下表为你展示了具备CSS权重的选择器,以及它们之间的各自权重值。

| 选择器       | 权重值 | 示例                         |
| ------------ | ------ | ---------------------------- |
| 通用选择器   | 0      | 如:*                         |
| 标签选择器   | 1      | 如:p,div                     |
| 伪元素选择器 | 1      | 如:p:first-child,div::before |
| 类选择器     | 10     | 如:.ew-col,.ew-row           |
| 属性选择器   | 10     | 如:[src],[ type="password"]  |
| 伪类选择器   | 10     | 如:a:hover,div:focus         |
| ID选择器     | 100    | 如:#user,#container          |

而类似于子元素、后代、同级、群组等选择器都没有单独的权重值，而是通过叠加运算的方式来计算权重的。例如，一个选择器同时包含两个标签选择器，如“div span”或者“div > span”他们都只有两个标签选择器，因为标签选择器的权重为1，也就是“1 + 1”等于“2”，那这个选择器的权重就为2。为了更清楚的说明，我们列出一些组合使用的选择器，并给出权重值，以此来让大家观察理解权重值的计算。具体如下：

```css
/*权重值——1+1+1+1=4*/
table tbody tr td { width:auto;}
/*权重值——1+10=11*/
form[ name="user-form" ]{ width:auto;}
/*权重值——1+10+10=21*/
form[name="user-form"].data-form{ width:auto; }
/*权重值——1+1+1+10=13*/
form > div > label[for]{ width:auto; }
/*权重值——1+10+1+100=112*/
picture.photo-group > img#photo-1{ width:auto; }
/*权重值——1+1+1+1+10+10=24*/
form div > label + input[type="radio"][name="gender"]{ width:auto; }
/*权重值——1+1+100+1+10+1+10=124*/
header > nav#main-nav > ul.nav-list a:hover{ width:auto; }     
```

有很多文献有明确阐述，“行内样式”即通过标签上style属性设置的样式权重值为1000，但经过我们通过11层嵌套都带有ID值组成权重1100的选择器进行试验，发现这个1100权重的样式并没有生效。所以我们估计业界所说行内样式的1000应该指的是单个选择器权重值的最大值了，是无法被任何样式覆盖的。

通过观察分析以上代码实例相信大家已经能够正确的计算权重值了。如我们之前所述，在CSS里权重值高的样式优先生效，而当两个选择器权重值一样时后出现的（行号更大的）选择器样式优先生效，当两个权重一样选择器在两个不同的CSS文件中时，后被引用的那个CSS里的选择器优先生效。掌握这点，以后在使用各式UI库的时候，如果需要对它已有的样式进行更改，那只需要编写出一个权重值至少比它大1的选择器即可。

另外，还需要注意的是，在项目开发的初期阶段，我们应该遵循<em class="hover-info" data-title="CSS设计中的一个基本原则，相关系统文献可以参考《编写高质量代码——Web前端开发修炼之道》，也可以自行在搜索引擎内搜索该关键词">低权重原则</em>，即让选择器最终的权重值不应该过大，其中也包含避免滥用子选择器（包括后代选择器）、避免使用ID选择器等内容。但是，我们在遵循低权重原则的同时，也需要保证已有样式的安全性，就是说后续出现的样式设置不应该破坏之前设计完成的样式。

## CSS多重样式的优先级

由于该页面内容比较多，所以单独写了一个页面，点此[查看](./docs/css/other/cssStyleLevel/index.html)。