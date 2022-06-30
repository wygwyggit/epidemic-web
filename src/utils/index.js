const utils = {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = decodeURIComponent(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    mul(arg1, arg2) {
        let r1 = arg1.toString(),
            r2 = arg2.toString(),
            m,
            resultVal,
            d = arguments[2];
        m =
            (r1.split(".")[1] ? r1.split(".")[1].length : 0) +
            (r2.split(".")[1] ? r2.split(".")[1].length : 0);
        resultVal =
            (Number(r1.replace(".", "")) * Number(r2.replace(".", ""))) /
            Math.pow(10, m);
        return typeof d !== "number" ?
            Number(resultVal) :
            Number(resultVal.toFixed(parseInt(d)));
    }
}
export default utils