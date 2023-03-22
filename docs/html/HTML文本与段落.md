# HTML文本与段落

## HTML标题

HTML 标题（Heading）是通过`<h1> ~ <h6>`标签来定义的。它们之间唯一的区别就是每个标签的字体样式不同。简单点说就是从上到下依次减小,默认都有加粗样式,还有行高。(后期学了CSS之后可以针对样式控制,现在就先这样吧。)就像word文档的一级二级三级标题一样。代码如下:

```html
<h1>我是一级标题</h1>
<h2>我是二级标题</h2>
<h3>我是三级标题</h3>
<h4>我是四级标题</h4>
<h5>我是五级标题</h5>
<h6>我是六级标题</h6>
```

以上[示例](./docs/html/html/html-code-3-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-1.html"></iframe>

## HTML段落

HTML 段落是通过标签`<p>`来定义的。例如:

```html
<p>我是段落的内容我是段落的内容我是段落的内容我是段落的内容!</p>
```

以上[示例](./docs/html/html/html-code-3-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-2.html"></iframe>

## HTML文本

除了HTML段落标签之外，还有一个用于表示文本的标签,那就是`<span>`标签,如:

```html
<span>我是一段文本的内容，我是一段文本的内容!</span>
```

以上[示例](./docs/html/html/html-code-3-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-3.html"></iframe>

## `<span>`与`<p>`的区别

虽说不用这两个标签,也可以在`<body>`标签里面直接写文本,但是这样不利于样式的控制,尤其是现在很多网站的文本都是排列的非常整齐有序,通常都是写在标签里的。另外这两个标签,同样都是文本标签,那么它们之间的区别究竟是什么?我们来做一个测试:

```html
<span>文本标签1</span>
<span>文本标签2</span>
<span>文本标签3</span>
<p>段落标签1</p>
<p>段落标签2</p>
<p>段落标签3</p>
```

以上[示例](./docs/html/html/html-code-3-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-4.html"></iframe>

同样都是文本标签,他们显示的效果有什么不同呢?细心的你不知道有没有发现其实`<span>`标签并没有产生换行的效果,而`<p>`标签却产生了换行的效果。所以得出了结论:我们把像`<span>`标签一类的在浏览器屏幕宽度之内只显示内容而不产生换行的标签叫做行内标签或行内元素。而把像`<p>`标签一类在浏览器屏幕宽度之内即显示内容占据一行又产生换行的标签叫做块标签或块元素(也可以叫块级元素)。当然还有一种标签叫行内块标签或行内块元素(关于这个标签的定义后面再说),现在先说出来让大家有个心理准备。

> 说明:行内元素与块元素之间的区别就是:换行。（可根据字意来理解，行内即一行之内，也就是不换行，块即一块一块的，自然要换行）。

## `<br>`的用处

### `<br>`换行

既然行内标签`<span>`没办法换行,那我想要换行应该怎么办呢?html提供了一个换行标签`<br>`,在html5之前的版本换行标签的写法是`<br />`,但在html5却去掉了"/"用以表示这是一个单标签,并没有结束标签。它的作用就是执行换行,插在哪里,哪里就执行换行。如:

```html
<span>文本一</span>
<br>
<span>文本二</span>
<span>文本<br>三</span>
<span>文本四</span>
<span>文本五</span><br>
<span>文本六</span>
```

以上[示例](./docs/html/html/html-code-3-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-5.html"></iframe>

### `<br>`是行内标签?

虽然`<br>`标签产生的是换行效果,但它却是一个行内标签。因为它产生的效果是作用于元素本身的,而并不是它。就比如你在两个`<br>`标签里添加一点内容,它并不会产生换行效果,如:

```html
<br>我是br标签里的内容，但是我并没有被换行。<br>
```

以上[示例](./docs/html/html/html-code-3-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-6.html"></iframe>

### `<br>`不是行内标签?

其实严格意义上来说,`<br>`标签也不算是行内标签,因为它不能使用CSS控制样式,如以下我为这个标签添加了一个改变字体颜色为红色的代码,但是我们看到,样式并没有产生效果,所以这个标签比较特殊。

```html
<br style="color:#f00;">我是br标签里的内容，但是我并没有被换行。<br>
```

以上[示例](./docs/html/html/html-code-3-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-7.html"></iframe>

只是由于`<br>`具备行内标签的一些特性,所以我们暂时把他归类为行内标签。

> 注: 其中style="color:#f00;"中的style为标签的属性名，顾名思义，就是样式的意思，=后则为标签的属性值。color则为CSS中的属性名,:后的#f00为计算机颜色模式的一种，叫做[<em class="hover-info" data-title="英文:Hexadecimal color mode">十六进制颜色模式</em>](https://baike.baidu.com/item/%E5%8D%81%E5%85%AD%E8%BF%9B%E5%88%B6%E9%A2%9C%E8%89%B2%E7%A0%81/10894232?fr=aladdin)。

## 强大的`<div>`标签

`<div>`标签到现在为止,可以说是开发中见得最多的一个标签,它是html中最具代表性的一个标签,可以毫不夸张的说,业界喜欢说`html + css`布局,我们其实也可以说成是`div + css`布局,当然在html5没出现之前,这个说法我完全赞同,但是html5出现之后,又出现了一些类似`<div>`标签特性的新的标签,他们的出现导致这个说法也有点不切实际了,尽管`<div>`依然很强大。与`<div>`标签相比,这些新出现的标签也并没有什么特别之处,只不过它们更加语义化而已。`<div>`标签需要一个结束标签,`<div>`标签也是一个块级标签。如:

```html
<div>javascript + css</div>
<div>html + css</div>
```

以上[示例](./docs/html/html/html-code-3-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-3-8.html"></iframe>

从以上可以看出,`<div>`标签并没有什么特殊性啊,它就是一个块级标签,类似`<p>`标签而已.但是它到底因何而被冠以那样的称号呢?很简单,因为它具有高度的可定义性。在html4版本以前,`<div>`标签被称为最基本的布局元素。我们可以根据不同的内容来把内容放进不同的`<div>`标签内。