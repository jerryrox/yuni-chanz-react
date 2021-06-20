import { Constructor } from "../Types";

interface IDependencyContainer {

    /**
     * Returns the dependency of specified type.
     */
    getType<T>(constructor: Constructor<T>): T | undefined;
}
export default IDependencyContainer;