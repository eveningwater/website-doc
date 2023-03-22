# HTML内联框架标签

## `<iframe>`标签基本定义

`<iframe>`其实就是一个创建内联网页的框架标签。如以下一个示例:

```html
<iframe>这是一个内联框架</iframe>
```

以上[示例](./docs/html/html/html-code-6-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-6-1.html"></iframe>

> 其实单独使用iframe标签的场景很少，通常都是会和超链接结合使用，详见下文。

## `<iframe>`标签的属性

`<iframe>`标签的属性有点多,下表展示了该标签的所有属性。

| 属性         | 值                                                                  | 描述                                                             |
| ------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| align        | left,right,top,middle,bottom                                        | 不赞成使用。请使用样式代替。规定如何根据周围的元素来对齐此框架。 |
| frameborder  | 1,0之类的整数数值                                                   | 规定显示框架周围的边框大小。                                     |
| height       | pixels,%(像素或者百分比单位)                                        | 规定 iframe 的高度。                                             |
| longdesc     | URL(就是一个链接路径地址)                                           | 规定一个页面，该页面包含了有关 iframe 的较长描述。               |
| marginheight | pixels                                                              | 定义 iframe 的顶部和底部的边距。(外边距)                         |
| marginwidth  | pixels                                                              | 定义 iframe 的左侧和右侧的边距。(外边距)                         |
| name         | iframe_name                                                         | 规定 iframe 的名称。                                             |
| sandbox      | "",allow-forms,allow-same-origin,allow-scripts,allow-top-navigation | 启用一系列对 &lt;iframe&gt; 中内容的额外限制。                   |
| scrolling    | yes,no,auto                                                         | 规定是否在 iframe 中显示滚动条。                                 |
| seamless     | seamless                                                            | 规定 &lt;iframe&gt; 看上去像是包含文档的一部分。                 |
| src          | URL(路径地址)                                                       | 规定在 iframe 中显示的文档的 URL。                               |
| srcdoc       | HTML_code(HTML代码)                                                 | 规定在 iframe 中显示的页面的 HTML 内容。                         |
| width        | pixels,%                                                            | 定义 iframe 的宽度。                                             |

一些对`<iframe>`的样式改变的设置属性是不建议使用的。推荐用CSS来更改该标签的样式。

## iframe与a标签结合使用

如果将`<a>`标签的href属性设为要打开的文件或网页, 然后再将内联标签`<iframe>`的name属性设置为`<a>`标签的target属性值, 那么这个被打开的网页或者文件就会在`<iframe>`标签内打开。如以下一个示例:

```html
<a href="https://www.eveningwater.com/" target="eveningwater" >夕水的个人网页</a>
<iframe name="eveningwater"></iframe>
```

以上[示例](./docs/html/html/html-code-6-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-6-2.html"></iframe>