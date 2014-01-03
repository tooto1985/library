﻿/*
String.prototype.splitFirst(separator)          (擴充)將第一次出現的字串分割
String.prototype.toInt(hex)                     (擴充)將字串轉為數值
getCookie(name)                                 (一般)取得Cookie
isPageInIframe()                                (一般)判斷網頁是否在Iframe裡面
map(value, fromLow, fromHigh, toLow, toHigh)    (一般)將原區間的數值對應到新區間
queryString(name)                               (一般)取得查詢參數
setCookie(name, value, exdays)                  (一般)設定Cookie
*/
/*====================================================================================================
(擴充)將第一次出現的字串分割
ex: "one,tow,three".splitFirst(",")
out: [0]=one , [1]=tow,three
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