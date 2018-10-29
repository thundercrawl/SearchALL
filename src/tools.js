export default {
    /**
     * 删除数组元素
     * @param arr
     * @param val
     */
    removeArrayItemByValue: function(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    },
    /**
     * 判断空字符串
     * @param str
     * @returns {Boolean}
     */
    isEmpty: function(str) {
        if (str == null || str == '' || str == undefined || str.length == 0) {
            return true;
        }
        return false;
    },
    isNotEmpty: function(str) {
        return !this.isEmpty(str);
    },
    /**
     * 验证数字
     * @param number
     * @returns {Boolean}
     */
    isNumber: function(number) {
        if (isNaN(number)) {
            return false;
        }
        return true;
    },
    /**
     * 判断是否是数组
     * @param arr
     * @returns {arg is Array<any>}
     */
    isArray: function(arr) {
        return Array.isArray(arr);
    },
    /**
     * 验证手机号
     * @param mobileNo
     * @returns {Boolean}
     */
    isMobileNo: function(mobileNo) {
        var reg = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[07][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        if (!reg.test(mobileNo)) {
            return false;
        }
        return true;
    },

    /**
     * 验证邮箱
     * @param email
     */
    isMail: function(email) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!reg.test(email)) {
            return false;
        }
        return true;
    }
}

/** trim() method for String */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 定义Map类型
 */
function Map() {
    this.container = new Object();
}
/**
 * Map put方法
 */
Map.prototype.put = function(key, value) {
        if (this.containsKey(key)) {
            delete this.container[key];
        }
        this.container[key] = value;
    }
    /**
     * Map get方法
     */
Map.prototype.get = function(key) {
        return this.container[key];
    }
    /**
     * Map key集合
     */
Map.prototype.keySet = function() {
        var keyset = new Array();
        var count = 0;
        for (var key in this.container) {
            // 跳过object的extend函数
            if (key == 'extend') {
                continue;
            }
            keyset[count] = key;
            count++;
        }
        return keyset;
    }
    /**
     * Map tostring
     */
Map.prototype.size = function() {
    var count = 0;
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        count++;
    }
    return count;
}

Map.prototype.remove = function(key) {
    delete this.container[key];
}

Map.prototype.clear = function() {
    for (var key in this.container) {
        // 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        delete this.container[key];
    }
}

Map.prototype.containsKey = function(key) {
    var bln = false;
    try {
        for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
            if (keys[i] == key) {
                bln = true;
            }
        }
    } catch (e) {
        bln = false;
    }
    return bln;
}

Map.prototype.toString = function() {
    var str = "";
    for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
        str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
    }
    return str;
}