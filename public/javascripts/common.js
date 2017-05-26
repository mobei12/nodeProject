//系统参数
var SYSTEM = {};
SYSTEM.HOST= 'http://localhost:3000';

/**
 * 重写 jQuery post 方法
 * @param url
 * @param data
 * @param callback
 * @param type
 * @returns {*}
 */
jQuery["post"] = function(url, data, callback, type) {
    url = SYSTEM.HOST + url;
    console.log(url)
    type = type || "json";
    if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
    }
    return jQuery.ajax({
        type: "post",
        url: url,
        data: data,
        success: callback,
        dataType: type
    });
};

/**
 * 重写jQuery get方法
 * @param url
 * @param callback
 * @param type
 * @returns {*}
 */
jQuery["get"] = function(url, callback, type) {
    url =url ;
    type = type || "json";
    return jQuery.ajax({
        type: "get",
        url: url,
        success: callback,
        dataType: type
    });
};

/*** 服务错误统一处理 ***/
$.ajaxSetup({cache: false,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        // 登入超时
        if (XMLHttpRequest.status == "401") {
            console.log("网络异常");
        } else {
            if(XMLHttpRequest.responseText){
                console.log("服务器异常");
            }
        }
    }
});
//秒转化时分秒
function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
// alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
// alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    var result = ""+parseInt(theTime);
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+":"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+":"+result;
    }
    return result;
}
// 时间戳转时间
function _formatDate(timespan) {
    var now = new Date(timespan);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    if(minute < 10){
        minute = "0" + minute;
    }
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute;
}

//把规定的时间格式转化为时间戳，时间格式如：'2017-05-20 23:59:59'
function _getUnixTime(dateStr)
{
    var newstr = dateStr.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str;
}
//把时间戳转化为规定的时间格式，时间格式如：'2017-05-20'
function _getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().substr(0,10)
}
//获取当前的时间戳，获取的时间戳是把毫秒改成000显示
function _getTimestamp(){
    return Date.parse(new Date());
}
"common" in window || (window.common = {}), "util" in common || (common.util = {});
/**** 通用工具类 ****/
common.util.CommonUtil = {
    "getUUID": function(prefix) {
        var guid = (+new Date()).toString(32),
            i = 0;
        for (; i < 5; i++) {
            guid += Math.floor(Math.random() * 65535).toString(32);
        }
        return (prefix || '') + guid + (new Date().getTime()).toString(32);
    },
    "isEmptyObject": function(obj) {

        for (var name in obj) {
            return false;
        }
        return true;
    }
}

/**** 排序类 ****/
common.util.Sort = {
    /**
     * @param array 需要排序的数组
     * @param rule 排序的规则（desc为降序；asce为升序）
     */
    "arraySort": function(array, rule) {
        if (typeof array !== 'Array') {
            throw ('common.util.Sort.arraySort() array not is Array');
        }
        array.sort(function(a, b) {
            var before = -1,
                back = 1;
            if (rule === ('desc' || 'DESC')) {
                before = 1;
                back = -1;
            }
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? before : back;
            }
            return typeof a < typeof b ? -1 : 1;
        });
        return array;
    },

    /**
     * @param array 要排序的对象数组
     * @param key   根据某一列的键值排序
     * @param rule 排序的规则（desc为降序；asce为升序）
     */
    "objArraySort": function(array, key, rule) {
        var by = function(key) {
            var before = -1,
                back = 1;
            if (rule === ('desc' || 'DESC')) {
                before = 1;
                back = -1;
            }
            return function(o, p) {
                if (typeof o === 'object' && typeof p === 'object' && o && p) {
                    a = o[key];
                    b = p[key];
                    if (a === b) {
                        return 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? before : back;
                    }
                    return typeof a < typeof b ? -1 : 1;
                } else {
                    throw {
                        name: 'Error',
                        message: 'Expected on object when sorting by' + key
                    };
                }
            }
        }

        array.sort(by(key));
        return array;
    }
}
/**
 * 日期工具类
 * @type {{DATE_TIME: number, HOUR_TIME: number, MINUTES_TIME: number, parseDate: "parseDate", format: "format", getDiffTime: "getDiffTime"}}
 */
common.util.DateUtils = {
    "DATE_TIME": 60 * 60 * 24, // 一天秒数
    "HOUR_TIME": 60 * 60, // 一小时秒数
    "MINUTES_TIME": 60, // 一分钟秒数
    /**
     * 字符串转日期对象
     * @param dateStr
     * @returns {*}
     */
    "parseDate": function(dateStr) { // 将字符串转为Date对象
        var dateTime = null;
        if (/(\d{4}).*?(\d{2}).*?(\d{2}).*?(\d{2}).*?(\d{2}).*?(\d{2})/.test(dateStr)) { // yyyyMMddHHmmss
            dateTime = new Date(RegExp.$1, (RegExp.$2 * 1 - 1), RegExp.$3, RegExp.$4 * 1, RegExp.$5 * 1, RegExp.$6 * 1);
        } else if (/(\d{4}).*?(\d{2}).*?(\d{2}).*?(\d{2}).*?(\d{2})/.test(dateStr)) { // yyyyMMddHHmm
            dateTime = new Date(RegExp.$1, (RegExp.$2 * 1 - 1), RegExp.$3, RegExp.$4 * 1, RegExp.$5 * 1);
        } else if (/(\d{4}).*?(\d{2}).*?(\d{2}).*?(\d{2})/.test(dateStr)) { // yyyyMMddHH
            dateTime = new Date(RegExp.$1, (RegExp.$2 * 1 - 1), RegExp.$3, RegExp.$4 * 1);
        } else if (/(\d{4}).*?(\d{2}).*?(\d{2})/.test(dateStr)) { // yyyyMMdd
            dateTime = new Date(RegExp.$1, (RegExp.$2 * 1 - 1), RegExp.$3);
        }
        return dateTime;
    },
    /**
     * 将日期对象格式化为i指定格式的字符串
     * @param date
     * @param format
     * @returns {string}
     */
    "format": function(date, format) {
        format = format || "yyyy-MM-dd";
        if ($.type(date) == "string") {
            date = common.util.DateUtils.parseDate(date);
        }
        format = format.replace("yyyy", date.getFullYear()).replace("MM", (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1));
        format = format.replace("dd", date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        format = format.replace("HH", date.getHours() < 10 ? "0" + date.getHours() : date.getHours());
        format = format.replace("mm", date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
        format = format.replace("ss", date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        return format;
    },
    /***
     * 获取时间差
     * @param current
     * @param end
     * @param opts
     * @returns {"dates" : dates,"hours" : hours,"minutes" : minutes,"seconds" : difTime}
     */
    "getDiffTime": function(current, end, opts) { // 获取时间差 , 返回时间差额对象
        var options = {
            "isFormat": true
        };
        options = $.extend(true, {}, options, opts);
        if ($.type(end) != "date") {
            if ($.type(end) != "string") {
                return {};
            }
            end = common.util.DateUtils.parseDate(end);
        }
        if ($.type(current) != "date") {
            if ($.type(current) != "string") {
                return {};
            }
            current = common.util.DateUtils.parseDate(current);
        }
        var difTime = (end.getTime() - current.getTime()) / 1000;
        var dates = 0,
            hours = 0,
            minutes = 0;
        if (difTime > 0) {
            if (difTime > common.util.DateUtils.DATE_TIME) {
                dates = Math.floor(difTime / common.util.DateUtils.DATE_TIME);
                difTime = difTime - dates * common.util.DateUtils.DATE_TIME;
                if (options.isFormat) {
                    dates = dates < 10 ? "0" + dates : dates;
                }
            }
            if (difTime > common.util.DateUtils.HOUR_TIME) {
                hours = Math.floor(difTime / common.util.DateUtils.HOUR_TIME);
                difTime = difTime - hours * common.util.DateUtils.HOUR_TIME;
                if (options.isFormat) {
                    hours = hours < 10 ? "0" + hours : hours;
                }
            }
            if (difTime > common.util.DateUtils.MINUTES_TIME) {
                minutes = Math.floor(difTime / common.util.DateUtils.MINUTES_TIME);
                difTime = difTime - minutes * common.util.DateUtils.MINUTES_TIME;
                if (options.isFormat) {
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                }
            }
            difTime = Math.floor(difTime);
            if (options.isFormat) {
                difTime = difTime < 10 ? "0" + difTime : difTime;
            }
        }
        return {
            "dates": dates,
            "hours": hours,
            "minutes": minutes,
            "seconds": difTime
        };
    },
    /**
     * 日期计算
     * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
     * @param num int
     * @param date Date 日期对象
     * @return Date 返回日期对象
     */
    "getDateAdd": function(strInterval, num, date) {
        date = arguments[2] || new Date();
        if ($.type(date) != "date") {
            if ($.type(date) != "string") {
                return;
            }
            date = common.util.DateUtils.parseDate(date);
        }
        switch (strInterval) {
            case 's':
                return new Date(date.getTime() + (1000 * num));
            case 'n':
                return new Date(date.getTime() + (60000 * num));
            case 'h':
                return new Date(date.getTime() + (3600000 * num));
            case 'd':
                return new Date(date.getTime() + (86400000 * num));
            case 'w':
                return new Date(date.getTime() + ((86400000 * 7) * num));
            case 'm':
                return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
            case 'y':
                return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        }
    },
    /**
     * 日期对象转换为毫秒数
     * @param date
     * @returns {int}
     */
    "getDateToLong": function(date) {
        if ($.type(date) != "date") {
            if ($.type(date) != "string") {
                return;
            }
            date = common.util.DateUtils.parseDate(date);
        }
        return date.getTime();
    }
};

common.util.FormUtil = {
    /**
     * json数组读写有两种方式
     * 1: a.bs[0].id
     * 2: a["bs"][0]["id"]
     * 把表单转换成json数据格式
     */
    formToJsonString: function(form) {
        var jsonObject = {};
        for (i = 0, max = form.elements.length; i < max; i++) {
            e = form.elements[i];
            em = new Array();
            if (e.type == 'select-multiple') {
                for (j = 0; j < e.options.length; j++) {
                    op = e.options[j];
                    if (op.selected) {
                        em[em.length] = op.value;
                    }
                }
            }
            switch (e.type) {
                case 'checkbox':
                case 'radio':
                    if (!e.checked) {
                        break;
                    }
                case 'hidden':
                case 'password':
                case 'select-one':
                case 'select-multiple':
                case 'textarea':
                case 'text':
                    if (e.name == "") {
                        break;
                    }
                    eName = e.name;
                    //eValue = e.value.replace(new RegExp('(["\\\\])', 'g'), '\\$1');
                    eValue = e.value;
                    //判断是否是对象类型数据
                    if (eName.indexOf('.') > 0) {
                        dotIndex = eName.indexOf('.');
                        parentName = eName.substring(0, dotIndex);
                        childName = eName.substring(dotIndex + 1);
                        //迭代判断eName，组装成json数据结构
                        this.iterJsonObject(jsonObject, parentName, childName, eValue);
                    } else {
                        jsonObject[eName] = eValue;
                    }
                    break;
                case 'button':
                case 'file':
                case 'image':
                case 'reset':
                case 'submit':
                default:
            }
        }
        return JSON.stringify(jsonObject);
    },
    formToJsonObject: function(form) {
        var jsonObject = {};
        for (i = 0, max = form.elements.length; i < max; i++) {
            e = form.elements[i];
            em = new Array();
            if (e.type == 'select-multiple') {
                for (j = 0; j < e.options.length; j++) {
                    op = e.options[j];
                    if (op.selected) {
                        em[em.length] = op.value;
                    }
                }
            }
            switch (e.type) {
                case 'checkbox':
                case 'radio':
                    if (!e.checked) {
                        break;
                    }
                case 'hidden':
                case 'password':
                case 'select-one':
                case 'select-multiple':
                case 'textarea':
                case 'text':
                    eName = e.name;
                    //eValue = e.value.replace(new RegExp('(["\\\\])', 'g'), '\\$1');
                    eValue = e.value;
                    //判断是否是对象类型数据
                    if (eName.indexOf('.') > 0) {
                        dotIndex = eName.indexOf('.');
                        parentName = eName.substring(0, dotIndex);
                        childName = eName.substring(dotIndex + 1);
                        //迭代判断eName，组装成json数据结构
                        this.iterJsonObject(jsonObject, parentName, childName, eValue);
                    } else {
                        jsonObject[eName] = eValue;
                    }
                    break;
                case 'button':
                case 'file':
                case 'image':
                case 'reset':
                case 'submit':
                default:
            }
        }
        return jsonObject;
    },
    /**
     * 把表单元素迭代转换成json数据
     */
    iterJsonObject: function(jsonObject, parentName, childName, eValue) {
        //pArrayIndex用于判断元素是否是数组标示
        pArrayIndex = parentName.indexOf('[');
        //判断是否集合数据，不是则只是对象属性
        if (pArrayIndex < 0) {
            var child = jsonObject[parentName];
            if (!child) {
                jsonObject[parentName] = {};
            }
            dotIndex = childName.indexOf('.');
            if (dotIndex > 0) {
                this.iterJsonObject(jsonObject[parentName], childName.substring(0, dotIndex), childName.substring(dotIndex + 1), eValue);
            } else {
                jsonObject[parentName][childName] = eValue;
            }
        } else {
            pArray = jsonObject[parentName.substring(0, pArrayIndex)];
            //若不存在js数组，则初始化一个数组类型
            if (!pArray) {
                jsonObject[parentName.substring(0, pArrayIndex)] = new Array();
            }
            //取得集合下标，并判断对应下标是否存在js对象
            arrayIndex = parentName.substring(pArrayIndex + 1, parentName.length - 1);
            var c = jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex];
            if (!c) {
                jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex] = {};
            }
            dotIndex = childName.indexOf('.');
            if (dotIndex > 0) {
                this.iterJsonObject(jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex], childName.substring(0, dotIndex), childName.substring(dotIndex + 1), eValue);
            } else {
                jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex][childName] = eValue;
            }
        }
    }
}

/*** Cookie操作 ***/
"common" in window || (window.common = {}) , "cookie" in common || (common.cookie = {});
common.cookie = {
    "setCookie":function(name,value,options){

        common.cookie.delCookie(name);
        var defautOpt = {expires:30};
        options = $.extend(defautOpt, options);
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        var date =  new Date();

        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = ';expires=' + date.toGMTString();
        }
        if(options.domain){
            document.cookie = name + "="+ encodeURIComponent (value) + ";expires=" + date.toGMTString() + ";path=/;domain="+options.domain;
        }else{
            document.cookie = name + "="+ encodeURIComponent (value) + ";expires=" + date.toGMTString() + ";path=/;";
        }
    },
    "getCookie":function(name){
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookieStr = jQuery.trim(cookies[i]);
                var reg = new RegExp("^"+name+"=|/$","ig");
                if(reg.test(cookieStr)){
                    cookieValue = decodeURIComponent(cookieStr.replace(reg,""));
                }
            }
        }
        return cookieValue;
    },
    "delCookie":function(name,options){
        options = options || {};
        var path = options.path ? '; path=' + (options.path) : '/';
        document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" + path;
    }
}




