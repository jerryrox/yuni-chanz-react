"use strict";
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
var react_router_dom_1 = require("react-router-dom");
var DependencyContainer_1 = require("../lib/dependencies/DependencyContainer");
var Navigation_1 = require("../lib/navigations/Navigation");
var DependencyContext_1 = require("../lib/dependencies/DependencyContext");
var react_2 = require("@testing-library/react");
var NavigationService_1 = require("../lib/navigations/NavigationService");
var react_3 = require("react");
var UseQueryParams_1 = require("../lib/navigations/UseQueryParams");
var TestChild = function (_a) {
    var onPathParam = _a.onPathParam, onQueryParam = _a.onQueryParam;
    var pathParam = react_router_dom_1.useParams();
    var queryParam = UseQueryParams_1["default"]();
    react_3.useEffect(function () {
        onPathParam(pathParam);
    }, [pathParam]); // eslint-disable-line
    react_3.useEffect(function () {
        onQueryParam(queryParam);
    }, [queryParam]); // eslint-disable-line
    return (<div>Lolz</div>);
};
exports["default"] = TestChild;
var TestComponent = function (_a) {
    var path = _a.path, children = _a.children;
    return (<react_router_dom_1.MemoryRouter initialEntries={[path]}>
            <NavigationService_1["default"] />
            <react_router_dom_1.Switch>
                <react_router_dom_1.Route exact path="/">{children}</react_router_dom_1.Route>
                <react_router_dom_1.Route path="/:id">{children}</react_router_dom_1.Route>
            </react_router_dom_1.Switch>
        </react_router_dom_1.MemoryRouter>);
};
var navigation = new Navigation_1["default"]();
var container = new DependencyContainer_1["default"]({
    navigation: navigation
});
container.initialize();
afterEach(function () {
    navigation.setHistory(null);
});
test("History is properly injected to Navigation", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect(navigation.getHistory()).toBeNull();
        react_2.render(<DependencyContext_1["default"].Provider value={container.contextValue}>
            <TestComponent path="/"/>
        </DependencyContext_1["default"].Provider>);
        expect(navigation.getHistory()).not.toBeNull();
        return [2 /*return*/];
    });
}); });
test("Params are properly injected to Navigation", function () { return __awaiter(void 0, void 0, void 0, function () {
    var pathParam, queryParam, onPathParam, onQueryParam;
    return __generator(this, function (_a) {
        pathParam = null;
        queryParam = null;
        onPathParam = function (value) {
            pathParam = value;
        };
        onQueryParam = function (value) {
            queryParam = value;
        };
        expect(navigation.getHistory()).toBeNull();
        expect(pathParam).toBeNull();
        expect(queryParam).toBeNull();
        react_2.render(<DependencyContext_1["default"].Provider value={container.contextValue}>
            <TestComponent path="/1234567890?x=1&y=a">
                <TestChild onPathParam={onPathParam} onQueryParam={onQueryParam}/>
            </TestComponent>
        </DependencyContext_1["default"].Provider>);
        expect(navigation.getHistory()).not.toBeNull();
        expect(pathParam).toMatchObject({
            id: "1234567890"
        });
        expect(queryParam.get("x")).toMatch("1");
        expect(queryParam.get("y")).toMatch("a");
        return [2 /*return*/];
    });
}); });
