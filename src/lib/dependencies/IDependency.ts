import IDependencyContainer from "./IDependencyContainer";

interface IDependency {
    /**
     * Initializes the dependency.
     * Optionally do 
     */
    initialize(container: IDependencyContainer): Promise<void>;
}
export default IDependency;