# HTML表格

html中的表格通常是由`<table>`标签对组成的,在CSS没有出现之前,由于缺乏样式控制,网页的布局都几乎采用的是`<table>`标签对,也就是表格形成。但是CSS出现以后,基本就不用到`<table>`标签对布局了,特别是发展的css2之后,表格布局更是用的很少,只除了在展现数据和一些后台管理系统还在用以外。相对于`<div>`新式布局,表格布局主要有以下几个缺点。

* 嵌套比较复杂,而且还会出现一些不必要的嵌套。
* 会出现太多没有意义的空标签。
* 布局也不是很灵活,布局变动还会导致重新开发。
* 表格需要加载内容,导致网页渲染速度变慢。

在现在看来用`<table>`标签来布局肯定不是个好主意了，现在的`<table>`最多的用途也就是用来显示数据了，虽然它的加载渲染速度会偏慢，但比起`<div>`的新式布局来说，`<table>`会减少对CSS的使用，实际开发起来会更加快捷。目前很多产品，特别是后台管理系统，很多仍然也是采用`<table>`标签来显示数据。

## 表格的基本形态

来看一个基本布局的示例,如下:

```html
<table>
    <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>爱好</th>
    </tr>
    <tr>
        <td>夕水</td>
        <td>男</td>
        <td>敲代码</td>
    </tr>
    <tr>
        <td>呵呵</td>
        <td>女</td>
        <td>玩游戏</td>
    </tr>
</table>
```

以上[示例](./docs/html/html/html-code-8-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-1.html"></iframe>

这就是一个表格的基本形态。但我们还可以有另一种写法:

```html
<table>
    <thead>
        <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>爱好</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>夕水</td>
            <td>男</td>
            <td>敲代码</td>
        </tr>
        <tr>
            <td>呵呵</td>
            <td>女</td>
            <td>玩游戏</td>
        </tr>
    </tbody>
</table>  
```

以上[示例](./docs/html/html/html-code-8-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-2.html"></iframe>

虽说第二种写法多嵌套了一层,但是第二层更加有利于遍历数据。在某些特定情况下我们还可以添加`<tfoot>`标签对,使表格更加语义化。这样方便CSS或者JavaScript操作表格的时候使DOM(后面js会讲到什么是dom)结构更加清晰。

## 初具形态的表格

表格当然还有属性,我们可以先为其加上边框,属性名为border。如以下一个示例:

```html
<!--添加了边框-->
<table border="1" >
    <thead>
        <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>爱好</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>夕水</td>
            <td>男</td>
            <td>敲代码</td>
        </tr>
        <tr>
            <td>呵呵</td>
            <td>女</td>
            <td>玩游戏</td>
        </tr>
    </tbody>
</table> 
```

以上[示例](./docs/html/html/html-code-8-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-3.html"></iframe>

## 完整形态的表格

就算是像上面那样给`<table>`标签加上“border”属性，虽然有了排版的视觉效果，但显示效果仍然不是很理想，这个时候我们就要给他加上另外两个属性“cellspacing”和“cellpadding”。他们表示表格之间的间隙。

* cellspacing：表示表格单元格与单元格之间的空隙,默认单位为像素(px);
* cellpadding：表示表格单元格与内容之间的空隙,默认单位也是像素(px);

例如以下一个示例：

```html
<!--添加了边框间隙-->
<table border="1" cellspacing="16" cellpadding="5" >
    <thead>
        <tr>
            <th>姓名</th>
            <th>性别</th>
            <th>爱好</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>夕水</td>
            <td>男</td>
            <td>敲代码</td>
        </tr>
        <tr>
            <td>呵呵</td>
            <td>女</td>
            <td>玩游戏</td>
        </tr>
    </tbody>
</table> 
```

以上[示例](./docs/html/html/html-code-8-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-4.html"></iframe>

## 完整形态的带样式的表格

表格元素的显示类型比较特殊,既不是块元素,尽管它含有块元素的大部分特征,也不是行内块元素,也不是行内元素,它的显示类型(display)为table。`<thead>`的显示类型为table-header-group,`<tbody>`为table-row-group,`<tfoot>`为table-foot-group,`<tr>`为table-row,`<td>`和`<th>`为table-cell。有些复杂,我们不用去强行记忆下来,只需要了解便可以了,平时就把`<table>`当成块元素使用。

设置`<table>`标签的样式的属性主要有：

* width：用于设置表格宽度。
* height：用于设置表格高度。
* bgcolor：用于设置表格[颜色](http://www.runoob.com/tags/html-colorname.html)。
* background：用于设置表格的背景图片。
* align：用于设置表格对齐方式或单元格内容的对齐方式。

以上属性都可以具体到某一行(`<tr>`只能设置bgcolor生效),或者某个单元格(`<th>`和`<td>`)的样式。一个完整形态的表格如以下示例:

```html
<table border="1" cellspacing="5" cellpadding="6" width="600" height="400"  align="center" background="https://www.eveningwater.com/my-web-projects/threejs/1/img/stonePattern.jpg" bgcolor="#2396ef" >
    <thead>
        <tr bgcolor="#febcb9">
            <th>职位</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>技能</th>
        </tr>
    </thead>
    <tbody>
        <tr bgcolor="#acffa3">
            <td>web前端开发</td>
            <td>夕水</td>
            <td>22</td>
            <td>HTML,CSS,JavaScript</td>
        </tr>
        <tr bgcolor="#feffa9">
            <td>web后端开发</td>
            <td>eveningwater</td>
            <td>22</td>
            <td>java,PHP,python,node.js,go</td>
        </tr>
        <tr bgcolor="#b3d9fe">
            <td>IOS/安卓开发</td>
            <td>waterXi</td>
            <td>22</td>
            <td>swift,andriod</td>
        </tr>
    </tbody>
</table> 
```

以上[示例](./docs/html/html/html-code-8-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-5.html"></iframe>

## 表格跨行跨列

有的时候我们需要表格的数据内容进行归类显示，也就是一个类型的数据包含多条子数据，这时候我们就需要像“Excel”那样进行“单元格合并”，在HTML中我们叫做“表格跨行”和“表格跨列”。属性名为colspan(表格跨列)和rowspan(表格跨行)。如以下一个示例:

```html
<table border="1" cellspacing="5" cellpadding="6" width="600" height="400"  align="center" background="https://www.eveningwater.com/my-web-projects/threejs/1/img/stonePattern.jpg" bgcolor="#2396ef" >
    <thead>
        <tr bgcolor="#febcb9">
            <th>职位</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>技能</th>
        </tr>
    </thead>
    <tbody>
        <tr bgcolor="#acffa3">
            <td cospan="3">web前端开发</td>
            <td>夕水</td>
            <td>22</td>
            <td>HTML,CSS,JavaScript</td>
        </tr>
        <tr bgcolor="#feffa9">
            <td>web后端开发</td>
            <td>eveningwater</td>
            <td>22</td>
            <td>java,PHP,python,node.js,go</td>
        </tr>
        <tr bgcolor="#b3d9fe">
            <td>IOS/安卓开发</td>
            <td>waterXi</td>
            <td>22</td>
            <td rowspan="5">swift,andriod</td>
        </tr>
    </tbody>
</table>  
```

以上[示例](./docs/html/html/html-code-8-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-6.html"></iframe>

## 表格的标题

在表格内部还可以有一个标题<em class="hover-info" data-title="本意为图表添加的说明文字，它有特殊的显示类型“display: table-caption”">`<caption>`</em>标签对，这个标签类似于一个块级元素，默认至于表格上方，且在表格上方的一行内居中。它的使用方式如下:

```html
<table border="1">
    <caption>学生信息资料</caption>
    <thead>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        <th>爱好</th>
    </thead>
    <tbody>
        <tr>
            <td>小豪</td>                       
            <td>男</td>                       
            <td>23</td>                       
            <td>读书</td>                       
        </tr>
        <tr>
            <td>小珍</td>                       
            <td>女</td>                       
            <td>19</td>                       
            <td>化妆</td>                       
        </tr>                        
    </tbody>                       
</table>
```

以上[示例](./docs/html/html/html-code-8-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-8-7.html"></iframe>