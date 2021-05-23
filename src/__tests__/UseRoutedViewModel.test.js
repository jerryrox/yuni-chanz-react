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
var react_1 = require("react");
var DependencyContainer_1 = require("../lib/dependencies/DependencyContainer");
var DependencyContext_1 = require("../lib/dependencies/DependencyContext");
var react_2 = require("@testing-library/react");
var test_utils_1 = require("react-dom/test-utils");
var PromiseUtils_1 = require("../lib/utils/PromiseUtils");
var RoutedViewModel_1 = require("../lib/viewmodels/RoutedViewModel");
var react_router_dom_1 = require("react-router-dom");
var Navigation_1 = require("../lib/navigations/Navigation");
var UseRoutedViewModel_1 = require("../lib/viewmodels/UseRoutedViewModel");
var TestRoutedVM = /** @class */ (function (_super) {
    __extends(TestRoutedVM, _super);
    function TestRoutedVM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestRoutedVM.prototype, "routePath", {
        get: function () {
            return "/test/:id";
        },
        enumerable: false,
        configurable: true
    });
    TestRoutedVM.prototype.onShow = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    TestRoutedVM.prototype.onHide = function () { };
    TestRoutedVM.prototype.onRouteParams = function (pathParam, queryParam) {
        this.pathParam = pathParam;
        this.queryParam = queryParam;
    };
    return TestRoutedVM;
}(RoutedViewModel_1["default"]));
var TestRoutedView = function () {
    UseRoutedViewModel_1["default"](TestRoutedVM);
    return (<div />);
};
var TestRoutedParent = function (_a) {
    var contextValue = _a.contextValue, model = _a.model, onHistory = _a.onHistory;
    return (<DependencyContext_1["default"].Provider value={contextValue}>
            <react_router_dom_1.MemoryRouter>
                <react_router_dom_1.Switch>
                    <react_router_dom_1.Route path={model.routePath}>
                        <TestRoutedView />
                    </react_router_dom_1.Route>
                    <react_router_dom_1.Route path="*" render={function (_a) {
            var history = _a.history;
            onHistory(history);
            return null;
        }}/>
                </react_router_dom_1.Switch>
            </react_router_dom_1.MemoryRouter>
        </DependencyContext_1["default"].Provider>);
};
test("Route params are correctly injected.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var navigation, model, container, history;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                navigation = new Navigation_1["default"]();
                model = new TestRoutedVM();
                container = new DependencyContainer_1["default"]({
                    model: model
                });
                container.initialize();
                history = null;
                react_2.render(<TestRoutedParent contextValue={container.contextValue} model={model} onHistory={function (h) {
                        history = h;
                        navigation.setHistory(h);
                    }}/>);
                expect(model.isActive.value).toBe(false);
                expect(model.pathParam).toBeUndefined();
                expect(model.queryParam).toBeUndefined();
                test_utils_1.act(function () {
                    navigation.pushPath("/test/asdf");
                });
                expect(history.location.pathname).toBe("/test/asdf");
                return [4 /*yield*/, PromiseUtils_1["default"].wait(300)];
            case 1:
                _e.sent();
                expect(model.isActive.value).toBe(true);
                expect(model.pathParam).toMatchObject({
                    id: "asdf"
                });
                expect((_a = model.queryParam) === null || _a === void 0 ? void 0 : _a.keys().next().done).toBe(true);
                history.push("/hiding/path");
                return [4 /*yield*/, PromiseUtils_1["default"].wait(50)];
            case 2:
                _e.sent();
                expect(model.isActive.value).toBe(false);
                expect(model.pathParam).toMatchObject({
                    id: "asdf"
                });
                expect((_b = model.queryParam) === null || _b === void 0 ? void 0 : _b.keys().next().done).toBe(true);
                test_utils_1.act(function () {
                    navigation.pushPath("/test/asdf2", {
                        search: "hi",
                        age: "1"
                    });
                });
                return [4 /*yield*/, PromiseUtils_1["default"].wait(300)];
            case 3:
                _e.sent();
                expect(model.isActive.value).toBe(true);
                expect(model.pathParam).toMatchObject({
                    id: "asdf2"
                });
                expect((_c = model.queryParam) === null || _c === void 0 ? void 0 : _c.get("search")).toBe("hi");
                expect((_d = model.queryParam) === null || _d === void 0 ? void 0 : _d.get("age")).toBe("1");
                return [2 /*return*/];
        }
    });
}); });
test("Route params are updated while the view is active.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var navigation, model, container, history;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                navigation = new Navigation_1["default"]();
                model = new TestRoutedVM();
                container = new DependencyContainer_1["default"]({
                    model: model
                });
                container.initialize();
                history = null;
                react_2.render(<TestRoutedParent contextValue={container.contextValue} model={model} onHistory={function (h) {
                        history = h;
                        navigation.setHistory(h);
                    }}/>);
                history.push("/hmm?name=nope");
                return [4 /*yield*/, PromiseUtils_1["default"].wait(50)];
            case 1:
                _c.sent();
                expect(model.pathParam).toBeUndefined();
                expect(model.queryParam).toBeUndefined();
                test_utils_1.act(function () {
                    navigation.pushPath("/test/a");
                });
                return [4 /*yield*/, PromiseUtils_1["default"].wait(300)];
            case 2:
                _c.sent();
                expect(model.pathParam).toMatchObject({
                    id: "a"
                });
                expect((_a = model.queryParam) === null || _a === void 0 ? void 0 : _a.keys().next().done).toBe(true);
                expect(model.isActive.value).toBe(true);
                expect(model.isInitializing.value).toBe(false);
                history.push("/test/b?name=lol");
                expect(model.isActive.value).toBe(true);
                expect(model.isInitializing.value).toBe(false);
                return [4 /*yield*/, PromiseUtils_1["default"].wait(50)];
            case 3:
                _c.sent();
                expect(model.pathParam).toMatchObject({
                    id: "b"
                });
                expect((_b = model.queryParam) === null || _b === void 0 ? void 0 : _b.get("name")).toBe("lol");
                return [2 /*return*/];
        }
    });
}); });
