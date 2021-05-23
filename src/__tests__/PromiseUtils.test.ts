import PromiseUtils from "../lib/utils/PromiseUtils";

test("wait", async () => {
    const timestamp = new Date().getTime();
    await PromiseUtils.wait(250);

    const newTimestamp = new Date().getTime();
    expect(newTimestamp - timestamp).toBeGreaterThanOrEqual(200);
    expect(newTimestamp - timestamp).toBeLessThanOrEqual(300);
});