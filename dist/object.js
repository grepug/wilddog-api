"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var util_1 = require("./libs/util");
var _ = require("lodash");
var WdObject = (function () {
    function WdObject(options) {
        this.val = options.val;
        this.wilddog = options.wilddog;
        this.path = options.ref ? util_1.getPath(options.ref.toString()) : options.path;
        this.ref = options.ref ? options.ref : this.wilddog.sync.ref(this.path.join('/'));
    }
    WdObject.prototype.set = function (obj) {
        var _this = this;
        obj = this.setCreatedAndUpdated(obj);
        return this.ref.set(obj)
            .then(function () { return Promise.resolve(_this); });
    };
    WdObject.prototype.get = function (key) {
        return new index_1.Query({ path: this.path, wilddog: this.wilddog }).get(key);
    };
    WdObject.prototype.push = function (obj) {
        var _this = this;
        obj = this.setCreatedAndUpdated(obj);
        return this.ref.push(obj)
            .then(function (ref) { return Promise.resolve(new WdObject({ ref: ref, wilddog: _this.wilddog })); });
    };
    WdObject.prototype.save = function (obj) {
        var _this = this;
        if (this.path.length === 2) {
            _.extend(obj, {
                updatedAt: new Date().getTime()
            });
        }
        return this.ref.update(obj)
            .then(function () { return Promise.resolve(_this); });
    };
    WdObject.prototype.remove = function () {
        return this.ref.remove();
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
    WdObject.prototype.key = function () {
        return this.ref.key();
    };
    WdObject.prototype.setCreatedAndUpdated = function (obj) {
        if (this.path.length === 1) {
            return _.extend(obj, {
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
            });
        }
        return obj;
    };
    return WdObject;
}());
exports.WdObject = WdObject;
//# sourceMappingURL=object.js.map