"use strict";
exports.__esModule = true;
var MathUtils_1 = require("../lib/utils/MathUtils");
test("MathUtils.clamp", function () {
    expect(MathUtils_1["default"].clamp(0, 1, 2)).toBe(1);
    expect(MathUtils_1["default"].clamp(3, 1, 2)).toBe(2);
    expect(MathUtils_1["default"].clamp(1, 1, 2)).toBe(1);
    expect(MathUtils_1["default"].clamp(2, 1, 2)).toBe(2);
    expect(MathUtils_1["default"].clamp(1.2, 1, 2)).toBeCloseTo(1.2);
});
test("MathUtils.parseHexToInt", function () {
    expect(MathUtils_1["default"].parseHexToInt("8")).toBe(8);
    expect(MathUtils_1["default"].parseHexToInt("a")).toBe(10);
    expect(MathUtils_1["default"].parseHexToInt("ff")).toBe(255);
    expect(MathUtils_1["default"].parseHexToInt("zxcv")).toBe(0);
});
test("MathUtils.lerp", function () {
    expect(MathUtils_1["default"].lerp(0, 100, 0)).toBeCloseTo(0);
    expect(MathUtils_1["default"].lerp(0, 100, 1)).toBeCloseTo(100);
    expect(MathUtils_1["default"].lerp(0, 100, 0.25)).toBeCloseTo(25);
    expect(MathUtils_1["default"].lerp(0, 100, -1)).toBeCloseTo(-100);
    expect(MathUtils_1["default"].lerp(0, 100, 2)).toBeCloseTo(200);
});
test("MathUtils.inverseLerp", function () {
    expect(MathUtils_1["default"].inverseLerp(0, 100, 0)).toBeCloseTo(0);
    expect(MathUtils_1["default"].inverseLerp(0, 100, 100)).toBeCloseTo(1);
    expect(MathUtils_1["default"].inverseLerp(0, 100, 25)).toBeCloseTo(0.25);
    expect(MathUtils_1["default"].inverseLerp(0, 100, -100)).toBeCloseTo(-1);
    expect(MathUtils_1["default"].inverseLerp(0, 100, 200)).toBeCloseTo(2);
});
