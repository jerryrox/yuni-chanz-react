import { Constructor } from "../Types";
import IDependencyContainer from "./IDependencyContainer";
import { Bindable } from "bindable-data";
import BaseDependency from "./BaseDependency";

export default class DependencyContainer implements IDependencyContainer {
    readonly isInitializing = new Bindable(false);
    readonly isInitialized = new Bindable(false);
    readonly allDependencies: BaseDependency[] = [];


    async initialize() {
        if (this.isInitialized.value || this.isInitializing.value) {
            return;
        }

        this.isInitializing.value = true;
        
        await Promise.all(this.allDependencies.map((d) => d.initialize()));
        
        this.isInitializing.value = false;
        this.isInitialized.value = true;
    }

    /**
     * Adds the specified dependency to the dependencies list.
     */
    add<T extends BaseDependency>(dependency: T): T {
        if (this.isInitializing.value || this.isInitialized.value) {
            throw new Error("Attempted to add a new dependency after 'initialize' was called.");
        }
        this.allDependencies.push(dependency);
        return dependency;
    }

    /**
     * Returns the dependency instance of specified generic type.
     */
    getType<T>(constructor: Constructor<T>): T | undefined {
        const t = this.allDependencies.find((d) => d instanceof constructor);
        return t === undefined ? undefined : (t as unknown) as T;
    }
}