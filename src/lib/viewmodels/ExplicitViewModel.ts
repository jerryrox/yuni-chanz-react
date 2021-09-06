import BaseViewModel from "./BaseViewModel";
import { Bindable } from "bindable-data";

export default abstract class ExplicitViewModel<TShowParam = any, TResponse = any> extends BaseViewModel<TResponse> {
    
    /**
     * Whether the associated view should be showing when this flag turns true.
     */
    readonly shouldShow = new Bindable(false);

    /**
     * Requests the associated view to be displayed as a result of explicitly reacting to shouldShow flag.
     */
    show(param?: TShowParam) {
        if (!this.shouldShow.value) {
            this.shouldShow.value = true;
        }
        
        if (param !== undefined) {
            this.onShowParam(param);
        }
    }

    /**
     * Requests the associated view to be hidden as a result of explicitly reacting to shouldShow flag.
     */
    hide() {
        if(this.shouldShow.value) {
            this.shouldShow.value = false;
        }
    }

    /**
     * Hides the view with the specified response.
     */
    hideWithResponse(response: TResponse | undefined) {
        if (this.shouldShow.value) {
            this.resolveResponse(response);
            this.hide();
        }
    }

    /**
     * Event called when the view-showing parameters have changed.
     */
    onShowParam(param: TShowParam): void {} // eslint-disable-line
}