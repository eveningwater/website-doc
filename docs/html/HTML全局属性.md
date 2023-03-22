# HTML全局属性

HTML全局属性是可以应用于几乎所有（部分属性有一定的应用范围限制）的HTML标签的属性，现在已知的属性有16个，其中有一半左右是HTML5标准后出现的，很多属性在我们之前的学习中都已经接触过了的，能熟练地记识这些属性能够给我们之后的Web开发带来很多便利，减少开发中所犯的一些低级错误。作为一个Web前端工程师，能够准确地区分全局属性和特殊属性也是一项重要的基本功。接下来我们就来看看在HTML中哪些属性能够被大部分主流浏览器所兼容并作为全局属性。

## 唯一标识符"id"

该属性能用于所有的HTML元素，为HTML元素指定一个唯一的标识符，用于CSS设置，JavaScript进行操作或其它脚本语言及服务器端语言进行设置操作。如以下一个示例:

```html
<div id="myDiv">id属性为myDiv的div元素</div>
<a href="#" id="myA">id属性为myA的a元素</a>
<section cite="www.XXX.com" id="mySection">id属性为mySection的section元素</section>
```

## 元素类名“class”

该属性可以用于所有HTML元素，为元素添加一个或多个类名。通常是用于CSS设置或配合JavaScript进行操作设置，多个类名以空格符进行分隔。如以下一个示例:

```html
<div class="myDiv">class类名为myDiv的div元素</div>
<a href="#" class="myA origin-article-a">class类名为myA和origin-article-a的a元素</a>
<section cite="www.XXX.com" class="mySection myCite isSection">class类名为mySection和isSection和myCite的section元素</section>
```

## 元素样式“style”

该属性可以用于所有HTML元素，通过它的值可以给HTML元素设置CSS样式，语法和标准的CSS语法一致。如以下一个示例:

```html
<div style="width:800px;height:400px;color:#fff;background-color:#ff0;">设置div的样式</div>
```

虽然通过该属性来设置CSS属性看似方便，但这样会让CSS的可复用性和可维护性都变得相当的糟糕，所以，除非对非常特殊的元素使用该属性，否则还是建议将样式写进独立的CSS文件当中对元素的样式进行设置。

## 元素额外信息“title”

该属性可以用于所有HTML元素，通过设置它的值，可以让用户鼠标悬浮在该元素上显示出“title”属性中所设置的值。（注意：该属性不适用于移动设备）。如以下一个示例:

```html
<!--鼠标悬浮上去即可看到该属性所展示的信息-->
<img src="../images/female_emperor.png" title="据说她是世界上第一美女" alt="图片加载中" width="270" height="545" />
```

以上[示例](./docs/html/html/html-code-15-1.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-1.html"></iframe>

该属性在现在PC端中的Web开发非常常用，由于现在Web设计的趋势是简洁化、扁平化设计，页面上的元素也需要极力地简洁，很多常用的按钮甚至都没有文字，而是采用一个图标进行替代。但这样的设计会让有些用户不清楚按钮的实际用途，这个时候“title”就能起到一个补充说明的作用。

## 语言设置“lang”

该属性用于设置元素的语言类型，不支持的标签有`<base>`,`<br>`,`<frame>`,`<frameset>`,`<hr>`,`<iframe>`,`<param>`及`<script>`，但通常的使用方式是直接给`<html>`标签设置该属性，如：`<html lang="zh-cn">`、`<html lang="zh">`、`<html lang="en">`这样的形式，分别表示将语言类型设置为“简体中文”、“中文”、“英文”。

现在很多[IDE（代码编辑器）](https://baike.baidu.com/item/%E9%9B%86%E6%88%90%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/298524?fromtitle=IDE&fromid=8232086&fr=aladdin)都有HTML基本文档的生成功能，有些国外的IDE会在默认生成的HTML文档结构中将`<html>`标签的“lang”属性的值设置为“en”，这样在有些中文版的现代浏览器（如中文版的“Google Chrome”）启动该网页时就会询问用户“是否翻译该网站”，这对于国内网站来说，显然是有损用户体验的。所以，我们在自动生成文档结构后都需要习惯性地检查一下`<html>`中的“lang”属性值是否是我们需要的“zh-cn”。当然，如果是进入跨国、外资企业，很多时候开发的并不是中文网站，这个时候就需要将“lang”设置为指定的国家语言了。

| 国家       | 语言简写 |
| ---------- | -------- |
| 英国       | EN       |
| 日本       | JA       |
| 法国       | FR       |
| 西班牙     | ES       |
| 葡萄牙     | PT       |
| 德国       | DE       |
| 印度尼西亚 | ID/IN    |
| 意大利     | IT       |
| 韩国       | KO       |
| 马来西亚   | MS       |
| 罗马利亚   | RO       |
| 俄罗斯     | RU       |
| 瑞典       | SV       |
| 威尔士     | CY       |

更多国家的语言类型与简写[详见](https://www.w3school.com.cn/tags/html_ref_language_codes.asp)。

## 元素激活“accesskey”

该属性用于激活元素，通常作用是让表单元素获得焦点,实现方式是通过键盘上的“Alt”键加上该属性设置的属性值，属性值是用户键盘上指定的任意一个字母或一个常用符号。如以下一个示例:

```html
<form>
    <div>
        <label>用户名:</label>
        <!--可以按alt加上a键使这个文本框获取焦点-->
        <input type="text" accesskey="a" />
    </div>
    <div>
        <label>密码:</label>
        <!--可以按alt加上b键使这个文本框获取焦点-->
        <input type="password" accesskey="b" />
    </div>
    <div>
        <!--可以按alt加上c键使这个按钮获取焦点-->
        <button type="button" accesskey="c">提交</button>
    </div>
</form>
```

为了方便查看按钮获取焦点的效果，设置了CSS样式如下:

```css
button:focus{
    border: 1px solid #2396ef;
}
```

以上[示例](./docs/html/html/html-code-15-2.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-2.html"></iframe>

## Tab键切换的次序“tabindex”

该属性用于设定当用户按下键盘上的“Tab”键后，页面内可以获得焦点的元素获得焦点的次序（默认是基于文档流“从左到右，从上到下”的次序）。切换次序的先后遵循以下规则：

* 必须为正整数。
* 数字小的先获得焦点，数字大的后获得焦点。
* 数字并不需要连续，如“1、2、5、7...”也能正常按次序跳转焦点。
* 同样的数字，在文档流中先出现的先获得焦点，后出现的后获得焦点。
* 不能为负数，否则会被忽略。
* 可以为“0”，但会被排序到最后一个获得焦点。

来看一个示例:

```html
<!--按下tab键加上0,1,2键即可查看关注焦点的效果-->
<form>
    <div>
        <label>用户名:</label>
        <input type="text" tabindex="0" >
    </div>
    <div>
        <label>密码:</label>
        <input type="password" tabindex="1" >
    </div>
    <div>
        <button type="button" tabindex="2">提交</button>
    </div>
</form>
```

以上[示例](./docs/html/html/html-code-15-3.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-3.html"></iframe>

## 改变文本方向“dir”

该属性可以设置元素内文本的方向，它包含两个值：

* ltr：默认，文本从左往右显示。
* rtl：文本从右往左显示。

来看一个示例如下:

```html
<p dir="ltr">我曾给你最温暖的怀抱，你却给我最痛心的微笑。偶尔想起我们曾经走过的街角，是否还残留着幸福的味道。</p>
<p dir="rtl">向天空大声的呼唤，说声我爱你，向那流浪的白云，说声我想你，让那天空听得见，让那白云看得见，谁也擦不掉我们许下的诺言。</p>
```

以上[示例](./docs/html/html/html-code-15-4.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-4.html"></iframe>

在实际操作中，单独把某段文字设为“从右往左”的时候并不多，而是在进行一些文字书写习惯是从右往左的国家的网站开发会用到，这个时候用CSS的direction属性去控制会更加的明智。

## 编辑元素“contenteditable”

该属性是HTML5标准后写出现的一个比较有“革命意义”的属性，它可以让一个普通的布局标签元素（如`<div>`、`<p>`、`<span>`、`<section>`、`<article>`、`<header>`、`<main>`、`<footer>`、`<nav>`、`<aside>`等等）可以像一个文本框（域）一样编辑文本内容。之所以说它具有革命意义的原因在于，传统的表单输入元素的编辑只限于文本，而“contenteditable”属性只是让一个元素可以进行编辑，而并不会对其类型进行转化，也就是说网页中任何可以通过HTML+CSS实现的元素，都是可以进行编辑的。

该属性允许设置两种值，值的类型为一个布尔值：

* true：表示元素内可以进行编辑。
* false：表示元素内不可以进行编辑。

来看一个示例如下:

```html
<a href="https://www.aulence.com/" target="_blank" rel="noopener noreferrer" contenteditable="true">一个可以被编辑的a元素</a>
<div contenteditable="true">一个可以被编辑的DIV元素</div>
<section contenteditable="true">一个可以被编辑的section元素</section>
<p contenteditable="true">一个可以被编辑的p元素</p>
<span contenteditable="true">一个可以被编辑的span元素</span>
```

以上[示例](./docs/html/html/html-code-15-5.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-5.html"></iframe>

> 本示例写了一些css代码来美化页面。

## 用户私有数据定制“data-*”

首先需要明白的是该属性本身并不会对元素及相关联的元素造成任何影响，也就是说该属性会被浏览器用户代理忽略。属性“`data-*`”后面的“`*`”号可以是用户自定义的英文单词、数字、横线“-”和下划线“_”等字符串。如：“data-username”、“data-photo_1”、“data-list-item_01”等。该属性可以有属性值，也可以没有属性值，而属性值也完全是用户自定义的字符串。该属性的作用和“class”属性的作用比较相似（但该属性不被较老版本的浏览器支持），同样可以通过它去进行CSS样式的设置，也可以被JavaScript代码进行DOM操作，数据获取、设置等，但很多时候“class”中的值是用于CSS样式设置的，如果对其操作修改会造成自身样式或后代元素的样式错乱，这个时候通过去操作开发者自定义“data-*”属性更为稳妥，也更为规范。

来看以下一个示例:

```html
<form data-userform>
    <div>
        <label>用户名:</label>
        <input type="text" data-user="eveningwater" />
    </div>
    <div>
        <label>密码:</label>
        <input type="password" data-password="123456" />
    </div>
    <div>
        <label>邮箱:</label>
        <input type="email" data-email="854806732@qq.com" />
    </div>
</form>
```

以上[示例](./docs/html/html/html-code-15-6.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-6.html"></iframe>

> 本示例写了一些css代码来美化页面以及一些js代码来实现功能。

这里还有一个简单的使用私有数据完成的小小[demo](./docs/html/other/attrClickdemo.html)。

## 元素是否可以拖动“draggable”

该属性用于设定元素是否可以拖动，它允许设置三种值：

* true：表示元素内可以进行拖动。
* false：表示元素内不能进行拖动。
* auto：使用浏览器的默认行为。

来看一个示例:

```html
<div draggable="true">我是可以被拖动的DIV元素</div>
<img src="../images/chrome.png" alt="chrome" draggable="true" title="我是可以被拖动的img元素" width="50" height="50" />
<a href="#" target="_blank" rel="noopener noreferrer" draggable="true">我是可以被拖动的超链接</a>
<div draggable="false">我是不能被拖动的DIV元素</div>
<div draggable="auto">使用浏览器默认的行为</div>
```

以上[示例](./docs/html/html/html-code-15-7.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-7.html"></iframe>

该属性实质上是HTML5提供为JavaScript提供的一个API，也就是说需要和编程语言进行配合使用，在这里我们通常是和JavaScript中的“ondragstart（作用于被拖拽元素开始被拖动时）”、“ondragenter（作用于被拖拽元素进入拖动目标元素后）”、“ondragover（作用于被拖拽元素被拖动的过程中）”、“ondrop（作用于被拖拽元素被拖动后放开鼠标左键时）”和“ondragend（作用于被拖拽元素拖动结束后）”事件配合使用。比如这个[示例](./docs/html/other/dragdemo.html),更为复杂的还可以看如下这个[示例](https://www.eveningwater.com/my-web-projects/js/19/):

<iframe class="ew-transparent-iframe" src="https://www.eveningwater.com/my-web-projects/js/19/"></iframe>

以上示例源码在[这里](https://github.com/eveningwater/my-web-projects/tree/master/js/19)。

## 隐藏元素“hidden”

该属性无需属性值（所有属性值都无效），在“严格模式”的HTML文档中需要写成“hidden="hidden"”，但凡设置了该属性的元素都会在页面中隐藏，并且不再占用“文档流”中的位置，相当于将元素CSS的显示类型“display”属性的值设置为“none”（但通过这种方式隐藏元素，它的优先级的权重为0，只要在CSS中显示地将“display”属性设置为“inline-block”或“block”等可以显示元素的类型即可显示出元素）。

来看一个示例:

```html
<div hidden>被隐藏的div元素</div>
<img src="../images/chrome.png" alt="chrome" hidden="hidden" title="被隐藏的img元素" width="50" height="50" />
<a href="#" target="_blank" rel="noopener noreferrer" hidden="这个可以是任何值">被隐藏的超链接</a>
<span>只有这个没有设置hidden属性的元素才显示了</span>
```

以上[示例](./docs/html/html/html-code-15-8.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-8.html"></iframe>

## 英文拼写检查“spellcheck”

该属性用于检查元素内容中英文语法拼写的检查，若元素中英文字母内容不是已知的英文单词浏览器会在单词下方划上一条红色的波浪线用于提示错误。该属性允许设置两种值，值的类型为一个布尔值：

* true：表示为元素内的英文文本内容执行语法检查。
* false：表示不为元素内的英文文本内容执行语法检查。

来看一个示例如下:

```html
<div spellcheck="true" contenteditable="true">让我变成行星守护你，可以躲在云层偷偷照亮你。（有语法检查）</div>
<div spellcheck="false" contenteditable="true">这是一片很寂寞的天，下着有些伤心的雨。这是一个很在乎的我，和一个无所谓的结局。（无语法检查）</div>
```

以上[示例](./docs/html/html/html-code-15-9.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-15-9.html"></iframe>

> 本示例写了一些css代码来美化页面。

## 其它HTML全局属性

上面我们已经提到了13个HTML中的全局属性，这些属性都能被目前大部分或全部的浏览器所支持，而HTML5标准中出现的部分全局属性却不能完全地被目前的浏览器支持。下面列出了不能完全被现今主流浏览器所支持的剩余3个HTML全局属性。

* dropzone：规定在拖动被拖动数据时是否进行复制、移动或链接。（目前主流浏览器不支持该属性）。
* translate：规定是否应该翻译元素内容。（目前主流浏览器不支持该属性）。
* contextmenu：在用户右键目标元素时出现一个“id”属性值为“contextmenu”属性值中所设置文本内容的`<menu`>菜单，`<menu>`标签中的项通过子元素`<command>`标签的属性“label”进行文本设置从而显示出内容，用JavaScript的事件去定义这些`<command>`项的功能。（目前主流浏览器不支持该属性）。

例如以下一个示例:

```html
<div contextmenu="menuID">鼠标光标遇到这个div元素然后右键查看菜单</div>
<menu id="menuID">
    <command label="刷新页面" onclick="refreshPage()" />
    <command label="翻译页面" onclick="translatePage()" />
    <command label="关闭页面" onclick="closePage()" />
    <command label="跳转页面" onclick="locatePage()" />
</menu>
```