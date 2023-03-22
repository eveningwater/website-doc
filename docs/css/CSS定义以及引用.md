# CSS定义以及引用

## css简述

css:(cascading style sheets):层叠样式表。用于定义HTML标签元素的显示样式,起到美化页面效果。

## 示例展示

CSS有多强大，我们来看如下的几个示例就知道了，你能相信如下的几个示例是用CSS实现的吗?

### css画一个油画美女

* 点击单独打开[示例1](./docs/css/other/francine/index.html)查看: css画一个油画美女。

<!-- <iframe class="ew-transparent-iframe" src="./docs/css/other/francine/index.html"></iframe> -->

### css画一个皮卡丘

* [示例2](./docs/css/other/pkq/index.html): css画一个皮卡丘。

<iframe class="ew-transparent-iframe" src="./docs/css/other/pkq/index.html"></iframe>

### css实现人物行走的动画

* [示例3](./docs/css/other/peopleWalk/index.html): css实现人物行走的动画。

<iframe class="ew-transparent-iframe" src="./docs/css/other/peopleWalk/index.html"></iframe>

### css实现哆啦A梦

* [示例4](./docs/css/other/doraemon/index.html): css实现哆啦A梦。

<iframe class="ew-transparent-iframe" src="./docs/css/other/doraemon/index.html"></iframe>

### css实现3D发光字

* [示例5](./docs/css/other/3Dword/index.html): css实现3D发光字。

<iframe class="ew-transparent-iframe" src="./docs/css/other/3Dword/index.html"></iframe>

### css实现3D旋转盒子

* [示例6](./docs/css/other/3dbox/index.html): css实现3D旋转盒子。

<iframe class="ew-transparent-iframe" src="./docs/css/other/3dbox/index.html"></iframe>

### 更多示例

我们再来看这个示例，让计算机写CSS代码，然后实现一个简单的皮卡丘（需要有耐心等待计算机写完代码）。如果你没有耐心，可以点击这个按钮<button class="ew-btn ew-btn-mini ew-btn-primary ml-5 mr-5" id="endDrawBtn">画完皮卡丘</button>。

如果你想重新开始观察动画，可以点击<button class="ew-btn ew-btn-mini ew-btn-primary ml-5 mr-5" id="startDrawBtn">开始画皮卡丘</button>。

你甚至可以输入速度:<input class="ew-input" placeholder="请输入1 ~ 100 的数字" id="drawSpeedInput">,然后点这个按钮<button class="ew-btn ew-btn-mini ew-btn-primary ml-5 mr-5" id="drawBySpeedBtn">根据速度画皮卡丘</button>看画皮卡丘的速度。

<iframe class="ew-transparent-iframe" src="./docs/css/other/pikaqiu.html" id="drawIframe"></iframe>

类似的还有很多示例,例如[404页面](https://www.eveningwater.com/404.html)。可以这么说，只有你想不到的，没有CSS做不到的，接下来让我们敲开这神秘的CSS世界吧。

## css组成

css主要有两部分构成,第一部分就是选择器,第二部分则是声明,声明由一对花括号"{}"加上属性名和属性值构成。结构如下:

```css
/*css代码结构*/
选择器 {
    属性名:属性值;
}
```

属性名后面需要加上英文冒号":",属性值后面需要加上英文分号";"。 选择器主要有id选择器,标签选择器,类选择器,以及属性选择器,通配选择器5种。 我们先来看一个简单的css示例:

html代码如下:

```html
<div>div标签内容</div>
```

css代码如下:

```css
/*将div标签的字体颜色设置为红色*/
div {
    color:#f00;
}
```

以上[示例](./docs/css/html/css-code-1-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-1-1.html"></iframe>

通过上面简单示例,我们不难看出,css的结构。 div表示标签选择器,是选择器的一种,color是属性名,表示字体颜色, 然后后面的#f00是属性值,表示字体颜色为红色。

## css引用

css的使用方式主要有4种,分别是行内样式,内嵌样式,外链样式,导入式样式。

### 行内样式

* 行内样式：是将“style”作为一个标签的属性，然后通过它的值来设置样式。写法如下：
  
```html
<div style="css属性名:css属性值;"></div>
```

也就是在标签中加上一个“style”属性,然后后面跟上"="符号,以及双引号或者单引号,引号里面就是属性名加上冒号加上属性值。 (注意所有的符号都是英文状态下的符号)。来看一个简单的示例:

```html
<div style="color:#f00;width:300px;height:50px;border:1px solid #000;">将字体颜色设置为红色宽为300px,高为50px加上一个边框就可以看到宽高了</div>
```

运行效果如下图所示:

<div class="ew-code-compiler">
    <div style="color:#f00;width:300px;height:50px;border:1px solid #000;">将字体颜色设置为红色宽为300px,高为50px加上一个边框就可以看到宽高了</div>
</div>

### 内嵌样式

* 内嵌样式：是将样式作为一个标签放置于`<head>`标签对以内，让浏览器在加载完成其它基本信息后，首先将样式给渲染出来。标签名为“`<style>`”，若项目采用的是HTML严格模式/标准模式(standard mode)开发，那需要为该标签添加一个指定MIME的属性“type”，将值设为“text/css”。写法如下：

```html
<!--一般写法-->
<style>/*样式内容*/</style>
<!--严格模式/标准模式下写法-->
<style type="text/css">/*样式内容*/</style>
```

来看一个简单的示例:

html代码如下:

```html
<div>标签内容</div>
```

css代码如下:

```css
/*将div标签内的字体颜色设置为蓝色*/
div {
    color:#0ff;
}
```

以上[示例](./docs/css/html/css-code-1-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-1-2.html"></iframe>

### 外链样式

* 外链样式：同样是将`<link>`放置于`<head>`标签对以内，通过该标签的“href”属性的值去获取CSS文件的绝对/相对路径。该标签必须要具有“rel”属性，并且将值设为“stylesheet”,否则浏览器将不能正确的解析CSS文件进行样式渲染。来看一个简单的示例:

html代码如下:

```html
<div>通过加载外部的css文件来跟div标签添加样式</div>
```

css代码如下:

```css
div {
    width:300px;
    height:100px;
    color:#0f0;
    background:#00f;
    border:1px solid #999;
}
```

以上[示例](./docs/css/html/css-code-1-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-1-3.html"></iframe>

### 导入式

* 导入式：该方法是在`<style>`标签的内容里通过“@import”方法来导入外部CSS文件，这点和通过`<link>`标签导入外部样式是一样的，但其它方面却有很大不同，我们后面会讲到。这种方式的写法是：

```css
<style>
    @import url("style.css");
</style>
```

让我们来看一个导入式的示例:

html代码如下:

```html
<div>通过导入式加载样式来给div标签添加样式</div>
```

css代码如下:

```css
div {
    width:400px;
    height:200px;
    background:#f6f6f7;
}
```

以上[示例](./docs/css/html/css-code-1-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-1-4.html"></iframe>

### 导入与外链的区别

通过以上的示例，我们可以看到`<link rel="stylesheet">`链接的CSS文件和用“@import”导入的CSS文件同是外部引用的方式，但他们却有以下区别:

* `<link rel="stylesheet">`除了加载CSS文件以外，它还能加载其它类型文件，如“icon”、“index”、“rss”等，它还能通过将“rel”的值设置为“prefetch”执行文件的预加载，而“@import”只能加载CSS文件。
* `<link rel="stylesheet">`在现代的浏览器中是多线程加载的，也就是说在通过该标签加载一个文件的时候`<body>`标签内的DOM也在执行同步的加载。而“@import”是一种“线性”的加载，加载效率不如`<link rel="stylesheet">`的方式。
* 无论在老版本的浏览器中，或者现在一些非主流的浏览器中，页面都是会首先加载`<link rel="stylesheet">`标签引用的样式并渲染，而“@import”在这些浏览器中会最后才去渲染CSS的样式，这样会让用户首先看到一个无样式的HTML界面，等CSS渲染完成之后才能最终看到完整样式的界面。
* `<link rel="stylesheet">`作为一个标签，也就是一个DOM元素，是可以通过JavaScript进行操作的（如增加、删除`<link rel="stylesheet">`标签，修改`<link rel="stylesheet">`的属性值等）。而“@import”写在`<style>`标签内部或CSS文件内（写在`<style>`标签内和CSS文件内的写法一致），是无法通过JavaScript进行操作的。

通过上述对比可以知道，`<link rel="stylesheet">`方式无论是性能上、显示顺序上还是可以操作性上来讲都是优于“@import”的。所以，如果我们要使用外部样式，那基本上都是通过`<link rel="stylesheet">`标签来引用的。

### CSS引用优先级

“优先级”的高低，即当一个选择器同时关联了两个同样的CSS样式时，被执行的那个CSS样式我们视为“优先级高”，被忽略的那个CSS样式我们视为“优先级低”。以上四种样式的引用方式，按照优先级从高到低排列分别是：

> 行内样式 > 内嵌样式 > 外链样式 > 导入样式

为了便于记忆，我们可以这样理解：越是离我们要设置样式标签元素近的CSS样式，那优先级越高，反之，优先级越低。当然在这里需要明白的是，CSS样式的引用优先级没有优先级越高越好或者优先级越低越好的说法，我们是要利用样式优先级这一特性，在使我们写更少的CSS代码同时，又使我们的Web页面表现力更加丰富。

### `<link>`引用CSS文件的优点

在实际的项目开发过程中，我们一般都是将CSS单独存放在一个文件夹中，然后在HTML页面中通过`<link rel="stylesheet" href="样式表路径+名称.css">`的方式进行引用。引用后CSS文件仍然是独立的，不会受到包括HTML和JavaScript任何方法和函数的影响，如果CSS文件中涉及到文件路径的相对位置，那么也是以CSS文件所在的文件路径位置为准，而非引用它的HTML文件的文件路径位置。

相对于“行内样式”和“内嵌样式”而言，“外链样式”即通过`<link rel="stylesheet">`标签引用CSS样式有以下好处：

* 简化了DOM结构，实现了内容和表现的分离，使HTML和CSS文件结构更加清晰，利于维护。
* 大大减少了CSS代码的编写量。项目越大，这一点体验得越明显。
* `<link rel="stylesheet">`可以和其它`<link rel="stylesheet">`、JavaScript文件以及`<body>`内的内容进行多线程加载，使得加载速度更快。
* 利于项目整体风格的调整，维护起来也更加便捷。单文件修改，全网站（应用）生效。
* 浏览器会将CSS文件进行缓存，进一步地减少了加载所需时间。
* 可以根据需要利用JavaScript或[Media](https://www.runoob.com/cssref/css3-pr-mediaquery.html)动态的组合所需的CSS文件。
* 对搜索引擎友好，有利于[SEO](https://baike.baidu.com/item/%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E4%BC%98%E5%8C%96/3132?fromtitle=SEO&fromid=102990)。