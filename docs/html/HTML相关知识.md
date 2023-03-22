# HTML相关知识

## HTML版本

`<!DOCTYPE html>`表示声明为html5的版本,那么在这之前自然还有html的版本。 其实早期版本的文档声明不必要记住,因为通常文档声明都是由搭建的开发环境也就是编辑器自动生成或者从已有的网页复制粘贴而来。我们只需要看到这个要能够熟悉他讲的是什么意思。HTML版本如下表所示:

| 版本      | 发布时间 |
| --------- | -------- |
| HTML      | 1991     |
| HTML+     | 1993     |
| HTML 2.0  | 1995     |
| HTML 3.2  | 1997     |
| HTML 4.01 | 1999     |
| XHTML 1.0 | 2000     |
| HTML5     | 2012     |
| XHTML5    | 2013     |

`<!DOCTYPE html>` 声明位于文档中的最前面的位置，处于 `<html>` 标签之前。 `<!DOCTYPE html>` 声明不是一个 HTML 标签；它是用来告知 Web 浏览器页面使用了哪种 HTML 版本。 在 HTML 4.01 中，`<!DOCTYPE html>` 声明需引用 DTD （文档类型声明），因为HTML 4.01 是基于<em class="hover-info" data-title="Standard Generalized Markup Language 标准通用标记语言">SGML</em>。DTD 指定了标记语言的规则，确保了浏览器能够正确的渲染内容。 HTML5 不是基于SGML，因此不要求引用DTD。

> 提示：总是给您的 HTML文档添加 `<!DOCTYPE html>` 声明，确保浏览器能够预先知道文档类型。

`<!DOCTYPE>`声明有助于浏览器中正确显示网页。 网络上有很多不同的文件，如果能够正确声明HTML的版本，浏览器就能正确显示网页内容。 doctype声明是不区分大小写的，以下方式均可：

```html
<!DOCTYPE html>
<!DOCTYPE HTML>
<!doctype html> 
<!Doctype Html>
```

HTML 4.01 规定了三种不同的 <!DOCTYPE> 声明，分别是：Strict、Transitional 和 Frameset。HTML5中仅规定了一种。

> 注释：`<!DOCTYPE>` 标签没有结束标签。
> 提示：`<!DOCTYPE>` 声明不区分大小写。
> 提示：使用 [W3C 的验证](https://validator.w3.org/) 检查您是否编写了一个带有正确 DTD 的合法的 HTML / XHTML 文档！

## 常见的 DOCTYPE 声明

HTML 5：

```html
<!DOCTYPE html>
```

HTML 4.01 Strict：这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

HTML 4.01 Transitional：这个 DTD 包含所有 HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

HTML 4.01 Frameset：这个 DTD 与 HTML 4.01 Transitional 相同，但是允许使用框架集内容。

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

XHTML 1.0 Strict：这个 DTD包含所有HTML 元素和属性，但不包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的 XML 进行书写。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

XHTML 1.0 Transitional：这个 DTD 包含所有 HTML 元素和属性，包括表象或过时的元素（如 font ）。框架集是不允许的。结构必须按标准格式的XML 进行书写。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

XHTML 1.0 Frameset：这个 DTD 与 XHTML 1.0 Transitional： 相同，但是允许使用框架集内容。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

XHTML 1.1：这个 DTD 与 XHTML 1.0 Strict ： 相同，但是允许您添加模块（例如为东亚语言提供 ruby 支持）。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

参阅[HTML 元素与合法的 Doctype](./docs/html/other/html-element-doctype.html)，看看每一个 HTML 元素都出现在哪一种 Doctype 中。

## HTML编码注意事项

目前大部分的浏览器,如果直接输入中文会出现乱码的情况,所以为了避免这种情况的发生,我们就需要在`<head>`标签内加上`<meta charset="utf-8">`(这在[参考文献](./docs/html/other/meta/index.html)里面也有详细的描述)标签,表示以中文形式为编码,如下:

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

如果不添加`<meta charset='uft-8'>`标签，在有些浏览器中（例如：[IE浏览器](https://baike.baidu.com/item/Internet%20Explorer/1537769?fromtitle=IE&fromid=69103&fr=aladdin)）。你会看到如下图所示:

<div class="image-container">
    <img src="./docs/html/images/gibberish.png" alt="图片2-1" title="图片2-1" >
    <span class="image-title">图 2-1 </span>
</div>

你可以在线打开这个[示例](./docs/html/html/html-code-2-1.html)查看。

## 开发环境

开发环境,也就是编辑器,作为一个开发工程师,我们不仅仅是写代码,还要知道用什么来写代码,就好比用记事本记录东西一样,我们总要有个可以说是载体。所以好的编辑器能够快速的帮助你成为一个开发工程师。最简单的编辑器莫过于windows系统下的记事本了。

当然现在也有一些在线的编辑器，例如[code pen](https://codepen.io/),[jsfiddle](https://jsfiddle.net/),[js bin](https://jsbin.com/?html,output),[codesandbox](https://codesandbox.io/),[stackblitz](https://stackblitz.com/),[码上掘金](https://code.juejin.cn/)等等。

目前推荐如下三款常用的编辑器:

* [VSCode（Visual Studio Code）](https://code.visualstudio.com/)
* [webstorm](http://www.jetbrains.com/webstorm/)
* [HBuilderX](https://www.dcloud.io/hbuilderx.html)

当然还有其它的诸如[brackets](https://brackets.io/),[editplus](https://www.editplus.com/)等，但这些编辑器由于功能不及如上三款编辑器，因此都不常用，仅供了解即可。



