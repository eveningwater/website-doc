/**
 * 数字转换汉字大写
 * @constructor
 */
function NumberToChinese() {
    this.init.apply(this, arguments);
}
NumberToChinese.prototype = {
    init: function (values) {
        this.values = values.toString();
    },
    toUpper: function () {
        var str = this.values;
        var len = str.length - 1;
        var numberArr = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
        var num = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
            var pos = 0;
            if ($1[0] != '0') {
                pos = len - idx;
                if (idx == 0 && $1[0] == 1 && numberArr[len - idx] == '十') {
                    return numberArr[len - idx];
                }
                return num[$1[0]] + numberArr[len - idx];
            } else {
                var left = len - idx;
                var right = len - idx + $1.length;
                if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                    pos = left - left % 4;
                }
                if (pos) {
                    return numberArr[pos] + num[$1[0]];
                } else if (idx + $1.length >= len) {
                    return '';
                } else {
                    return num[$1[0]]
                }
            }
        });
    },
    toLower: function () {
        var str = this.values;
        var len = str.length - 1;
        var numberArr = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
        var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
            var pos = 0;
            if ($1[0] != '0') {
                pos = len - idx;
                if (idx == 0 && $1[0] == 1 && numberArr[len - idx] == '十') {
                    return numberArr[len - idx];
                }
                return num[$1[0]] + numberArr[len - idx];
            } else {
                var left = len - idx;
                var right = len - idx + $1.length;
                if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                    pos = left - left % 4;
                }
                if (pos) {
                    return numberArr[pos] + num[$1[0]];
                } else if (idx + $1.length >= len) {
                    return '';
                } else {
                    return num[$1[0]]
                }
            }
        });
    },
    convert: function () {
        var num = this.values;
        var strOutput = "";
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        num += "00";
        var intPos = num.indexOf('.');
        if (intPos >= 0)
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i = 0; i < num.length; i++)
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
        return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
    }
}