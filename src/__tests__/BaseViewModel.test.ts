import PromiseUtils from "../lib/utils/PromiseUtils";
import BaseViewModel from "../lib/viewmodels/BaseViewModel";

class TestVM extends BaseViewModel<boolean> {
    onShowCount = 0;
    onHideCount = 0;


    async onShow() {
        this.onShowCount ++;
        await PromiseUtils.wait(250);
    }

    onHide() {
        this.onHideCount++;
    }
}

test("Initialization and disposal is successful when ideally used", async () => {
    const model = new TestVM();
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
    expect(model.onShowCount).toBe(0);
    expect(model.onHideCount).toBe(0);

    const promise = model.onMount();
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);
    expect(model.onHideCount).toBe(0);
    await promise;
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);
    expect(model.onHideCount).toBe(0);

    model.onUnmount();
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
    expect(model.onShowCount).toBe(1);
    expect(model.onHideCount).toBe(1);
});

test("Dispose shouldn't function when not initializing nor active.", async () => {
    const model = new TestVM();
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
    expect(model.onShowCount).toBe(0);
    expect(model.onHideCount).toBe(0);

    model.onUnmount();
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
    expect(model.onShowCount).toBe(0);
    expect(model.onHideCount).toBe(0);

    await model.onMount();
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
});

test("Initialize shouldn't function when active or initializing", () => {
    const model = new TestVM();
    model.onMount();
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);

    model.onMount();
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.onShowCount).toBe(1);
});

test("Initializing state shouldn't be set to false when a new initialize() call was made during onShow() processing.", async () => {
    const model = new TestVM();

    let falsifiedCount = 0;
    model.isInitializing.bind((value) => {
        if(!value) {
            falsifiedCount ++;
        }
    }, false);

    model.onMount();
    await PromiseUtils.wait(50);
    expect(model.onShowCount).toBe(1);
    expect(model.isInitializing.value).toBe(true);
    expect(falsifiedCount).toBe(0);

    model.onUnmount();
    expect(model.onHideCount).toBe(1);
    expect(model.isInitializing.value).toBe(false);
    expect(falsifiedCount).toBe(1);

    const promise = model.onMount();
    expect(model.onShowCount).toBe(2);
    expect(falsifiedCount).toBe(1);
    await promise;
    expect(falsifiedCount).toBe(2);
});

test("Response is resolved when ideally used", async () => {
    const model = new TestVM();
    const promise = model.expectResponse();

    PromiseUtils.wait(250).then(() => model.resolveResponse(true));

    const response = await promise;
    expect(response).toBe(true);
});

test("Dispose will throw when there's a pending response request", () => {
    const model = new TestVM();
    model.onMount();
    model.expectResponse();

    expect(() => {
        model.onUnmount();
    }).toThrow();
});

test("Expecting response multiple times without resolving before each will throw", () => {
    const model = new TestVM();
    model.onMount();
    model.expectResponse();

    expect(() => {
        model.expectResponse();
    }).toThrow();
});