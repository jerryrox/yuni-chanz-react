import PathUtils from "../lib/utils/PathUtils";

test("PathUtils.combineNonNull", () => {
    expect(PathUtils.combineNonNull([])).toBe("");
    expect(PathUtils.combineNonNull([], "/", "1")).toBe("1");
    expect(PathUtils.combineNonNull([], "/", "1", "2")).toBe("12");
    expect(PathUtils.combineNonNull(["a", "", "b", null, undefined, "c"], ".", "/", "|")).toBe("/a.b.c|");
});