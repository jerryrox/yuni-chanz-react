import { Bindable, BlocContextValue } from "bindable-bloc";
import IDependencyMap from "./IDependencyMap";

export default class DependencyContainer {
    readonly isInitializing = new Bindable(false);

    readonly dependencies: IDependencyMap;
    readonly contextValue: BlocContextValue;

    constructor(dependencies: IDependencyMap) {
        this.dependencies = dependencies;
        this.contextValue = new BlocContextValue(dependencies);
    }

    async initialize() {
        this.isInitializing.value = true;

        await Promise.all(Object.values(this.dependencies).map((d) => d.initialize()));

        this.isInitializing.value = false;
    }
}