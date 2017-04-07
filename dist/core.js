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
var wilddog = require("wilddog");
var index_1 = require("./index");
var util_1 = require("./libs/util");
var WilddogApi = (function (_super) {
    __extends(WilddogApi, _super);
    function WilddogApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WilddogApi.prototype.init = function (config) {
        this.wilddog = wilddog.initializeApp(config);
        this.sync = this.wilddog.sync();
        return this;
    };
    WilddogApi.prototype.Query = function (path) {
        return new index_1.Query({ path: path });
    };
    WilddogApi.prototype.Object = function (path) {
        return new index_1.WdObject({ ref: this.sync.ref(util_1.makePath(path)) });
    };
    return WilddogApi;
}(index_1.Wilddog));
exports.WilddogApi = WilddogApi;
//# sourceMappingURL=core.js.map