/*
Array.prototype.filter(function)                (擴充)陣列過濾(IE8以下沒有)
String.prototype.endsWith(suffix)               (擴充)尋找字串尾端是否包含文字
String.prototype.format(year, month, day)       (擴充)取代字串中的格式項目
String.prototype.splitFirst(separator)          (擴充)將第一次出現的字串分割
String.prototype.splitLast(separator)           (擴充)將最後一次出現的字串分割
String.prototype.toInt(hex)                     (擴充)將字串轉為數值
String.format(src)                              (一般)取代字串中的格式項目
formatNumber(str)                               (一般)數字格式
getCookie(name)                                 (一般)取得Cookie
isPageInIframe()                                (一般)判斷網頁是否在Iframe裡面
map(value, fromLow, fromHigh, toLow, toHigh)    (一般)將原區間的數值對應到新區間
newGuid(template)                               (一般)產生隨機16進位字串
queryString(name)                               (一般)取得查詢參數
setCookie(name, value, exdays)                  (一般)設定Cookie
*/

/*====================================================================================================
(擴充)陣列過濾(IE8以下沒有)
ex:  [1,2,3].filter(function(a) { return a>1 })
out: [2,3]
*/

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }
        return res;
    };
}

/*====================================================================================================
(擴充)尋找字串尾端是否包含文字
ex: "onetwothree".endsWith("three") , "onetwothree".endsWith("two")
out: true , false
*/

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/*====================================================================================================
(擴充)取代字串中的格式項目
ex: "{0}年{1}月{2}日".format(2014,4,2)
out: 2014年4月2日
*/

String.prototype.format = function() {
    if (arguments.length < 1) return this;
    var args = Array.prototype.slice.call(arguments, 0);
    args.splice(0, 0, this);
    return String.format.apply(null, args);
};

/*====================================================================================================
(擴充)將第一次出現的字串分割
ex: "one,two,three".splitFirst(",")
out: [0]=one , [1]=two,three
*/

String.prototype.splitFirst = function (separator) {
    var si = this.split(separator);
    var sb = "";
    for (var i = 1, max = si.length; i < max; i++) {
        if (sb != "") {
            sb += separator;
        }
        sb += si[i];
    }
    var output = [];
    output.push(si[0]);
    if (sb != "") {
        output.push(sb);
    }
    return output;
};

/*====================================================================================================
(擴充)將最後一次出現的字串分割
ex: "one,two,three".splitLast(",")
out: [0]=one,two , [1]=three
*/

String.prototype.splitLast = function (separator) {
    var si = this.split(separator);
    var sb = "";
    var max = si.length;
    for (var i = 0; i < max; i++) {
        if (i < max-1) {
            sb += si[i];
            if (i < max-2) {
                sb += separator;
            }
        }
    }
    var output = [];
    if (sb != "") {
        output.push(sb);
    }
    output.push(si[max-1]);
    return output;
};

/*====================================================================================================
(擴充)將字串轉為數值
ex: "5214".toInt() , "1101".toInt(2) , "FF".toInt(16)
out: 5214 , 13 , 255
*/

String.prototype.toInt = function (hex) {
    if (hex === undefined) {
        hex = 10;
    }
    return parseInt(this, hex);
};

/*====================================================================================================
(一般)取代字串中的格式項目
ex: String.format("{0}年{1}月{2}日",2014,4,2)
out: 2014年4月2日
*/

String.format = function(src) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (args.length < 1) return src;
    return src.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i] || "{" + i + "}";
    });
};

/*====================================================================================================
(一般)數字格式
ex: formatNumber("2010203")
out: "2,010,203"
*/

function formatNumber(str) {
	if(str.length <= 3){
		return str;
	} else {
		return formatNumber(str.substr(0,str.length-3))+','+str.substr(str.length-3);
	}
}

/*====================================================================================================
(一般)取得Cookie
ex: getCookie("mycookie")
out: "mycookiecontent"
*/

function getCookie(name) {
    var i, x, y, aRRcookies = document.cookie.split(";");
    for (i = 0; i < aRRcookies.length; i++) {
        x = aRRcookies[i].substr(0, aRRcookies[i].indexOf("="));
        y = aRRcookies[i].substr(aRRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        }
    }
    return undefined;
}

/*====================================================================================================
(一般)判斷網頁是否在Iframe裡面
ex: isPageInIframe()
out: true / false
*/

function isPageInIframe() {
    var par = typeof(window.parent) != 'undefined' ? window.parent : null;
    if (par && par != window) {
        return true;
    }
    return false;
}

/*====================================================================================================
(一般)將原區間的數值對應到新區間
ex: map(127,0,255,0,1000)
out: 498.03921568627453
*/

function map(value, fromLow, fromHigh, toLow, toHigh) {
    var a = (fromHigh - fromLow) / (value - fromLow);
    if (a === Infinity || value === fromLow) {
        return toLow;
    }
    return ((toHigh - toLow) / ((fromHigh - fromLow) / (value - fromLow))) + toLow;
}

/*====================================================================================================
(一般)產生隨機16進位字串
ex: newGuid() , newGuid("xxxx-xxxx")
out: c1762ddd-b6b2-3b5c-0483-7d2d2830262b , 6b6a-1cf1
*/

function newGuid(template) {
	return (template ||"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").replace(/[x]/g,function(x) {
		return (Math.random()*16 | 0).toString(16);
	});
}

/*====================================================================================================
(一般)取得查詢參數
ex: queryString("username")
out: tommy
*/

function queryString(name) {
    var allVars = window.location.search.substring(1);
    var keyvalue = allVars.split("&");
    for (var i = 0; i < keyvalue.length; i++) {
        var key = keyvalue[i].split("=");
        if (key[0] == name) return key[1];
    }
    return "";
}

/*====================================================================================================
(一般)設定Cookie
ex: setCookie("mycookie","mycookiecontent",365)
out: 
*/

function setCookie(name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cvalue = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = name + "=" + cvalue;
}