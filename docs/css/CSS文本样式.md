# CSS文本样式

## CSS文本样式概述

在上一节中我们讲到过了“CSS字体样式”，而我们这一节中要讲的文本和字体是有所区别的，字体CSS设置主要是围绕文字本身进行，如文字风格、字体粗细、字体大小、字体系列、字体颜色等，就是说无论进行什么样的设置都是围绕单个文字本身的样式进行设置的，并不会影响到文本的整体布局（“font”组合值写法中的“行高”除外），这一节中所讲的CSS文本设置是对文本布局方面的知识进行的。

## CSS文本水平对齐“text-align”

该属性用于控制“块元素”或“行内块元素”，“块元素”或“行内块元素”嵌套的“行内元素”或“行内块元素”的居中方式的。当把“块级元素”作为为被嵌套的内容（即“块级元素”嵌套“块级元素”），不会对该属性生效，但该“块级元素”内部的“行内元素”或“行内块元素”,包含块元素中的文本,仍然可以继承父级元素中带有的“text-align”属性设置的效果。

它包含以下属性值:

* left（默认）：左对齐。
* center：居中对齐。
* right：右对齐。
* justify：两端对齐。

如以下一个示例:

html代码如下:

```html
<article>
    <p class="text-align-left">依然记得从你口中说出再见坚决如铁，昏暗中有种烈日灼烧的错觉。</p>
    <p class="text-align-center">当记忆的线缠绕过往支离破碎，是慌乱占据了心扉，有花儿伴着蝴蝶，孤雁可以双飞。</p>
    <p class="text-align-right">最痴情的男人像海洋，爱在风暴里逞强，苦还是风平浪静的模样，卷起了依恋那么长。</p>
    <p class="text-align-justify">紧紧握着青花信物，信守着承诺，离别总在失意中度过，记忆油膏，反复涂抹无法愈合的伤口，你的回头划伤了沉默。（打开浏览器控制台使用键盘的↑或↓改变宽度属性，并且要很仔细的观察，才有可能看到文本两端是对齐的。）</p>
</article>
<article>
    <p class="text-align-left">
        <span style="color:#2396ef;">依然记得从你口中说出再见坚决如铁，昏暗中有种烈日灼烧的错觉。</span>（为了说明是文本行内标签，加上一个字体颜色以区分。）
    </p>
    <p class="text-align-center">
        <input type="text" value="当记忆的线缠绕过往支离破碎，是慌乱占据了心扉，有花儿伴着蝴蝶，孤雁可以双飞。">字体和文本输入框都居中了的。
    </p>
    <p class="text-align-right">
        <a href="https://baike.baidu.com/item/%E7%94%B7%E4%BA%BA%E6%B5%B7%E6%B4%8B/16597868" target="_blank" rel="noopener noreferrer">
            最痴情的男人像海洋，爱在风暴里逞强，苦还是风平浪静的模样，卷起了依恋那么长。
        </a>
        超链接和文本都居右了的。
    </p>
    <a href="https://baike.baidu.com/item/%E5%85%B3%E4%B8%8D%E4%B8%8A%E7%9A%84%E7%AA%97/4284170?fr=aladdin"
        target="_blank" rel="noopener noreferrer" class="text-align-center"
        style="width: 300px;display: inline-block;">
        我听见寒风扰乱了叶落，在寂寞阴暗长居住的巷弄。
        <!--这里还插入了一张图片-->
        <img src="./images/code-text-align-demo.jpg" alt="图片加载中" title="关不上的窗" />
        (在这里超链接被转换成了行内块元素，行内块元素嵌套行内元素和文本，都是居中了的)。
    </a>
</article>
```

css代码如下:

```css
* {
    margin: 0;
    padding: 0;
}
@font-face {
    font-family: YCFont;
    /* 字体路径根据自己的目录决定 */
    src: url('../fonts/YCXiaoGongZhuTi-Regular.ttf');
}
body,
input {
    font: italic lighter 18px YCFont;
}
/* 文本居左对齐 */
.text-align-left {
    text-align: left;
}
/* 文本居中对齐 */
.text-align-center {
    text-align: center;
}
/* 文本居右对齐 */
.text-align-right {
    text-align: right;
}
/*文本两端对齐*/
.text-align-justify {
    width: 200px;
    text-align: justify;
    border: 1px dashed #445328;
}
```

以上[示例](./docs/css/html/css-code-4-1.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-1.html"></iframe>

当“text-align”的值为“justify”的时候，还有一个新的属性“<em class="hover-info" data-title="标准规定仅当“text-align: justify”存在的时候该属性才生效，但部分浏览器在“text-align”为任何值的时候都生效">text-align-last</em>”可以使用，但是这个属性对“Safari”浏览器和部分主流浏览器的老版本不支持，所以请慎用。它的作用是设置文本中最后一行文本的对齐方式。 它的可用属性为（部分浏览器支持较差“start”和“end”属性已移除）：

* auto：浏览器默认行为（默认值）。
* left：靠左对齐，在大部分语言下和auto:的效果基本一致。
* center：居中对齐。
* right：靠右对齐。
* justify：两端对齐。

如以下一个示例:

html代码如下:

```html
<div>
    <p class="test-1">你的沉默是我的难过，我知道，我不能给你天空最亮的星星。你的沉默是我的难过，我知道，我不能让你看到黑夜的光明。你的沉默是我的难过，所以你沉默，我难过。你的沉默是我的难过，我知道，我想要让你看到我跳动的心脏。你的沉默是我的难过，我知道，我想要让你看到我真诚的眼睛。你的沉默是我的难过，所以你沉默，我难过。</p>
    <p class="test-2">你的沉默是我的难过，我知道，我不能给你天空最亮的星星。你的沉默是我的难过，我知道，我不能让你看到黑夜的光明。你的沉默是我的难过，所以你沉默，我难过。你的沉默是我的难过，我知道，我想要让你看到我跳动的心脏。你的沉默是我的难过，我知道，我想要让你看到我真诚的眼睛。你的沉默是我的难过，所以你沉默，我难过。</p>
    <p class="test-3">你的沉默是我的难过，我知道，我不能给你天空最亮的星星。你的沉默是我的难过，我知道，我不能让你看到黑夜的光明。你的沉默是我的难过，所以你沉默，我难过。你的沉默是我的难过，我知道，我想要让你看到我跳动的心脏。你的沉默是我的难过，我知道，我想要让你看到我真诚的眼睛。你的沉默是我的难过，所以你沉默，我难过。</p>
    <p class="test-4">你的沉默是我的难过，我知道，我不能给你天空最亮的星星。你的沉默是我的难过，我知道，我不能让你看到黑夜的光明。你的沉默是我的难过，所以你沉默，我难过。你的沉默是我的难过，我知道，我想要让你看到我跳动的心脏。你的沉默是我的难过，我知道，我想要让你看到我真诚的眼睛。你的沉默是我的难过，所以你沉默，我难过。</p>
    <p class="test-5">你的沉默是我的难过，我知道，我不能给你天空最亮的星星。你的沉默是我的难过，我知道，我不能让你看到黑夜的光明。你的沉默是我的难过，所以你沉默，我难过。你的沉默是我的难过，我知道，我想要让你看到我跳动的心脏。你的沉默是我的难过，我知道，我想要让你看到我真诚的眼睛。你的沉默是我的难过，所以你沉默，我难过。</p>
</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
@font-face {
    font-family: BBFont;
    /* 字体路径根据自己的目录决定 */
    src: url('../fonts/Branding-Bold.woff2.ttf');
}
p {
    width: 200px;
    border: 1px dotted #336755;
    float: left;
    /* 必要条件 */
    text-align: justify;
    margin-right: 20px;
    font: normal 400 16px / 200% BBFont;
}
.test-1 {
    text-align-last: auto;
}
.test-2 {
    text-align-last: left;
}
.test-3 {
    text-align-last: center;
}
.test-4 {
    text-align-last: right;
}
.test-5 {
    text-align-last: justify;
}
```

以上[示例](./docs/css/html/css-code-4-2.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-2.html"></iframe>

如之前所述，“Safari”浏览器目前的版本还不支持该属性，在使用该属性前需要加以考虑。另外如果需要去支持老版本的FireFox浏览器，那还需要为该属性加上<em class="hover-info" data-title="这是因为CSS3规范在制定初期，还没有纳入“推荐标准”的时候（通常已处于“建议推荐标准”），浏览器厂商们为了优先支持某些属性再加上为推广自己的浏览器厂商名而使用的一种手段">浏览器厂商样式的属性前缀</em>“-moz-”来单独去支持它（在版本v49.0之后可以不用加了），写法如下：

```css
p {
    text-align:justify;
    text-align-last:left;
    /*这样就可以支持老版本的Firefox浏览器了*/
    -moz-text-align-last:left;
}
```

浏览器厂商样式的“属性前缀”产生的原因是，通常当一个样式属性还处于W3C组织的“候选推荐标准”或“建议推荐标准”的时候，浏览器研发组通过开会的形式基本一致地认为该样式属性的实用性很强的时候，那这个品牌的浏览器研发组会提前的开始对W3C提出的这个标准进行开发。当这个样式功能完成后为了凸显自己品牌的优势，亦或是为了防止这个样式属性最终没有成为“推荐标准”，于是他们就会在该属性前方加上一个自己厂商名的“前缀”，作为浏览器的专用样式属性。

我们来大致了解一下W3C每制定一个规范需要经历的5个步骤：

1. 第1阶段：工作草案（Working Draft）工作组依据工作组章程（charter）提出一系列工作草案。公众和W3C会员可以提出评论和问题。工作组必须处理这些反馈。本阶段时长依多种因素而变。
2. 第2阶段：最终工作草案（Last Call Working Draft）工作组已完成工作，并要求公众和 W3C 会员提交最后的评论与问题。同样，工作组必须处理这些反馈。如果出现情况，可能要回到工作草案阶段。本阶段时长通常为3周，但也可以更长。
3. 第3阶段：候选推荐标准（Candidate Recommendation）当最终工作草案阶段结束，且问题都得到解决后，将进入候选推荐标准（Candidate Recommendation）阶段。 此时可以认为该规范已经稳定，可以展开试验性实施了。工作组必须将实施中得到的反馈整合到规范中。同样，如果出现情况，需返回到工作草案阶段。根据实施进展，本阶段通常持续零到一年。
4. 第4阶段：建议推荐标准（Proposed Recommendation）如无意外，规范将进入建议推荐标准（Proposed Recommendation）阶段。在此阶段，W3C总监 (TimBemers-Lee）将正式请求W3C会员审阅这份建议推荐标准。本阶段时长必须不少于4周。
5. 第5阶段：推荐标准（Recommendation）据审阅结果，要么W3C总监宣布该规范成为W3C推荐标准（Recommendation），中间可能发生微小改动，要么返回工作草案阶段，或者彻底从W3C工作日程上移去。技术规范一旦成为推荐标准，它就是官方的W3C标准了。

## CSS文本垂直对齐“vertical-align”

该属性是用于控制文本的垂直对齐方式，它主要的值有：

* baseline（默认）：以文本元素的基线进行对齐。
* top：把文本元素的顶端与行中最高的文本元素的顶端对齐（文本元素不一定是字体，以下同理）。
* middle：以文本元素的中心点为参照与行内其它文本元素的中心进行对齐。
* bottom：把文本元素的底端与行中最低的文本元素的顶端进行对齐。
* sub：以文本元素的下标为参照与其它文本元素进行对齐。
* super：以文本元素的上标为参照其它文本元素进行对齐。
* text-top：把文本元素的顶端与行中最高的字体的顶端进行对齐。
* text-bottom：把文本元素的底端与行中最低的字体的顶端进行对齐。
* 百分数：使用"line-height"属性的百分比值来排列此元素，允许使用负值。

该属性在定义文本对齐方式上比较特殊，字面意思上它似乎可以控制一段文本的垂直对齐方式，但它实际上不能对普通的单个元素生效。也就是说这种对齐方式需要“参照物”，即需要至少2个在同一行内的“行内元素”或“行内块元素”才能生效。另外它对表格的单元格`<th>`和`<td>`这两个标签可以单独生效（他们的“display”属性为“table-cell”），即一行只有一个单元格也能对“vertical-align”属性生效。

让我们来看看一个不生效的示例:

html代码如下:

```html
 <section>
    <div class="test-div-1">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
    </div>
    <div class="test-div-2">
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
    </div>
    <div class="test-div-3">
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
    </div>
    <div class="test-div-4">
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
    </div>
    <div class="test-div-5">
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
    </div>
    <div class="test-div-6">
        <a>单只耳机，静静放映，你没听。</a>
    </div>
</section>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
section > div {
    height: 100px;
    background-color: #ebee45;
    margin-bottom: 20px;
}
section > div span,section > div input,section > div img,section > div strong,section > div i,section > div a {
    background-color: #97ef23;
}
.test-div-1 span {
    vertical-align: baseline;
}
.test-div-2 input {
    vertical-align: top;
}
.test-div-3 img {
    vertical-align: middle;
}
.test-div-4 i {
    vertical-align: bottom;
}
.test-div-5 strong {
    vertical-align: text-top;
}
.test-div-6 a {
    vertical-align: 100%;
}
```

以上[示例](./docs/css/html/css-code-4-3.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-3.html"></iframe>

可以看到，无论我们给这些文本元素设置“vertical-align”属性的任何值，这些元素都没有任何反应。他们并不会在这个高度为80像素的`<div>`标签容器里的垂直方向上有任何移动。其实，这就是因为这些文本元素在这个`<div>`标签里是唯一的，也就是没有“兄弟”标签。

我们再来看一个生效的示例:

html代码如下:

```html
<section>
    <div class="test-div-1">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
    <div class="test-div-2">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
    <div class="test-div-3">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
    <div class="test-div-4">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
    <div class="test-div-5">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
    <div class="test-div-6">
        <span>就放手吧别想她，这世界有很多爱你的人那。</span>
        <i>是不是我们都不长大，你们就不会变老，是不是我们再撒撒娇，你们还能把我举高高。</i>
        <input type="text" value="沧海一声笑，滔滔两岸潮，浮沉随浪，只记今朝。" />
        <img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔" />
        <strong>坠落吧，落吧，想你的雪花放肆在心里落下。</strong>
        <a>单只耳机，静静放映，你没听。</a>
    </div>
</section>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}

section > div {
    height: 100px;
    background-color: #ebee45;
    margin-bottom: 20px;
}
section > div span,section > div input,section > div img,section > div strong,section > div i,section > div a {
    background-color: #97ef23;
}

.test-div-1 span,.test-div-1 input,.test-div-1 img, .test-div-1 strong,.test-div-1 i,.test-div-1 a {
    vertical-align: baseline;
    border-bottom: 2px solid #dd4456;
}

.test-div-2 span,.test-div-2 input,.test-div-2 img, .test-div-2 strong,.test-div-2 i,.test-div-2 a  {
    vertical-align: top;
    border-bottom: 2px solid #dd4456;
}

.test-div-3 span,.test-div-3 input,.test-div-3 img, .test-div-3 strong,.test-div-3 i,.test-div-3 a  {
    vertical-align: middle;
    border-bottom: 2px solid #dd4456;
}

.test-div-4 span,.test-div-4 input,.test-div-4 img, .test-div-4 strong,.test-div-4 i,.test-div-4 a  {
    vertical-align: bottom;
    border-bottom: 2px solid #dd4456;
}

.test-div-5 span,.test-div-5 input,.test-div-5 img, .test-div-5 strong,.test-div-5 i,.test-div-5 a {
    vertical-align: text-top;
    border-bottom: 2px solid #dd4456;
}

.test-div-6 span,.test-div-6 input,.test-div-6 img, .test-div-6 strong,.test-div-6 i,.test-div-6 a  {
    vertical-align: 100%;
    border-bottom: 2px solid #dd4456;
}
```

以上[示例](./docs/css/html/css-code-4-4.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-4.html"></iframe>

从以上的示例我们就可以比较清晰地对比这几种垂直对齐方式的差异了。但需要注意的是，这种控制文本垂直对齐的方式只是对于文本元素互相之间有效，也就是说在一个有高度空间的元素里它们并不会在这个空间里居中。

如上文所述，这个属性对于表格的单元格来讲是无需在单个单元格内出现“兄弟”元素的，而且也不需要将单元格的子元素写成一个群组选择器的形式，只需要将垂直对齐的方式设置到这个单元格所对应的选择器上即可，它的子元素会去继承这个单元格设置的对其方式。例如以下一个示例:

html代码如下:

```html
<table>
    <tbody>
        <tr class="table-row-1">
            <td>断桥是否下过雪。</td>
            <td><span>半城烟沙，兵临城下。</span></td>
            <td><img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔"></td>
            <td><strong>若流芳千古，爱的人却反目。</strong></td>
        </tr>
        <tr class="table-row-2">
            <td>断桥是否下过雪。</td>
            <td><span>半城烟沙，兵临城下。</span></td>
            <td><img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔"></td>
            <td><strong>若流芳千古，爱的人却反目。</strong></td>
        </tr>
        <tr class="table-row-3">
            <td>断桥是否下过雪。</td>
            <td><span>半城烟沙，兵临城下。</span></td>
            <td><img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔"></td>
            <td><strong>若流芳千古，爱的人却反目。</strong></td>
        </tr>
        <tr class="table-row-4">
            <td>断桥是否下过雪。</td>
            <td><span>半城烟沙，兵临城下。</span></td>
            <td><img src="./images/blue-rabbit.png" alt="图片加载中" title="蓝兔"></td>
            <td><strong>若流芳千古，爱的人却反目。</strong></td>
        </tr>
    </tbody>
</table>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
table {
    border-collapse: collapse;
}
table tr td {
    border: 1px solid #2e2e2e;
    height: 100px;
}
table tr td span,table tr td img,table tr td strong {
    background-color: #aff394;
    /*不论是block还是inline还是inline-block都是没问题的*/
    display: block;
}
table tr.table-row-1 td {
    vertical-align: baseline;
}
table tr.table-row-2 td{
    vertical-align: top;
}
table tr.table-row-3 td {
    vertical-align: middle;
}
table tr.table-row-4 td {
    vertical-align: bottom;
}
```

以上[示例](./docs/css/html/css-code-4-5.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-5.html"></iframe>

可以发现在表格内使用该属性非常的方便，不仅不需要给每个具体元素设置垂直对齐方式，而且无论是对于什么显示类型（“display”）的元素都适用。其实对于一些普通的“块级元素”，如`<div>`、`<article>`、`<section>`、`<p>`、`<header>`、`<main>`、`<footer>`、`<nav>`、`<aside>`等标签，也可以将他们的“display”属性设置为“table-cell”值，以此来让他们对内容（不限显示类型）进行垂直对齐方式的调整。

## 段落首行缩进“text-indent

该属性是用于“行内元素”设置每个段落首行缩进数量值的属性，CSS字体大小（font-size）可以设置的数值和单位在该属性的值中都可以使用（除了百分比）。如果是用于中文布局，一般会使用“2em”这种数值+单位的形式来为每个段落的首行缩进“两个字符”，这里并不推荐使用“rem”单位，因为段落中可能会存在和正文字体大小不一致的文本（比如说“引用”、“注释”、“注意”等），也就是说缩进“2rem”可能并不是该段文字实际2个字符的宽度。

来看一个示例如下:

html代码如下:

```html
<article>
    <p class="em2">烽烟起，寻爱似浪淘沙，遇见她，如春水映梨花，挥剑断天涯，相思轻放下，梦中我，痴痴牵挂，顾不顾将相王侯，管不管万世千秋，求只求爱化解，这万丈红尘纷乱永无休，爱更爱天长地久，要更要似水温柔，谁在乎谁主春秋，一生有爱，何惧风飞沙，悲白发留不住芳华，抛去江山如画，换她笑面如花，抵过这一生空牵挂，心若无怨爱恨也随她，天地大，情路永无涯，只为她袖手天下。</p>
    <p class="px40">看不清的脚印，是雪地的痕迹，说不完的话题，在那年的冬季，一股冷风正吹起，吹的人心恍惚不定，你也是随这风而去，有过多少伤心，也装作不在意，被风吹过眼睛，又勾起了回忆，你说天空很美丽，而我什么都看不清，只剩虚伪的祝福你，一直走，千万不要回头，别管我多心痛，去找你的天空，风吹得猛，把我眼睛刺痛，让泪不停流动，这感觉真的难懂，总是躲在这个角落，怎么能解脱，给了这么痛的结果，到底为什么，想不起我流泪的表情，听不清风吹过的声音，只知道，我不会把你忘记，你相信最后会有奇迹，相信。</p>
    <p class="pt30">夜，夜的那么美丽有人欢笑，有人却在哭泣，尘封的记忆，残留着邂逅的美丽，辗转反侧的我，失眠在夜里，你，你带走的呼吸，吻不到你，那感觉多委屈，分岔的爱情让眼泪隔出银河的距离，轻轻关上门，让眼泪不逃避，何必要在一起，让我爱上你，至少自己过的不必太压抑，何必要在一起，逃出生命里，才让这个夜显得那么空虚，何必要在一起，让我爱上你，感觉你的呼吸，是那么清晰，何必要在一起，让我没勇气，让我独自在这寒冷的夜里，何必要在一起。</p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
/* 文本首行缩进 */
.em2 {
    text-indent: 2em;
}
.px40 {
    text-indent: 40px;
}
.pt30 {
    text-indent: 30pt;
}
```

以上[示例](./docs/css/html/css-code-4-6.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-6.html"></iframe>

这里的示例是为了说明缩进字符带不同单位的情况，在实际的项目中只需要统一控制文章或章节中的段落即可，可以直接把选择器写成“section p”或“article p”的形式，在文章内部如果有不需要缩进的文本，再添加一个更高权重的选择器如“section p.noIndent”，并将该选择器的样式设置为“text-indent: 0”，接着在HTML内为需要消除缩进标签的class属性加上“noIndent”值即可。

## 文本装饰线“text-decoration”

该属性是为文本字符添加一根“装饰线”。在HTML中，带有“href”属性的`<a>`标签默认带有一根装饰线（表现为下划线），就是因为浏览器会将`<a>`标签的该属性默认设置为“underline”才如是呈现的。“text-decoration”属性有以下值：

* none（默认）：不显示任何装饰线，或消除已有的装饰线（需要更高权重）。
* underline：在文本下方显示装饰线（称作“下划线”），效果如同HTML的`<u>`标签。
* overline：在文本上方显示装饰线（称作“上划线”）。
* line-through：在文本中间显示装饰线（称作“删除线”或“中划线”），效果如同HTML的`<s>`或`<del>`标签。

如以下一个示例:

html代码如下:

```html
 <article>
    <p class="no-line">
        <a href="https://baike.baidu.com/item/%E7%94%9F%E6%97%A5%E7%A4%BC%E7%89%A9/2325277?fr=aladdin">
             你曾说过分手还可以做朋友，我送你礼物你却不接受。（无文本装饰线）
        </a>
    </p>
    <p class="under-line">
        <a href="https://baike.baidu.com/item/%E5%9B%9E%E6%9D%A5%E6%88%91%E7%9A%84%E7%88%B1/1752458?fr=aladdin">
             老天请给我机会，补偿心上人些许安慰，如果生命可以轮回，我宁愿时光倒退。（下方有文本装饰线）
        </a>
    </p>
    <p class="over-line">
        <a href="https://baike.baidu.com/item/%E7%88%B1%E6%B5%B7%E6%BB%94%E6%BB%94/717761?fr=aladdin">
             一定是我不够好，所以你才想要逃，逃到天涯和海角，躲在别人的怀抱。（上方有文本装饰线）
        </a>
    </p>
    <p class="line-through">
        <a href="https://baike.baidu.com/item/%E7%97%B4%E5%BF%83%E7%BB%9D%E5%AF%B9/16696555?fr=aladdin">
             为你付出那种伤心，你永远不了解，我又何苦勉强自己爱上你的一切。（文本中间显示装饰线）
        </a>
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}

article {
    padding: 15px;
}
article p {
    margin-bottom: 20px;
}
article p a {
    color: #2396ef;
}
/*无文本装饰线*/
article p.no-line a {
    text-decoration: none;
}
/*上方有文本装饰线*/
article p.over-line a{
    text-decoration: overline;
}
/*文本中间有装饰线*/
article p.line-through a {
    text-decoration: line-through;
}
```

以上[示例](./docs/css/html/css-code-4-7.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-7.html"></iframe>

在CSS3的后续标准中（IE全系列不支持，Edge 18及之前版本不支持），又为该属性提供了4个分支属性，如下：

* text-decoration-line：用于设置装饰线出现的位置，可用值和该属性的主属性完全一致。
* text-decoration-style：目前主流浏览器中只有“Safari”浏览器不支持该属性，它用于设置装饰线的类型，可用的值有：
  * solid：实线（默认）。
  * double：双实线。
  * dotted：点线。
  * dashed：虚线。
  * wavy：波浪线。
* text-decoration-color：用于设置装饰线的颜色，允许的值为Web常用颜色模式，即颜色英文单词和HEX、RGB、HSL以及带有Alpha通道的以上颜色值。
* text-decoration-skip：目前没有浏览器支持该属性。它的作用是当字符和装饰线发生重叠关系的时候，是跳过文字字符，还是直接连在一起穿过去。

当然，和我们之前接触过的一些带分支属性的属性一样，该属性也能进行缩写，即写成组合值的形式如下:（下方示例中也展示了写法）。

```css
text-decoration:"装饰线的位置(text-decoration-line)" "装饰线的类型(text-decoration-style)" "装饰线的颜色(text-decoration-color)";
```

如以下一个示例:

html代码如下:

```html
<div>
    <span class="test-1">长大以后，我只能奔跑，我多害怕，黑暗中跌倒。</span>
    <span class="test-2">越长大越孤单，越长大越不安，也不得不看梦想的翅膀被折断。</span>
    <span class="test-3">漫天飞舞一片荒芜，满眼风雪和眼泪都化做尘埃，再多的苦于事无补，忘记所有才能够重来。</span>
    <span class="test-4">未来的每一步一脚印，踏着彼此梦想前进，路上偶尔风吹雨淋，也要握紧你的手心。</span>
    <span class="test-5">多少次挥汗如雨，伤痛曾填满记忆，只因为始终相信，去拼搏才能胜利。</span>
</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
span {
    margin: 0 20px;
    text-decoration-line: underline;
}

span.test-1 {
    text-decoration-style: solid;
    text-decoration-color: #f87f23;
}
span.test-2 {
    text-decoration-style: dashed;
    text-decoration-color: #f83123;
}
span.test-3 {
    text-decoration-style: double;
    text-decoration-color: #b1be38;
}
span.test-4 {
    text-decoration-style: dotted;
    text-decoration-color: #66f823;
}
span.test-5 {
    /*组合值写法*/
    text-decoration: underline wavy #d62eb2;
}
```

以上[示例](./docs/css/html/css-code-4-8.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-8.html"></iframe>

对于编写组合值属性的时候需要注意一点，就是当不同权重值的选择器指向同一个元素时，主属性位于权重值更高的选择器内时（包括后出现的同名选择器），它会覆盖之前在其它低权重值选择器内设置过的同名分支属性，详情见下方示例。

html代码如下:

```html
<div>
    <span class="test test-1">而你撑伞拥我入怀中，一字一句誓言多慎重。</span>
    <span class="test test-2">从那遥远海边，慢慢消失的你，本来模糊的脸，竟然渐渐清晰。</span>
</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
span.test {
    margin: 0 20px;
    text-decoration-line: line-through;
    text-decoration-style: wavy;
    text-decoration-color: #9f77f2;
    font-size: 32px;
    color: #2396ef;
}
span.test.test-2 {
    text-decoration:underline;
}
```

以上[示例](./docs/css/html/css-code-4-9.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-9.html"></iframe>

通过观察可以发现这两个`<span>`标签都共用了一个“span.test”选择器，而第二个`<span>`还另外用了一个叫做“span.test.test-2”的选择器，第二个选择里使用的是“text-decoration”的主属性去设置线型（-line）为“下划线”，并没有去单独设置装饰线的类型（-style）和颜色（-color）,但是对于这两个分支属性却没有生效，这是为什么呢？这个时候我们可以在“谷歌Chrome浏览器开发者工具”（“Google Chrome Browser Developer Tools”，下文简称“开发者工具”）内观察具体原因：

<div class="image-container">
    <img src="./docs/css/images/css-code-text-decoration.jpg" alt="图片4-1" title="图片4-1" >
    <span class="image-title">图 4-1 </span>
</div>

通过开发者工具我们可以清晰地看到，在“text-decoration”属性展开后它拥有的三个分支属性仍然是存在的，也就是说它们仍然会根据权重去覆盖针对同一个元素的其它选择器的同名属性。在“text-decoration”展开属性中的“<em class="hover-info" data-title="直译：初始的；最初的">initial</em>”值表示的是初始值的意思，也就是浏览器根据规范对该属性的默认设置值，基本上所有的CSS属性都拥有该值。这个覆盖规则对以后会遇到的所有带分支的属性都适用，需要加以注意。如：设置字体的“font”属性（包括半隐式的“line-height”也会被更高权重值选择器的“font”属性覆盖）、设置边框的“border”属性、设置背景的“background”属性、设置样式过渡效果的“transition”属性、设置元素变形的“transform”属性、添加元素动画的“animation”属性等。

> 注意:我们所学习的“text-*”并不是主属性，也就是说单独的“text”目前不是已知CSS属性。如无特殊说明的“text-*”属性均为独立属性。

## 英文字母大小写转换“text-transform”

该属性能将英文文本进行大小写转换，以满足不同类型公司对网站规范的要求。特别在一些对项目或产品细节要求至严的跨国企业或合资企业，他们对网站或应用中的文本格式也有相当高的要求，当网站中的绝大部分英文文本都是由其它地方整理粘贴而来的时候，如果要逐一去修改这些文本，不仅时间成本大大地增加，也容易出现一些难以一时发现的疏漏，这个时候“text-transform”属性就有它的“用武之地”了。该属性有以下值：

* none（默认）：保持文本中英文单词的默认大小写。
* capitalize：将每个英文单词首字母转换为大写字母（对于单个单词而言，如果该单词是全大写字母的，则不发生任何转换）。
* uppercase：将所有英文单词转换为大写字母。
* lowercase：将所有英文单词转换为小写字母。

来看一个示例如下:

html代码如下:

```html
<section>
    <p class="trans-def">i'm a big big girl,in a big big world,it's not a big big thing if you leave me,but i do do feel that i too too will miss you much,miss you much.</p>
    <p class="trans-cap">i'm a big big girl,in a big big world,it's not a big big thing if you leave me,but i do do feel that i too too will miss you much,miss you much.</p>
    <p class="trans-upp">i'm a big big girl,in a big big world,it's not a big big thing if you leave me,but i do do feel that i too too will miss you much,miss you much.</p>
    <p class="trans-low">i'm a big big girl,in a big big world,it's not a big big thing if you leave me,but i do do feel that i too too will miss you much,miss you much.</p>
</section>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
@font-face {
    font-family: BBFont;
    /* 字体路径根军目录决定 */
    src: url('../fonts/Branding-Bold.woff2.ttf');
}
section p {
    margin-bottom: 20px;
    font: bold 28px BBFont;
}
/*英文大小写转换*/
.trans-def {
    /* 默认 */
    text-transform: none;
}
.trans-cap {
    /* 首字母大写 */
    text-transform: capitalize;
}
.trans-upp {
    /* 全部大写 */
    text-transform: uppercase;
}
.trans-low {
    /* 全部小写 */
    text-transform: lowercase;
}
```

以上[示例](./docs/css/html/css-code-4-10.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-10.html"></iframe>

## 文本的阴影“text-shadow”

该属性的作用是给文本添加阴影效果。该属性最初是在CSS 2.0中被定义为“推荐标准”的，但在CSS 2.1又被删除了，不知道它到底经历了一些什么，在CSS 3.0中又重新被写进了规范并再次作为“推荐标准”。目前除了IE9及之前版本的浏览器不支持该属性外，其它现代浏览器均支持该属性。

该属性有4个值，具体如下：

* 水平方向阴影偏移（hoff-shadow）：“0”表示维持原位，正数为向右偏移，负数为向左偏移。单位为像素“px”。
* 垂直方向阴影偏移（voff-shadow）：“0”表示维持原位，正数为向下偏移，负数为向上偏移。单位为像素“px”。
* 阴影模糊距离（blur）：用正数表示阴影模糊的单位距离，距离越大模糊程度越高，单位为像素“px”。
* 阴影的颜色（color）：支持Web技术中的常用颜色模式：颜色英文单词和HEX、RGB、HSL以及带有Alpha通道的以上颜色值。

和“行内块元素”和“块元素”所用的“box-shadow”有所不同（该属性位于“CSS盒子模型”的“元素的阴影‘box-shadow’”一节内容中），文本阴影的属性值里没有“inset”和“spread”这两个部分（它们的作用分别为“内阴影”和“阴影扩展”），以后在使用中需要加以区分。

来看一个示例如下:

html代码如下:

```html
<article>
    <p class="text-shadow-1">
         我把你画成花，未开的一朵花。<span>（颜色英文单词）</span>
    </p>
    <p class="text-shadow-2">
         阳光下的泡沫，是彩色的。<span>（hex颜色模式）</span>
    </p>
    <p class="text-shadow-3">
         缘分让我们相遇乱世以外，命运却要我们危难中相爱。<span>（rgba颜色模式）</span>
    </p>
    <p class="text-shadow-4">
         我的意识自控脉搏流动，全被你神秘引力操控，亲爱的你是危险的迷宫。<span>（hsla颜色模式）</span>
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
.text-shadow-1,.text-shadow-3 {
    color: #fff;
}
/* 文本阴影 */
.text-shadow-1 {
    text-shadow: -2px 3px 3px blue;
}
.text-shadow-2 {
    text-shadow: 0 0 5px #443788;
}
.text-shadow-3 {
    text-shadow: -2px -3px 3px rgba(59, 65, 2, 0.8);
}
.text-shadow-4 {
    text-shadow: 3px 2px 4px hsla(111,35%,56%,.6);
}
```

以上[示例](./docs/css/html/css-code-4-11.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-11.html"></iframe>

最后，需要提出注意的是，该属性一定程度会影响文字的可读性，特别是对于字号较小的字体。它的主要用途是为一些需要体现立体效果的地方加上值很小的偏移量和模糊度的阴影。还有就是当文字的背景是色阶跳跃比较大的图片的时候，文字颜色和背景图片的某些区域颜色几乎一样，那文字是很难辨认的（似如上例中第一和第三个段落字体为白色，背景也为白色的情况），这个时候为文本添加适当的阴影会稍微提高一些辨识度。

## 段落文本行高“line-height”

该属性是用于设置“行内元素”中的文本字符在一行中所占据的高度，可以使用的值可以是像素值、百分比，或不带单位的浮点数（“1”表示“100%”，“1.5”表示“150%”，以此类推）。

该属性除字面上的意思外，很多时候还有一个小妙用，就是当文本元素只有一行时，可以将该行的文本行高设为和父容器元素高度一致，以此到达文本垂直居中的效果（单行文本甚至可以省略“height”属性，单用“line-height”来替代）。使用场景如：表格单元格、导航按钮、标题栏、表单元素（如：`<input>`、`<select>`、`<textarea>`和`<button>`。不过这里更建议使用“padding”属性来控制表单元素的高度，这样就不会出现各浏览器对于表单元素的光标大小和位置显示不一致的问题）等。

来看一个示例:

html代码如下:

```html
<article>
    <p class="line-height-1d6">自你离开以后，从此就丢了温柔，等待在这雪山路漫长，听寒风呼啸依旧，一眼望不到边，风似刀割我的脸，等不到西海天际蔚蓝，无言着苍茫的高原，还记得你答应过我不会让我把你找不见，可你跟随那南归的候鸟飞得那么远，爱像风筝断了线，拉不住你许下的诺言，我在苦苦等待雪山之巅温暖的春天，等待高原冰雪融化之后归来的孤雁，爱再难以续情缘，回不到我们的从前。</p>
    <button class="custom-btn">自定义样式的按钮</button>
    <nav class="mainNav">
        <a href="#">网站首页</a>
        <a href="#">产品与介绍</a>
        <a href="#" class="checked">特色功能</a>
        <a href="#">帮助与支持</a>
        <a href="#">关于我们</a>
    </nav>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
.line-height-1d6 {
    line-height: 1.6;
}
.custom-btn {
    width: 120px;
    line-height: 50px;
}
.mainNav a {
    text-decoration: none;
    display: inline-block;
    background-color: #c4c7c4;
    line-height: 42px;
    text-align: center;
    color: #ffffff;
    margin-top: 15px;
    width: 108px;
}
.mainNav a.checked {
    background-color: #535353;
}
```

以上[示例](./docs/css/html/css-code-4-12.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-12.html"></iframe>

如上面提到的，利用行高功能可以让单行文字在一个标签容器里在垂直方向上居中，但若是想让多行文字在一个标签容器里居中的话，目前可以考虑的方案有以下几种：

* 如果不考虑标签容器高度需要固定的情况，可以用上下相同的内间距去控制，如“padding-top: 50px; padding-bottom: 50px”或简写为“padding: 50px 0;”（上下50像素，左右0像素）。例如以下一个示例:
  
<div class="ew-code-compiler">
    <article style="padding:20px 0;">
        <p>无所谓什么错与对，没关系谁会爱上谁，就让我一瞬间忘掉你所有的美，闭上双眼不问是非，酒醒后一个人憔悴，所有的错我自己背，看透了你那笑容背后的虚伪，是否给得太多就该受罪，就让我听着情歌流眼泪，窗外的北风还在吹，孤单的时候你是否会心碎，你的疼究竟为了谁，就让我听着情歌流眼泪，难道这样爱你真有罪，不再奢求再多爱一次的机会，覆水难收到最后独伤悲。</p>
        <p>在你辉煌的时刻，让我为你唱首歌，我的好兄弟心里有苦你对我说，前方大路一起走，哪怕是河也一起过，苦点累点又能算什么，在你需要我的时候我来陪你一起度过，我的好兄弟心里有苦你对我说，人生难得起起落落，还是要坚强的生活，哭过笑过至少你还有我，朋友的情谊呀比天还高比地还辽阔，那些岁月我们一定会记得，朋友的情谊呀我们今生最大的难得，像一杯酒像一首老歌。</p>
    </article>
</div>

* 将显示类型设置为表格单元格的类型（display: table-cell），并且将“vertical-align”属性的值设置为“middle”，这种设置方式有几个点需要注意：
    * 该元素的宽度和高度不能设为百分比单位，这和&lt;td&gt;元素不能设置百分比单位一样。
    * 若想使用百分比的宽高单位，需将父容器的“display”属性值设置为“table”或“inline-table”（表现得像“inline-block”），然后去调整父级的百分比宽高，前提是父级下只有一个显示类型为“table-cell”子元素。
    * 容器元素的宽度可以是固定像素值，但当父级元素的“display”为“table”或“inline-table”且有多个显示类型为“table-cell”子元素容器时，部分容器宽度设置不一定生效。
    * 元素高度可以固定，但是当内部的内容过多从而超出设定高度时，元素高度会自动增加。
如以下一个简单的示例:

<div class="ew-code-compiler">
  <div style="display:table-cell;vertical-align:middle;height:100px;border:1px dotted #2396ef;">
      <a href="https://baike.baidu.com/item/%E6%88%91%E6%83%B3%E6%89%BE%E4%B8%80%E4%B8%AA%E5%A5%B3%E6%9C%8B%E5%8F%8B/9635418?fr=aladdin" target="_blank" rel="noopener noreferrer">
          我想找一个女朋友
      </a>
  </div>
</div>

* 标签容器高度固定的情况，将该容器的显示类型设置为<em class="hover-info" data-title="一种CSS3的布局方式">弹性盒子模型（display: flex）</em>，再将项目对齐方式“align-items”属性的值设置为“center”（该属性只有在“display”的值为“flex”的时候有效）。

从常规的“正文文本”设计美观度上来讲，该属性的建议值总在1.4至1.8之间。行高过小会让阅读的视觉疲劳感增加，可读性也较低。行高过大，会让页面正文部分过于空旷，使得页面内容有效区域利用率过低。而对于一些需要展现页面特色并使用了特殊字体的网页而言，可以适当打破这个规则建议。

最后，需要再次提醒注意的是“line-height”可以是“font”的一个隐藏分支属性，也就是说当一个元素在同一个选择器里或更高权重的选择器里使用过“font”组合值的写法，那之前“line-height”属性就会无效化。所以，当需要在和拥有“font”属性同一个选择器里编写行高样式的话，可以直接将行高的值写进“font”属性里，即省略掉“line-height”属性，或者将“line-height”属性放置于“font”之后的行里。如果是不同的选择器，要让“line-height”属性优先生效，那第一种手段就是通过选择器的权重来控制，第二种手段就是为属性值添加上“<em class="hover-info" data-title="不到万不得已，始终建议不要使用这个值，它会让你的代码失去可维护性">!important</em>”值，使其权重最大化。结构如下:

```css
div {
    /*不推荐使用该关键字*/
    line-height:100px!important;
}
```

## 单词的间距“word-spacing”

该属性用于设置英文单词之间的间距，中文则是设置文本中空格的距离，单位为Web技术的常用度量单位，如“像素（px）”，“字符（em）”，“点（pt）”等，可以为负数。

如以下一个示例:

html代码如下:

```html
<article>
    <p class="word-spacing-1">
        <span>Because of you,I learned to play on the safe side so I don't get hurt.</span>
    </p>
    <p class="word-spacing-2">
        <span>长亭外，古道边，芳草碧连天。晚风拂柳笛声残，夕阳山外山。</span>
    </p>
    <p class="word-spacing-3">
        <span>Because of you,I find it hard to trust not only me, but everyone around me.</span>
    </p>
    <p class="word-spacing-4">
        <span>天 之 涯，地 之 角，知 交 半 零 落。一 壶 浊 酒 尽 余 欢，今 宵 别 梦 寒。</span>
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
article {
    padding: 20px;
}
article p {
    margin-bottom: 20px;
}
.word-spacing-1 {
    word-spacing: 10px;
}
.word-spacing-2 {
    word-spacing: 2em;
}
.word-spacing-3 {
    word-spacing: -1em;
}
.word-spacing-4 {
    word-spacing: -10px;
}
```

以上[示例](./docs/css/html/css-code-4-13.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-13.html"></iframe>

## 字符的间距“letter-spacing”

和“word-spacing”有所不同，该属性是用于控制字符间的间距，即无论单词或词语中是否含有空格（该属性对空格字符无效），该属性都会生效，单位同样为Web技术的常用度量单位，同样可以为负数。

如以下一个示例:

html代码如下:

```html
<article>
    <p class="letter-spacing-1">
        <span>But if you wanna cry, cry on my shoulder,If you need someone who cares for you.</span>
    </p>
    <p class="letter-spacing-2">
        <span>难道注定要在情海中漂泊，还是这个世界太冷漠，我望天望地望着结果，那到底是谁犯了错。</span>
    </p>
    <p class="letter-spacing-3">
        <span>But if you wanna cry, cry on my shoulder,If you need someone who cares for you.</span>
    </p>
    <p class="letter-spacing-4">
        <span>难道注定要在情海中漂泊，还是这个世界太冷漠，我望天望地望着结果，那到底是谁犯了错。</span>
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
article {
    padding: 20px;
}
article p {
    margin-bottom: 20px;
}
.letter-spacing-1 {
    letter-spacing: 2px;
}
.letter-spacing-2 {
    letter-spacing: 1em;
}
.letter-spacing-3 {
    letter-spacing: -2px;
}
.letter-spacing-4 {
    letter-spacing: -3px;
}
```

以上[示例](./docs/css/html/css-code-4-14.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-14.html"></iframe>

## 单词自动换行处理“word-break”

该属性用于控制字符以什么样的方式换行。对于<em class="hover-info" data-title="如英语、法语、德语、意大利语、西班牙语、葡萄牙语等等">西文</em>来说如果单词过长，只要是单词间没有空格符，那浏览器是不会对其换行的。我们在浏览器里复制了三段字符，其中第三段是我们故意制造的一个长单词，它们在浏览器里表现如下：

<div class="image-container">
    <img src="./docs/css/images/longtext-nowrap.gif" alt="图片4-2" title="图片4-2" >
    <span class="image-title">图 4-2 </span>
</div>

对于示例中这样较长的单词就可以用“word-break”属性去进行处理，它主要有以下值：

* normal（默认）：使用浏览器默认的换行规则。
* break-all：允许在单词内换行。
* keep-all：只能在空格符、中文标点符或连字符（-）处换行。

和该属性用法相近的还有一个属性叫做“word-wrap”，除了默认值以外它只有一个可用值“break-word”，它的作用是在长单词或URL地址内部进行换行。看上去它的作用和“word-break: break-all”相似，稍微不同的地方是：当一段句子中出现了较长的单词，并在当前行容纳不下的时候，“word-wrap: break-word”会先尝试将这个单词换在下一行，若下一行仍然容纳不下才会对这整个长单词进行单词内的断行，而“word-break: break-all”则是首先就对这个长单词进行断行，而不会考虑下一行是否能容纳。这在下图展示的示例中可以看出来:

<div class="image-container">
    <img src="./docs/css/images/word-wrap-diff-word-break.png" alt="图片4-2" title="图片4-2" >
    <span class="image-title">图 4-2 </span>
</div>

让我们来看一个完整的示例如下:

html代码如下:

```html
<div>
    <p>T-hhhhhhhhhhh-e i-sssssssssssssss T-eeeeeeeeeeeee-st Longtext, if l-oooooooooooo-k t-hhhhhhhhhhhhhh-is Wo-rrrrrrrrrrrrrrrr-d is L-ooooooooooooooooooooo-ngtext. </p>
    <p>T-hhhhhhhhhhh-e i-sssssssssssssss T-eeeeeeeeeeeee-st Longtext, if l-oooooooooooo-k t-hhhhhhhhhhhhhh-is Wo-rrrrrrrrrrrrrrrr-d is L-ooooooooooooooooooooo-ngtext. </p>
    <p>T-hhhhhhhhhhh-e i-sssssssssssssss T-eeeeeeeeeeeee-st Longtext, if l-oooooooooooo-k t-hhhhhhhhhhhhhh-is Wo-rrrrrrrrrrrrrrrr-d is L-ooooooooooooooooooooo-ngtext. </p>
    <p>T-hhhhhhhhhhh-e i-sssssssssssssss T-eeeeeeeeeeeee-st Longtext, if l-oooooooooooo-k t-hhhhhhhhhhhhhh-is Wo-rrrrrrrrrrrrrrrr-d is L-ooooooooooooooooooooo-ngtext. </p>
</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
p {
    width: 150px;
    border: 2px groove rgb(194, 197, 12);
    margin: 20px;
    float: left;
}
p:first-child {
    word-break: normal;
}
p:nth-child(2) {
    word-break: break-all;
}
p:nth-child(3) {
    word-wrap: keep-all;
}
p:last-child {
    word-wrap: break-word;
    margin: 0;
}
```

以上[示例](./docs/css/html/css-code-4-15.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-15.html"></iframe>

让我们来看一个用于中文的示例:

html代码如下:

```html
<div>
    <p>寂寞登高楼，遥雁近飞蝇。 水闻浪涛声，灯看光明影。 青山暗烟路，绿树敌清风。 欲知鸿归未？且寄自然情。 word-break:normal;</p>
    <p>寂寞登高楼，遥雁近飞蝇。 水闻浪涛声，灯看光明影。 青山暗烟路，绿树敌清风。 欲知鸿归未？且寄自然情。 word-break:break-all;</p>
    <p>寂寞登高楼，遥雁近飞蝇。 水闻浪涛声，灯看光明影。 青山暗烟路，绿树敌清风。 欲知鸿归未？且寄自然情。 word-break:keep:all</p>
    <p>寂寞登高楼，遥雁近飞蝇。 水闻浪涛声，灯看光明影。 青山暗烟路，绿树敌清风。 欲知鸿归未？且寄自然情。 word-wrap:break-word;</p>
</div>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
p {
    width: 280px;
    border: 2px groove rgb(194, 197, 12);
    margin-right: 20px;
    float: left;
}
p:first-child {
    word-break: normal;
}
p:nth-child(2) {
    word-break: break-all;
}
p:nth-child(3) {
    word-break: keep-all;
}
p:last-child {
    word-wrap: break-word;
    margin: 0;
}
```

以上[示例](./docs/css/html/css-code-4-16.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-16.html"></iframe>

可以发现当文本内容为中文的时候，只有当“word-break”的值为“keep-all”的时候有所影响。因为中文按照字符编码的规则来说就算是一个个体，不会像英文字母那样在浏览器默认规则中需要空格符、英文标点或连字符才能换行。在中文字符的情况下“word-break”的“keep-all”值会将连续的中文句子近似地认为是一个单词，只有出现中文标点或空格的时候才会进行断行。这点我们可以单独打开这个示例，在开发者工具中手动调整`<p>`标签的选择器内的宽度属性值来进行观察。

## 空格换行符处理“white-space”

该属性和“word-break”及“word-wrap”不同，从字面意思“white space”（直译为“空白”）上来讲，它是用于处理元素内出现的空格符和换行符的，而不是针对普通字符的。它主要有以下值：

* normal（默认）：由浏览器处理空格符和换行符。
* pre：段落里所有的空格符和换行符都会被保留。作用同于`<pre>`标签。
* nowrap：段落内的文本不会换行，已经换行的文本也会强制设为不换行的形式。
* pre-wrap：段落里所有的空格符序列和换行符序列都会被保留（除了在某些编码格式下和`<pre>`有所差距，大多数时候可以说它和`<pre>`这个值是等价的）。
* pre-line：多空格会合并成一个，但换行符会保留。

来看一个示例如下:

html代码如下:

```html
<article>
    <p class="ws-normal">
        <span>如果不是她钱多 你会不会来娶我 你为何非走不可 不能留下来陪我 你对我是真心的 抵不过名利的诱惑 你难道不担心我 没有你不能活 男朋友结婚了 新娘却不是我就算眼泪再多 也没人心疼我 我想要的多
                                    你的爱就够了 千万别怕养不起我 男朋友结婚了 新娘却不是我 所有你想要的 唯独缺我一个 有手有脚拼搏 总想不劳而获 没有我要钱干什么</span>
        <br><em>white-space:normal;由浏览器处理空格符和换行符</em>
    </p>
    <p class="ws-pre">
        <span>如果不是她钱多 你会不会来娶我 你为何非走不可 不能留下来陪我 你对我是真心的 抵不过名利的诱惑 你难道不担心我 没有你不能活 男朋友结婚了 新娘却不是我就算眼泪再多 也没人心疼我 我想要的多
                                    你的爱就够了 千万别怕养不起我 男朋友结婚了 新娘却不是我 所有你想要的 唯独缺我一个 有手有脚拼搏 总想不劳而获 没有我要钱干什么</span>
        <br><em>white-space:pre;段落里所有的空格符和换行符都会被保留。作用同于<pre>标签</em>
    </p>
    <p class="ws-nowrap">
        <span>如果不是她钱多 你会不会来娶我 你为何非走不可 不能留下来陪我 你对我是真心的 抵不过名利的诱惑 你难道不担心我 没有你不能活 男朋友结婚了 新娘却不是我就算眼泪再多 也没人心疼我 我想要的多
                                    你的爱就够了 千万别怕养不起我 男朋友结婚了 新娘却不是我 所有你想要的 唯独缺我一个 有手有脚拼搏 总想不劳而获 没有我要钱干什么</span>
        <br><em>white-space:nowrap;段落内的文本不会换行，已经换行的文本也会强制设为不换行的形式</em>
    </p>
    <p class="ws-prewrap">
        <span>如果不是她钱多 你会不会来娶我 你为何非走不可 不能留下来陪我 你对我是真心的 抵不过名利的诱惑 你难道不担心我 没有你不能活 男朋友结婚了 新娘却不是我就算眼泪再多 也没人心疼我 我想要的多
                                    你的爱就够了 千万别怕养不起我 男朋友结婚了 新娘却不是我 所有你想要的 唯独缺我一个 有手有脚拼搏 总想不劳而获 没有我要钱干什么</span>
        <br><em>white-space:pre-wrap;段落里所有的空格符序列和换行符序列都会被保留（除了在某些编码格式下和“pre”有所差距，大多数时候可以说它和“pre”这个值是等价的）</em>
    </p>
    <p class="ws-preline">
        <span>如果不是她钱多 你会不会来娶我 你为何非走不可 不能留下来陪我 你对我是真心的 抵不过名利的诱惑 你难道不担心我 没有你不能活 男朋友结婚了 新娘却不是我就算眼泪再多 也没人心疼我 我想要的多
                                    你的爱就够了 千万别怕养不起我 男朋友结婚了 新娘却不是我 所有你想要的 唯独缺我一个 有手有脚拼搏 总想不劳而获 没有我要钱干什么</span>
       <br><em>white-space:pre-line;多空格会合并成一个，但换行符会保留</em>
    </p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
p {
    border-bottom: 2px dashed #2499ff;
    font: 20px "微软雅黑";
}
p em {
    color: #998766;
}
.ws-normal span {
    white-space: normal;
}
.ws-pre span {
    white-space: pre;
}
.ws-nowrap span {
    white-space: nowrap;
}
.ws-prewrap span {
    white-space: pre-wrap;
}
.ws-preline span {
    white-space: pre-line;
}                
```

以上[示例](./docs/css/html/css-code-4-17.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-17.html"></iframe>

## 设置文本方向“direction”

该属性是用于控制文本显示方向的，即从左往右，或从右向左。

在有些国家，如：“阿拉伯”、“伊朗”、“以色列”，还有古典的“中日韩”文等等，他们的文字显示方向都是从右向左的，为了适应这些文字方向的需求，如果用手工去设置，耗费的时间成本会过高，也非常容易出错，这个时候“direction”属性会帮你克服这个问题。该属性有两个值：

* ltr（可以理解为：Left To Right）：默认值,文本方向从左到右。
* rtl（可以理解为：Right To Left）：文本方向从右向左。

来看一个简单的示例:

html代码如下:

```html
<!--以下的句子意思为：回忆总想哭，一个人太孤独，这段情千山万水却迷了路。-->
<article>
    <p class="direction-ltr">ذكريات تريد دائما أن تبكي ، شخص وحيد ، ولكن هذا الحب قد ضاع.</p>
    <p class="direction-rtl">ذكريات تريد دائما أن تبكي ، شخص وحيد ، ولكن هذا الحب قد ضاع.</p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
article {
    padding: 20px;
}
.direction-ltr {
    direction: ltr;
}
.direction-rtl {
    direction: rtl;
}
```

以上[示例](./docs/css/html/css-code-4-18.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-18.html"></iframe>

## 设置书写模式“writing-mode”

该属性用于设置文本的书写模式，即可以像对联那像从上到下的书写模式，也可以像古典中文那样从上到下且从右到左的书写模式。由于是CSS 3的新属性，在兼容性上也存在一些小问题，可以前往[Can I Use](https://www.caniuse.com/#search=writing-mode)去查看该属性对浏览器支持的情况，可以发现除了IE系列一如既往的支持较差以外，老版本的主流浏览器在使用的时候也需要加上属性前缀，不过最新版本的主流浏览器基本支持该属性，不支持的值我们已经在下方属性值的后方用括号进行了说明。属性的可用值有：

* horizontal-tb：水平方向从左到右，垂直方向自上而下的书写方式，即常规书写方式。相当于：left → right，top → bottom。
* vertical-rl、tb（Edge不支持）、tb-rl：垂直方向自上而下，水平方向自右而左的书写方式。相当于：top → bottom，right → left。
* vertical-lr：垂直方向自上而下，水平方向从左到右的书写方式。相当于：top → bottom，left → right。
* sideways-lr（只有火狐支持）：内容垂直方向从下到上，从左到右换行的书写方式。相当于：常规书写形式整个逆时针旋转90°。
* sideways-rl（只有火狐支持）：内容垂直方向从上到下，从右到做换行的书写方式。相当于：常规书写形式整个顺时针旋转90°。

来看一个示例:

html代码如下:

```html
<section>
    <div class="writing-mode-1">几番风雨行，天意来晚晴。山河洗新面，人心然旧情。还羡鸿雁归，却叹故里梦。流水惟知急，岂知水草声？horizontal-tb</div>
    <div class="writing-mode-2">几番风雨行，天意来晚晴。山河洗新面，人心然旧情。还羡鸿雁归，却叹故里梦。流水惟知急，岂知水草声？vertical-rl</div>
    <div class="writing-mode-3">几番风雨行，天意来晚晴。山河洗新面，人心然旧情。还羡鸿雁归，却叹故里梦。流水惟知急，岂知水草声？vertical-lr</div>
    <div class="writing-mode-4">几番风雨行，天意来晚晴。山河洗新面，人心然旧情。还羡鸿雁归，却叹故里梦。流水惟知急，岂知水草声？sideways-lr</div>
    <div class="writing-mode-5">几番风雨行，天意来晚晴。山河洗新面，人心然旧情。还羡鸿雁归，却叹故里梦。流水惟知急，岂知水草声？sideways-rl</div>
</section>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
section {
    overflow: hidden;
}
@font-face {
    font-family: MZDFont;
    src: url('../fonts/MaoZeDong-CN.ttf');
}
section > div {
    margin: 10px;
    width: calc(33.333333% - 20px);
    height: 300px;
    background-color: #46413d;
    color: #ffffff;
    font-size: 24px;
    line-height: 1.6;
    float: left;
    font-family: MZDFont;
    padding: 10px;
    box-sizing: border-box;
}
.writing-mode-1 {
    writing-mode: horizontal-tb;
}
.writing-mode-2 {
    writing-mode: vertical-rl;
    /* 或者以下两种写法均可，但要注意兼容性 */
    /* writing-mode: tb; */
    /* writing-mode: tb-rl; */
}
.writing-mode-3 {
    writing-mode: vertical-lr;
}
.writing-mode-4 {
    /*Firefox浏览器生效*/
    writing-mode: sideways-lr;
}
.writing-mode-5 {
    /*firefox浏览器生效*/
    writing-mode: sideways-rl;
}
```

以上[示例](./docs/css/html/css-code-4-19.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-19.html"></iframe>

运行在火狐浏览器上，结果如下图所示:

<div class="image-container">
    <img src="./docs/css/html/images/css-write-mode-firefox.png" alt="图片4-3" title="图片4-3" >
    <span class="image-title">图 4-3 </span>
</div>

> 注:请使用火狐浏览器查看以上的示例效果，因为以上示例最后的.writing-mode-4与.writing-mode-5中设置的值仅在火狐浏览器中支持。 可前往[此处](http://www.firefox.com.cn/)下载火狐浏览器。

## 单行文本裁切“text-overflow”

该属性规定当文本溢出包含元素时进行的处理。该属性主要包含两个值：

* ellipsis：显示省略符号来代表被裁剪的文本。
* clip：裁剪文本。

不过该属性不能单独使用，要想完美实现它的功能要首先保证元素应该有一个宽度属性“width”（像素和百分比单位都可以），然后是必须要配合空格符和换行符处理属性“white-space”和内容溢出处理属性“overflow”来使用（该属性的常规使用见“CSS显示与定位”这章的“裁切显示属性‘overflow’”一节内容），且当前标签的宽度不大于带有“overflow”属性的父级元素的宽度，否则会达不到所期望的效果。

来看一个示例如下:

html代码如下:

```html
<article>
    <p class="text-overflow-inherit">你的晚安，是下意识的恻隐，我留至夜深，治疗失眠梦呓那封手写信，留在行李箱底来不及，赋予它旅途的意义，若一切都已云烟成雨。</p>
    <p class="text-overflow-ellipsis">你的晚安，是下意识的恻隐，我留至夜深，治疗失眠梦呓那封手写信，留在行李箱底来不及，赋予它旅途的意义，若一切都已云烟成雨。</p>
    <p class="text-overflow-clip">你的晚安，是下意识的恻隐，我留至夜深，治疗失眠梦呓那封手写信，留在行李箱底来不及，赋予它旅途的意义，若一切都已云烟成雨。</p>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
.text-overflow-inherit,.text-overflow-ellipsis,.text-overflow-clip{
    width: 800px;
    font: 20px "微软雅黑";
   
}
.text-overflow-inherit {
    text-overflow: inherit;
    white-space: nowrap;
    overflow: hidden;
}
.text-overflow-ellipsis{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.text-overflow-clip {
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
}
```

以上[示例](./docs/css/html/css-code-4-20.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-20.html"></iframe>

另外，文本缩进属性“text-indent”可能会让超出父级元素的“省略号”部分被裁切掉，所以，一般使用“text-overflow: ellipsis”这样的样式属性的时候最好不要带文本缩进的样式属性（如果是全局设置的文本缩进，可以将当前标签的“text-indent”属性的值通过更高权重的选择器设置为0或者initial来消除缩进）。

## 多行文本裁切“-webkit-line-clamp”

该属性的值为一个数字，表示保留几行后开始对文本进行裁切。从该属性的名称来看，它是一个非标准属性，甚至连W3C标准的草案阶段都没有进，但是却得到了各主流浏览器的兼容。不管是Edge还是Firefox这两个非Webkit内核的浏览器竟然都能够使用这个“-webkit-”属性前缀的裁切属性，这种各浏览器都向Webkit内核看齐的行动是以往难得一见的，但是IE由于架构的缺陷，全系列都不支持该属性。

但由于是非标准属性，要让其生效条件会比“text-overflow: ellipsis”更复杂一点，接下来我们就来看看要让这个属性生效会涉及到的全部属性吧。

* `-webkit-line-clam: number;`：实现多行文本裁切的主要属性。值为number(纯数字)，无单位，表示保留number行后开始对文本进行裁切。
* `overflow: hidden;`：对任何涉及内容溢出的处理它都是一个必要的属性，这里表示隐藏溢出部分。
* `text-overflow: ellipsis`：表示用省略号替代未能显示完整的部分。值可以为“clip”，但由于显示效果不明确所以不建议使用该值。
* `display: -webkit-box`：表示使用Webkit内核特殊的盒子模型。非Webkit内核的主流浏览器（Firefox和Edge）均能识别。
* `-webkit-box-orient: vertical`：表示Webkit内核盒子的伸展方向为“纵向”。非Webkit内核的主流浏览器（Firefox和Edge）均能识别。Firefox浏览器有自己的属性“-moz-box-orient”，但是在这里它两个前缀的属性都能用。

和“text-overflow: ellipsis”有所不同的是，该属性的优点是不受“text-indent”的影响，可以对多行文本进行裁切处理，相对来说更灵活；而缺点就是浏览器支持稍微差一点，而且必要的属性更多（“text-overflow”值为“ellipsis”的时候需要3个必要属性组合，而`-webkit-line-clamp: [number]`需要5个必要属性组合）。我们来看看它的运用吧。

html代码如下:

```html
<article>
    <section>
        <p>生也风雨，死也风雨，但有情深生死许。多情诚把心伤透，痴情却得不相守。不怨何如，怨又何如，人间只道情最苦。纵使数言欲先语，未料涕泪似水流。</p>
        <p>平生未会恋芬芳，才恋芬芳，便失芬芳。终日惶惶害相思，回首苦恨，盘如蛛网。天公不敢作月老，断了红线，拆了相逢。缘尽缘始终不知，记得初见，犹似庄梦。</p>
        <p>墨发眼媚一丹唇，曼姿弱影更动神。一见钟情不惊人。愿为芬芳敌风雪，何畏花意未有君。羞言无那隐于心。</p>
        <p>闻说伊言人易散，语罢更怜裙衩难。世间伉俪千千万，岂无一双并蒂莲？</p>
    </section>
</article>
```

css代码如下:

```css
@charset "utf-8";
* {
    margin: 0;
    padding: 0;
}
body,html {
    background-color: #c4c0c0;
    font: 32px "微软雅黑";
    height: 100%;
}
article {
    width: 960px;
    background-color: #ffffff;
    margin: 20px auto;
    overflow: hidden;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 2px 3px rgba(123,14,15,.3);
}
article p {
    text-indent: 2em;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
```

以上[示例](./docs/css/html/css-code-4-21.html)运行结果如下所示:

<iframe style="min-height:200px;" src="./docs/css/html/css-code-4-21.html"></iframe>