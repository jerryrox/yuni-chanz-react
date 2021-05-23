"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var PromiseUtils_1 = require("../lib/utils/PromiseUtils");
var BaseViewModel_1 = require("../lib/viewmodels/BaseViewModel");
var TestVM = /** @class */ (function (_super) {
    __extends(TestVM, _super);
    function TestVM() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onShowCount = 0;
        _this.onHideCount = 0;
        return _this;
    }
    TestVM.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onShowCount++;
                        return [4 /*yield*/, PromiseUtils_1["default"].wait(250)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TestVM.prototype.onHide = function () {
        this.onHideCount++;
    };
    return TestVM;
}(BaseViewModel_1["default"]));
test("Initialization and disposal is successful when ideally used", function () { return __awaiter(void 0, void 0, void 0, function () {
    var model, promise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = new TestVM();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(0);
                expect(model.onHideCount).toBe(0);
                promise = model.onMount();
                expect(model.isInitializing.value).toBe(true);
                expect(model.isActive.value).toBe(true);
                expect(model.onShowCount).toBe(1);
                expect(model.onHideCount).toBe(0);
                return [4 /*yield*/, promise];
            case 1:
                _a.sent();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(true);
                expect(model.onShowCount).toBe(1);
                expect(model.onHideCount).toBe(0);
                model.onUnmount();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(1);
                expect(model.onHideCount).toBe(1);
                return [2 /*return*/];
        }
    });
}); });
test("Dispose shouldn't function when not initializing nor active.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var model;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = new TestVM();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(0);
                expect(model.onHideCount).toBe(0);
                model.onUnmount();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(0);
                expect(model.onHideCount).toBe(0);
                return [4 /*yield*/, model.onMount()];
            case 1:
                _a.sent();
                model.onUnmount();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(1);
                expect(model.onHideCount).toBe(1);
                model.onUnmount();
                expect(model.isInitializing.value).toBe(false);
                expect(model.isActive.value).toBe(false);
                expect(model.onShowCount).toBe(1);
                expect(model.onHideCount).toBe(1);
                return [2 /*return*/];
        }
    });
}); });
test("Initialize shouldn't function when active or initializing", function () {
    var model = new TestVM();
    model.onMount();
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);
    model.onMount();
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);
});
test("Initializing state shouldn't be set to false when a new initialize() call was made during onShow() processing.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var model, falsifiedCount, promise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = new TestVM();
                falsifiedCount = 0;
                model.isInitializing.bind(function (value) {
                    if (!value) {
                        falsifiedCount++;
                    }
                }, false);
                model.onMount();
                return [4 /*yield*/, PromiseUtils_1["default"].wait(50)];
            case 1:
                _a.sent();
                expect(model.onShowCount).toBe(1);
                expect(model.isInitializing.value).toBe(true);
                expect(falsifiedCount).toBe(0);
                model.onUnmount();
                expect(model.onHideCount).toBe(1);
                expect(model.isInitializing.value).toBe(false);
                expect(falsifiedCount).toBe(1);
                promise = model.onMount();
                expect(model.onShowCount).toBe(2);
                expect(falsifiedCount).toBe(1);
                return [4 /*yield*/, promise];
            case 2:
                _a.sent();
                expect(falsifiedCount).toBe(2);
                return [2 /*return*/];
        }
    });
}); });
test("Response is resolved when ideally used", function () { return __awaiter(void 0, void 0, void 0, function () {
    var model, promise, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                model = new TestVM();
                promise = model.expectResponse();
                PromiseUtils_1["default"].wait(250).then(function () { return model.resolveResponse(true); });
                return [4 /*yield*/, promise];
            case 1:
                response = _a.sent();
                expect(response).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test("Dispose will throw when there's a pending response request", function () {
    var model = new TestVM();
    model.onMount();
    model.expectResponse();
    expect(function () {
        model.onUnmount();
    }).toThrow();
});
test("Expecting response multiple times without resolving before each will throw", function () {
    var model = new TestVM();
    model.onMount();
    model.expectResponse();
    expect(function () {
        model.expectResponse();
    }).toThrow();
});
