"use strict";
exports.__esModule = true;
function toArray(arr) {
    return Array.isArray(arr) ? arr : [arr];
}
exports.toArray = toArray;
function log(obj) {
    console.log(obj);
}
exports.log = log;
function warn(obj) {
    console.warn(obj);
}
exports.warn = warn;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isObject = isObject;
function getPath(str) {
    return str.replace(/^https\:\/\/[0-9a-z\.\-]+\.com\//, '').split('/');
}
exports.getPath = getPath;
function makePath(p) {
    return Array.isArray(p) ? p.join('/') : p;
}
exports.makePath = makePath;
function toPathArr(p) {
    return Array.isArray(p) ? p : p.split('/');
}
exports.toPathArr = toPathArr;
//# sourceMappingURL=util.js.map