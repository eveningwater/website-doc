# CSS 盒子模型

## CSS 盒子模型简述

所谓“盒子模型”，即是将网页布局中的元素（能设置宽高的元素）进行拟物化的比喻，一个盒子是由“内容--content”（盒子内的物件）、“内间距--padding”（物件和盒壁的距离）、“边框--border”（盒壁）、“外间距--margin”（整个盒子和其它物体的距离）组成，如下示例图：

<div class="image-container">
    <img src="./docs/css/images/css-box-model.jpg" alt="图片5-1" title="图片5-1" >
    <span class="image-title">图 5-1 </span>
</div>

由于一些“客观”的原因，IE 浏览器和支持 W3C 标准的浏览器（也就是 5 大主流浏览器）的盒子模型有一定的差异，即 IE 浏览器的尺寸（“width”和“height”）包含了 content、padding 和 border 宽和高数值之和，它叫做“IE6 盒子模型”（简称“IE 盒子模型”）；而标准的盒子模型只包含 content 的宽和高部分的值，它们叫做“W3C 标准盒子模型”（简称“标准盒子模型”）。

> 注意:无论哪种盒子模型的尺寸都不包含“margin”属性的值。

一方面为了兼容 IE 浏览器，另一方面是 IE 的盒子模型在实际的布局中的确更容易控制。所以我们在实际的开发工作中，都是将标准的盒子模型转换为 IE 的盒子模型。转换方式是将 CSS 的样式属性“box-sizing”的值设为“border-box”。当然，如果我们要将 IE 的盒子模型转化为标准的盒子模型也是可行的，即将“box-sizing”的值设置为“content-box”。我们可以动手制作一个简单的页面实例，然后在开发者工具中进行对比查看。

> PS:如果你觉得以上的内容读不懂，可以看[<em>这里</em>](./docs/css/other/cssBoxModel/index.html)查看对 CSS 盒子模型的详细描述。

接下来让我们来看一个示例:

html 代码如下:

```html
<main>
  <div class="IE-box">IE6盒子模型</div>
  <div class="W3C-box">W3C盒子模型</div>
</main>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
body {
  font: 32px '微软雅黑';
}
div {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  background-clip: content-box;
  margin-right: 50px;
  color: #fff;
}
main {
  margin-top: 20px;
  overflow: hidden;
}
/*CSS核心代码在这里*/
main > div {
  width: 300px;
  height: 200px;
  background-color: #2396ef;
  border: 20px groove #996633;
  padding: 20px;
}
.IE-box {
  box-sizing: border-box;
}
.W3C-box {
  box-sizing: content-box;
}
```

以上[示例](./docs/css/html/css-code-5-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-1.html"></iframe>

在上例中，两个`<div>`都拥有完全一样的"width"、"height"、"padding"和"border"值，不一样的就只有“box-sizing”这个属性的值，但是生成视图后这两个元素的大小却差别很大。这就是因为 IE 盒子模型将"padding"和"border"的值都算在了"width"和"height"设置的值以内，而 W3C 标准盒子的"width"和"height"却没有包含"padding"和"border"的值部分。

很多时候，为了美化元素我们都是会给标签元素加上"padding"和"border"的，而当我们要使用百分比布局的时候 W3C 标准盒子模型会给我们带来一些麻烦。比如，现在希望制作一个两列的布局，我们将需要参与布局的元素的"width"属性值设置为“50%”，但是又给上了一些"padding"和"border"值，这个时候参与布局的这些元素的宽度实际上是大于“50%”，这就会导致一行的空间不能容纳 2 个元素，最终这些元素都是在独立的一行里显示的了，而 IE 盒子模型会将"padding"和"border"的值都算在"width"以内，就不会有这个困扰了。

我们来看一个示例如下:

html 代码如下:

```html
<main>
    <div class="ie-box">
        <div>暖阳下我迎芬芳，是谁家的姑娘，我走在了那座小桥上，你抚琴奏忧伤，桥边歌唱的小姑娘，你眼角在流淌，你说一个人在逞强，一个人念家乡，风华模样你落落大方，坐在桥上我听你歌唱。（IE6盒子模型）<div>
        <div>还有什么等待，还有什么悲哀，这故事中的人不太精彩，夏去了又回来，而人却已不在，它重复着我汹涌的忍耐，今年兰花又开，开了它也会败，我想要一个人活得精彩，有些人总会来，有些人在我心中在徊。（IE6盒子模型）</div>
    </div>
    <hr>
    <div class="w3c-box">
        <div>这一路上走走停停，顺着少年漂流的痕迹，迈出车站的前一刻，竟有些犹豫，不禁笑这近乡情怯，仍无可避免，而长野的天，依旧那么暖，风吹起了从前。（w3c盒子模型）</div>
        <div>想去远方的山川，想去海边看海鸥，不管风雨有多少，有你就足够，喜欢看你的嘴角，喜欢看你的眉梢，白云挂在那蓝天，像你的微笑。（w3c盒子模型）</div>
    </div>
</main>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
body {
  font: 16px '微软雅黑';
}
hr {
  margin: 2em 0;
}
.ie-box,
.w3c-box {
  overflow: hidden;
}
.ie-box > div,
.w3c-box > div {
  width: 50%;
  min-height: 100px;
  float: left;
  background-color: #f2a43e;
  color: #ffffff;
  border: 2px dashed #772234;
  padding: 10px;
}
.ie-box > div {
  box-sizing: border-box;
}
.w3c-box > div {
  box-sizing: content-box;
}
```

以上[示例](./docs/css/html/css-code-5-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-2.html"></iframe>

由于现在的主流浏览器都是采用 W3C 的标准盒子模型，很多新手在做两列布局的时候发现 50%的宽度并不会让两个元素在同一行内显示，于是就开始改成"49%"、"48%"、"47%"...还不行，那就"40%"吧，或者是直接使用固定像素。这些做法对于布局设计来说都是错误的。虽然说表面看上去没问题了，但只要缩放一下浏览器窗口，或者换一台不同分辨率的设备就容易出问题了。所以深入地了解两个盒子模型的区别，对于提高页面布局水平至关重要。

## 元素宽度“width”

该属性用于设置“非行内元素”（但不包含图像、框架和多媒体等标签）的宽度，该属性用于设置“非行内元素”（但不包含图像、框架和多媒体等标签）的宽度。通过设置“width”的宽度，在“IE 盒子模型”中，宽度是由“content + padding + border”组成的，也就是说在“IE 盒子模型”中，设置“width”的时候是无需考虑“padding”和“border”值的（这需在这两个属性的值都不大的时候，“padding”和“border”会压缩“content”的可显示空间）。而在“标准盒子模型”中，宽度只包含“content”，元素自带和人为设置的“padding”和“border”值都会增加元素额外的宽度。

在 HTML 中具有盒子模型属性的显示类型（display）主要有"块元素（block）"、"行内块(inline-block)"和一些特性与它们相近的显示类型，如"表格单元格（table-cell）"、"表格标题（table-caption）"、"列表项（list-item）"等。

“width”属性最常用的两种设置方式为“像素（px）”设置和“百分比（%）”设置。他们的特点如下：

- 像素设置:

> 优点：该方式去设置宽度更为的稳定，也就是说当一个元素是通过像素去设置元素宽度的时候，该元素的内容，特别是用像素去设置的文本内容也相对稳定，不会因为设备分辨率的不同而在排版显示上有所不同。

> 缺点：在不同设备上，需要对元素宽度进行修改才能得到最佳的布局效果。如一个在 PC 端宽度为“960 像素”的元素，在手机端就会出现右面大半部分的显示都会被裁切的情况，需要横向滑动才能显示完整内容。

- 百分比设置:

> 优点：能对不同显示分辨率做出更好的适应。最外层的标签元素（`<body>`的子节点）若宽度设为“100%”，那无论是在具有“<em class="hover-info" data-title="通常指横向宽度在4000像素左右的显示设备">4K</em>”显示分辨率的高清投影大屏幕上，还是在分辨率在几百像素的移动设备上，都能横向占满整个屏幕。现在有人将“百分比布局”称作“流式布局”，是一种应对“移动浪潮”布局的新趋势。

> 缺点：若采用百分比布局的方式，很多因素难以控制，如采用默认大小的表单元素，HTML5 的功能标签，都会给这种布局方式带来麻烦，若是采用多列布局的页面，这种布局方式在移动端上的效果绝对是“灾难性”的。特别是对于缺乏前端开发经验的开发人员而言，这种布局方式经常会出现一些布局效果在意料之外的情况。

百分比设置的布局有一个“相对性”的特点，也就是它的百分比是对于父级元素而言的，我们来看这样一个[例子](./docs/css/other/layout/perfact-width-layout.html)。通过该例子应该就能清晰的认识到，“width”利用百分比宽度来布局的原理了。百分比布局相对于对于固定像素布局在应对各种设备分辨率来说更有优势，但实际上它们经常一起组合使用，使得布局方式更加的灵活。在布局设计的过程中也应该多思考，多去预测一些可能出现的状况，从而来选择最优的布局组合方式。

## 元素高度“height”

该属性的作用是用于设置“块级元素”和“行内块元素”的高度，它绝大部分特征、度量单位和盒子模型的计算方式基本上和“width”属性一样。但在 CSS 的领域里，垂直方向的一些属性总是会出现一些让人“费解”的问题，如垂直居中的属性“[vertical-align](./docs/css/other/layout/vertical-align-problem.html)”,“[margin-top 和 margin-bottom](./docs/css/other/layout/repeat-margin.html)”的重叠，[页面内“块级元素”的首个子元素](./docs/css/other/layout/block-first-children-problem.html)（如：页面中第一个元素“`<div>`”的第一个子元素“`<p>`”）在执行“margin-top”时会让所有父辈元素都被拉到和自己一样的位置（`<body>`、`<div>`、`<p>`元素的顶部对齐了），而我们希望的是`<p>`元素顶部距离它父元素`<div>`顶部 50 像素的距离，而`<div>`和`<body>`仍然保持顶部对齐，等等一系列的小问题。

“width”属性的表现和“height”属性的差异在于，在同样不设置`<html>`或`<body>`宽高的条件下，任意“块级元素”和“行内块级元素”使用“width”属性设置百分比（%）单位都能达到预期的效果，而“height”则不然，除非对设置了“height”属性的父级元素设置“height”属性，否则无论用多少的百分比去设置元素的高度，该元素的高度都始终为“0”（若标签无内容的情况），不信？请看这个[示例](./docs/css/other/layout/perfact-height.html)。例如，要给一个`<body>`标签内的一个`<article>`标签内的`<section>`标签设置相对于浏览器视窗 100%的高度，那得保证从`<html>`标签选择器开始，以此往下的`<body>`和`<article>`对应的选择器都得有一个 100%的高度，缺少任何一个，`<section>`标签的百分比高度属性都不会生效，它的高度只会被内容给撑开。

## 外间距“margin”

“margin”我们称他为外间距，是一个具有盒子模型的元素（即通常的“行内块元素”和“块元素”）相对于同级元素和父级元素的一个距离值，常用单位为像素“px”和百分比“%”。该属性对文本类元素（即“行内元素”）标签在垂直方向上是无效的（水平方向仍然有效），若要对文本类标签元素进行外间距的设置，总是建议将其“display”属性改为“block”、“inline-block”或者一些与这两个值布局表现上相近的值。

“margin”属性有四个分支属性，如下。

### 上外间距“margin-top”

- margin-top: 称作上外间距，距离上方同级元素或父级元素在垂直方向的距离，若上方同级元素含有“margin-bottom”，则会重叠该值，并且取两者之间的距离较大值作为间距值。
  观察以下的示例，去深入理解这个重叠的现象:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。
        <p style="margin-top: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-top:50px;</p>
    </section>
</div>

以上示例没有 p 元素没有同级元素，所以无重叠现象，我们看下例:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框,div元素加了一个绿色1px的边框。section还加了margin-bottom:50px;
        <div style="margin-bottom:50px;border:1px solid #63d363;">我是section下的div元素，我的margin-bottom:50px;</div>
        <p style="margin-top: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-top:50px;</p>
    </section>
</div>

以上示例我们可以看到 p 元素有一个 margin-top:50px。它的同级元素 div 元素有一个 margin-bottom:50px。按照正常理论来理解，它们之间的间距应该是 100px 可事实上它们的间距只有 50px，这点可以打开浏览器控制台，通过查看元素来查看。 这也就是说两者之间重叠了一个值，然后两者比较取了值大的一方，即 50px 来作为两者之间的间距。好吧由于这里的 margin-top 与 margin-bottom 取得是一样的值 50，我们不知道何为较大值，接下来让我们来看看两者值不一样会是什么情况，如下:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框,div元素加了一个绿色1px的边框。section还加了margin-bottom:50px;
        <div style="margin-bottom:26px;border:1px solid #63d363;">我是section下的div元素，我的margin-bottom:26px;</div>
        <p style="margin-top: 41px;border:1px solid #2396ef;">我是section下的p元素，我的margin-top:41px;</p>
    </section>
</div>

以上示例，通过浏览器控制台查看，我们可以知道两者重叠了 26px 的间距。所以两者之间的间距也就是两者之间的值较大的一方，即 41px。我们还可以查看这个[示例](./docs/css/other/layout/repeat-margin.html)来加深理解重叠现象的印象。(在这个示例中，特意写了一个标尺来标明两者之间的间距)。

但是，还要注意一种情况，那就是当这些拥有外间距属性的元素含有属性 float 的 left 或 right 值时，它们之间垂直方向上的外间距不再是取较大值，而是相加关系，也就是不会重叠。如以下示例:

<div class="ew-code-compiler">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body,
        html {
            font: 20px "微软雅黑";
        }
        .mb-50,
        .mt-50 {
            width: 100%;
            height: 50px;
            box-sizing: border-box;
            color: #ffffff;
            text-align: center;
            line-height: 50px;
            float: left;
        }
        .mt-50 {
            background-color: #550089;
            margin-top: 50px;
        }
        .mb-50 {
            background-color: #829910;
            margin-bottom: 50px;
        }
        .ruler,
        .ruler>p {
            box-sizing: border-box;
        }
        .ruler {
            width: 50px;
            color: #ffffff;
            height: auto;
            position: absolute;
            text-align: left;
            background-color: #fe4f23;
            border: 1px solid #550089;
            border-top: none;
        }
        .ruler>p {
            line-height: 24px;
            border-bottom: 1px solid rgb(95, 72, 90);
            font-size: 16px;
        }
        .ruler>p:last-child {
            border-bottom: none;
        }
    </style>
    <div class="ruler">
        <p>25px</p>
        <p>50px</p>
        <p>75px</p>
        <p>100px</p>
        <p>125px</p>
        <p>150px</p>
        <p>175px</p>
        <p>200px</p>
    </div>
    <div class="mb-50">我是margin-bottom:50px;的div</div>
    <div class="mt-50">我是margin-top:50px;的div</div>
</div>

以上示例拥有 margin-bottom(或 margin-top)的元素都加了 float 为 left 的值，通过写的标尺我们可以看到两者之间的间距就是相加关系。

我们再来看这个示例，也是同样的样式，就是间距值更改了一下。如下:

<div class="ew-code-compiler">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body,
        html {
            font: 20px "微软雅黑";
            min-height: 200px;
        }
        .mb-21,
        .mt-33 {
            width: 100%;
            height: 50px;
            box-sizing: border-box;
            color: #ffffff;
            text-align: center;
            line-height: 50px;
            float: left;
        }
        .mt-33 {
            background-color: #550089;
            margin-top: 33px;
        }
        .mb-21 {
            background-color: #829910;
            margin-bottom: 21px;
        }
        .ruler,
        .ruler>p {
            box-sizing: border-box;
        }
        .ruler {
            width: 50px;
            color: #ffffff;
            height: auto;
            position: absolute;
            text-align: left;
            background-color: #fe4f23;
            border: 1px solid #550089;
            border-top: none;
            border-bottom: none;
        }
        .ruler>p {
            height: 14px;
            border-bottom: 1px solid rgb(95, 72, 90);
            font-size: 12px;
            line-height: 14px;
        }
    </style>
     <div class="ruler"></div>
    <div class="mb-21">我是margin-bottom:21px;的div</div>
    <div class="mt-33">我是margin-top:33px;的div</div>
    <script>
    var ruler = document.getElementsByClassName('ruler')[0];
    for (let i = 0; i < 11; i++) {
        var p = document.createElement('p');
        p.textContent = '14px';
        ruler.appendChild(p);
    }
</script>
</div>

需要仔细看才能看出来两者之间的间距的确是相加的值，即 54px。不信可以打开浏览器控制台查看盒子。

除了以上的重叠问题以外，我们在使用 margin-top 的时候还应该注意一个问题。首先我们知道如果一个元素为父元素的首个子元素，那么这个元素的顶部就会和父元素对齐，如果这个父元素也是这个父元素的父元素的（即该元素的父元素的父元素）首个子元素，依次类推，这个元素同样会和它的父元素的父元素顶部对齐。因此，当我们为这个元素设置一个 margin-top,那么它的父元素就会被拉下来和它对齐，同样的，它的父元素是它的父元素的父元素的首个子元素，那么它的父元素的父元素也会被拉下来对齐。这个问题，我们从[这个示例](./docs/css/other/layout/block-first-children-problem.html)中就可以看出来。那么我们如何解决这个问题呢?

比如说，我们有如下页面结构:

```html
<!--省略了html文档等代码,注意标签嵌套结构-->
<body>
  <!--body元素下的首个子元素section元素-->
  <section>
    <!--section元素下的首个子元素div元素-->
    <div>
      <!--div元素下的首个子元素p元素-->
      <p>做个子元素咋就这么难呢</p>
    </div>
  </section>
</body>
```

如果对于以上的嵌套层次，我们给 p 元素加一个 margin-top。那么它的 body,div,section 元素都会被拉下来跟它顶部对齐。那么，针对这种问题，我们应该如何解决呢?

以下为一些解决方案:

- 给父元素至少 1 像素的 padding 值（也可以是 padding-top）。比如以上的示例,我们可以给 div 元素加一个 padding,代码如下：

```css
div {
  padding: 1px;
  /*数值根据自己来定,或者也可以写成padding-top:1px;*/
}
```

- 给父元素至少 1 像素的 border，边框颜色可以是透明的。比如以上的示例,我们可以给 div 元素加一个 border,代码如下：

```css
div {
  border: 1px solid transparent;
  /*或者颜色值可以是常用的web颜色单位*/
  /*也可以不写组合写法,这在后面会了解到*/
  /*border-width:1px*/
  /*border-style:solid*/
  /*border-color:transparent*/
}
```

- 给父元素设置属性“overflow:hidden”（如鼠标悬浮上去才出现的二级导航菜单等情况不建议使用该方案，否则元素会被裁切）。比如以上的示例,我们可以给 div 元素加一个 overflow,代码如下：

```css
div {
  overflow: hidden;
}
```

- 给父元素或者自身一个浮动属性“float”，值为“left”或者“right”均可。该属性会让块级元素的宽度不再是 100%，而是由内容决定，表现为一个“行内块元素”的特性。比如以上的示例,我们可以给 div 或者 p 元素加一个 float,代码如下：

```css
div {
  float: left;
}
/*或者给p元素加*/
p {
  float: left;
}
```

- 给父元素设置绝对定位属性值“position: absolute”（除非是其它布局需要，否则不推荐该方案）。该属性同样会让块级元素的宽度不再是 100%，而是由内容决定，表现同样为一个“行内块元素”的特性。比如以上的示例,我们可以给 div 元素加一个 position,代码如下：

```css
div {
  position: absolute;
}
```

- 改变父元素的显示类型 display。但要注意 display 的值不能为 inline,block,table-column,table-column-group,none,run-in,list-item 等值。比如以上的示例,我们可以改变 div 元素的显示类型 display,代码如下：

```css
div {
  /*转换为弹性盒子类型*/
  display: flex;
}
```

不过通过改变显示类型需要注意一点，就是有些显示类型会导致 div 元素的宽度不再是 100%。比如 display:table;这个类型。

我们来看一个示例:

html 代码如下:

```html
<section>
  <div>
    <p>朝起匆匆逐风尘，路险飞车千般心。失足向来寻常事，只恐古今无仙人。</p>
  </div>
</section>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
html {
  background-color: #ffffff;
}
body {
  background-color: #a5bcdd;
}
div {
  background-color: #2396ef;
  overflow: hidden;
}
p {
  margin-top: 50px;
  background-color: #e0d20a;
  color: #ffffff;
}
```

以上[示例](./docs/css/html/css-code-5-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-3.html"></iframe>

### 下外间距“margin-bottom”

- margin-bottom：称作“下外间距”，即距离下方同级元素在垂直方向的距离，若下方元素含有“margin-top”，则取较大值作为间距值。若该元素是 DOM 内最后一个元素，则相当于是给父元素设置了一个下间距（padding-bottom），若父元素已经设置了“padding-bottom”，则与父元素的该值相加取和作为与页面底部的间距。该属性不会造成和使用“上外间距”的元素一样产生的一些怪异的问题。如以下示例:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。
        <p style="margin-bottom: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-bottom:50px;</p>
    </section>
</div>

我们再来看一个示例:

html 代码如下:

```html
<article>
  <p>
    爱，还没来，天地间风云忽然变，有情有义的人都要回来，爱，总会来，生死注定的来世再爱，都等了太久哭尽无奈。
  </p>
</article>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
article {
  width: 80%;
  margin: 20px auto;
  background-color: #422c5a;
  padding: 10px;
  border: 2px dashed #eed0d8;
  border-radius: 5px;
}
article > p {
  margin-bottom: 10px;
  color: #ffffff;
  text-align: center;
}
```

以上[示例](./docs/css/html/css-code-5-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-4.html"></iframe>

### 左外间距“margin-left”

- margin-left：称作“左外间距”，即距离父级元素左边框的距离，若父元素有内间距“padding-left”，则还需要加上该值。也就是，如果一个元素拥有 50 像素的“左外间距”，而它的父级元素有一个 50 像素的“左内间距”，则该元素距离父级元素的左边界的距离实际应为 100 像素（如果父元素带有 border 属性，则称作是距离它左边框的距离）。 也可以是距离左方同级元素在水平方向的距离，若左方元素含有“margin-right”，则会和该值相加，取两个元素之间间距值的和作为间距值。如以下一个示例:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。
        <p style="margin-left: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-left:50px;</p>
    </section>
</div>

又如以下一个示例:

<div class="ew-code-compiler">
    <section style="border:1px solid;padding-left:50px;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。section元素加了padding-left:50px;
        <p style="margin-left: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-left:50px;</p>
    </section>
</div>

再如父元素不带边框的示例:

<div class="ew-code-compiler">
    <section style="background:#336789;padding-left:50px;color:#fff;">
        section元素加了background:#336789;与color:#fff;，p元素加了一个蓝色1px的边框。section元素加了padding-left:50px;
        <p style="margin-left: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-left:50px;</p>
    </section>
</div>

再如两个元素同级的示例:

<div class="ew-code-compiler">
    <h3>section元素加了background:#336789;与color:#fff;，p元素加了一个蓝色1px的边框。section元素加了padding-left:50px;</h3>
    <section style="background:#336789;padding-left:50px;color:#fff;">
        <div style="margin-right: 50px;border:1px solid #2396ef;display:inline-block;">
            我是section下的div元素，我的margin-right:50px;
        </div>
        <p style="margin-left: 50px;border:1px solid #2396ef;display:inline-block;">
            我是section下的p元素，我的margin-left:50px;
        </p>
    </section>
</div>

### 右外间距“margin-right”

- margin-right：称作“右外间距”，即距离父级元素右边框的距离，若父元素有内间距“padding-right”，则还需要加上该值。也可以是距离右方同级元素在水平方向的距离，若右方元素含有“margin-left”，则会和该值相加，取两个元素之间间距值的和作为间距值。无论是“左外间距”还是“右外间距”他们均不会产生任何布局上的怪异问题。

我们还是来看几个示例:

<div class="ew-code-compiler">
    <section style="border:1px solid;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。
        <p style="margin-right: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-right:50px;</p>
    </section>
</div>
<div class="ew-code-compiler">
    <section style="border:1px solid;padding-right:50px;">
        section元素加了一个黑色1px的边框，p元素加了一个蓝色1px的边框。section还加了padding-right:50px;
        <p style="margin-left: 50px;border:1px solid #2396ef;">我是section下的p元素，我的margin-left:50px;</p>
    </section>
</div>
<div class="ew-code-compiler">
    <h3>section元素加了background:#336789;与color:#fff;，p元素加了一个蓝色1px的边框。section元素加了padding-right:50px;</h3>
    <section style="background:#336789;padding-right:50px;color:#fff;">
        <div style="margin-right: 30px;border:1px solid #2396ef;display:inline-block;">
            我是section下的div元素，我的margin-right:30px;
        </div>
        <p style="margin-left: 40px;border:1px solid #2396ef;display:inline-block;">
            我是section下的p元素，我的margin-left:40px;
        </p>
    </section>
</div>

### 外间距的组合写法

如果我们在一个元素需要在多个方向进行设置外间距的时候，如果将“margin”多个方向的属性都设置一遍，难免会让代码看起来比较繁杂，增加了不少代码量，也增加了维护的难度。这个时候我们可以将“margin”四个方向的值“合四为一”，写法如下：

```css
margin: '垂直方向向上的值(margin-top)' '水平方向向右的值(margin-right)'
  '垂直方向向下的值(margin-bottom)' '水平方向向左的值(margin-left)';
/*例如margin:10px 8px 12px 7px*/
```

以上是四个方向的值都不同的写法，我们还可以只写一个值，二个值，三个值,这表示某些方向值可以相同。写法分别如下:

```css
margin: '四个方向都相同的值margin-top,margin-left,margin-right,margin-bottom';
/*例如margin:10px*/
```

```css
margin: '上下方向相同的值(margin-top,margin-bottom)'
  '左右方向相同的值(margin-left,margin-right)';
/*例如margin:10px 12px*/
```

```css
margin: '上方向值(margin-top)' '左右方向相同的值(margin-left,margin-right)'
  '下方向值(margin-bottom)';
/*例如margin:8px 10px 6px*/
```

我们来看一个示例如下所示:

html 代码如下:

```html
<main>
  <header>美女图册</header>
  <div class="comic-album">
    <img
      src="./docs/css/html/images/girl-images/comic-girl-01.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-02.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-03.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-04.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-05.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-06.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-07.jpg"
      alt="图片加载中"
    />
    <img
      src="./docs/css/html/images/girl-images/comic-girl-08.jpg"
      alt="图片加载中"
    />
    <div class="layer-mask">
      <div class="layer-img-container">
        <img
          src="./docs/css/html/images/girl-images/comic-girl-01.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-02.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-03.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-04.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-05.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-06.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-07.jpg"
          alt="图片加载中"
        />
        <img
          src="./docs/css/html/images/girl-images/comic-girl-08.jpg"
          alt="图片加载中"
        />
      </div>
    </div>
  </div>
</main>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  min-height: 500px;
  background-color: #fafafa;
}
body {
  font: 20px '微软雅黑', sans-serif;
}
main {
  width: 100%;
  height: 100%;
}
main > header {
  width: 100%;
  height: 50px;
  font: 25px '华文琥珀';
  text-align: center;
  line-height: 50px;
  background-color: #b6b6b6;
  color: #ffffff;
}
main > .comic-album {
  width: 80%;
  margin: 20px auto;
  background-color: #b5b5b5;
  overflow: hidden;
  border-radius: 5px;
  padding: 20px;
}
main > .comic-album > img {
  width: 22%;
  display: block;
  float: left;
  margin: 25px 1.5%;
  transition: all 0.3s;
  border-radius: 5px;
  cursor: zoom-in;
}
main > .comic-album > img:hover,
main > .comic-album > img:active {
  transform: scale(1.2);
}
.layer-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: none;
  background-color: rgba(0, 0, 0, 1);
}
.layer-mask > .layer-img-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.layer-mask > .layer-img-container > img {
  width: 60%;
  display: none;
}
main > .comic-album > img:active {
  cursor: zoom-out;
}
main > .comic-album > img:active ~ .layer-mask {
  display: block;
}
main
  > .comic-album
  > img:first-of-type:active
  ~ .layer-mask
  > .layer-img-container
  > img:first-of-type,
main
  > .comic-album
  > img:nth-of-type(2):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(2),
main
  > .comic-album
  > img:nth-of-type(3):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(3),
main
  > .comic-album
  > img:nth-of-type(4):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(4),
main
  > .comic-album
  > img:nth-of-type(5):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(5),
main
  > .comic-album
  > img:nth-of-type(6):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(6),
main
  > .comic-album
  > img:nth-of-type(7):active
  ~ .layer-mask
  > .layer-img-container
  > img:nth-of-type(7),
main
  > .comic-album
  > img:last-of-type:active
  ~ .layer-mask
  > .layer-img-container
  > img:last-of-type {
  display: block;
}
```

运行效果如下:

<div class="ew-code-compiler" style="min-height:600px;">
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        html,
        body {
            height: 100%;
            min-height: 500px;
            background-color: #fafafa;
        }
        body {
            font: 20px "微软雅黑", sans-serif;
        }
        main {
            width: 100%;
            height: 100%;
        }
        main>header {
            width: 100%;
            height: 50px;
            font: 25px "华文琥珀";
            text-align: center;
            line-height: 50px;
            background-color: #b6b6b6;
            color: #ffffff;
        }
        main>.comic-album {
            width: 80%;
            margin: 20px auto;
            background-color: #b5b5b5;
            overflow: hidden;
            border-radius: 5px;
            padding: 20px;
        }
        main>.comic-album>img {
            width: 22%;
            display: block;
            float: left;
            margin: 25px 1.5%;
            transition: all .3s;
            border-radius: 5px;
            cursor: zoom-in;
        }
        main>.comic-album>img:hover,
        main>.comic-album>img:active {
            transform: scale(1.2);
        }
        .layer-mask {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            display: none;
            background-color: rgba(0, 0, 0, 1);
        }
        .layer-mask>.layer-img-container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .layer-mask>.layer-img-container>img {
            width: 60%;
            display: none;
        }
        main>.comic-album>img:active {
            cursor: zoom-out;
        }
        main>.comic-album>img:active~.layer-mask {
            display: block;
        }
        main>.comic-album>img:first-of-type:active~.layer-mask>.layer-img-container>img:first-of-type,
        main>.comic-album>img:nth-of-type(2):active~.layer-mask>.layer-img-container>img:nth-of-type(2),
        main>.comic-album>img:nth-of-type(3):active~.layer-mask>.layer-img-container>img:nth-of-type(3),
        main>.comic-album>img:nth-of-type(4):active~.layer-mask>.layer-img-container>img:nth-of-type(4),
        main>.comic-album>img:nth-of-type(5):active~.layer-mask>.layer-img-container>img:nth-of-type(5),
        main>.comic-album>img:nth-of-type(6):active~.layer-mask>.layer-img-container>img:nth-of-type(6),
        main>.comic-album>img:nth-of-type(7):active~.layer-mask>.layer-img-container>img:nth-of-type(7),
        main>.comic-album>img:last-of-type:active~.layer-mask>.layer-img-container>img:last-of-type {
            display: block;
        }
    </style>
    <main>
        <header>美女图册</header>
        <div class="comic-album">
            <img src="./docs/css/html/images/girl-images/comic-girl-01.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-02.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-03.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-04.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-05.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-06.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-07.jpg" alt="图片加载中">
            <img src="./docs/css/html/images/girl-images/comic-girl-08.jpg" alt="图片加载中">
            <div class="layer-mask">
                <div class="layer-img-container">
                    <img src="./docs/css/html/images/girl-images/comic-girl-01.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-02.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-03.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-04.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-05.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-06.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-07.jpg" alt="图片加载中">
                    <img src="./docs/css/html/images/girl-images/comic-girl-08.jpg" alt="图片加载中">
                </div>
            </div>
        </div>
    </main>
</div>

利用“margin”多值设置的方法，我们还产生了一种设计模式，即将“margin”的值设为“0 auto”，可以让一个“块元素”在页面中水平居中。这里也需要注意的是，虽然“margin”四个方向的属性对“行内块元素”是有效的，但这水平居中的设计模式对于它来说是无效的,要让“行内块元素”执行水平居中就要涉及到我们另外一种设计模式了，即“绝对定位+负外边距”的用法,后面会讲到。还有一点需要注意的就是，要想水平居中模式生效，就必须要给宽元素设置一个具体的宽度（因为如果不设置宽度是撑满整个容器元素的，除非它的父元素有具体的宽度以及相应的内间距才会让它看起来居中）。如以下的一个示例:

<div class="ew-code-compiler">
    <section style="border:1px dashed #446677;margin:0 auto;display:block;width:60%;">
        我是块元素，我要水平居中,并且我的宽度是60%。
    </section>
    <div style="border:1px groove #b4be54;margin:0 auto;display:block;">
        我是块元素，尽管我设置了margin:0 auto;但我依然不会居中,因为我没有设置宽度，不过如果我的父容器有具体的宽度以及内间距，我其实就算是居中了。
    </div>
    <br>
    <i style="width:60%;margin:0 auto;display:inline-block;border:1px dotted #778866;">
        我虽然宽度是60%,但因为我是行内块元素，尽管我设置了margin:0 auto;但我依然不会居中。
    </i>
</div>

另外需要再次指出的是，当元素拥有浮动属性“float”时（值为“left”或者“right”的时候），margin-top 和 margin-bottom 的值不再会重叠，而是相加的关系。但是这样会让块级元素布局设计模式中的一个“居中模式”失效，即“margin: 0 auto”中的“auto”值失效，元素将不再居中，而是由浮动属性“float”的值是“left”还是“right”决定元素是靠左还是靠右布局，但是“margin-left”和“margin-right”为具体的像素或百分比单位时仍然有效。

## 内间距“padding”

“padding”我们称他为“内间距”（也有称“内边距”、“填充”等），是一个具有宽高样式属性的元素相对于自身元素的内容的一个距离值，常用单位像素“px”。

### “padding”在盒子模型中的区别

在“标准（W3C）的盒子模型”中，“padding”的值会占据除“width”和“height”所设置值的额外宽高空间，而在“IE 盒子模型”中，“padding”所设置的值不会增加元素的宽和高，但会向内占据空间。来看如下一个示例:

html 代码如下:

```html
<div class="ie-box">
  猪！你的鼻子有两个孔，感冒时的你还挂着鼻涕牛牛，猪！你有着黑漆漆的眼，望呀望呀望也看不到边。
</div>
<div class="w3c-box">
  清晨问候的目光，午后慵懒的想象，年轻守护的脸庞，庄典夺目的衣裳。
</div>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}

.ie-box,
.w3c-box {
  width: 200px;
  height: 200px;
  border-radius: 5px;
  border-style: dashed;
  border-width: 2px;
  padding: 10px;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
  margin: 2em;
  float: left;
}

.ie-box {
  border-color: #eb94eb;
  background-color: #b627ee;
  color: #fafafa;
  box-sizing: border-box;
}

.w3c-box {
  border-color: #2299ff;
  background-color: #0c678b;
  color: #c28b43;
}
```

以上[示例](./docs/css/html/css-code-5-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-5.html"></iframe>

> 注:以上示例，鼠标悬浮上去，会有相关提示说明。

### “padding”的四个方向分支属性

“padding”属性的值设置相对于“margin”来说需要考虑的额外因素更少（除了对设置了“background-origin”属性为“conent-box”的元素来说，后面会提到），它的设置的值在垂直方向也不会出现任何“预料外”的情况，与 margin 相同的是，它同样有四个分支属性，代表四个不同方向的值，如下：

- padding-top：设置该元素的边界与自身的内容在上方的间距。如以下示例：

<div class="ew-code-compiler">
    <div style="padding-top:10px;border:1px solid;">我是div元素，padding-top设置为10px</div>
</div>

- padding-right：设置该元素的边界与自身的内容在右方的间距。如以下示例：

<div class="ew-code-compiler">
    <div style="padding-right:10px;border:1px solid;">我是div元素，padding-right设置为10px</div>
</div>

- padding-bottom：设置该元素的边界与自身的内容在下方的间距。如以下示例：

<div class="ew-code-compiler">
    <div style="padding-bottom:10px;border:1px solid;">我是div元素，padding-bottom设置为10px</div>
</div>

- padding-left：设置该元素的边界与自身的内容在左方的间距。如以下示例：

<div class="ew-code-compiler">
    <div style="padding-left:10px;border:1px solid;">我是div元素，padding-left设置为10px</div>
</div>

### “padding”的组合写法

和“margin”一样“padding”属性的值也有组合起来写的用法，如下：

- 四个方向都不同的值:

```css
padding: '上(paddint-top)' '右(padding-right)' '下(padding-bottom)'
  '左(padding-left)';
/*例如：padding:1px 2px 3px 4px*/
```

- 四个方向都相同的值:

```css
padding: '上下左右 (padding-top,padding-right,padding-bottom,padding-left)';
/*例如：padding:10px*/
```

- 上下，左右相同的值:

```css
padding: '上下(padding-top,padding-bottom)' '左右(padding-left,padding-right)';
/*例如：padding:8px 6px*/
```

- 上下不同，左右相同的值:

```css
padding: '上(padding-top)' '右(padding-right)' '下(padding-bottom)';
/*例如：padding:5px 8px 6px*/
```

在“IE 盒子模型”下运用“padding”需要特别注意的是，“padding”的值会占据内容的空间。如在一个高度为“50 像素”，“padding-top”和“padding-bottom”均为“10 像素”的“行内块”或“块级”元素内，给文本内容设置行高“line-height:50px”并不会达到垂直居中的效果，而要将文本元素的行高设置为“height-(padding-top+padding-bottom)=innerHeight（在 JavaScript 中“innerHeight”表示内容的高度，“outerHeight”表示元素实际占据的高度）”，即“50-(10+10)=30”才能达到文本在该元素内垂直居中的效果。

来看一个示例:

html 代码如下:

```html
<section>
  <div class="ie-box">在雨中漫步，蓝色街灯渐露。</div>
  <div class="w3c-box">无法可修饰的一对手。</div>
</section>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
section {
  overflow: hidden;
}
section > div {
  width: 300px;
  padding: 10px;
  text-align: center;
  float: left;
}
section > div:first-child {
  margin-right: 20px;
}
.ie-box {
  height: 50px;
  background-color: #f1c64d;
  color: #556677;
  box-sizing: border-box;
  line-height: 30px;
}
.w3c-box {
  height: 30px;
  line-height: 30px;
  background-color: #f3c8f3;
  color: #8899ff;
  box-sizing: content-box;
}
```

以上[示例](./docs/css/html/css-code-5-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-6.html"></iframe>

padding 属性对“行内元素”和“块级元素”效果的处理上是有些差异的。它们一致的地方是，“padding”的值都会增加它们的可视面积（也就是表面上看上去元素的填充面积），但是“行内元素”只会在水平方向填充内间距的占用实际面积（就是在网页中本身元素所占据的空间面积），而在垂直方向只进行填充（这里指填充背景色）但本身实际占用面积不会增加，而“块级元素”会在四个方向实际填充占用面积。

我们来看一个示例:

html 代码如下:

```html
<section>
  <div>
    <span class="inline"
      >行内元素水平方向实际占用空间增大，但垂直方向只是可视空间增大。</span
    >
    <span class="inline"
      >行内元素水平方向实际占用空间增大，但垂直方向只是可视空间增大。</span
    >
  </div>
  <div>
    <span class="block"
      >块元素不管水平还是垂直方向可视空间和实际占用空间都增大。</span
    >
    <span class="block"
      >块元素不管水平还是垂直方向可视空间和实际占用空间都增大。</span
    >
  </div>
</section>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
section > div > span.inline {
  background-color: #3374ff;
  color: #ffffff;
  padding: 10px;
  border: 2px dashed #006745;
}
section > div > span.block {
  display: block;
  background-color: #b7ef77;
  color: #754f15;
  padding: 10px;
  border: 2px dotted #990023;
}
```

以上[示例](./docs/css/html/css-code-5-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-7.html"></iframe>

由于“行内元素”在布局上的一些问题，所以一般情况下我们都不会使用它来进行布局，即不会对它使用“margin”或“padding”等相关的属性。即使要使用“行内元素”来布局，也应该将它转换为“块级元素”或“行内块元素”，但像`<span>`、`<mark>`、`<sub>`、`<sub>`这类语义很明确的标签还是要避免去转换它们的类型，而像`<code>`、`<time>`、`<img>`、`<audio>`、`<video>`这类标签是可以在必要的时候进行显示类型转换的。

利用以上的知识点，让我们来完成一个如下的布局:

<div class="image-container">
    <img src="./docs/css/images/layout-01.png" alt="图片5-2" title="图片5-2" >
    <span class="image-title">图 5-2 </span>
</div>

以下是我实现的代码:

```css
body,
html,
div,
section,
p,
span {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #fdffc1;
}
section {
  width: 960px;
  height: 560px;
  background-color: #eb9bee;
  margin: 20px;
  display: block;
  padding: 10px 20px 15px;
}
section div {
  width: 920px;
  height: 242.5px;
  background-color: #5e98ee;
  text-align: center;
}
section div:first-child {
  padding: 20px 15px;
}
section div:last-child {
  margin-top: 50px;
  padding: 20px 15px 15px;
}
section div p {
  width: 890px;
  height: 202.5px;
  background-color: #4adf2d;
  padding: 20px 8px;
  line-height: 25px;
  color: #fff;
}
section div:last-of-type p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```

html 代码如下:

```html
<section>
  <div>
    <p>
      我曾怀疑我，走在沙漠中，从不结果，无论种什么梦，才张开翅膀，风却变沉默，习惯伤痛，能不能算收获，庆幸的是我，一直没回头，终于发现，真的是有绿洲，每把汗流了，生命变的厚重，走出沮丧，才看见新宇宙，海阔天空，在勇敢以后要拿执着，将命运的锁打破，冷漠的人谢谢你们曾经看轻我，让我不低头更精彩的活，凌晨的窗口，失眠整夜以后，看着黎明，从云里抬起了头，日落是沉潜，日出是成熟，只要是光一定会灿烂的，海阔天空，在勇敢以后，要拿执着，将命运的锁打破，冷漠的人，谢谢你们曾经看轻我，让我不低头，更精彩的活，海阔天空，狂风暴雨以后，转过头，对旧心酸一笑而过，最懂我的人，谢谢一路默默的陪我，让我拥有好故事可以说，看未来，一步步来了。
    </p>
  </div>
  <div>
    <p>
      今天我，寒夜里看雪飘过，怀着冷却了的心窝漂远方，风雨里追赶，雾里分不清影踪，天空海阔你与我可会变（谁没在变），多少次，迎着冷眼与嘲笑，从没有放弃过心中的理想，一刹那恍惚，若有所失的感觉，不知不觉已变淡心里爱（谁明白我），原谅我这一生不羁放纵爱自由，也会怕有一天会跌倒，背弃了理想，谁人都可以，哪会怕有一天只你共我，今天我，寒夜里看雪飘过，怀着冷却了的心窝漂远方，风雨里追赶，雾里分不清影踪，天空海阔你与我可会变（谁没在变），原谅我这一生不羁放纵爱自由，也会怕有一天会跌倒，背弃了理想，谁人都可以，哪会怕有一天只你共我，仍然自由自我，永远高唱我歌，走遍千里，原谅我这一生不羁放纵爱自由，也会怕有一天会跌倒，背弃了理想，谁人都可以，哪会怕有一天只你共我，背弃了理想，谁人都可以，哪会怕有一天只你共我，原谅我这一生不羁放纵爱自由，也会怕有一天会跌倒，背弃了理想，谁人都可以，哪会怕有一天只你共我。
    </p>
  </div>
</section>
```

以上[示例](./docs/css/other/layout/box-margin-padding-practice.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/other/layout/box-margin-padding-practice.html"></iframe>

## 元素边框“border”

该属性的作用是为元素添加一个可以指定线宽、线型和颜色的边框。在标准盒子模型中，该属性的分支属性“border-width”所设置的值会增加元素的实际宽度和高度，而在 IE 盒子模型中“border-width”所设置的值会和“padding”的值共同占据内容的空间。该属性能对任何显示类型的元素设置，包括“行级元素（inline）”。

“border”属性有三个分支属性：

- border-width: 设定边框的宽度。可以为 Web 技术中常用的度量单位，通常为像素“px”。如以下一个示例:

<div class="ew-code-compiler" style="min-height:700px;">
    <div style="border-width:1px;border-style: solid;margin:2em 0;">1px的边框</div>
    <div style="border-width:.4em;border-style: solid;margin:2em 0;">0.4em的边框</div>
    <div style="border-width:5%;border-style: solid;margin:2em 0;">5%的边框</div>
    <div style="border-width:.5rem;border-style: solid;margin:2em 0;">0.5rem的边框</div>
    <div style="border-width:1.5pt;border-style: solid;margin:2em 0;">1.5pt的边框</div>
    <div style="border-width:1.5ex;border-style: solid;margin:2em 0;">1.5ex的边框</div>
    <div style="border-width:.3pc;border-style: solid;margin:2em 0;">0.3pc的边框</div>
    <div style="border-width:.2mm;border-style: solid;margin:2em 0;">0.2mm的边框</div>
    <div style="border-width:.03cm;border-style: solid;margin:2em 0;">0.03cm的边框</div>
    <div style="border-width:.0004in;border-style: solid;margin:2em 0;">0.004in的边框</div>
</div>

需要注意的就是单独设置该分支属性是无法看到效果的，还需要加上另一个分支属性 border-style 也就是边框的类型，因为它的默认值是 none。另外还有一个分支属性 border-color 可以不用设置，因为它有一个默认值（详见下方 border-color）

- border-style:设置边框的类型，主要有以下可以设定的值：
  - none（默认值）：无边框。
  * solid：实线边框。
  * dotted：点线边框。
  * dashed：虚线边框。
  * double：双线边框。需要注意的就是该值在显示效果上需要 border-width 的值大于等于 3px 的宽度才能看得出来是双线边框。
  * groove：3D 凹槽边框。需要注意的就是该值在显示效果上需要 border-width 的值大于等于 5px 的宽度才能看得出来是 3D 凹槽边框。
  * ridge：3D 凸槽边框。需要注意的就是该值在显示效果上需要 border-width 的值大于等于 3px 的宽度才能看得出来是 3D 凸槽边框。
  * inset：内浮雕边框。需要注意的就是该值在显示效果上需要 border-width 的值大于等于 1px 的宽度才能看得出来是内浮雕边框。
  * outset：外浮雕边框。需要注意的就是该值在显示效果上需要 border-width 的值大于等于 1px 的宽度才能看得出来是外浮雕边框。

来看如下的一个示例:

html 代码如下:

```html
<section>
  <div class="none">无边框</div>
  <div class="solid">实线边框</div>
  <div class="dotted">点线边框</div>
  <div class="dashed">虚线边框</div>
  <div class="double">双线边框</div>
  <div class="groove">3D凹槽边框</div>
  <div class="ridge">3D凸槽边框</div>
  <div class="inset">内浮雕边框</div>
  <div class="outset">外浮雕边框</div>
</section>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
section,
div {
  box-sizing: border-box;
}
section {
  padding: 10px;
  background-color: #889922;
}
section:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
section > div {
  background-color: #887766;
  color: #ffffff;
  text-align: center;
  border-width: 10px;
  float: left;
  height: 70px;
  line-height: 50px;
  padding: 0 8px;
  margin-left: 1em;
}
section > div:first-child {
  margin-left: 0;
}
.none {
  border-style: none;
  line-height: 70px;
}
.solid {
  border-style: solid;
}
.dashed {
  border-style: dashed;
}
.dotted {
  border-style: dotted;
}
.double {
  border-style: double;
}
.groove {
  border-style: groove;
}
.ridge {
  border-style: ridge;
}
.inset {
  border-style: inset;
}
.outset {
  border-style: outset;
}
```

以上[示例](./docs/css/html/css-code-5-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-8.html"></iframe>

- border-color：设置边框的颜色，可以是 Web 技术中常规的四种颜色值“英文单词”、“HEX”、“RGBa”和“HSLa”。需要注意的一点就是它的默认值，如果 border-style 为 solid、dotted、double、dashed 时，它的默认值是继承它的 color 属性的值，如果它并无 color 属性，则继承它的父元素的 color 属性的值，如果它和它的所有父元素无 color 属性，则是#000，如果 border-style 为 groove、ridge、inset、outset 时，则该值是深灰(#9a9a9a)和浅灰#eeeeee 相映。

来看如下一个示例:

<div class="ew-code-compiler" style="min-height:300px;">
    <div style="border:4px solid red;margin:1em 0;">红色（英文单词）边框</div>
    <div style="border:4px solid #ff0;margin:1em 0;">黄色（hex）边框</div>
    <div style="border:4px solid rgba(0,0,255,1);margin:1em 0;">蓝色（rgba）边框</div>
    <div style="border:4px solid hsla(120,100%,50%,1);margin:1em 0;">绿色（hsla）边框</div>
</div>

事实上以上三个分支属性为四个方向的组合分支属性，我们来看如下的示例:

<div class="ew-code-compiler" style="min-height:300px;">
    <div style="border-left-width:2px;border-left-style:solid;margin:2em 0;">2px的左边框</div>
    <div style="border-right-width:2px;border-right-style:solid;margin:2em 0;">2px的右边框</div>
    <div style="border-top-width:2px;border-top-style:solid;margin:2em 0;">2px的上边框</div>
    <div style="border-bottom-width:2px;border-bottom-style:solid;margin:2em 0;">2px的下边框</div>
</div>

由此可知我们也可以单独设置四个方向的值。如下所示:

```css
/*左边框*/
div {
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: #ff0;
}
/*右边框*/
p {
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: #ff0;
}
/*上边框*/
em {
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: #ff0;
}
/*下边框*/
a {
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #ff0;
}
```

border 实际上就是这三个分支属性的组合值写法，也是我们通常使用的写法。结构如下:

```css
[CSS选择器] {
  border: '边框宽度(border-width)' '边框类型(border-style)'
    '边框颜色(border-color)';
}
```

例如:

```css
div {
  border: 15px dashed #997766;
}
```

除此之外，“border”还有一个很有趣的“玩”法，就是通过将元素的宽高都设为“0”，然后设置“border”的各分支属性的值将它作为一个“形状（如平行四边形，三角形，梯形等）”来使用。如以下示例:

html 代码:

```html
<div></div>
<div></div>
```

css 代码:

```css
div {
  width: 0;
  height: 0;
  border-width: 35px;
  border-style: solid;
}
div:first-of-type {
  border-color: transparent transparent #997622 #997622;
}
div:last-of-type {
  border-color: #997622 #997622 transparent transparent;
}
```

运行效果如下所示:

<div class="ew-code-compiler" style="min-height:200px;">
     <style>
        div {
            width: 0;
            height: 0;
            border-width: 35px;
            border-style: solid;
        }
        div:first-of-type {
            border-color: transparent transparent #997622 #997622;
        }
        div:last-of-type {
            border-color: #997622 #997622 transparent transparent ;
        }
    </style>
    <div></div>
    <div></div>
</div>

结合 border 用法，我们可以完成一个消息提示框[示例](./docs/css/other/dialog.html)。

html 代码:

```html
<div class="ew-tooltip ew-tooltip-dark">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-left"></div>
</div>
<div class="ew-tooltip ew-tooltip-light">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-left"></div>
</div>
<div class="ew-tooltip ew-tooltip-dark">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-right"></div>
</div>
<div class="ew-tooltip ew-tooltip-light">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-right"></div>
</div>
<div class="ew-tooltip ew-tooltip-dark">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-top"></div>
</div>
<div class="ew-tooltip ew-tooltip-light">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-top"></div>
</div>
<div class="ew-tooltip ew-tooltip-dark">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-bottom"></div>
</div>
<div class="ew-tooltip ew-tooltip-light">
  在HTML中绝大部分元素都是能够显示的，只有部分元素本身就是隐藏的，也有通过为元素设置“hidden”属性和通过CSS方式设置“display”属性值为“none”的方式实现隐藏的
  <div class="ew-tooltip-arrow ew-tooltip-arrow-bottom"></div>
</div>
```

css 代码:

```css
.ew-tooltip {
  position: relative;
  border-radius: 4px;
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  line-height: 2;
  min-width: 10px;
  word-wrap: break-word;
  margin: 15px;
}
.ew-tooltip .ew-tooltip-arrow,
.ew-tooltip .ew-tooltip-arrow::after {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-style: solid;
  border-color: transparent;
}
.ew-tooltip .ew-tooltip-arrow {
  border-width: 10px;
}
.ew-tooltip .ew-tooltip-arrow::after {
  content: '';
  border-width: 9px;
}
/* 暗系对话框 */
.ew-tooltip-dark {
  background-color: #232525;
  color: #ffffff;
}
/* 左 */
.ew-tooltip-dark .ew-tooltip-arrow-left {
  right: -10px;
  top: 0;
}
.ew-tooltip-dark .ew-tooltip-arrow-left::after {
  border-left-color: #232525;
}
/* 右 */
.ew-tooltip-dark .ew-tooltip-arrow-right {
  left: -8px;
  top: 0;
  margin-left: -20px;
}
.ew-tooltip-dark .ew-tooltip-arrow-right::after {
  border-right-color: #232525;
}
/* 上 */
.ew-tooltip-dark .ew-tooltip-arrow-top {
  left: 0;
  bottom: -10px;
}
.ew-tooltip-dark .ew-tooltip-arrow-top::after {
  border-top-color: #232525;
}
/* 下 */
.ew-tooltip-dark .ew-tooltip-arrow-bottom {
  right: 20px;
  top: -20px;
}
.ew-tooltip-dark .ew-tooltip-arrow-bottom::after {
  border-bottom-color: #232525;
  top: -8px;
}
/* 亮系对话框 */
.ew-tooltip-light {
  background-color: #fefaf2;
  border: 1px solid #a9a9aa;
  color: #535353;
}
/* 左 */
.ew-tooltip-light .ew-tooltip-arrow-left {
  right: -10px;
  top: 10px;
  border-right-width: 0;
  border-left-color: #a9a9aa;
}
.ew-tooltip-light .ew-tooltip-arrow-left::after {
  left: -10px;
  top: -10px;
  margin-top: 1px;
  border-right-width: 0;
  border-left-color: #fefaf2;
}
/* 右 */
.ew-tooltip-light .ew-tooltip-arrow-right {
  left: -10px;
  top: 10px;
  border-left-width: 0;
  border-right-color: #a9a9aa;
}
.ew-tooltip-light .ew-tooltip-arrow-right::after {
  left: 1px;
  top: -10px;
  margin-top: 1px;
  border-left-width: 0;
  border-right-color: #fefaf2;
}
/* 上 */
.ew-tooltip-light .ew-tooltip-arrow-top {
  left: 10px;
  bottom: -9px;
  border-bottom-width: 0;
  border-top-color: #a9a9aa;
}
.ew-tooltip-light .ew-tooltip-arrow-top::after {
  left: -9px;
  bottom: 1px;
  border-bottom-width: 0;
  border-top-color: #fefaf2;
}
/* 下 */
.ew-tooltip-light .ew-tooltip-arrow-bottom {
  right: 10px;
  top: -10px;
  border-top-width: 0;
  border-bottom-color: #a9a9aa;
}
.ew-tooltip-light .ew-tooltip-arrow-bottom::after {
  right: -9px;
  top: 1px;
  border-top-width: 0;
  border-bottom-color: #fefaf2;
}
```

运行效果如下所示:

<iframe style="min-height:200px;" src="./docs/css/other/dialog.html"></iframe>

如有兴趣，可实现如下图所示的效果:

<iframe style="min-height:200px;" src="./docs/css/other/dialog-popbox.html"></iframe>

## 图片边框“border-image”

该属性并不能作为 border 的分支属性，而是作为一个独立的属性来使用。它的作用是为边框加入背景图片。一般情况不会使用较复杂的图像作为边框的图片，而是使用一些简单的有规律的九宫格图案，而且最好是宽高等比的。该属性包含以下分支属性：

- border-image-source：图片的 URL 路径。
- border-image-slice：图片边框的向内偏移量。值为一个纯数字，不能加上单位，否则会导致该属性无效。该属性最多可以有三个值。具体情况如下：
  - 当只有 1 个值时，表示边框的四个方向边框的向内偏移量。
  - 当出现第 2 个值时，且都为数值时，第一个值表示水平方向边框的向内偏移量，第二个值表示垂直方向边框的向内偏移量；而其中一个值为“fill”时，数值部分仍然表示四个方向边框向内的偏移量，而“fill”表示图片可以替代“background-image”的作用。
  - 当出现 3 个值的时候，第一个值表示水平方向边框的向内偏移量，第二个值表示垂直方向边框的向内偏移量，而“fill”作用同上。“fill”在这个属性中出现的位置没有要求，即可以在前面，也可以在后面，当存在三个值的时候还能在中间（但不推荐放在中间），但是该值只能出现一次。

以下展示一些写法示例:

```css
div {
  /*1个值*/
  border-image-slice: 1;
  /*2个值*/
  border-image-slice: 16 32;
  /*3个值*/
  border-image-slice: 16 32 48;
}
```

- border-image-width：图片边框的相对于等分“九宫格”图像中每一行或列宽度。纯数值或像素值，纯数值表示相对于边框宽度“border-width”的百分比（1 表示原图的 100%宽高，2 表示原图 200%宽高，以此类推），而像素值会缩放“九宫格”图像中每一行或列宽度到指定的像素。该属性和“margin”和“padding”以及“border”一样，最多拥有 4 个值，表示分别对 4 个方向的图像边框宽度进行设置，其方位顺序也和之前提到的几个属性一样（顺序为：上 → 右 → 下 → 左）。以下展示一些写法示例:

```css
div {
  /*1个值*/
  border-image-width: 1;
  /*2个值*/
  border-image-width: 16px 32px;
  /*3个值*/
  border-image-width: 16px 32px 48px;
}
```

- border-image-outset：边框图像区域超出边框的量。单位为像素。该属性同样可以最多拥有 4 个值，表示对 4 个方向的偏移分别进行设置，方位设置顺序和“border-image-width:”属性一致。
  以下展示一些写法示例:

```css
div {
  /*1个值*/
  border-image-outset: 1;
  /*2个值*/
  border-image-outset: 16px 32px;
  /*3个值*/
  border-image-outset: 16px 32px 48px;
}
```

- border-image-repeat：图像边框的排列方式，该属性可以拥有一个或两个值，当拥有两个值时，第一个值表示水平方向边框的排列方式，第二个值表示垂直方向边框的排列方式。该属性主要有 4 种类型的值：
  - stretch：默认值。表示拉伸图像来填充区域。
  - repeat：表示平铺（重复）图像来填充区域。
  - round：类似 repeat 值。如果无法完整平铺所有图像，则对图像进行缩放以适应区域。
  - space：类似 repeat 值。如果无法完整平铺所有图像，扩展空间会分布在图像周围。

以下展示一些写法示例:

```css
div {
  border-image-repeat: stretch;
  border-image-repeat: repeat;
  border-image-repeat: round;
  border-image-repeat: space;
  border-image-repeat: space stretch;
}
```

> 注:设置了 border-image 之后,border-color 属性会失效。

为了便于理解，接下来我们来做几个固定这些属性的值，只对其中一个属性的值进行改动的示例来进行比较观察。先给尚未经尺寸调整的原图，为一张尺寸为“96 × 96”像素的 PNG 图片（也就是说单个“苹果”的宽高均为 32 像素），如下：

<div class="image-container">
    <img src="./docs/css/images/border-image_apple.png" alt="图片5-3" title="图片5-3" >
    <span class="image-title">图 5-3 </span>
</div>

先来看看对“border-image-slice”属性修改的情况。

html 代码如下:

```html
<section>
  <div class="bd-1" data-value="initial;"></div>
  <div class="bd-2" data-value="inherit;"></div>
  <div class="bd-3" data-value="0;"></div>
  <div class="bd-4" data-value="16;"></div>
  <div class="bd-5" data-value="32;"></div>
  <div class="bd-6" data-value="48;"></div>
  <div class="bd-7" data-value="16 fill;"></div>
  <div class="bd-8" data-value="32 fill;"></div>
  <div class="bd-9" data-value="fill 32;"></div>
  <div class="bd-10" data-value="32 fill 16;"></div>
  <div class="bd-11" data-value="fill 32 16;"></div>
  <div class="bd-11" data-value="32 16 fill;"></div>
</section>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  padding: 20px;
  overflow: hidden;
}
section > div {
  width: 160px;
  height: 96px;
  background-color: #c4ebff;
  border: 32px solid #2396ef;
  /* border-color失效 */
  border-image-source: url('/border-image_apple.png');
  /* 边框图像区域超出边框的量为0，也就是不向外偏移 */
  border-image-outset: 0;
  /* 相对于原图的100%宽度 */
  border-image-width: 1;
  /* 图像边框排列方式 */
  border-image-repeat: repeat;
  float: left;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
}
section > div:hover:before {
  content: attr(data-value);
  width: 160px;
  height: 96px;
  position: absolute;
  left: -32px;
  top: -32px;
  color: #445ff4;
  text-align: center;
  line-height: 96px;
  background: rgba(139, 125, 131, 0.6);
}
.bd-1 {
  border-image-slice: initial;
}
.bd-2 {
  border-image-slice: inherit;
}
.bd-3 {
  border-image-slice: 0;
}
.bd-4 {
  border-image-slice: 16;
}
.bd-5 {
  border-image-slice: 32;
}
.bd-6 {
  border-image-slice: 48;
}
.bd-7 {
  border-image-slice: 16 fill;
}
.bd-8 {
  border-image-slice: 32 fill;
}
.bd-9 {
  border-image-slice: fill 32;
}
.bd-10 {
  border-image-slice: 32 fill 16;
}
.bd-11 {
  border-image-slice: fill 32 16;
}
.bd-12 {
  border-image-slice: 32 16 fill;
}
```

以上[示例](./docs/css/html/css-code-5-9.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-9.html"></iframe>

对“border-image-width”属性修改的情况。

html 代码如下:

```html
<section>
  <div class="bd-1" data-value="initial;"></div>
  <div class="bd-2" data-value="inherit;"></div>
  <div class="bd-3" data-value="0;"></div>
  <div class="bd-4" data-value="0.5"></div>
  <div class="bd-5" data-value="1"></div>
  <div class="bd-6" data-value="2"></div>
  <div class="bd-7" data-value="32px"></div>
  <div class="bd-8" data-value="50%"></div>
  <div class="bd-9" data-value="10em"></div>
  <div class="bd-10" data-value="5rem"></div>
  <div class="bd-11" data-value="32px 1.5"></div>
  <div class="bd-11" data-value="32px 0.5 16px"></div>
</section>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  padding: 20px;
  overflow: hidden;
}
section > div {
  width: 160px;
  height: 96px;
  background-color: #c4ebff;
  border: 32px solid #2396ef;
  /* border-color失效 */
  border-image-source: url('/border-image_apple.png');
  /* 边框图像区域超出边框的量为0，也就是不向外偏移 */
  border-image-outset: 0;
  /* 使用单个苹果的宽高 */
  border-image-slice: 32;
  /* 图像边框排列方式 */
  border-image-repeat: round;
  float: left;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
}
section > div:hover:before {
  content: attr(data-value);
  width: 160px;
  height: 96px;
  position: absolute;
  left: -32px;
  top: -32px;
  color: #445ff4;
  text-align: center;
  line-height: 96px;
  background: rgba(139, 125, 131, 0.6);
}
.bd-1 {
  border-image-width: initial;
}
.bd-2 {
  border-image-width: inherit;
}
.bd-3 {
  border-image-width: 0;
}
.bd-4 {
  border-image-width: 0.5;
}
.bd-5 {
  border-image-width: 1;
}
.bd-6 {
  border-image-width: 2;
}
.bd-7 {
  border-image-width: 32px;
}
.bd-8 {
  border-image-width: 50%;
}
.bd-9 {
  border-image-width: 10em;
}
.bd-10 {
  border-image-width: 5rem;
}
.bd-11 {
  border-image-width: 32px 1.5;
}
.bd-12 {
  border-image-width: 32px 0.5 16px;
}
```

以上[示例](./docs/css/html/css-code-5-10.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-10.html"></iframe>

对“border-image-outset”属性修改的情况,如下:

html 代码如下:

```html
<section>
  <div class="bd-1" data-value="initial;"></div>
  <div class="bd-2" data-value="inherit;"></div>
  <div class="bd-3" data-value="0;"></div>
  <div class="bd-4" data-value="0.5"></div>
  <div class="bd-5" data-value="16px"></div>
  <div class="bd-6" data-value="1"></div>
  <div class="bd-7" data-value="32px"></div>
  <div class="bd-8" data-value="10%"></div>
  <div class="bd-9" data-value=".4em"></div>
  <div class="bd-10" data-value="1rem"></div>
  <div class="bd-11" data-value="32px 16px"></div>
  <div class="bd-11" data-value="32px 16px 32px"></div>
</section>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  padding: 20px;
  overflow: hidden;
}
section > div {
  width: 160px;
  height: 96px;
  background-color: #c4ebff;
  border: 32px solid #2396ef;
  /* border-color失效 */
  border-image-source: url('/border-image_apple.png');
  /* 1倍宽度 */
  border-image-width: 1;
  /* 使用单个苹果的宽高 */
  border-image-slice: 32;
  /* 图像边框排列方式 */
  border-image-repeat: round;
  float: left;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
}
section > div:hover:before {
  content: attr(data-value);
  width: 160px;
  height: 96px;
  position: absolute;
  left: -32px;
  top: -32px;
  color: #445ff4;
  text-align: center;
  line-height: 96px;
  background: rgba(139, 125, 131, 0.6);
}
.bd-1 {
  border-image-outset: initial;
}
.bd-2 {
  border-image-outset: inherit;
}
.bd-3 {
  border-image-outset: 0;
}
.bd-4 {
  border-image-outset: 0.5;
}
.bd-5 {
  border-image-outset: 16px;
}
.bd-6 {
  border-image-outset: 1;
}
.bd-7 {
  border-image-outset: 32px;
}
.bd-8 {
  border-image-outset: 10%;
}
.bd-9 {
  border-image-outset: 0.4em;
}
.bd-10 {
  border-image-outset: 1rem;
}
.bd-11 {
  border-image-outset: 32px 16px;
}
.bd-12 {
  border-image-outset: 32px 16px 32px;
}
```

以上[示例](./docs/css/html/css-code-5-11.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-11.html"></iframe>

最后再来看对“border-image-repeat”属性修改的情况，如下:

html 代码如下:

```html
<section>
  <div class="bd-1" data-value="initial;"></div>
  <div class="bd-2" data-value="inherit;"></div>
  <div class="bd-3" data-value="stretch"></div>
  <div class="bd-4" data-value="space"></div>
  <div class="bd-5" data-value="round"></div>
  <div class="bd-6" data-value="repeat"></div>
  <div class="bd-7" data-value="unset"></div>
  <div class="bd-8" data-value="round repeat"></div>
</section>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  padding: 20px;
  overflow: hidden;
}
section > div {
  width: 160px;
  height: 96px;
  background-color: #c4ebff;
  border: 32px solid #2396ef;
  /* border-color失效 */
  border-image-source: url('/border-image_apple.png');
  /* 1倍宽度 */
  border-image-width: 1;
  /* 使用单个苹果的宽高 */
  border-image-slice: 32;
  /* 不向外偏移 */
  border-image-outset: 0;
  float: left;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
}
section > div:hover:before {
  content: attr(data-value);
  width: 160px;
  height: 96px;
  position: absolute;
  left: -32px;
  top: -32px;
  color: #445ff4;
  text-align: center;
  line-height: 96px;
  background: rgba(139, 125, 131, 0.6);
}
.bd-1 {
  border-image-repeat: initial;
}
.bd-2 {
  border-image-repeat: inherit;
}
.bd-3 {
  border-image-repeat: stretch;
}
.bd-4 {
  border-image-repeat: space;
}
.bd-5 {
  border-image-repeat: round;
}
.bd-6 {
  border-image-repeat: repeat;
}
.bd-7 {
  border-image-repeat: unset;
}
.bd-8 {
  border-image-repeat: round repeat;
}
```

以上[示例](./docs/css/html/css-code-5-12.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-12.html"></iframe>

以上所有属性在代码中都添加了注释，在这里就不再赘述，如果仍然不是很清楚这些属性和值产生的作用，可以单独打开示例并在开发者工具中对还不是很清楚的属性值进行手动调整，观察页面元素的表框变化，从而理解这些属性值的作用。如果已经基本清楚这些属性的作用了，那我们就可以就开始对他们进行简写了，即写成组合值的形式。

组合值写法如下:

```css
border-image: '边框图像(border-image-source)'
  '边框向内偏移量(border-image-slice)' /
  '边框图像边界宽度(border-image-width)' /
  '边框图像区域超出边框的量(border-image-outset)'
  '边框排列方式(border-image-repeat)';
```

例如以下一个写法:

```css
div {
  border-image: url('./border.png') 16 / 1 / 0 repeat;
}
```

让我们来看一个具体的示例:

html 代码如下:

```html
<section>
  <div class="bd-1"></div>
  <div class="bd-2"></div>
  <div class="bd-3"></div>
  <div class="bd-4"></div>
  <div class="bd-5"></div>
</section>
```

css 代码如下:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  padding: 20px;
  overflow: hidden;
}
section > div {
  width: 160px;
  height: 96px;
  background-color: #c4ebff;
  border: 32px solid #2396ef;
  float: left;
  margin-right: 20px;
  margin-top: 20px;
}
.bd-1 {
  border-image: url('/border-image_apple.png');
}
.bd-2 {
  border-image: url('/border-image_apple.png') 32 space;
}
.bd-3 {
  border-image: url('/border-image_apple.png') 32 fill / 32px round;
}
.bd-4 {
  border-image: url('/border-image_apple.png') 32 16 / 32px 16px / 10px repeat;
}
.bd-5 {
  border-image: url('/border-image_apple.png') 32 16 / 32px 32px / 20px repeat
    round;
}
```

以上[示例](./docs/css/html/css-code-5-13.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-13.html"></iframe>

“border-image”属性组合值的写法比较复杂一些，少了一些必要的值，或是值的顺序稍微顺序不对，又或者是分割符“/”的位置不对，都会导致该属性失效，所以在实际开发中要多多注意。

最后再说一点，那就是“border-image”同样可以设置渐变，这点我们将在背景色渐变一节中提到。

## 圆角的盒子“border-radius”

该属性虽然带了一个“border”字样，同样也是用来设置元素的边界，但它和“border”并无太大的关系，它是对元素的“左上”、“右上”、“右下”和“左下”四个角的“圆度”进行设置。该属性能对任何显示类型的元素设置，包括“行级元素（inline）”。它的属性值与 font-size 的属性值一样。

“border-radius”实现的原理是根据该属性所设置的值，在元素内建立一个以该值为半径的“看不见的圆”，并以该圆的边缘形状来设置边角的圆度。并且它包含四个分支属性，即 border-top-left-radius、border-top-right-radius、border-bottom-left-radius、border-bottom-right-radius。同时它的还包含两个方向，即水平方向和垂直方向，写法结构如下

```css
border-radius: '水平方向圆的半径值' / '垂直方向圆的半径值';
```

例如:

```css
div {
  border-radius: 100px / 80px;
}
```

它的值也可以是百分比单位，例如:

```css
div {
  border-radius: 50%;
}
```

它表示在“水平方向”设置为“width”属性 50%的值，在“垂直方向”也设置为“height”属性 50%的值来绘制一个“看不见的圆”来表示四个角的圆度，若对“border-radius”的值用“百分比单位”进行统一设置（即不对四个角分别进行设置的情况），那它的上限值就是“50%”，会呈现出一个“正圆（元素的宽高相等）”或“椭圆（元素的宽高不相等）”，在此基础上再增加这个值不会看到任何变化。

需要注意一点就是在使用百分比单位（包括超过“50%”的百分比单位，超过 150%后会将不再对选择的边角进行影响，而是对选择边角的“对角”进行影响了，这个值没有最大值，也就是一个无穷大的值，会让“对角”无限趋向一个“直角”，即让“对角”趋向一个没有设置过“border-radius”的边角的样式）。

在进行“border-radius”四个角分别设置的时候需要注意一个要点，就是设置方向一定要先是“top”或“bottom”方向，再是“left”或“right”方向，否则不能达到预期的效果。如下所示:

```css
div {
  /*无效*/
  border-left-bottom-radius: 50px;
  /*有效*/
  border-bottom-left-radius: 50px;
}
```

我们来看一个示例:

html 代码如下:

```html
<section>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <p></p>
  <p></p>
  <p></p>
  <p></p>
</section>
```

css 代码如下:

```css
@charset "utf-8";
* {
  margin: 0;
  padding: 0;
}
section {
  width: 100%;
  padding: 40px;
}
section:after {
  content: '';
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}
section > p,
section > div {
  float: left;
  margin: 1em 15px 1em 0;
}
section > div {
  width: 200px;
  height: 180px;
  background-color: #996723;
}
section > p {
  width: 200px;
  height: 200px;
  background-color: #ff2389;
}
section > div:first-of-type {
  border-radius: 15px;
}
section > div:nth-of-type(2) {
  border-radius: 30px;
}
section > div:nth-of-type(3) {
  border-radius: 200px / 100px;
}
section > div:last-of-type {
  border-radius: 50%;
}
section > p:first-of-type {
  border-top-left-radius: 55px;
}
section > p:nth-of-type(2) {
  border-top-left-radius: 130px;
  border-bottom-right-radius: 130px;
}
section > p:nth-of-type(3) {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  /* 等价于border-radius:50% */
}
section > p:last-of-type {
  border-top-left-radius: 200px 180px;
  border-bottom-right-radius: 200px 180px;
}
```

以上[示例](./docs/css/html/css-code-5-14.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-5-14.html"></iframe>

关于“border”和“border-radius”属性配合“CSS3”中新属性的更多“有趣”的玩法可以查看该[示例](./docs/css/other/border-border-radius-example.html)。
