"use strict";
exports.__esModule = true;
var wilddog = require("wilddog");
var index_1 = require("./index");
var WilddogApi = (function () {
    function WilddogApi() {
    }
    WilddogApi.prototype.init = function (config) {
        this.app = wilddog.initializeApp(config);
        this.sync = this.app.sync();
        return this;
    };
    WilddogApi.prototype.Query = function (queryOptions) {
        console.log(this);
        return this.checkIfInited() && new index_1.Query(queryOptions, this);
    };
    WilddogApi.prototype.Object = function (objOptions) {
        if (!this.checkIfInited())
            return;
        if (typeof objOptions === 'string' || Array.isArray(objOptions)) {
            return new index_1.WdObject({ path: objOptions }, this);
        }
        return new index_1.WdObject(objOptions, this);
    };
    WilddogApi.prototype.checkIfInited = function () {
        if (!this.app) {
            console.error('not initialized!');
            return false;
        }
        return true;
    };
    return WilddogApi;
}());
exports.WilddogApi = WilddogApi;
//# sourceMappingURL=core.js.map