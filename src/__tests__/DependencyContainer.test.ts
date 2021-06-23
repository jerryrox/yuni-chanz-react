import DependencyContainer from "../lib/dependencies/DependencyContainer";
import PromiseUtils from "../lib/utils/PromiseUtils";
import IDependencyContainer from "../lib/dependencies/IDependencyContainer";
import BaseDependency from "../lib/dependencies/BaseDependency";

class TestDependency extends BaseDependency {
    private promise: Promise<void>;
    private resolve: ((value?: any) => void) | null = null;

    constructor(container: IDependencyContainer) {
        super(container);
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
    const container = new DependencyContainer();
    const testDep = container.add(new TestDependency(container));
    
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