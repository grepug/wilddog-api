"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var index_1 = require("./index");
var util_1 = require("./libs/util");
var Relation = (function (_super) {
    __extends(Relation, _super);
    function Relation(options) {
        var _this = _super.call(this) || this;
        _this.path = options.path;
        _this.relationName = options.relationName;
        _this.relationClassName = options.relationClassName;
        _this.object = options.object;
        return _this;
    }
    Relation.prototype.add = function (objs) {
        var _this = this;
        objs = util_1.toArray(objs);
        var promises = objs.map(function (obj) {
            console.log(obj);
            var className = "_relation_" + obj.path[0] + "_" + _this.relationName;
            var key = obj.path[1];
            return _this.object.child([className]).push(key);
        });
        return Promise.all(promises);
    };
    Relation.prototype.remove = function (objs) {
        objs = util_1.toArray(objs);
        return Promise.all();
    };
    Relation.prototype.query = function () {
        return this.Query({
            path: this.path,
            relationClassName: this.relationClassName,
            relationName: this.relationName,
            isRelation: true
        });
    };
    return Relation;
}(index_1.WilddogApi));
exports.Relation = Relation;
//# sourceMappingURL=relation.js.map