/**
* 功能：用户注册数据有效性验证
**/
function _id(id) {
    return document.getElementById(id);
}
function _class(className) {
    return document.getElementsByClassName(className);
}
function _tag(tagName) {
    return document.getElementsByTagName(tagName);
}
/**
 * 页面功能构造函数
 * @param {*} options 
 */
function registerFunction(options) {
    this.init(options);
}
/**
 * 页面功能初始化
 * @param {*} options 
 */
registerFunction.prototype.init = function (options) {
    this.validate(options.validateProps, options.errorElement);
    this.reset(options);
    this.submit(options);
}
/**
 * 页面验证功能
 * @param {*} props 
 * @param {*} element 
 */
registerFunction.prototype.validate = function (props, element) {
    let _self = this;
    props.map(function (item, index) {
        item['el'].oninput = function () {
            if (this.id.indexOf('rePwd') > -1) {
                _self.setError(element[index], (item.rule.test(this.value) && this.value === props[2].el.value));
            } else {
                _self.setError(element[index], item.rule.test(this.value));
            }
        }
    });
}
/**
 * 设置错误信息
 * @param {*} el 
 * @param {*} bool 
 */
registerFunction.prototype.setError = function (el, bool) {
    return el.style.display = bool ? 'none' : 'block';
}
/**
 * 重置
 * @param {*} options 
 */
registerFunction.prototype.reset = function (options) {
    let _self = this;
    _id('reset').onclick = function () {
        for (let i = 0; i < options.errorElement.length; i++) {
            _self.setError(options.errorElement[i], true);
        }
    }
}
/**
 * 提交
 * @param {*} options 
 */
registerFunction.prototype.submit = function (options) {
    let isHref = true;
    _id("submit").onclick = function () {
        for (var i = 0; i < options.errorElement.length; i++) {
            let rsd = options.errorElement[i].style.display;
            if (rsd !== 'none')isHref = false;
        }
        if (isHref) {
            createPopBox('注册成功!');
        } else {
            createPopBox('<i>注册失败，请重新填写！</i>');
        }
    }
    function createPopBox(content) {
        let popBox = _class("popBox")[0],
            popBoxContent = _class("popBox-content")[0],
            main = _tag("main")[0];
        setTimeout(function () {
            main.classList.add("blur");
            popBox.style.display = "block";
            popBoxContent.innerHTML = content;
            _tag("span")[0].onclick = function () {
                //调用关闭函数
                closeFunction(main, popBox);
            }
        }, 1000)
    }
    function closeFunction(main, popBox) {
        setTimeout(function () {
            popBox.style.display = "none";
            main.classList.remove("blur");
        }, 1000);
    }
}
window.onload = function () {
    new registerFunction({
        errorElement: _tag('p'),
        validateProps: [
            {
                rule: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                el: _id("email")
            },
            {
                rule: /^\S{6,10}$/,
                el: _id("niceName")
            },
            {
                rule: /^\w{6,16}$/,
                el: _id("pwd")
            },
            {
                rule: /^\w{6,16}$/,
                el: _id("rePwd")
            },
            {
                rule: /^1\d{10}$/,
                el: _id("tel")
            },
            {
                rule: /^[1-9]{1,4}\-?\d{1,2}\-?\d{1,2}$/,
                el: _id("birthday")
            },
            {
                rule: /^[1-9]$/,
                el: _id("profession")
            },
            {
                rule: /^(http|ftp|https)?:\/\/+(w{3}\.)?\w+(\.com|\.cn)$/,
                el: _id("homepage")
            },
            {
                rule: /^\S{1,100}$/,
                el: _id("describe")
            }
        ]
    })
}