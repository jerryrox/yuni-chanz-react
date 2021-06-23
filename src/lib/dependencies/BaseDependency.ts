import IDependencyContainer from "./IDependencyContainer";

export default abstract class BaseDependency {
    
    protected dependencies: IDependencyContainer;

    constructor(container: IDependencyContainer) {
        this.dependencies = container;
    }

    async initialize(): Promise<void> { }
}