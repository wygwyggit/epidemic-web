/**
 * @description cookie methods
 * @author wyg
 */
const isObject = function (val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function setCookie(name, value, options = {}) {
    if (!name || !value) return
    let days = 30,
        exp = new Date(),
        optArr = []
    if (!isObject(options) || !("expires" in options)) {
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
        optArr.push(`expires=${exp.toGMTString()}`)
    }
    if (isObject) {
        if (typeof options.expires === 'number') {
            exp.setDate(exp.getDate() + options.expires);
            options.expires = exp.toGMTString();
        }
        Object.keys(options).map(key => {
            optArr.push(`${key}=${options[key]}`)
        })
    }
    document.cookie = `${name}=${escape(value)};${optArr.join(";")}`
}

function getCookie(name) {
    let arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    return null
}
// 删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
const cookie = {
    getCookie,
    setCookie,
    delCookie
}
export default cookie