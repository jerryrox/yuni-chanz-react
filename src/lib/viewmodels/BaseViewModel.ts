import { BaseBloc, Bindable } from "bindable-bloc";

export default abstract class BaseViewModel<TResponse = any> extends BaseBloc {
    
    readonly isInitializing = new Bindable(false);
    readonly isActive = new Bindable(false);

    private activeId: number = 0;

    /**
     * A resolution function for the promise awaited by the requester.
     */
    private resolver: ((value: TResponse | undefined) => any) | null = null;


    /**
     * Initializes the viewmodel.
     * Event called through lifecycle function supported by useViewModel hook.
     */
    async onMount() {
        if(!this.isActive.value && !this.isInitializing.value) {
            this.activeId ++;
            const myId = this.activeId;

            this.isInitializing.value = true;
            this.isActive.value = true;
            
            await this.onShow();
            
            // Ensure the viewmodel hasn't been disposed at all while onShow was running.
            if(myId === this.activeId) {
                this.isInitializing.value = false;
            }
        }
    }

    /**
     * Disposes any resource associated with the current viewmodel session.
     * Event called called through lifecycle function supported by useViewModel hook.
     */
    onUnmount() {
        if(this.isActive.value || this.isInitializing.value) {
            this.isInitializing.value = false;
            this.isActive.value = false;
    
            this.onHide();

            if(this.resolver !== null) {
                this.resolver = null;
                throw new Error("The ViewModel response was not resolved when a client requested one.");
            }
        }
    }

    /**
     * Returns a promise which resolves before disposal of the viewmodel.
     */
    expectResponse(): Promise<TResponse | undefined> {
        if(this.resolver !== null) {
            this.resolver = null;
            throw new Error("Attempted to expect response from overlay when a listener already exists.");
        }

        const promise = new Promise<TResponse | undefined>((resolve) => {
            this.resolver = resolve;
        });
        return promise;
    }

    /**
     * Resolves the promise awaited by the requester, if applicable.
     */
    resolveResponse(response: TResponse | undefined) {
        if(this.resolver !== null) {
            this.resolver(response);
            this.resolver = null;
        }
    }

    /**
     * Event called when the view is about to be shown.
     */
    protected abstract onShow(): Promise<void>;

    /**
     * Event called when the view is about to be hidden.
     */
    protected abstract onHide(): void;
    
}