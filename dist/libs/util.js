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
//# sourceMappingURL=util.js.map