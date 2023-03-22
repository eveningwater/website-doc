# HTML列表

HTML中的列表是用于一系列有关联的事项或某件事物进行步骤的描述性标签，主要分为两种类型：“<em class="hover-info" data-title="即列表项目符号为一致的符号">无序列表`<ul>>`</em>”和“<em class="hover-info" data-title="即项目符号为先后顺序关系的字符，如阿拉伯数字、英文字母">有序列表`<ol>`</em>”，但在通过该标签的CSS属性“list-style”进行一定的设置后，两种标签也就没有任何实质性的区别了。该类标签除了上述描述的作用外，现在还经常将其CSS的属性“list-style”设置为“none”，并为其子元素标签`<li>`的“float”属性的值设置为“left”来作为网站“<em class="hover-info" data-title="主要由超链接标签组成，也可以通过JS的“location.href”方法去指定跳转路径">导航栏</em>”的容器标签来使用。除了无序和有序列表，还有一种稍微特殊的列表叫做“<em class="hover-info" data-title="一个包含定义标题和定义描述内容的列表">定义列表`<dl>`</em>”，该列表类型虽然没有项目符号，但在用于一些类似于“名词--描述”结构的说明时，结构更加的清晰合理。

## 无序列表——`<ul>`

无序列表`<ul>`的显示类型为"<em class="hover-info" data-title="display:block，默认情况下能独占一行的元素显示类型">块级元素</em>",其子元素`<li>`标签的显示类型则为"<em class="hover-info" data-title="列表项类型">list-item</em>"(由于该类型几乎和块级元素的特性一致,所以可以认为是list-item下的块级元素)。如以下一个示例:

```html
<ul>
    <li>无序列表1</li>
    <li>无序列表2</li>
    <li>无序列表3</li>
    <li>无序列表4</li>
</ul>
```

以上[示例](./docs/html/html/html-code-7-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-1.html"></iframe>

通过示例,我们可以看到无序列表默认项目符号就是一个小黑点,这在真实开发场景中是非常难看的,所以我们可以通过指定<em class="hover-info" data-title="译意为“类型”">type</em>属性来改变项目符号的类型:

* disc(默认值)：项目符号为实心圆的小黑点。
* circle：项目符号为空心圆的小白点。
* square：项目符号为实心方块的小黑方块点。

来看一个示例:

```html
<ul>
    <li>无序列表1</li>
    <li>无序列表2</li>
    <li>无序列表3</li>
    <li>无序列表4</li>
</ul>
<ul>
    <li type="disc" >无序列表1</li>
    <li type="disc" >无序列表2</li>
    <li type="disc" >无序列表3</li>
    <li type="disc" >无序列表4</li>
</ul>
<ul>
    <li type="circle">无序列表1</li>
    <li type="circle">无序列表2</li>
    <li type="circle">无序列表3</li>
    <li type="circle">无序列表4</li>
</ul>
<ul>
    <li type="square">无序列表1</li>
    <li type="square">无序列表2</li>
    <li type="square">无序列表3</li>
    <li type="square">无序列表4</li>
</ul> 
```

以上[示例](./docs/html/html/html-code-7-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-2.html"></iframe>

尽管可以通过type属性设置项目符号,但还是比较难看,所以建议使用CSS去控制项目符号。当然无序列表还能够嵌套,如:

```html
<ul>
    <li>
        web前端开发
        <ul>
            <li>
                HTML
                <ul>
                    <li>HTML标签</li>
                </ul>
            </li>
            <li>CSS</li>
            <li>Javascript</li>
        </ul>
    </li>
</ul>   
```

以上[示例](./docs/html/html/html-code-7-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-3.html"></iframe>

通过上面示例,我们可以发现无序列表的嵌套项目符号的变化,是从实心圆到空心圆再到实心方块的变化。 如果再继续嵌套项目符号就会以最后的实心方块为主,如下一个示例:

```html
<ul>
    <li>
        web前端开发
        <ul>
            <li>
                HTML
                <ul>
                    <li>HTML标签</li>
                       <ul>
                           <li>
                               图片标签
                               <ul>
                                   <li>img元素</li>
                               </ul>
                           </li>
                       </ul>
                </ul>
            </li>
            <li>CSS</li>
            <li>Javascript</li>
        </ul>
    </li>
</ul>    
```

以上[示例](./docs/html/html/html-code-7-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-4.html"></iframe>

尽管在实际开发中,我们不必注意这些小细节,但是这些小细节我们至少还是要知道的,因为后期学了CSS之后我们就会忽视html标签本来特有的属性,很少会再注意这些。

## 有序列表——`<ol>`

其显示类型与无序列表一样,唯一不同的就是当子元素`<li>`存在时,项目符号变成了阿拉伯数字加上点来表示,如:

```html
<ol>
    <li>
        web前端开发
        <ol>
            <li>
                HTML
                <ol>
                    <li>HTML标签</li>
                       <ol>
                           <li>
                               图片标签
                               <ol>
                                   <li>img元素</li>
                               </ol>
                           </li>
                       </ol>
                </ol>
            </li>
            <li>CSS</li>
            <li>Javascript</li>
        </ol>
    </li>
</ol>   
```

以上[示例](./docs/html/html/html-code-7-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-5.html"></iframe>

有序列表当然也有type属性,不过它在嵌套的时候是不会改变默认值的,只能手动设置type属性。type属性有以下几个值:

* "1-9"：阿拉伯数字表示(默认)。
* "A-Z"：英文大写字母表示。
* "a-z"：英文小写字母表示。
* "I-IX"：大写罗马数字表示。
* "i-ix"：小写罗马数字表示。

除了type属性之外,有序列表还有另外两个属性reversed与start属性

* reversed：规定有序列表的顺序为倒叙。
* start：规定有序列表的起始值

例如如下一个示例:

```html
<ol reversed>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
<ol type="A" start="1">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
<ol type="a">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
<ol type="1" start="34">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
<ol type="I">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
<ol type="i">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>
```


以上[示例](./docs/html/html/html-code-7-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-6.html"></iframe>

## 无序列表和有序列表的界限

在不设置CSS样式的情况下,通常有序列表与无序列表的区别就是项目符号的不同,所以有序列表有计数功能,而无序列表并没有计数功能。但如果设置了CSS样式之后,两者之间再无界限,这时我们还可以将项目符号设置成<em class="hover-info" data-title="CSS属性为“list-style-image”，通过“url()”值指定所用图片的url地址">图片</em>,更有甚者设置更好的悬挂方式等。

## 定义列表——`<dl>`

定义列表分为两层,第一层是<em class="hover-info" data-title="全名：define list">`<dl>`</em>,第二层是<em class="hover-info" data-title="全名：define title">`<dt>`</em>和<em class="hover-info" data-title="全名：define describe">`<dd>`</em>,`<dt>`用于定义列表的项目,而`<dd>`用于定义项目的描述,它们的显示类型都是"块级元素"。这种列表由于自身结构的原因,在描述一定的名词介绍时是一个不错的用法。如示例:

```html
<dl>
    <dt>HTML</dt>
    <dd>构成网页的基本</dd>
    <dt>CSS</dt>
    <dd>美化网页</dd>
    <dt>JavaScript</dt>
    <dd>让页面充满各种特效动画</dd>
</dl>
```

以上[示例](./docs/html/html/html-code-7-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-7.html"></iframe>

尽管定义列表也可以嵌套,但是嵌套的意义不大,所以不建议嵌套,看如下一个嵌套示例:

```html
<dl>
    <dt>
        HTML
        <dl>
            <dt>HTML标签</dt>
            <dd>网页的基本元素</dd>
        </dl>
    </dt>
    <dd>构成网页的基本</dd>
    <dt>CSS</dt>
    <dd>美化网页</dd>
    <dt>JavaScript</dt>
    <dd>让页面充满各种特效动画</dd>
</dl>      
```
以上[示例](./docs/html/html/html-code-7-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/html/html/html-code-7-8.html"></iframe>

从以上示例可以看出嵌套并没有太大的区别，所以不推荐嵌套。

