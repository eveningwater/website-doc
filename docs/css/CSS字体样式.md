# CSS字体样式

## CSS字体样式概述

文本在HTML页面中是最基本的表现形式，通过文本能最有效而详细的说明网页中的内容。但若不对页面中的文本做任何处理，那会给用户浏览带来一些不好的体验。如果通过CSS对文本进行设置后，不仅让用户浏览体验更佳的好，也会让页面的美观程度提升一个高度。

我们可以通过[一个页面文本布局糟糕的例子](./docs/css/other/css-font-bad.html)和[一个页面文本布局美观的例子](./docs/css/other/css-font-good.html)来进行比较。通过比较我们可以发现，一个文本布局良好的页面给用户的体验要远远好于一个文本布局不加修饰的页面。所以要想一个页面制作得比较精美，那么我们首先要从CSS的字体文本的样式学起。

文字的的基本属性为“<em class="hover-info" data-title="直译为:'文本'">font</em>”，可以通过该属性的分支属性设置网页内字体的样式，如字体类型、字体粗细、字体大小、字体系列，甚至还可以直接通过简写让“font”属性同时实现对多个<em class="hover-info" data-title="即该属性下可以有至少2个细化的属性，它们可以对主属性中的样式进行更细致的设置">分支属性</em>（又可以叫做“子属性”）的设置，还能“半隐式”地对文本行高进行设置。

## CSS字体风格“font-style”

该分支属性用于设置字体风格，主要功能是将字体设置为斜体，表现出来的效果和默认的`<i>`和`<em>`这类标签是一致的，它拥有三个基本属性值：

* normal：普通字体（默认值）。
* italic：斜体（对于没有斜体变量的特殊字体，将应用oblique：）。
* oblique：倾斜字体（会让一些没有斜体的特殊字体也拥有倾斜效果）。
* 
让我们来看一个简单的示例吧。

html代码如下:

```html
<p class="normal">虽然很多事情我不懂，虽然留下的伤会很痛，我把泪水藏在眼中，一步一步往前走，我要作追风的英雄。</p>
<p class="italic">那一天知道你要走，我们一句话也没有说，当午夜的钟声敲痛离别的心门，却打不开你深深的沉默。</p>
<p class="oblique">轻轻的我将离开你，请将眼角的泪拭去，漫漫长夜里，未来日子里，亲爱的你别为我哭泣。</p>
```

css代码如下:

```css
/*字体风格：normal,italic,oblique*/
.normal {
    font-style:normal;
}
.italic {
    font-style:italic;
}
.oblique {
    font-style:oblique;
}
```

以上[示例](./docs/css/html/css-code-3-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-1.html"></iframe>

## CSS字体粗细“font-weight”

该分支属性用于设置字体粗细度，表现出来的效果和默认的`<b>`和`<strong>`这类标签是一致的，它拥有以下属性值：

* normal：正常粗细。
* bold：粗体。
* bolder：更粗的字体。
* lighter：更细的字体。
* 100 ~ 900：步长为100。其中400等同于normal，700等同于bold。
* 
让我们来看一个简单的示例吧。

html代码如下:

```html
<p class="normal">今天我寒夜里看雪飘过。怀着冷却了的心窝漂远方。风雨里追赶，雾里分不清影踪，天空海阔你与我。</p>
<p class="bold">我多想回到家乡，再回到她的身旁，看她的温柔善良，来抚慰我的心伤。</p>
<p class="bolder">就在启程的时刻，让我为你唱首歌，孤独时候要记得想起我，等到相遇的时刻，我们再唱这首歌，就像我们从未曾离别过。</p>
<p class="lighter">多少人曾爱慕你年轻时的容颜，可知谁愿承受岁月无情的变迁，多少人曾在你生命中来了又还，可知一生有你我都陪在你身边。</p>
<p class="number">fly with me，in the perfect world，go with me just like a bird，没什么能阻挡自由的天地。</p>
```

css代码如下:

```css
/*字体粗细：normal,bold,bolder,lighter,600*/
.normal {
    font-weight: normal;
}

.bold {
    font-weight: bold;
}

.bolder {
    font-weight: bolder;
}

.lighter {
    font-weight: lighter;
}

.number {
    font-weight: 600;
}
```

以上[示例](./docs/css/html/css-code-3-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-2.html"></iframe>

## CSS字体大小“font-size“

该分支属性用于设置字体大小，可设置的值可以是任意正整数和浮点数，但考虑到Chrome等主流浏览器不支持12像素以下的字体，若字号以像素为单位，或通过设置其它单位转换为的像素值不应该小于12像素 （可以利用CSS3的transform的scale值进行缩放）。

“单位”是CSS里度量值必须附上的，纯数值的属性值会被视为是无效属性，常用的字号单位有：

 * px——像素。
 * em——当前父元素内的默认字体大小。
 * %——相对于浏览器默认字体大小的百分比。
 * rem——相对于`<html>`标签字体大小的浮点数百分比，所以我们建议在对CSS进行初始化的时候，总是给`<html>`标签一个设置字体的属性，一般可以设置为16像素（默认），也可以设置为62.5%，让其成为10px（16px * 62.5% = 10px）,这样更便于rem的浮点计算。
 * pt——点（1px = 0.75pt）。
 * ex—— 相当对于字母“x”的高度。
 * pc——派卡。
 * mm——毫米。
 * cm——厘米。
 * in——英寸。

需要明白的一个常识，除非人为的对浏览器的设置进行了更改，否则目前浏览器的主流的字号都是采用16像素（px）的字体。下面来看一个示例如下:

html代码如下:

```html
<article>
    <span class="fs-16px">你牵我走弯弯的小巷（16px）</span>
    <span class="fs-1em">你牵我走弯弯的小巷（1em）</span>
    <span class="fs-100p">你牵我走弯弯的小巷（100%）</span>
</article>
<article>
    <span class="fs-24px">时光时光慢些吧（24px）</span>
    <span class="fs-1d4em">时光时光慢些吧（1.4em）</span>
    <span class="fs-150p">时光时光慢些吧（150%）</span>
</article>
<article>
    <span class="fs-32px">妈妈，嘿（32px）</span>
    <span class="fs-2em">妈妈，嘿（2em）</span>
    <span class="fs-200p">妈妈，嘿（200%）</span>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
article {
    display: block;
    text-align: center;
}
/*设置字体大小：字号单位为像素，em，百分比*/
.fs-16px{
    font-size: 16px;
}
.fs-24px{
    font-size: 24px;
}
.fs-32px {
    font-size: 32px;
}
.fs-1em{
    font-size: 1em;
}
.fs-1d4em{
    font-size:1.4em;
}
.fs-2em{
    font-size: 2em;
}
.fs-100p{
    font-size: 100%;
}
.fs-150p{
    font-size: 150%;
}
.fs-200p{
    font-size: 200%;
}      
```

以上[示例](./docs/css/html/css-code-3-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-3.html"></iframe>

## CSS字体系列“font-family”

该分支属性用于设置字体系列，就是我们通常说的“所用字体”。设置字体有以下规则，使用中文字体，或带空格的英文字体名，需要用“引号”将该字体名扩起来，单个单词的字体名称则无需加上引号。“font-family”可以有多个值，多个值设置的作用是，当浏览用户本地计算机没有找到设置的第一个值所表示的字体时，会去找第二个，以此类推，若找到最后一个值都没有找到匹配的字体，浏览器则会用自己的默认字体。考虑到网页最终显示效果在不同设备上的一致性，我们通常使用的中文字体只有：“宋体”、“微软雅黑”、“黑体”、“楷体”、“幼圆”等，而目前以“微软雅黑”为最常用设计字体。常用的英文字体有：“Arial”、“Helvetica”、“Tahoma”、“Verdana”、“Lucida Grande”、“Times New Roman”、“Georgia”等。

来看一个简单的示例:
  
html代码如下:

```html
<article>
    <span class="font-song">一场雨，把我困在这里，你冷漠的表情，会让我伤心，六月的雨，就是无情的你，伴随着点点滴滴，痛击我心里。</span>
</article>
<article>
    <span class="font-arial">岁月难得沉默，秋风厌倦漂泊，夕阳赖着不走，挂在墙头舍不得我，昔日伊人耳边话，已和潮声向东流，再回首，往事也随枫叶一片片落。</span>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
.font-song,.font-arial {
    line-height: 160%;
    font-size: 26px;
}
.font-song {
    font-family: "宋体";
}
.font-arial {
    font-family: "Arial";
}
```

以上[示例](./docs/css/html/css-code-3-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-4.html"></iframe>

另外，字体系列分为两大类，一类为“serif”（衬线字体），另一类为“sans-serif”（无衬线字体），以衬线字体为代表的中文字体是“宋体”，以无衬线字体为代表的是“微软雅黑”。衬线字体的笔画有明显的修饰。而无衬线字体没有修饰，会更加的浑厚饱满。现代的设计基本都偏向于无衬线字体。

两类字体系列的对比如图所示：

<div class="image-container">
    <img src="./docs/css/images/Sans-SerfitOrSerif-cn.jpg" alt="图片3-1" title="图片3-1" >
    <span class="image-title">图 3-1 </span>
</div>

<div class="image-container">
    <img src="./docs/css/images/Sans-SerfitOrSerif-en.jpg" alt="图片3-2" title="图片3-2" >
    <span class="image-title">图 3-2 </span>
</div>

在做网站开发的时候，出于谨慎起见，我们一般都会在设置字体系列后面再添加一个字体系列类型的补充。以我们要为一标签设置“微软雅黑”并且使用用户默认的无衬线字体为例，就应该写为：

```css
div {
    /*微软雅黑并且无衬线字体*/
    font-family: "微软雅黑",sans-serif;
}
```

## CSS字体组合写法

在字体设置中，除了为“font”的具体分支属性设置样式，我们还能将“font”的多个值组合起来写。组合写法结构如下:

```css
font:"字体风格(font-style)" "字体粗细(font-weight)" "字体大小(font-size)" "字体系列(font-family)";
```

例如以下一个示例:

html代码如下:

```html
<article>
    <p class="set-font-1">我听见，海浪的声音，站在城市的最中央，我想起，眼泪的决心，你说愿意的那天起。</p>
    <p class="set-font-2">有一个美丽的小女孩，她的名字叫作小薇，她有双温柔的眼睛，她悄悄偷走我的心。</p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}

.set-font-1 {
    /*正常风格加粗26px的微软雅黑字体*/
    font: normal bold 26px "微软雅黑";
}
.set-font-2 {
    /*斜体风格更粗28px的宋体字体*/
    font: italic bolder 28px "宋体";
}                 
```

以上[示例](./docs/css/html/css-code-3-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-5.html"></iframe>

字体风格和字体粗细我们还可以省略其一或者是两者都省略，省略的会采用默认的字体样式,即“normal”表示正常风格正常粗细。例如以下一个示例:

html代码如下:

```html
<article>
    <p class="set-font-1">一个人的街，寒风凛冽，这种心情你不会了解，独自游荡，在孤寂的夜，走破这双鞋，忘掉这一切。</p>
    <p class="set-font-2">为何你对我许下了承诺，让我为你付出那么多，以为我会是你唯一寄托，只有我能永远给你快乐。</p>
    <p class="set-font-3">其实很寂寞，只是不想说，说给你听又如何，其实很寂寞，只是不想说，伪装自己的脆弱。</p>
    <p class="set-font-4">伤心的时候可以听情歌，忧伤的旋律可以赶走失落，寂寞的时候可以听情歌，忧郁的歌声可以带来快乐。</p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
.set-font-1 {
    /*斜体正常粗细18px的微软雅黑字体*/
    font: italic 18px "微软雅黑";
}
.set-font-2 {
    /*正常风格加粗20px的幼圆字体*/
    font: bold 20px "幼圆";
}
.set-font-3 {
    /*正常风格正常粗细25px的华文琥珀字体*/
    font: normal 25px "华文琥珀";
}
.set-font-4 {
    /* 正常风格正常粗细32px的黑体字体 */
    font: 32px "黑体";
}
```

以上[示例](./docs/css/html/css-code-3-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-6.html"></iframe>

但有一点需要强调的是，在“font”组合值的写法中，只有“font-size”和“font-family”这两个的值是不能省略的，而且是缺一不可，否则浏览器会不认识该值，对该组合值进行报错。

“font”属性组合值的写法，除了以上所提到的，它还有一种比较不常见，却还比较实用的写法，即可直接在“font”属性内设置文本的行高“line-height”，写法结构如下所示:

```css
font:"字体风格(font-style)" "字体粗细(font-weight)" "字体大小(font-size)" / "行高(line-height)" "字体系列(font-family)";
```

例如以下一个示例:

html代码如下:

```html
<article>
    <p class="set-font-1">
        当我孤独的时候还可以抱着你，那该有多甜蜜。当我寂寞的时候还可以想着你，那该有多幸运。当我孤独的时候就这样抱着你，一辈子不放弃。当我寂寞的时候就这样想着你，一生都只为你珍惜。
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}

.set-font-1 {
    /*斜体风格更细25px行高2em的隶书字体*/
    font: oblique lighter 25px / 2em "隶书";
}
```

以上[示例](./docs/css/html/css-code-3-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-7.html"></iframe>

## 创建引用特殊字体“@font-face”

对于绝大多数普通用户而言，系统内置可用于Web显示且可读性好的字体系列并不多。也就是说，如果开发者在CSS里设置上了一个自己通过特殊途径下载安装的字体，那在其它没有安装该字体的用户设备上是无法显示的（会被浏览器默认字体替代）。

这个时候我们就可以通过CSS的字体创建功能“@font-face”来进行特殊字体的引用和字体系列的创建。“@font-face”比较特殊，它既不是一个选择器也不是一个属性，而是一个定义。需要注意的是，我们利用这个功能通常只用于引用创建特殊的英文，而中文由于字符数量过大一般不会使用该功能，因为标准的Unicode就包含6万个汉字编码，稍微完整一点的特殊字体库体积都在10MB以上，这在国内现今参差不齐的网速下很难保证快速加载。但随着宽带基础建设的不断发展，5G网络逐步的商用普及，以后中文字体也慢慢可以开始使用“@font-face”来引用创建了。

为了说明这个问题，[XX大佬](https://gitee.com/aulence)专门做了一个测试。选择了一个3.4MB的小型中文字体库进行在线引用。测试环境为“电信100兆家庭宽带”，过程如图：

<div class="image-container">
    <img src="./docs/css/images/font-download-test.gif" alt="图片3-3" title="图片3-3" >
    <span class="image-title">图 3-3 </span>
</div>

好消息是字体文件可以被浏览器缓存，也就是说，只要用户的浏览器下载过一次这个字体，并且他没有手动清空过浏览器缓存，那这个字体以后会直接从浏览器所占用的[磁盘缓存（Disk cache）](https://baike.baidu.com/item/%E7%A3%81%E7%9B%98%E7%BC%93%E5%AD%98/2047109?fr=aladdin)进行加载。上面字体引用的关键CSS代码如下：

```css
@font-face {
    /*该名称是自己定义的*/
    font-family:YCPrincess;
    /*引入该字体文件,路径依据你的字体文件所在而定*/
    src:url("/static/data/web/CSS/font/YCXiaoGongZhuTi-Regular.ttf");
}
body {
    /*定义好了的字体，我们要引用只需要使用定义好的字体名称，例如这里的：YCPrincess*/
    font:48px YCPrincess "微软雅黑" san-serif;
}
```

体文件可以是引用在线的，也可以使用本地的，而且不同浏览器对各种字体格式（指字体文件后缀名部分）支持又不完全一样，所以要让所有浏览器都支持同一种格式的字体目前还不可能。但随着浏览器技术的发展，和各大浏览器厂商开始妥协，相信单个浏览器能支持的格式会变得更多。除此之外，常用的格式还有几种格式，我们将他们和浏览器开始支持的版本情况做成了一张表格，方便大家以后进行对照。

| 字体格式                    | Chrome | Opera  | Firefox | Safari | Edge  | Internet Explore （IE） | iOS Safari | Android Brower |
| --------------------------- | ------ | ------ | ------- | ------ | ----- | ----------------------- | ---------- | -------------- |
| TureTpe(.ttf)               | 4 +    | 10 +   | 3.5 +   | 3.1 +  | 12 +  | ×                       | 2.4 +      | 2.2 +          |
| OpenType(.otf)              | 4 +    | 10 +   | 3.5 +   | 3.1 +  | 12 +  | ×                       | 2.4 +      | 2.2 +          |
| Web Open Font Format(.woff) | 5 +    | 11.5 + | 3.6 +   | 5.1 +  | 12 +  | 9 +                     | 5 +        | 4.4 +          |
| Embedded Open Type(.eot)    | ×      | ×      | ×       | ×      | ×     | 6 +                     | ×          | ×              |
| SVG(.svg)                   | ×      | ×      | ×       | ×      | 3.2 + | ×                       | 3.2 +      | ×              |

我们可以大概的看到，浏览器支持字体格式的情况和支持音频、视频的情况类似，而现在“.woff”还出现了“.woff2”的新格式，所以情况就更为复杂了。好在CSS里又给出了一种方案，可以让浏览器去加载自己支持的字体，写法如下：

```css
@font-face {
    font-family:"自定义字体文件名称，如：testFont";
    src:url("字体文件路径，注意字体文件格式，如：../fonts/test-font.eot");/*IE6*/
    src:url("字体文件路径，注意字体文件格式，如：../fonts/test-font.eot?#iefix") format("字体文件格式，如：embedded-opentype"),/*IE6-IE9*/
        url("字体文件路径，注意字体文件格式，如：../fonts/test-font.woff") format("字体文件格式，如：woff"),/*主流浏览器*/
        url("字体文件路径，注意字体文件格式，如：../fonts/test-font.ttf") format("字体文件格式，如：truetype"),/*Safari，andriod，IOS*/
        url("字体文件路径，注意字体文件格式，如：../fonts/test-font.svg#test-font") format("字体文件格式，如：svg");/*传统IOS*/
}
```

通常我们下载的字体只有一种格式，需要这么多种格式的文件需要用到特定的转换软件来逐一导出不同的字体文件格式，实际执行也会比较麻烦，如不是比较特殊情况我们一般都不会去这样做。不过现在的CSS库（又叫作Web UI库）采用的字体图标基本都是以这种方式来引用的，它们看上去像图片，其实也算作是字体，可以通过我们本章所学的内容对其进行各种设置（如通过“font-size”控制大小，“color”控制颜色）。以下是对“Layui”这个CSS库所引用字体图标的其中一部分截图：

<div class="image-container">
    <img src="./docs/css/images/Layui-font_icon-part.png" alt="图片3-4" title="图片3-4" >
    <span class="image-title">图 3-4 </span>
</div>

我们对它所使用的字体图标这段CSS代码进行了截取：

<div class="image-container">
    <img src="./docs/css/images/css-layui-code.png" alt="图片3-4" title="图片3-4" >
    <span class="image-title">图 3-4 </span>
</div>

代码中的“?v=250”的部分叫做链接的“<em class="hover-info" data-title="这是前端与后台服务器通讯相关的一个名词术语">参数</em>”是让浏览器清除文件缓存的一种手段，对文件的代码功能没有任何影响，大多是靠自动化构建工具生成，也可以手动为文件添加（我们可以引用一个在线字体，通过这种方式多变动几次“?”后面的参数内容并同时刷新浏览器，在Chrome开发者工具的“Network”一栏里观察文件下载和缓存的情况）。而单独对于字体图标而不依赖于CSS库的使用，这在我们后面会学习到。

我们来看一个示例:

html代码如下:

```html
<p>翻开日记，整理破碎的心情。不知怎么，你什么都已记不清。但我相信，只要相爱就有魔力。但是换来，一次又一次失意。你我的爱，像融化的冰淇凌。虽然很甜，却没有了那种晶莹。我会每天，反反复复给你温习。找回那份，遗失的专属甜蜜。怎么会忘了情，让我丢了你。傻傻的，还以为能够在一起。划过了流星，身边没有你。就算梦实现也没意义。</p>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
@font-face {
    font-family: XY;
    /*这里的字体路径依据自身项目情况而定*/
    src:url("../fonts/XiaoYu-CN.ttf") format("truetype");
}
p {
    font: italic 500 48px / 100% XY;
}
```

以上[示例](./docs/css/html/css-code-3-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-3-8.html"></iframe>

## CSS字体颜色

在目前的浏览器标准中，要想改变浏览器默认字体的颜色唯一的途径就是通过CSS的“color”属性进行设置。颜色属性可以设置4种模式的值：

* 颜色英文单词：可以通过颜色的英文单词直接设置文本的颜色，如“red”、“orange”、“yellow”、“green””、“cyan”、“blue”、“purple”、“pink”、“gray”、“black”和“white”等等。

* HEX（16进制颜色）：通过“#”+16进制表示颜色，有“#”+“三位”和“#”+“六位”的形式。若是“三位”的形式，第一位表示“红”，第二位表示“绿”，第三位表示“蓝”，通过取值区间“0-9”,“a-f”(10-15)的组合，如“#26f”，共计能表达4,096个颜色。若是“六位”的形式，可以表示的颜色数更加细致，第一二为表示“红”，第三四位表示“绿”，第四五位表示“蓝”，同样也是通过取值区间“0-9”,“a-f”的组合，如“#2369fd”，共计能表达16,777,216个颜色。

* RGBa/ARGB（Alpha的三原色）：和“HEX”表示三原色一样，该模式同样也是采用三元色的值来表现色彩，不过“RGBa”颜色模式采用的是10进制的值，格式如“rgb(34, 102, 255)”，值之间用英文逗号“,”进行分割，第一个值表示“红”，第二个值表示“绿”，第三个值表示“蓝”，每个值的区间为“0-255”（256个色阶），共计同样也能表示16,777,216个颜色。除此之外，该模式还支持对不透明度的设置，也就是“RGBa”里面的这个“a”（alpha），它表示不透明度，取值区间是“0到1”之间的浮点数（可保留到两位小数），“0”表示完全透明，“1”表示完全不透明，写法如“rgba(34, 102, 255, 0.55)”、“rgba(34, 102, 255, .9)”或“rgb(34, 102, 255)”。

* HSLa（Alpha的Hue、Saturation、Lightness：该模式通过设置“色调”（Hue）、“饱和度”（Saturation）、“亮度”（Lightness）和“不透明度”（Alpha）来表现色彩的，不透明度的表示和“RGBa”一样，我们主要来看下面三个值的意义：
  * 色调:除开“黑色”和“白色”从纯红色过度到纯蓝色再过度到纯红色这一过程的颜色轴的区间，共计360个色调。
  * 饱和度:从该色调的纯黑到该色调的纯色区间，越接近黑色，饱和度越低，越接近纯色，饱和度越高。
  * 亮度:从“纯黑”到“纯白”这一过程的表示，越接近黑色亮度越低，越接近白色亮度越高。例如以下的示例:

<div class="ew-code-compiler">
    <p style="color: HSLa(316, 75%, 56%, 0.9);">这是一个色调为316，饱和度75%，亮度56%，不透明度0.9的颜色--HSLa(316, 75%, 56%, 0.9)</p>
    <p style="color: HSL(76, 35%, 45%);">这是一个色调为76，饱和度35%，亮度45%，不透明的颜色--HSL(76, 35%, 45%)</p>
</div>  

* Transparent（透明）：只要设置该值，那文本的内容将变为完全透明，即无论背景为什么颜色或图片，都会完全看不到设置的文字元素，只是起到了一个占位作用，除非文本被选中，如下例：

<div class="ew-code-compiler">
    <em style="background-image: url('./docs/css/images/rgba_bg-01.jpg');color:transparent;">你在等待着谁，建筑了城堡，等待着天鹅的气息藏不住你空虚的心灵。</em>
</div> 

需要补充的是，“IE 8”浏览器及以下的版本不支持“RGBa”、“HSLa”模式及“Transparent”值，即不支持透明度部分的值，对常规“RGB”和“HSL”模式仍能正常支持。

除了上述颜色模式外，还有一些格式我们基本没有机会接触到，所以在这里就不一一讲解了。只是如果当你需要将图片通过打印机打印出来的时候需要在PS（Photoshop）、LR（LightRoom）等软件将颜色模式调整为<em class="hover-info" data-title="一种用于打印机的颜色模式，（C：Cyan，青色。M：Magenta，洋红色。Y：Yellow，黄色。K：BlacK，黑色）">CMYK</em>。理论上只用上述三种颜色相加就可以形成包含黑色在内1013共1,030,301色（0 ～ 100%模式），但实际印刷时，由于色料本身并非真正纯色，三色等量相加之后只能形成一种深灰色或深褐色，而非黑色；实际偏色程度依不同厂牌色料配方而有不同差异。

下图为CMYK的混色模式：

<div class="image-container">
    <img src="./docs/css/images/color_model-cmyk.svg" alt="图片3-5" title="图片3-5" >
    <span class="image-title">图 3-5 </span>
</div>

字体颜色的示例已经够多了，这里就不举例了。