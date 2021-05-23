"use strict";
exports.__esModule = true;
var PathUtils_1 = require("../lib/utils/PathUtils");
test("PathUtils.combineNonNull", function () {
    expect(PathUtils_1["default"].combineNonNull([])).toBe("");
    expect(PathUtils_1["default"].combineNonNull([], "/", "1")).toBe("1");
    expect(PathUtils_1["default"].combineNonNull([], "/", "1", "2")).toBe("12");
    expect(PathUtils_1["default"].combineNonNull(["a", "", "b", null, undefined, "c"], ".", "/", "|")).toBe("/a.b.c|");
});
