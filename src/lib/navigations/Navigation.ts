import { History } from "history";
import BaseDependency from "../dependencies/BaseDependency";

export default class Navigation extends BaseDependency {
    
    private history: History<any> | null = null;


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
     * Returns the URLSearchParams instance from current history.
     * May return null if history is null.
     */
    getSearchParams(): URLSearchParams | null {
        return this.history === null ? null : new URLSearchParams(this.history.location.search);
    }

    /**
     * Pushes the specified path to the navigation stack.
     */
    pushPath(path: string, queryParam?: Record<string, any> | URLSearchParams) {
        if(this.history === null) {
            console.warn("Attempted to push path when history instance is null.");
            return;
        }

        let searchParam: URLSearchParams | null = null;
        if (queryParam instanceof URLSearchParams) {
            searchParam = queryParam;
        }
        else if(queryParam !== undefined) {
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