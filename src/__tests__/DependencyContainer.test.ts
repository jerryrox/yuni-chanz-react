import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { BaseBloc } from "bindable-bloc";
import PromiseUtils from "../lib/utils/PromiseUtils";

class TestDependency extends BaseBloc {
    private promise: Promise<void>;
    private resolve: ((value?: any) => void) | null = null;

    constructor() {
        super();
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    initialize() {
        return this.promise;
    }

    finishInitialization() {
        this.resolve!();
    }
}

test("DependencyContainer initializes correctly", async () => {
    const testDep = new TestDependency();
    const container = new DependencyContainer([
        testDep,
    ]);
    expect(container.isInitializing.value).toBe(false);
    expect(Object.keys(container.allDependencies).length).toBe(1);
    expect(Object.values(container.allDependencies)[0]).toBe(testDep);
    expect(container.allDependencies[0]).not.toBeNull();
    expect(container.allDependencies[0]).not.toBeUndefined();

    container.initialize();
    expect(container.isInitializing.value).toBe(true);

    testDep.finishInitialization();
    await PromiseUtils.wait(100);
    expect(container.isInitializing.value).toBe(false);
});