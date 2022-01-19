/**
 * 定义休眠函数
 * @param {number} msTime 休眠时间，毫秒
 */
export const sleep = msTime => {
    return new Promise((resolve) => {
        setTimeout(resolve, msTime);
    });
};

//截图小数点后几位
export const getBit = (value, num = 2) => {
    if (value == 0 || value == '0' || value == '0.00' || value == undefined || value == null) return 0;
    if (!value) return 0;
    let reg = 2;
    if (num == 2) {
        reg = /([0-9]+\.[0-9]{2})[0-9]*/;
    }
    if (num == 4) {
        reg = /([0-9]+\.[0-9]{4})[0-9]*/;
    }
    if (num == 6) {
        reg = /([0-9]+\.[0-9]{6})[0-9]*/;
    }
    let str = value.toString();
    str = str.replace(reg, "$1");
    return Number(str).toFixed(num);
}