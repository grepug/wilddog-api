"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var util_1 = require("./libs/util");
var Relation = (function () {
    function Relation(options) {
        this.wilddog = options.wilddog;
        this.path = options.path;
        this.relationName = options.relationName;
        this.relationClassName = options.relationClassName;
        this.object = options.object;
    }
    Relation.prototype.add = function (objs) {
        var _this = this;
        var path = this.path.join('/');
        objs = util_1.toArray(objs);
        var promises = objs.map(function (obj) {
            var className = "_relation_" + obj.path[0] + "_" + _this.relationName;
            var key = obj.path[1];
            _this.object.save((_a = {}, _a[className] = [key], _a));
            var _a;
        });
        return Promise.all(promises);
    };
    Relation.prototype.remove = function (objs) {
        var path = this.path.join('/');
        objs = util_1.toArray(objs);
        return Promise.all();
    };
    Relation.prototype.query = function () {
        return new index_1.Query({
            wilddog: this.wilddog,
            path: this.path,
            relationClassName: this.relationClassName,
            relationName: this.relationName,
            isRelation: true
        });
    };
    return Relation;
}());
exports.Relation = Relation;
//# sourceMappingURL=relation.js.map