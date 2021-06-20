import { History } from "history";
import IDependency from "../dependencies/IDependency";

export default class Navigation implements IDependency {
    
    private history: History<any> | null = null;


    async initialize() { }

    /**
     * Returns the history instance currently in use.
     */
    getHistory(): History<any> | null {
        return this.history;
    }

    /**
     * Sets the new history instance to be used for navigation.
     */
    setHistory(history: History<any> | null) {
        this.history = history;
    }

    /**
     * Pushes the specified path to the navigation stack.
     */
    pushPath(path: string, queryParam?: Record<string, any>) {
        if(this.history === null) {
            console.warn("Attempted to push path when history instance is null.");
            return;
        }

        let searchParam: URLSearchParams | null = null;
        if(queryParam !== undefined) {
            searchParam = new URLSearchParams();
            for(const key in queryParam) {
                const value = queryParam[key] as any;
                if(value !== null && value !== undefined) {
                    searchParam.set(key, value.toString());
                }
            }
        }

        this.history.push(
            searchParam === null ?
                path :
                `${path}?${searchParam.toString()}`
        );
    }

    /**
     * Pops the navigation stack by 1.
     */
    popPath() {
        if(this.history === null) {
            console.warn("Attempted to pop path when history instance is null.");
            return;
        }

        this.history.goBack();
    }
}