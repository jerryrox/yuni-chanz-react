import MathUtils from "../lib/utils/MathUtils";

test("MathUtils.clamp", () => {
    expect(MathUtils.clamp(0, 1, 2)).toBe(1);
    expect(MathUtils.clamp(3, 1, 2)).toBe(2);
    expect(MathUtils.clamp(1, 1, 2)).toBe(1);
    expect(MathUtils.clamp(2, 1, 2)).toBe(2);
    expect(MathUtils.clamp(1.2, 1, 2)).toBeCloseTo(1.2);
});

test("MathUtils.parseHexToInt", () => {
    expect(MathUtils.parseHexToInt("8")).toBe(8);
    expect(MathUtils.parseHexToInt("a")).toBe(10);
    expect(MathUtils.parseHexToInt("ff")).toBe(255);
    expect(MathUtils.parseHexToInt("zxcv")).toBe(0);
});

test("MathUtils.lerp", () => {
    expect(MathUtils.lerp(0, 100, 0)).toBeCloseTo(0);
    expect(MathUtils.lerp(0, 100, 1)).toBeCloseTo(100);
    expect(MathUtils.lerp(0, 100, 0.25)).toBeCloseTo(25);
    expect(MathUtils.lerp(0, 100, -1)).toBeCloseTo(-100);
    expect(MathUtils.lerp(0, 100, 2)).toBeCloseTo(200);
});

test("MathUtils.inverseLerp", () => {
    expect(MathUtils.inverseLerp(0, 100, 0)).toBeCloseTo(0);
    expect(MathUtils.inverseLerp(0, 100, 100)).toBeCloseTo(1);
    expect(MathUtils.inverseLerp(0, 100, 25)).toBeCloseTo(0.25);
    expect(MathUtils.inverseLerp(0, 100, -100)).toBeCloseTo(-1);
    expect(MathUtils.inverseLerp(0, 100, 200)).toBeCloseTo(2);
});