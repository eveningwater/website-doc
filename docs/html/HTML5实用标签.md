# HTML5实用标签

## HTML5实用标签概述

HTML5标签，指的是HTML发展到第5个版本规范之后为HTML部分新提供的一系列标签。HTML第5版标准除了为HTML部分新提供和删除了一部分标签外，它还提供或修改了图片、音频、视频、动画、画布、设备交互、浏览器行为、数据持久化、多线程和<em class="hover-info" data-title="Application Programming Interface，应用程序接口。是一些预先定义的函数，或指软件系统不同组成部分衔接的约定。目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问原码，或理解内部工作机制的细节。">API</em>等内容。而本节的内容是为了减少学习成本，将HTML第5版提供的那些标签中比较实用的部分给选取了出来供大家学习。

当然，作为新的技术内容，会对一些老版本的浏览器不太友好，但在[现代浏览器](http://html5test.com/)中已经得到了非常好的支持。但当如果你正在开发的项目会涉及到一些HTML5内容，但又要考虑到老版本的浏览器的时候可以到“[Can I Use](https://www.caniuse.com/)”的搜索框中输入HTML标签名、CSS属性名或JavaScript API来查看各个浏览器版本对当前搜索内容的支持情况，从而决定是否采用替代方案。

浏览器不认识的新标签会被一律视为“文本标签”，即“行内元素”，对于浏览器不认识的CSS属性则会自动被忽略掉，而对于浏览器不认识的API可能被忽略，在特定的语法结构中还可能造成程序报错。当然，这些问题借助一些“<em class="hover-info" data-title="这里主要指一些由程序员预先编写好了的CSS或JS格式的文件，主要用于简化现有的工作或解决浏览器兼容性问题">库</em>”或者“<em class="hover-info" data-title="可能是一个运行环境，也可能是一个JS格式的文件">工具</em>”基本上都能得到很好的解决。

## `<mark>`标签

该标签是一个“行内元素”，它的作用是像一只荧光笔一样突出你标记的文本。如以下示例:

```html
<p>只要心中有自信，任何困难都打不倒你。<mark>坚持</mark>就是胜利!</p>
```

运行结果如下所示:

<div class="ew-code-compiler">
    <p>只要心中有自信，任何困难都打不倒你。<mark>坚持</mark>就是胜利!</p>
</div>

## `<meter>`标签

该标签是一个“行内块级元素”，它是用于度量属性“value”的值的一个标签，通过判断“value”的值是否在一个合适的区间，从而显示出不同级别颜色。如果值在合理区间会显示成一个值内容比例为“绿色”的横条，如果值在不合理区间会显示成一个值内容比例为“红色”的横条，而鉴于两者之间则显示为“黄色”的横条。`<meter>`标签具有以下属性值：

* max：规定度量的最大值。
* min： 规定度量的最小值。
* high：规定高范围的度量值（大于该值）。
* low：规定低范围的度量值（小于该值）。
* optimum：规定最佳的度量值，该值所在的区间会成为“合理区间”。

来看一个示例如下所示:

```html
<section>
    <p>
        <label>整数形式:</label>
        <meter value="2" min="0" max="10" low="3" high="7" optimum="1">2/10</meter>
        <meter value="3" min="0" max="10" low="3" high="7" optimum="1">3/10</meter>
        <meter value="5" min="0" max="10" low="3" high="7" optimum="1">5/10</meter>
        <meter value="7" min="0" max="10" low="3" high="7" optimum="1">8/10</meter>
    </p>
    <p>
        <label>浮点数形式:</label>
        <meter value="0.2" min="0" max="1" low="0.3" high="0.7" optimum="0.9">20%</meter>
        <meter value="0.3" min="0" max="1" low="0.3" high="0.7" optimum="0.9">30%</meter>
        <meter value="0.5" min="0" max="1" low="0.3" high="0.7" optimum="0.9">50%</meter>
        <meter value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="0.9">70%</meter>
    </p>
</section>
```

以上[示例](./docs/html/html/html-code-11-1.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-11-1.html"></iframe>

## `<progress>`标签

该标签是一个“行内块级元素”，它是一个用于显示“进度信息”的标签。`<progress>`标签具有以下属性值：

* max：规定总进度量的值。
* value：规定当前进度量的值。

来看如下一个示例:

```html
<p>
    <label>下载中:</label>
    <progress></progress>
</p>
<p>
    <label>当前进度:</label>
    <progress max="200" value="60"></progress>
</p>
```

以上[示例](./docs/html/html/html-code-11-2.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-11-2.html"></iframe>

该标签通常不是独立使用的，它需要配合JavaScript去完成进度条的动态变化。由于该标签不支持IE9及之前版本的IE浏览器，所以如果要考虑兼容性，我们可以考虑使用后面会学习到的CSS去模拟一个自定义的进度条，其样式的自定义也会更加的方便。

## `<picture>`标签

该标签是一个“行内元素”，它属于一个功能性标签，一般用于制作“响应式图片”。这个标签比较有意思，它不仅可以在不同的设备宽度时根据设定的条件加载不同的图片，还能根据设备是横屏还是竖屏加载不同的图片。该标签需要配合`<source`>和`<img>`这两个单标签进行嵌套使用，否则将无效。

`<picture>`标签组合的基本使用代码格式如下：

```html
<picture>
    <source media="(max-width:像素值)" srcset="小图片路径">
    <source media="(min-width:像素值) and (max-width:像素值)" srcset="中图片路径">
    <source media="(min-width:像素值)" srcset="大图片路径">
    <img src="默认图片路径" alt="默认图片">
</picture>
```

`<source>`标签拥有两个属性：

* media：用于设置屏幕分辨率的范围。以宽度为例，如果表示大于600像素的部分使用“(min-width: 600px)”，表示小于400像素的部分使用“(max-width: 400px)”，表示400像素至600像素之间的部分则使用“(min-width: 400px) and (max-width: 600px)”，表示高度同理，只需要将“width”更换为“height”即可。除了最大/小宽度和最大/小高度，该属性内还可以使用“orientation”属性来表示方向，它有“<em class="hover-info" data-title="直译为：风景">landscape</em>”和“<em class="hover-info" data-title="直译为：肖像">portrait</em>”这两个值，“landscape”表示屏幕为横向的，即屏幕宽度大于高度；而“portrait”表示屏幕为纵向或等边的，即屏幕高度大于或者等于宽度。例如，我们需要去匹配宽度大于500像素，同时屏幕方向为横向的，那我们就可以将media属性的值设置为“(min-width: 500px) and (orientation: landscape)”。

* srcset：该属性和`<img>`标签中“srcset”属性内的值都会生效，它会根据“media”属性的查询结果来使得其中唯一的一个“srcset”属性的值生效，如果当前的屏幕大小不满足所有`<source>`标签内“media”属性的查询结果，那将会使用`<img>`标签内的“src”属性值。

现在我们在完成一个，在屏幕宽度分别在640像素以下、640~960像素和960像素以上时加载不同大小图片的示例，代码如下：

```html
<picture>
    <source media="(max-width:640px)" srcset="../images/flower-fairy(small).jpg">
    <source media="(min-width:640px) and (max-width:960px)" srcset="../images/flower-fairy(medium).jpg">
    <source media="(min-width:960px)" srcset="../images/flower-fairy(large).jpg">
    <img width="100%" src="../images/flower-fairy.jpg" alt="默认图片">
</picture>
```

运行效果：

点击[此处](./docs/html/html/html-code-11-3.html)在新的窗口查看效果。

最后需要再强调的是，`<img>`设置的图片在这里虽然没有显示，但是仍然是不能省略的，否则功能会失效，因为`<source>`标签里设置的图片最终还是得靠`<img>`标签来显示。另外，在不支持`<picture>`标签的浏览器内会直接显示`<img>`标签内“src”属性设置的图片。

## `<audio>`标签

该标签是一个“行内元素”,它用于在页面中加载音频文件，目前HTML5标准中，`<audio>`主要支持三种格式的音频文件，即：“ogg”(Ogg Vorbis)、“mp3”和“wav”格式的音频文件，但不同的浏览器支持的情况又有所不同，所以我们通常不会单独使用`<audio>`标签，而是在该标签内置入一个`<source>`标签，使浏览器将一个识别到的音频文件进行使用。浏览器支持音频格式的情况如下表：

| 音频格式   | IE9 | FireFox 3.5 | Opera 10.5 | Chrome 3.0 | Safari 3.0 |
| ---------- | --- | ----------- | ---------- | ---------- | ---------- |
| Ogg Vorbis |     | √           | √          | √          |            |
| mp3        | √   |             |            | √          | √          |
| wav        |     | √           | √          |            | √          |

`<audio>`标签具有以下属性：

* autoplay：如果出现该属性，则音频在就绪后马上播放（从2018年4月份开始，以Google Chrome为首的浏览器进行了一些改革，其中就包含了禁止网页加载完成后自动播放音视频的功能。所以，要让网页加载完成后自动播放音视频得配合JavaScript来使用一些取巧的手段才能够实现。现在我们可以认为该属性是无效的。）
* controls：如果出现该属性，则向用户显示控件，比如播放按钮。
* loop：如果出现该属性，则每当音频结束时重新开始播放。
* muted：规定音频输出应该被静音。
* preload：如果出现该属性，则音频在页面加载时进行加载，并预备播放。若和“autoplay”同时使用，则该属性值会被忽略。该属性可以有三个值，它们分别是“auto”、“metadata”和“none”，“auto”作用为当页面加载后载入整个音频；“metadata”作用为当页面加载后只载入元数据；“none”作用为当页面加载后不载入音频。
* src:要播放的音频的URL地址。

`<source>`标签具有以下属性：

* src：规定媒体文件的URL地址。
* type：规定媒体资源的[<em class="hover-info" data-title="该网址需要科学上网才能够打开">MIME类型</em>](https://zh.wikipedia.org/wiki/%E5%A4%9A%E7%94%A8%E9%80%94%E4%BA%92%E8%81%AF%E7%B6%B2%E9%83%B5%E4%BB%B6%E6%93%B4%E5%B1%95)（MIME：Multipurpose Internet Mail Extensions，多用途互联网邮件扩展类型。是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。它包含文本、图像、音频、视频以及其他应用程序专用的数据），详细的MIME参考手册可以到W3school的[《MIME 参考手册》](https://www.w3school.com.cn/media/media_mimeref.asp)进行查阅。

`<audio>`标签要兼容各种浏览器的写法当如下：

```html
<audio controls="controls" preload="auto" >
    <!-- src是音频资源url地址 -->
    <source src="" type="audio/mpeg" />
    <source src="" type="audio/ogg" />
</audio>
```

如以下一个示例:

```html
<audio controls="controls" preload="auto" >
    <source src="https://www.aulence.com/media/cityOfSky.mp3" type="audio/mpeg" />
    <source src="https://www.aulence.com/media/cityOfSky.ogg" type="audio/ogg" />
</audio>
```

以上[示例](./docs/html/html/html-code-11-4.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-11-4.html"></iframe>

## `<video>`标签

该标签是一个“行内元素”,它用于在页面中加载视频文件，目前HTML5标准中，`<video>`主要支持三种格式的视频文件，即：“ogg/ogv”(带有Theora视频编码和Vorbis音频编码的Ogg文件)、“mp4”（带有H.264视频编码和AAC音频编码的MPEG4文件）和“webm”（带有VP8视频编码和Vorbis音频编码的WebM文件）格式的视频文件，但不同的浏览器支持的情况又有所不同，所以我们通常不会单独使用`<video>`标签，而是在该标签内置入一个`<source>`标签，使浏览器将一个识别到的音频文件进行使用。

浏览器支持视频格式的情况如下表：

| 视频格式 | IE   | Firefox | Opera | chrome | Safari |
| -------- | ---- | ------- | ----- | ------ | ------ |
| Ogg      | No   | 3.5+    | 10.5+ | 5.0+   | No     |
| MPEG4    | 9.0+ | No      | No    | 5.0+   | 3.0+   |
| WebM     | No   | 4.0+    | 10.6+ | 6.0+   | No     |

`<video>`标签具有以下属性：

* width：设置视频播放器的宽度。
* height：设置视频播放器的高度。
* autoplay：如果出现该属性，则视频在就绪后马上播放（现在已经不支持全部主浏览器了，原因见上一节`<audio>`标签的“autoplay”属性描述）。
* controls：如果出现该属性，则向用户显示控件，比如播放按钮。
* loop：如果出现该属性，则当媒介文件完成播放后再次开始播放。
* preload：如果出现该属性，则音频在页面加载时进行加载，并预备播放。若和“autoplay”同时使用，则该属性值会被忽略，该属性的三个值同音频标签。
* src：要播放的视频的URL地址。

`<source>`标签所含属性等同于`<audio>`的`<source>`标签。

`<video>`标签要兼容各种浏览器的写法当如下：

```html
<video width="300" height="250" controls="controls" preload="auto">
    <!-- src是视频资源url地址 -->
    <source src="" type="video/mp4" />
    <source src="" type="video/ogg" />
</video>
```

如以下一个示例:

```html
<video width="300" height="250" controls="controls" preload="auto">
    <source src="https://www.aulence.com/media/scenery.mp4" type="video/mp4" />
    <source src="https://www.aulence.com/media/scenery.ogg" type="video/ogg" />
</video>
```

以上[示例](./docs/html/html/html-code-11-5.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-11-5.html"></iframe>