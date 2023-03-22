# HTML表单元素

表单就是包含表单元素的一个区域。而表单元素实际上就是允许用户在里面输入内容。 比如`<input>`标签,`<textarea>`标签,等等。 表单元素通常都被`<form>`标签对包含,所以也可以说包含在`<form>`标签对里的元素基本上都是表单元素。 `<form>`标签对是一个块级标签,里面通常都是表单元素加上提交和重置按钮组成。 它虽然和`<div>`标签一样属于“块级元素”，但它却有自己的实际用处，也就是若不将“表单元素”放置于表单标签`<form>`中，那某些表单元素将会失效，如：“提交”按钮和“重置”按钮。请看如下两个示例来直观的感受表单和表单的验证。

[什么是表单](./docs/html/other/html-form.html)? [表单验证](./docs/html/other/register-form/index.html)。

## 表单标签`<form>`

`<form>`标签具有如下属性:

* name：规定表单的名称。
* action：规定提交表单时向何处发送数据,通常都是填写一个url。
* method：规定用于发送form-data的http站点方法。属性值为:get和post。
* target：规定在何处打开“action”中设定的URL，与超链接的target属性值相同。值有:
  * _blank
  * _self
  * _parent
  * _top
  * 以及`<iframe>`的name属性。
* enctype：规定发送到服务器之前应该如何对表单数据进行编码。有以下值:
  * application/x-www-form-urlencoded（默认，在发送前编码所有字符）
  * multipart/form-data（不对字符编码，在使用包含文件上传控件的表单时，必须使用该值）
  * text/plain（空格转换为 "+" 加号，但不对特殊字符编码。）
* autocomplete：规定是否启用表单的自动完成功能,值有:on和off。
* novalidate：如果使用该属性，则提交表单时不进行HTML5自带的验证。
* accept-charset：规定服务器用哪种字符集处理表单数据，常用的字符集有:
  * UTF-8（Unicode，双字节对字符进行编码，统一的编码标准
  * ISO-8859-1（拉丁字母表的字符编码
  * GB2312（简体中文字符集
  * 当然，还有其它更多字符集的编码标准，这里作为了解即可，如：“ISO-8859-2”（东欧字符编码），“ISO-2022-JP”和“ISO-2022-JP-2”（日语字符编码），“ISO-2022-KR”（韩语字符编码）等。
* accept：规定服务器接收到的文件的类型。（文件是通过文件上传提交的）。HTML5 不支持值为：MIME_type，具体详见[参考](https://www.w3school.com.cn/media/media_mimeref.asp)。

## `<label>`标签

表单中用于显示字段的标签,属于行级元素,与`<span>`标签不同的是它配合其它表单元素可以实现一些作用上的关联。如示例:

```html
<form name="testForm" action="testURL">
    <label>姓名:</label><br>
    <label>年龄:</label><br>
    <label>性别:</label><br>
    <label>爱好:</label>
</form>
```

以上[示例](./docs/html/html/html-code-9-1.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-1.html"></iframe>

## `<input>`标签

`<input>`标签属于行内块元素,最重要的是`<input>`含有将近20多个属性,如id,class,type,name等等,而且还有`<form>`标签所拥有的属性，我们先从一些最简单的属性开始。

### type属性

* text：默认属性值，规定显示的类型为“文本框”。如以下一个简单的示例:

```html
<label>用户名:</label>
<input type="text" />
```

以上[示例](./docs/html/html/html-code-9-2.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-2.html"></iframe>

* password：规定显示的类型为“密码框”。如以下一个简单的示例:

```html
<label>密码:</label>
<input type="password" />
```

以上[示例](./docs/html/html/html-code-9-3.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-3.html"></iframe>

* radio：规定显示的类型为“单选框”。如以下一个简单的示例:

```html
<label>性别:</label>
<label for="male">男</label>
<input type="radio" id="male" name="gender" />
<label for="female">女</label>
<input type="radio" id="female" name="gender" />
```

以上[示例](./docs/html/html/html-code-9-4.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-4.html"></iframe>

* checkbox：规定显示的类型为“复选框”。如以下一个简单的示例:

```html
<label>爱好:</label>
<label for="game">游戏</label>
<input type="checkbox" id="game" name="hobby" />
<label for="sport">运动</label>
<input type="checkbox" id="sport" name="hobby" />
<label for="read">读书</label>
<input type="checkbox" id="read" name="hobby" />
<label for="sing">唱歌</label>
<input type="checkbox" id="sing" name="hobby" />
```

以上[示例](./docs/html/html/html-code-9-5.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-5.html"></iframe>

* file：规定显示的类型为“文件上传”控件。如以下一个简单的示例:

```html
<label>上传文件:</label>
<input type="file" />
```

以上[示例](./docs/html/html/html-code-9-6.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-6.html"></iframe>

* button：规定显示的类型为“按钮”。如以下一个简单的示例:

```html
<label>普通按钮:</label>
<input type="button" value="普通按钮" />
```

以上[示例](./docs/html/html/html-code-9-7.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-7.html"></iframe>

* submit：规定显示的类型为“提交按钮”。如以下一个简单的示例:

```html
<label>提交按钮:</label>
<input type="submit" value="提交按钮" />
```

以上[示例](./docs/html/html/html-code-9-8.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-8.html"></iframe>

* reset：规定显示的类型为“重置按钮”。与表单组合在一起，点击它就可以清空已经填写好的表单信息。如以下一个简单的示例:

```html
<label>重置按钮:</label>
<input type="reset" value="重置按钮" />
```

以上[示例](./docs/html/html/html-code-9-9.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-9.html"></iframe>

我们来看一个用在表单中的示例，在这个示例当中，当你填写完所有表单信息，然后点击重置按钮就可以看到效果了。

```html
<form name="testForm" action="testURL" >
    <label>用户名:</label>
    <input type="text" />
    <br />
    <label>密码:</label>
    <input type="password" />
    <br />
    <label>邮箱:</label>
    <input type="email" value="854806732@qq.com"/>
    <br />
    <label>备注:</label>
    <input type="text" value="重置为加载时的内容" />
    <br />
    <input type="reset" value="重置按钮" /> 
</form>
```

以上[示例](./docs/html/html/html-code-9-10.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-10.html"></iframe>

* image：规定显示的类型为“图像按钮”。如以下一个简单的示例:

```html
<label>图片按钮:</label>
<input type="image" width="64" height="64" src="/static/image/chrome.png" title="Google chrome" alt="图片按钮" />
```

以上[示例](./docs/html/html/html-code-9-11.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-11.html"></iframe>

* hidden：规定显示的类型为“隐藏域”。如以下一个简单的示例:

```html
<label>隐藏域:</label>
<input type="hidden" value="隐藏域" />
```

以上[示例](./docs/html/html/html-code-9-12.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-12.html"></iframe>

### value属性

该属性表示:设置“文本类型”的输入框中，默认显示的值内容。如以下示例:

```html
<label>账户:</label>
<input type="text" value="eveningwater" />
<br />
<label>邮箱:</label>
<input type="email" value="854806732@qq.com" />
```

以上[示例](./docs/html/html/html-code-9-13.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-13.html"></iframe>

### maxlength属性

该属性规定输入字段中的字符的最大长度。如下例:

```html
<label>账户:</label>
<input type="text" maxlength="8" value="字符只能是8个" />
<br />
<label>密码:</label>
<input type="password" maxlength="16" value="密码只能是16位字符" />
```

以上[示例](./docs/html/html/html-code-9-14.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-14.html"></iframe>

### readonly属性

顾名思义,该属性就是让表单元素处于只读状态,也就是说在这个状态下用户不能编辑内容,只能读取内容。如以下示例:

```html
<label>账户:</label>
<input type="text"  readonly="readonly" value="eveningwater" />
<br />
<label>姓名:</label>
<input type="text" readonly="readonly" value="夕水" />
```

以上[示例](./docs/html/html/html-code-9-15.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-15.html"></iframe>

### disabled属性

该属性使表单元素处于禁用状态,相当于让表单元素失效。如以下示例:

```html
<form name="testForm" action="testURL" >
    <label>账户:</label>
    <input type="text" value="eveningwater" disabled="disabled"/>
    <br />
    <label>姓名:</label>
    <input type="text" value="夕水" />
    <br />
    <label for="fruit" >水果:</label>
    <select disabled="disabled" >
        <option value="0">苹果</option>
        <option value="1">香蕉</option>
        <option value="2">西瓜</option>
    </select>
    <br />
    <label>爱好:</label>
    <label for="game">游戏</label>
    <input type="checkbox" id="game" name="hobby" disabled="disabled" />
    <label for="sport">运动</label>
    <input type="checkbox" id="sport" name="hobby" />
    <label for="read">读书</label>
    <input type="checkbox" id="read" name="hobby" />
    <label for="sing">唱歌</label>
    <input type="checkbox" id="sing" name="hobby" disabled="disabled" />
    <br />   
    <input type="submit" value="提交" disabled="disabled" />
    <input type="reset" value="重置" disabled="disabled" /> 
</form>
```

以上[示例](./docs/html/html/html-code-9-16.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-16.html"></iframe>

### checked属性

该属性只有type属性为"checkbox"和 "radio"的表单元素才有效果。表示使当前表单元素的指定项默认成为“选中”状态。 如下例:

```html
<form name="testForm" action="testURL" >
    <label>性别:</label>
    <label for="secret">保密</label>
    <input type="radio" id="secret" name="gender" checked="checked" />
    <label for="male">男</label>
    <input type="radio" id="male" name="gender" />
    <label for="female">女</label>
    <input type="radio" id="female" name="gender" />
    <br />
    <label>爱好:</label>
    <label for="game">游戏</label>
    <input type="checkbox" id="game" name="hobby" checked="checked" />
    <label for="sport">运动</label>
    <input type="checkbox" id="sport" name="hobby" />
    <label for="read">读书</label>
    <input type="checkbox" id="read" name="hobby" />
    <label for="sing">唱歌</label>
    <input type="checkbox" id="sing" name="hobby" checked="checked" />
    <br />   
</form>
```

以上[示例](./docs/html/html/html-code-9-17.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-17.html"></iframe>

### size属性

该属性规定文本框可见字符显示的宽度，但不同浏览器对此的支持有所不同，我们现在基本都是使用CSS去控制。如下例:

```html
<label>用户1:</label>
<input type="text" size="5" />
<label>用户2:</label>
<input type="text" size="10" />
<label>用户3:</label>
<input type="text" size="15" />
```

以上[示例](./docs/html/html/html-code-9-18.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-18.html"></iframe>

## `<textarea>`标签

`<textarea>`标签是一个可以输入多行文本的标签对，它同样是一个“行内块级标签”。 和`<input>`标签不同的是，`<textarea>`标签是一个标签对，它拥有闭合标签。 需要特别加以区分的是，它显示文本内容是通过标签的内容，而非“value”属性。 它可以通过“cols”和“rows”属性来设置显示的尺寸， 当然,使用CSS去控制尺寸更加利于布局准确性。来看一个示例:

```html
<textarea rows="6" cols="56" ><textarea>标签是一个可以输入多行      文本的  标签对，它同样是一个“行内块级标签”。
    和<input>标签不同的是，<textarea>标签是一个标签对，它拥有闭合标签。需要特别加以区分的是，它显示文本内容是通过标签的<em>内容</em>，而非“value”属性。它可以通过“cols”和“rows”属性来设置显示的尺寸，当然使用CSS去控制尺寸更加利于布局准确性。</textarea>
```

以上[示例](./docs/html/html/html-code-9-19.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-19.html"></iframe>

通过上面的代码示例，细心的人应该可以发现，`<textarea>`标签的内容会保留文本内容中的空格和换行符，所以在设置默认内容的时候要特别的注意，否则会让用户体验受到一些不好的影响。

## 下拉框`<select>`标签

通过`<select>`标签可以创建单选和多选的下拉菜单。可以通过“size”属性设置该标签在一个选项菜单中可见的选项个数，当它的值设为“1”时，将显示为默认的`<select>`下拉菜单的样式，`<option>`是它必须的子菜单，否则将不能提供任何可选项，而`<option>`标签通常需要具有一个“value”属性，以便于在做数据操作时能准确地通过该属性值取到对应标签的内容。

### 单选下拉菜单

如果不指定multiple属性，默认就是一个单选下拉菜单，来看如下一个示例:

```html
<label>请选择你要干的事情:</label>
<select>
    <option value="0">打游戏</option>
    <option value="1">听音乐</option>
    <option value="2">唱歌</option>
    <option value="3">跳舞</option>
    <option value="4">看书</option>
    <option value="5">游泳</option>
    <option value="6">看电影</option>
    <option value="7">旅游</option>
</select>
<select size="7">
    <option value="0">打游戏</option>
    <option value="1">听音乐</option>
    <option value="2">唱歌</option>
    <option value="3">跳舞</option>
    <option value="4">看书</option>
    <option value="5">游泳</option>
    <option value="6">看电影</option>
    <option value="7">旅游</option>
</select>
```

以上[示例](./docs/html/html/html-code-9-20.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-20.html"></iframe>

### 多选下拉菜单

通过设置multiple属性就可以将单选下拉框变成多选下拉框。在“windows操作系统”中按住“Ctrl”按钮，在“mac操作系统”中按住“command”按钮来选择多个选项，选择多个项的操作类似于操作系统中选择文件的操作。示例如下:

```html
<label>请选择你要干的事情:</label>
<select multiple="multiple">
    <option value="0">打游戏</option>
    <option value="1">听音乐</option>
    <option value="2">唱歌</option>
    <option value="3">跳舞</option>
    <option value="4">看书</option>
    <option value="5">游泳</option>
    <option value="6">看电影</option>
    <option value="7">旅游</option>
</select>
<select size="7" multiple="multiple">
    <option value="0">打游戏</option>
    <option value="1">听音乐</option>
    <option value="2">唱歌</option>
    <option value="3">跳舞</option>
    <option value="4">看书</option>
    <option value="5">游泳</option>
    <option value="6">看电影</option>
    <option value="7">旅游</option>
</select>
```

以上[示例](./docs/html/html/html-code-9-21.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-21.html"></iframe>

### 分组下拉菜单

通过`<optgroup>`标签对可以创建一个分组。来看如下一个示例:

```html
<label>请选择你要看的小说:</label>
<select>
    <optgroup label="言情">
        <option value="0">那些年我们一起追过的女孩</option>
        <option value="1">何以笙箫默</option>
        <option value="2">微微一笑很倾城</option>
    </optgroup>
    <optgroup label="仙侠">
        <option value="3">斗破苍穹</option>
        <option value="4">最强弃少</option>
        <option value="5">凡人修仙传</option>
    </optgroup>
    <optgroup label="都市">
        <option value="6">高手来都市</option>
        <option value="7">校花的贴身高手</option>
        <option value="8">校园全能高手</option>
    </optgroup>
</select>
```

以上[示例](./docs/html/html/html-code-9-22.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-22.html"></iframe>

### selected属性

使`<select>`标签中的指定的子元素标签`<option>`默认成为“选中”状态。示例如下:

```html
<label>请选择你要看的动漫:</label>
<select>
    <option value="0">海贼王</option>
    <option value="1" selected="selected">火影忍者</option>
    <option value="2">犬夜叉</option>
    <option value="3">名侦探柯南</option>
    <option value="4">死神</option>
    <option value="5">魔兵传奇</option>
    <option value="6">宇宙英雄奥特曼</option>
    <option value="7">迪迦奥特曼</option>
</select> 
```

以上[示例](./docs/html/html/html-code-9-23.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-23.html"></iframe>

## `<button>`标签

`<button>`标签对和其它表单元素一样，同是属于“行内块元素”，它的作用和“type”属性为“button/submit/reset”的`<input>`一样，是在页面内创建一个“按钮”元素，它的“type”属性和`<input>`也一样，支持“button”、“submit”和“reset” 三个值。它也是一个拥有闭合标签的元素。 和使用`<input type="button">`相比,使用`<button>`有以下不同：

* `<button>`按钮文本是放置于该标签的内容上，而`<input>`是将按钮文本设置于它的“value”属性上。
* IE浏览器在提交`<button>`的时候提交的是`<button>`标签对内的内容，`<input>`标签提交的是“value”，而其它浏览器中提交`<button>`和`<input>`都是“value”中的内容。
* `<button>`标签对内可以同时显示文本、图片、表格甚至是多媒体，而`<input>`标签只能显示其中一个。
* `<button>`标签的“type”属性不进行设置的话，在“IE浏览器”中将默认设为“button”，而在其它浏览器中（包括W3C规范）都会默认设为“submit”，所以，为了统一浏览器的行为，我们通常都会为`<button>`的属性“type”设置一个初始值。
* 在外观上`<button>`标签比`<input>`标签生成的按钮更加有质感，交互视觉效果也更加出色（大部分浏览器如此）。

我们来看一个简单的示例如下:

```html
<form name="testForm">
    <button type="button">普通按钮</button>
    <button type="submit">提交按钮</button>
    <button type="reset">重置按钮</button>
</form>
```

以上[示例](./docs/html/html/html-code-9-24.html)运行结果如下所示:

<iframe style="min-height:60px;" src="./docs/html/html/html-code-9-24.html"></iframe>