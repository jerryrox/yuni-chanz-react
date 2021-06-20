import DependencyContainer from "../lib/dependencies/DependencyContainer";
import PromiseUtils from "../lib/utils/PromiseUtils";
import IDependency from "../lib/dependencies/IDependency";
import IDependencyContainer from "../lib/dependencies/IDependencyContainer";

class TestDependency implements IDependency {
    private promise: Promise<void>;
    private resolve: ((value?: any) => void) | null = null;

    constructor() {
        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    initialize(dependencies: IDependencyContainer) { // eslint-disable-line
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