"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var WdObject = (function () {
    function WdObject(path, val, wilddog) {
        this.path = path;
        this.pathStr = path.join('/');
        this.val = val;
        this.wilddog = wilddog;
    }
    WdObject.prototype.set = function () {
    };
    WdObject.prototype.get = function (key) {
        return this.val[key];
    };
    WdObject.prototype.save = function (obj) {
        return this.wilddog.sync.ref(this.pathStr).update(obj);
    };
    WdObject.prototype.remove = function () {
        return this.wilddog.sync.ref(this.pathStr).remove();
    };
    WdObject.prototype.relation = function (relationClassName, relationName) {
        return new index_1.Relation({
            wilddog: this.wilddog,
            path: this.path,
            relationName: relationName,
            relationClassName: relationClassName,
            object: this
        });
    };
    return WdObject;
}());
exports.WdObject = WdObject;
//# sourceMappingURL=object.js.map