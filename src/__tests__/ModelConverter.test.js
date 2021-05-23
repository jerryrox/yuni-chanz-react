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
exports.__esModule = true;
var ModelConverter_1 = require("../lib/data/ModelConverter");
var TestConverter = /** @class */ (function (_super) {
    __extends(TestConverter, _super);
    function TestConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestConverter.prototype.toModel = function (data) {
        var _a, _b, _c, _d, _e;
        return {
            name: (_a = this.decodeString(data.name)) !== null && _a !== void 0 ? _a : "DefaultName",
            age: (_b = this.decodeInt(data.age)) !== null && _b !== void 0 ? _b : 100,
            weight: (_c = this.decodeFloat(data.weight)) !== null && _c !== void 0 ? _c : 100,
            dob: (_d = this.decodeDate(data.dob)) !== null && _d !== void 0 ? _d : new Date(2020, 1, 0),
            isMale: (_e = this.decodeBool(data.isMale)) !== null && _e !== void 0 ? _e : false
        };
    };
    TestConverter.prototype.toPlain = function (model) {
        return {
            name: model.name,
            age: model.age,
            weight: model.weight,
            dob: model.dob.getTime(),
            isMale: model.isMale
        };
    };
    return TestConverter;
}(ModelConverter_1["default"]));
test("Model conversion", function () {
    var converter = new TestConverter();
    var model = converter.toModel({});
    expect(model.name).toBe("DefaultName");
    expect(model.age).toBe(100);
    expect(model.weight).toBe(100);
    expect(model.dob.getTime()).toBe(new Date(2020, 1, 0).getTime());
    expect(model.isMale).toBe(false);
    var plain = converter.toPlain({
        name: "Lol",
        age: 20,
        weight: 50,
        dob: new Date(2000, 1, 0),
        isMale: true
    });
    expect(plain.name).toBe("Lol");
    expect(plain.age).toBe(20);
    expect(plain.weight).toBe(50);
    expect(plain.dob).toBe(new Date(2000, 1, 0).getTime());
    expect(plain.isMale).toBe(true);
});
test("Data decode functions", function () {
    var _a, _b;
    var converter = new TestConverter();
    expect(converter.decodeString(undefined)).toBe(null);
    expect(converter.decodeString(null)).toBe(null);
    expect(converter.decodeString("zxcv")).toBe("zxcv");
    expect(converter.decodeString(10)).toBe("10");
    expect(converter.decodeBool(undefined)).toBe(null);
    expect(converter.decodeBool(null)).toBe(null);
    expect(converter.decodeBool(1)).toBe(null);
    expect(converter.decodeBool("tRuE")).toBe(true);
    expect(converter.decodeBool(true)).toBe(true);
    expect(converter.decodeInt(undefined)).toBe(null);
    expect(converter.decodeInt(null)).toBe(null);
    expect(converter.decodeInt("lolz")).toBe(null);
    expect(converter.decodeInt(1)).toBe(1);
    expect(converter.decodeInt("1")).toBe(1);
    expect(converter.decodeInt("ff", 16)).toBe(255);
    expect(converter.decodeFloat(undefined)).toBe(null);
    expect(converter.decodeFloat(null)).toBe(null);
    expect(converter.decodeFloat("lolz")).toBe(null);
    expect(converter.decodeFloat(1.5)).toBeCloseTo(1.5);
    expect(converter.decodeFloat("1.5")).toBeCloseTo(1.5);
    expect(converter.decodeDate(undefined)).toBe(null);
    expect(converter.decodeDate(null)).toBe(null);
    expect(converter.decodeDate("lolz")).toBe(null);
    expect((_a = converter.decodeDate(1.5)) === null || _a === void 0 ? void 0 : _a.getTime()).toBeCloseTo(new Date(1.5).getTime());
    expect((_b = converter.decodeDate("2020-01-01")) === null || _b === void 0 ? void 0 : _b.getTime()).toBeCloseTo(new Date("2020-01-01").getTime());
});
