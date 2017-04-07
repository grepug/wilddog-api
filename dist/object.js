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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var index_1 = require("./index");
var util_1 = require("./libs/util");
var _ = require("lodash");
var WdObject = (function (_super) {
    __extends(WdObject, _super);
    function WdObject(options) {
        var _this = _super.call(this) || this;
        _this.val = options.val;
        _this.path = options.ref ? util_1.getPath(options.ref.toString()) : options.path;
        _this.ref = options.ref ? options.ref : _this.sync.ref(util_1.makePath(_this.path));
        return _this;
    }
    WdObject.prototype.set = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = this.setCreatedAndUpdated(obj);
                        return [4 /*yield*/, this.ref.set(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    WdObject.prototype.get = function (key) {
        return new index_1.Query({ path: this.path }).get(key);
    };
    WdObject.prototype.push = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = this.setCreatedAndUpdated(obj);
                        return [4 /*yield*/, this.ref.push(obj)];
                    case 1:
                        ref = _a.sent();
                        return [2 /*return*/, new WdObject({ ref: ref })];
                }
            });
        });
    };
    WdObject.prototype.save = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.path.length === 2) {
                            _.extend(obj, {
                                updatedAt: new Date().getTime()
                            });
                        }
                        return [4 /*yield*/, this.ref.update(obj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    WdObject.prototype.child = function (childPath) {
        var childPathStr = util_1.makePath(childPath);
        return new WdObject({ ref: this.ref.child(childPathStr) });
    };
    WdObject.prototype.relation = function (relationClassName, relationName) {
        return new index_1.Relation({
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
}(index_1.Wilddog));
exports.WdObject = WdObject;
//# sourceMappingURL=object.js.map