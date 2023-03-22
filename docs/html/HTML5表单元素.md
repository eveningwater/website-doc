# HTML5表单元素

## HTML5中的`<input>`

在HTML5标准中，为了提升用户体验，还为`<input>`标签的属性进行了扩展。

### “type”属性

其中为“type”属性增加了以下属性值：

* email：用于应该包含“e-mail”地址的输入框。
* url：用于应该包含“URL”地址的输入框。
* search：用于应该“搜索内容”的输入框。
* number：用于应该包含“数值”的输入控件。
* tel：规定显示的类型为“电话号码”的输入框。
* range：规定显示的类型为“数值选择范围”选择控件。
* date：规定显示的类型为“日期”选择控件。
* month：规定显示的类型为“月份”选择控件
* week：规定显示的类型为“周”选择控件。
* time：规定显示的类型为“时间”选择控件。
* datetime：规定显示的类型为“日期时间”选择控件。
* datetime-local：规定显示的类型为“本地日期时间”选择控件。
* color：规定显示的类型为“颜色”选择控件。

由于在制定HTML5标准时，无论移动端的Web浏览还是移动端的应用都已经开始逐渐的成为一种新的主流浏览方式了，所以以上这些属性大多在移动端有比在PC端更好的表现。来看一个示例如下:

```html
<form name="testForm">
    <label>email:</label>
    <input type="email" /><br>
    <label>搜索:</label>
    <input type="search" /><br>
    <label>网址:</label>
    <input type="url" /><br>
    <label>数值:</label>
    <input type="number" min="0" max="100" step="2" /><br>
    <label>电话号码:</label>
    <input type="tel" /><br>
    <label>范围:</label>
    <input type="range" min="0" max="100" step="1" value="30" /><br>
    <label>日期:</label>
    <input type="date" /><br>
    <label>月份:</label>
    <input type="month" /><br>
    <label>周:</label>
    <input type="week" /><br>
    <label>时间:</label>
    <input type="time" /><br>
    <label>日期时间:</label>
    <input type="datetime" /><br>
    <label>本地日期时间:</label>
    <input type="datetime-local" /><br>
    <label>颜色:</label>
    <input type="color" />
</form>
```

以上[示例](./docs/html/html/html-code-10-1.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-1.html"></iframe>

### “placeholder”属性

“placeholder”属性提供可描述输入字段预期值的提示信息，在文本框、密码框、文本域等可输入框开始进行输入时清空提示信息。

```html
<p>
    <label>账号:</label>
    <input type="text" placeholder="请输入账号" />
</p>
<p>
    <label>密码:</label>
    <input type="password" placeholder="请输入密码" />
</p>
```

以上[示例](./docs/html/html/html-code-10-2.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-2.html"></iframe>

## `<datalist>`下拉列表

`<datalist>`需要配合一个属性为“list”的`<input>`标签使用，通过将list的属性值设置为`<datalist>`标签的“ID”属性的值来实现关联，实现出一个既可输入，又可选择的下拉菜单，当然，IE浏览器不支持该元素。如以下一个示例:

```html
<input list="myDataList" placeholder="请选择最好看的小说" >
<datalist id="myDataList">
    <option value="高手来都市" />
    <option value="校花的贴身高手" />
    <option value="最强弃少" />
    <option value="凡人修仙传" />
    <option value="斗破苍穹" />
    <option value="大王饶命" />
    <option value="校园全能高手" />
    <option value="斗罗大陆" />
</datalist>
```

以上[示例](./docs/html/html/html-code-10-3.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-3.html"></iframe>

## `<output>`标签

`<output>`标签是一个具有特殊作用的“行级元素”，它用于显示不同类型的输出。 我们首先来看一个用`<output>`标签来显示“type”属性值为 “range”的`<input>`表单元素的选择输出的例子：

```html
<form oninput="result.value=parseInt(rangeVal.value)">
    <label>0</label>
    <input id="rangeVal" type="range" min="0" max="100" value="5" step="1" />
    <label>100</label>
    <label>你选择的值是:</label>
    <output name="result" for="rangeVal">5</output>
</form>
```

以上[示例](./docs/html/html/html-code-10-4.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-4.html"></iframe>

`<output>`除了获取并显示表单元素内这些会生成纯数字的“value”外，它还能对字符串进行拼接并最终将参与拼接运算的表单元素的 “value”值计算结果显示出来，我们来看看一个有趣的例子：

```html
<form oninput="result.value=name.value + determination.value + doWhat.value">
    <label>名称:</label>
    <input id="name" type="text" value="我" />
    <label>决心:</label>
    <input id="determination" type="text" value="一定要成为" />
    <label>做什么:</label>
    <input id="doWhat" type="text" value="海贼王" />
    <output name="result" for="name determination doWhat">?</output>
</form>
```

以上[示例](./docs/html/html/html-code-10-5.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-5.html"></iframe>

通过上面的例子我们可以分析得出，`<output>`标签最后显示的值是通过`<form>`标签的 “oninput”属性进行赋值运算得出来的，最后再通过`<output>`的 “for”属性对表单内参与“运算”表单元素的“Id”进行绑定，最终将运算的结果显示出来。

如果已经弄明白`<output>`显示值的原理，那我们来看一个`<output>`元素“更疯狂”的使用例子：

```html
<form oninput="result.value=((parseInt(rangeVal_1.value)+parseInt(rangeVal_2.value)-parseInt(numVal_1.value))*parseInt(numVal_2.value)/parseInt(numVal_3.value))+txtVal.value">
    <label>0</label>
    <input id="rangeVal_1" type="range" min="0" max="100" value="5" />
    <label>100</label>
    <span>+</span>
    <label>0</label>
    <input id="rangeVal_2" type="range" min="0" max="100" value="10" />
    <label>100</label>
    <span>-</span>
    <input type="number" id="numVal_1" value="25" />
    <span>X</span>
    <input type="number" id="numVal_2" value="15" />
    <span>÷</span>
    <input type="number" id="numVal_3" value="35" />
    <span>+</span>
    <input type="text" id="txtVal" value="只猫" />
    <span>=</span>
    <output name="result" for="rangeVal_1 rangeVal_2 numVal_1 numVal_2 numVal_3 txtVal">?</output>
</form>
```

以上[示例](./docs/html/html/html-code-10-6.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-10-6.html"></iframe>