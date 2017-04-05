"use strict";
exports.__esModule = true;
var wilddog = require("wilddog");
var index_1 = require("./index");
var WilddogApi = (function () {
    function WilddogApi(config) {
        this.config = config;
    }
    WilddogApi.prototype.init = function () {
        this.wilddog = wilddog.initializeApp(this.config);
        this.sync = this.wilddog.sync();
        return this;
    };
    WilddogApi.prototype.Query = function (path) {
        return new index_1.Query({ path: path, wilddog: this });
    };
    WilddogApi.prototype.Object = function (path) {
        return new index_1.WdObject(path, null, this);
    };
    return WilddogApi;
}());
exports.WilddogApi = WilddogApi;
//# sourceMappingURL=core.js.map