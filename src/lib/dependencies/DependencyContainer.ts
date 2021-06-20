import { Bindable } from "bindable-bloc";
import IDependency from "./IDependency";
import { Constructor } from "../Types";
import IDependencyContainer from "./IDependencyContainer";

export default class DependencyContainer implements IDependencyContainer {
    readonly isInitializing = new Bindable(false);
    readonly allDependencies: IDependency[];

    constructor(dependencies: IDependency[]) {
        this.allDependencies = dependencies;
    }

    async initialize() {
        this.isInitializing.value = true;

        await Promise.all(this.allDependencies.map((d) => d.initialize(this)));

        this.isInitializing.value = false;
    }

    /**
     * Returns the dependency instance of specified generic type.
     */
    getType<T>(constructor: Constructor<T>): T | undefined {
        const t = this.allDependencies.find((d) => d instanceof constructor);
        return t === undefined ? undefined : (t as unknown) as T;
    }
}