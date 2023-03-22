# mini-compiler的实现

## 什么是compiler

compiler译为编译器，顾名思义就是编译的意思。比如说你写了一门语言，那么如果计算机不支持你写的语言的语法，那么你就需要为你的语言写一个编译器，用来将你写的语言编译为计算机能够识别的语言。

所有语言都会有编译器，比如java有自己的编译器（javac.exe），javascript也有v8引擎编译，等等，可以这么说，任何程序代码都离不开编译。

## 编译器的组成

不论编译器是编译什么语言，编译器最基本的构成都是如此，分为三个部分，第一个部分词法、语法分析，第二部分转换词法语法为你需要执行的符合某种语言代码的特定的数据结构（这种数据结构我们也可以称之为**抽象语法树（Abstract Syntax Tree）**），第三部分则是将转换后的数据结构生成一种特定的代码。这三个部分专有名词如下所示:

> parser -> transform -> code generate

任何编译器的构建都离不开这三个基础部分，可以这么说这就是一个通用的模板。以js代码为例，一个编译器的基本模板结构伪代码如下所示:

```js
function parser(input){
    //词法分析，最终转换成编译的数据结构
}
function transform(tokens){
    //将第一部分分析出来的数据结构转换成特定的数据结构，如javascript这里就是转换成DOM树数据结构
}
function generate(ast){
    //将第二部分转换的ast树转换成特定的代码，如javascript这里就是一段字符串
}
```

## 实现一个mini版本的compiler

接下来，让我们按照如上的三个步骤来一起实现一个简易版本的编译器。首先，我们需要确定一下我们应该将**什么**转换成**什么**。例如，在LISP语言中，实现一个2+(4 - 2)的表达式会是如下写法:

```LISP
(add 2 (subtract 4 2))
```

而我们要转换成C语言中的语法，应该就是如下所示:

```C
add(2,subtract(4,2))
```

不过，我们这里不会实现如上的转换，我们要实现的是将一段模板字符串转换成正确的HTML字符串。比如:

```js
`<div @click="onHandler">`
```

在经过我们编译器编译之后，应该是如下所示:

```js
`<div onclick="onHandler">`
```

好的，让我们来开始编写代码吧!

### parser阶段

让我们开始第一个阶段的分析吧。

#### 词法分析

首先我们需要知道，我们第一步是词法分析，实际上也就是将需要转换的模板字符串生成一种列表数据结构。类似的数据结构应该如下所示:

```js
[
    { type:"tagSymbol",value:"<" },
    { type:"word",value:"div" },
    { type:"symbol",value:"@" },
    { type:"word",value:"click" },
    { type:"symbol",value:"=" },
    { type:"word",value:"onHandler" },
    { type:"tagSymbol",value:">" }
]
```

看了以上的数据结构，是不是觉得要生成这个数据结构十分简单，不就是写一个循环，然后遍历添加到数组当中去就可以了吗？是的，没错，第一部分就是这么干的。但是这步操作我们给它取一个高大上档次的名次，tokenizer,如下所示:

```js
function tokenizer(input){
    let current = 0;
    let tokens = [];

    while(current < input.length){
        //接下来，不外乎就是边界情况的判断
        let char = input[current];
        //匹配开始标签
        if(char === "<"){
            tokens.push({ type:"tagSymbol",value:char });
            current++;
            continue;
        }
        //如果是空白字符则跳过
        const whitespaceRegExp = /\s/;
        if(whitespaceRegExp.test(char)){
            current++;
            continue;
        }
        // 匹配字母
        const letterRegExp = /[a-zA-Z]/;
        if(letterRegExp.test(char)){
            let value = '';
            while(letterRegExp.test(char)){
                value += char;
                char = input[++current];
            }
            tokens.push({ type:"word",value });
            continue;
        }
        if(char === "@" || char === "="){
            tokens.push({ type:"symbol",value:char });
            current++;
            continue;
        }
        // 匹配字符串
        if(char === '"'){
            let value = '';
            char = input[++current];
            while (char !== '"') {
              value += char;
              char = input[++current];
            }
            char = input[++current];
            tokens.push({ type: 'word', value });
            continue;
        }
        if(char === ">"){
            tokens.push({ type:"tagSymbol",value:char });
            current++;
            continue;
        }
        //如果还匹配到其它字符，则抛出异常
        throw new Error("我不知道这个字符是什么:" + char);
    }

    return tokens;
}
```

#### 抽象语法树

第一步词法分析我们已经完成了，实际上就是将一种特定语法的字符串转换成一个一维数组，下一步，我们需要将这个数据结构转换成一种树，这个树有一个专业名词，叫做抽象语法树(Abstract Syntax Tree)。我们转换的抽象语法树应该类似如下这样:

```js
{
    type:"root",
    children:[
        {
            type:"tag",
            value:"div",
            event:[
                {
                    type:"click",
                    value:"onHandler"
                }
            ]
        }
    ]
}
```

根据以上的数据结构，其实我们就应该知道所谓的抽象语法树，其实就是一种深度嵌套对象的数据结构。那么我们如何来实现这样的一个转换呢？

#### 解析抽象语法树

观察以上的抽象语法树的数据结构，我们要将一维数组转换成以上的抽象语法树，实际上也比较简单，我们为它取一个名字，叫做parser。思路同词法分析，下面让我们来看看吧!

```js
function parser(tokens) {
    let current = 0;
    function walk() {
        let token = tokens[current];
        if (token.type === 'word' && tokens[current - 1].value === '=') {
            current++;
            return {
                type:tokens[current - 3].value,
                value:token.value
            }
        }
        if (token.type === 'tagSymbol' && token.value === '<') {
            token = tokens[++current];
            let node = {
                type: "tag",
                value: token.value,
                event: []
            }
            token = tokens[++current];
            while (token.type !== 'tagSymbol' || (token.type === 'tagSymbol' && token.value !== '>')) {
                if(token.type === 'symbol' || (token.type === 'word' && tokens[current - 1].value === '@')){
                    token = tokens[++current];
                    continue;
                }
                node.event.push(walk());
                token = tokens[current];
            }
            current++;
            return node;
        }
        throw new TypeError(token.type);
    }
    let ast = {
        type: "root",
        children: []
    };
    while (current < tokens.length) {
        ast.children.push(walk());
    }
    return ast;
}
```

实际上从将输入的代码到转换成抽象语法树这一过程的分析都属于词法分析阶段，接下来才是第二步，让我们来看一下吧。

### transform 转换

#### traverse

经过我们第一步的分析，我们已经得到了我们自己的抽象语法树，然后我们就进入了第二步，转换阶段，实际上转换阶段也包含了3个步骤。如果我们将解析出来的抽象语法树每一个对象都可以看做是一个ast节点，那么我们应该知道对于一个节点，我们可以实现添加节点，删除或者更新节点。也就是说我们可以基于解析出来的节点生成新的节点，或者更新该节点都是可以的。每一个AST节点都会有一个根节点，不同的编译器定义的属性和值也有所不同，而我们这里定义的是如下所示:

```js
{
    type:"root",//根节点
    children:[] //子节点
}
```

试想一下，如果我们想要观察一下不同的AST节点，我们应该如何做?

我们可以通过创建一个观察者对象，然后再观察者对象根据节点的key属性创建对应的方法，这些方法对应2个节点，第一个是当前节点，第二个则是新节点。所以我们创建一个方法，叫做traverse方法。如下所示:

```js
function traverse(ast,visitor){
    /**
     *  循环去遍历
     */
    function traverseArray(array,parent){
        array.forEach(child => traverseNode(child,parent));
    }
    function traverseNode(node,parent){
        let methods = visitor[node.type];
        //创建入口
        if(methods && methods.enter){
            methods.enter(node,parent);
        }
        switch(node.type){
            case "root":
                traverseArray(node.children,node);
                break;
            case "tag":
                traverseArray(node.event,node);
                break;
            case "click":
                break;
            default:
                throw new TypeError(node.type);
        }
        // 创建出口
        if(methods && methods.exit){
            methods.exit(node,parent);
        }
    }
    //从根节点开始，根节点无需对比，所以是null
    traverseNode(ast,null);
}
```

接下来才是我们真正的转换函数，叫做transformer,我们将在transformer过程中存储一次原本的AST节点，并生成一个新的AST节点。

#### transformer 

之所以再做一次转换，是因为我们如果是从一种语言编译到另一种语言，那么你此时的转换就是必须的，必须生成符合你想要编译的语言的AST树，我们这里举的例子虽然可以省略这一步，但实际过程我们还是不能省略，因为会有很多边界情况需要考虑。如下所示:

```js
function transformer(ast) {
    let newAst = {
        type: "root",
        children: []
    };
    ast._context = newAst.children;
    //与观察者做对比
    traverse(ast, {
        click:{
            enter(node,parent){
               parent._context.push({
                   type:"onclick",
                   value:node.value
               })
            }
        },
        tag: {
            enter(node, parent) {
                let DOMNode = {
                    type: "element",
                    defineTag: {
                        type: "tagName",
                        value: node.value
                    },
                    methods: []
                }
                node._context = DOMNode.methods;
                if (DOMNode.type !== 'tag') {
                    DOMNode = {
                        type: "node",
                        value: DOMNode
                    }
                }
                parent._context.push(DOMNode);
            }
        }
    });
    return newAst;
}
```

现在我们已经生成了一个新的AST树，它的结构应该是如下所示:

```js
{
    type: "root",
    children: [
        {
            type:"node",
            value:{
                type:"element",
                defineTag:{
                    type:"tagName",
                    value:"div"
                },
                methods:[
                    {
                        type:"onclick",
                        value:"handler"
                    }
                ]
            }
        }
    ]
}
```

接下来，也就是最后一步，将新的AST树转换成新的字符串，这样一个简易的编译器我们就算是完成了。思考一下，我们应该如何去转换成新的字符串呢？其实也很简单，就是通过递归去进行转换。

### codeGenerator

我们要将最新的AST树转换成新的字符串，也就是根据AST树的type来进行转换，然后根据需要通过递归来转换。如下所示:

```js
function codeGenerator(node){
    switch(node.type){
        case "root":
            return node.children.map(codeGenerator).join("\n");
        case "node":
            return codeGenerator(node.value) + "\n";
        case "element":
            return "<" + node.defineTag.value + " " + node.methods.map(codeGenerator) + ">";
        case "onclick":
            return node.type + '="' + node.value + '"';
        default:
            throw new TypeError(node.type);
    }
}
```

当我们将新的AST数据传递给`codeGenerator`方法，则会生成最后的结果，即:

```js
`<div onclick="onHandler">`
```

### compiler方法

现在，我们将创建一个`compiler`方法，将这四个方法组合起来，即:

```js
function compiler(input){
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    return output;
}
```

如此一来，我们最终的mini编译器就写完了，我们来看一下最终代码。

### 最终代码

如此一来我们的编译器最终代码如下所示:

```js
function tokenizer(input){
    let current = 0;
    let tokens = [];

    while(current < input.length){
        //接下来，不外乎就是边界情况的判断
        let char = input[current];
        //匹配开始标签
        if(char === "<"){
            tokens.push({ type:"tagSymbol",value:char });
            current++;
            continue;
        }
        //如果是空白字符则跳过
        const whitespaceRegExp = /\s/;
        if(whitespaceRegExp.test(char)){
            current++;
            continue;
        }
        // 匹配字母
        const letterRegExp = /[a-zA-Z]/;
        if(letterRegExp.test(char)){
            let value = '';
            while(letterRegExp.test(char)){
                value += char;
                char = input[++current];
            }
            tokens.push({ type:"word",value });
            continue;
        }
        if(char === "@" || char === "="){
            tokens.push({ type:"symbol",value:char });
            current++;
            continue;
        }
        // 匹配字符串
        if(char === '"'){
            let value = '';
            char = input[++current];
            while (char !== '"') {
              value += char;
              char = input[++current];
            }
            char = input[++current];
            tokens.push({ type: 'word', value });
            continue;
        }
        if(char === ">"){
            tokens.push({ type:"tagSymbol",value:char });
            current++;
            continue;
        }
        //如果还匹配到其它字符，则抛出异常
        throw new Error("我不知道这个字符是什么:" + char);
    }

    return tokens;
}
function parser(tokens) {
    let current = 0;
    function walk() {
        let token = tokens[current];
        if (token.type === 'word' && tokens[current - 1].value === '=') {
            current++;
            return {
                type:tokens[current - 3].value,
                value:token.value
            }
        }
        if (token.type === 'tagSymbol' && token.value === '<') {
            token = tokens[++current];
            let node = {
                type: "tag",
                value: token.value,
                event: []
            }
            token = tokens[++current];
            while (token.type !== 'tagSymbol' || (token.type === 'tagSymbol' && token.value !== '>')) {
                if(token.type === 'symbol' || (token.type === 'word' && tokens[current - 1].value === '@')){
                    token = tokens[++current];
                    continue;
                }
                node.event.push(walk());
                token = tokens[current];
            }
            current++;
            return node;
        }
        throw new TypeError(token.type);
    }
    let ast = {
        type: "root",
        children: []
    };
    while (current < tokens.length) {
        ast.children.push(walk());
    }
    return ast;
}
function traverse(ast,visitor){
    /**
     *  循环去遍历
     */
    function traverseArray(array,parent){
        array.forEach(child => traverseNode(child,parent));
    }
    function traverseNode(node,parent){
        let methods = visitor[node.type];
        //创建入口
        if(methods && methods.enter){
            methods.enter(node,parent);
        }
        switch(node.type){
            case "root":
                traverseArray(node.children,node);
                break;
            case "tag":
                traverseArray(node.event,node);
                break;
            case "click":
                break;
            default:
                throw new TypeError(node.type);
        }
        // 创建出口
        if(methods && methods.exit){
            methods.exit(node,parent);
        }
    }
    //从根节点开始，根节点无需对比，所以是null
    traverseNode(ast,null);
}
function transformer(ast) {
    let newAst = {
        type: "root",
        children: []
    };
    ast._context = newAst.children;
    //与观察者做对比
    traverse(ast, {
        click:{
            enter(node,parent){
               parent._context.push({
                   type:"onclick",
                   value:node.value
               })
            }
        },
        tag: {
            enter(node, parent) {
                let DOMNode = {
                    type: "element",
                    defineTag: {
                        type: "tagName",
                        value: node.value
                    },
                    methods: []
                }
                node._context = DOMNode.methods;
                if (DOMNode.type !== 'tag') {
                    DOMNode = {
                        type: "node",
                        value: DOMNode
                    }
                }
                parent._context.push(DOMNode);
            }
        }
    });
    return newAst;
}
function codeGenerator(node){
    switch(node.type){
        case "root":
            return node.children.map(codeGenerator).join("\n");
        case "node":
            return codeGenerator(node.value) + "\n";
        case "element":
            return "<" + node.defineTag.value + " " + node.methods.map(codeGenerator) + ">";
        case "onclick":
            return node.type + '="' + node.value + '"';
        default:
            throw new TypeError(node.type);
    }
}
function compiler(input){
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    return output;
}
```