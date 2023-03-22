# HTML介绍与描述

## HTML简介

**HTML(HyperText Markup Language) 超文本标记语言**,是一种创建网页标准的语言。你可以使用HTML语言来建立自己的web站点,将这门语言运行在浏览器上,就由浏览器来解析并运行。

它是由上个世纪90年代由欧洲核子研究中心的物理学家蒂姆·伯纳斯-李（Tim Berners-Lee）发明。它的最大特点就是支持超链接，可以跳转到其他网页，从而构成了整个互联网。1999年，HTML4.01版发布，成为广泛接受的HTML标准。2014年，HTML5发布，这是目前正在使用的版本。

提起浏览器的网页开发，涉及三种技术：HTML、CSS和JavaScript。HTML语言定义网页的结构和内容，CSS样式表定义网页的样式，JavaScript语言定义网页与用户的互动行为。

浏览器访问网站，其实就是从服务器下载 HTML代码，然后渲染出网页。

## HTML基本文档结构

### HTML基本文档结构

既然HTML是一种标记语言,所以HTML就是由标签(Tag)来组成。HTML的基本文档结构也就由一个根节点`<!DOCTYPE html>`和一个HTML标签组成。如以下一个示例:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>网页标题</title>
    </head>
    <body>
        网页的内容
    </body>
</html>
```

在一个HTML文档中,标签是不区分大小写的,但是为了提高可读性,所以还是建议小写为主。先来解释一下以上各个标签代表的含义:

* `<!DOCTYPE html>`:
    * 表示文档声明为HTML5,HTML现如今已经发展到第五个版本,后面会一一叙述前面的四个版本。
* `<html lang="en">`:
    * 该标签元素是组成一个网页的必不可少的元素,所以称之为**根元素**,其中lang为语言类型，en代表英文，而中文则是zh,简体中文则是zh-cn。
* `<head>`:
    * 如果把网页抽象成一个人,那么文档声明就是把他声明成一个人,一个人由最基本的头和身体组成,所以不言而喻,这个就是头的意思,严格上来说,这个就是定义文档的元数据。
* `<meta>`:
    * 不包含任何内容，并且没有结束标签。它是通过对应的属性来设置**编码格式（必要）**、设备显示缩放、搜索引擎关键字、描述、浏览器内核渲染方式等内容[参考文献](./docs/html/other/meta/index.html)。
* `<title>`:
    * 一个网页的标题。不需要设置任何属性，只需包含纯文本内容，用于显示网页标题，在浏览器端会将该标签内设置的文本内容显示于浏览器标签页上。如：`<title>HTML基本文档结构</title>`，在浏览器标签页上的显示效果就如下：
    
<div class="image-container">
    <img src="./docs/html/images/browerMarkup.jpg" alt="图片1-1" title="图片1-1" >
    <span class="image-title">图 1-1 </span>
</div>

* `<body>`:
    * 一个网页的身体,网页的所有内容都写在这里面,以上的所有标签,我们在网页页面当中是看不到的,我们通常看到的就是写在这里的内容。

例如前面的[示例](./docs/html/html/html-code-1-1.html)代码运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-1-1.html"></iframe>

> 熟记HTML的基本文档结构尤其重要。因为只有熟记了才能继续往后学习。

### 文档流

所谓文档流就是HTML文档中<em class="hover-info" data-title="在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的">可显示元素</em>在排列时所占用的位置。HTML文档流中的标签元素遵循“从左到右、从上到下”的排列次序，犹如现代汉字的书写顺序一样，但又存在着一些差别。如：

```html
<div>
    <p>
        <span>语动流水心甚乱，倍思闲。</span>
    </p>
</div>
<div>
    <p>
        <span>尝望天，复见，日悠然。</span>
    </p>
</div>
<div>
    <p>
        <span>争忍不为情？又羞赧。</span>
    </p>
</div>
<div>
    <p>
        <span>送我心，安你心，已然迷伊颜。——《诉衷情》</span>
    </p>
</div>
```

以上[示例](./docs/html/html/html-code-1-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-1-2.html"></iframe>

有一些CSS属性可以让指定的元素脱离文档流，也就是忽略元素的默认定位属性（position:static），将元素重新定位（“position:absolute”和“position:fixed”）或浮动（“float:left”和“float:right”）到指定位置以适应页面的布局需要，还有一个有些争议的脱离文档流的方式，就是将CSS的“display”属性值设置为“none”，之所以说有争议就是要看怎么去划分“脱离”和“隐藏”这两个词界限了。

## HTML标签

### HTML标签介绍

标签:标签通常由一对或者一个尖括号("`<>`")括起来的关键词,值得提醒的就是由于程序语言都是英文开发的,所以编写标签也是在英文状态下。标签通常都是成对出现,如`<p>这是一个文本标签</p>`。成对出现的标签,前面第一个称之为开放标签,也可以叫做开始标签,而后面需要加上"/"符号的叫做闭合标签(结束标签)。例如以下一个示例:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>网页标题</title>
</head>
<body>
    <p>我是一个文本标签</p>
</body>
</html>
```

编写完成之后,保存为.html的格式,如以下图:

<div class="image-container">
    <img src="./docs/html/images/html-file.png" alt="图片1-2" title="图片1-2" >
    <span class="image-title">图 1-2 </span>
</div>

然后通过浏览器打开这个[示例](./docs/html/html/html-code-1-3.html),我们会看到如下:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-1-3.html"></iframe>

> 所以一个标签的组成也就是由标签加上标签里面的内容。当然后续学了CSS之后你会发现还有属性名和属性值,现在我们就只需要记住这两个组成就是了。

### HTML标签的嵌套

所谓标签的嵌套，是指一个标签对以内包含另外一个标签，如：`<html>`标签内包含`<head>`和`<body>`两个标签对，而`<head>`标签内又可以包含`<meta>`和`<title>`等标签。也就是说标签不仅可以单独存在，又可以包含其它一个或多个标签，而且标签的嵌套可以是多层的，并且嵌套层数是没有限制的。

标签的嵌套根据代码规范性、性能和<em class="hover-info" data-title="搜索引擎优化">SEO</em>等方面考虑，应当遵循以下规则：

* HTML页面中所有需要显示在浏览器窗口内的内容均需要放置在`<body>`标签对以内。
* 在不影响页面显示、CSS样式设置和<em class="hover-info" data-title="通常是指JavaScript对HTML页面标签元素的各种操作">DOM操作</em>的前提下，标签的嵌套层数是越少越好。
* 标签嵌套的基本顺序应该是“<em class="hover-info" data-title="即CSS中的“display”属性值为“block”的元素">块级标签</em>&gt;<em class="hover-info" data-title="即CSS中的“display”属性值为“inline-block”的元素">行内块标签</em>&gt;<em class="hover-info" data-title="即CSS中的“display”属性值为“inline”的元素">行内标签</em>”（这些显示类型会在以后的学习中慢慢地指引大家进行识记）。
* 同一个显示类型的标签可以进行嵌套，如：“块级标签>块级标签”（`<p>`标签比较特殊，会在后续章中讲到）、“行内块标签>行内块标签”和“行内标签>行内标签”。
* 避免使用“行内标签”去嵌套“行内块标签”和“块级标签”、“行内块标签”去嵌套“块级标签”，虽然有的时候在显示上并不会出现问题，但“行内标签”大部分是不具备<em class="hover-info" data-title="如元素的大小、位置等">布局属性</em>的，需要进行<em class="hover-info" data-title="通过设置“display”属性去实现">显示类型转换</em>才能够进行CSS的布局设置，既麻烦，又不规范。

我们可以通过这样一幅图来理解HTML文档中元素的“显示类型”及嵌套关系：

<div class="image-container">
    <img src="./docs/html/images/css-display.jpg" alt="图片1-3" title="图片1-3" >
    <span class="image-title">图 1-3 </span>
</div>

关于元素“显示类型”的类型种类和标签“显示类型”的分类，我们会在“CSS”课程分类中的“CSS显示与定位”章节中更加详细的讲解和分析，在本章内容中只需要大家在脑中建立起一个HTML基本文档结构的嵌套模型。  