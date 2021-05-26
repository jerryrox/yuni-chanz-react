type Action<T> = (value: T) => any;

export default class EventAction<T = void> {
    private listeners: (Action<T> | null)[] = [];

    /**
     * Adds the specified event listener.
     */
    addListener(action: Action<T>) {
        this.listeners.push(action);
    }

    /**
     * Removes the specified event listener.
     */
    removeListener(action: Action<T>) {
        const index = this.listeners.findIndex((l) => l === action);
        if(index >= 0) {
            this.listeners[index] = null;
        }
    }

    /**
     * Invokes the event with the specified param T.
     */
    invoke(param: T) {
        for(let i=0; i<this.listeners.length; i++) {
            const listener = this.listeners[i];
            if(listener === null) {
                this.listeners.splice(i, 1);
                i --;
                continue;
            }
            listener(param);
        }
    }
}