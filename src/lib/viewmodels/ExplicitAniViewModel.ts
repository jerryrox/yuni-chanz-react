import { Bindable } from "bindable-data";
import ExplicitViewModel from "./ExplicitViewModel";

/**
 * ExplicitViewModel with the assumption which the view will play a hiding animation before actually processing onHide event.
 */
export default abstract class ExplicitAniViewModel<TShowParam = any, TResponse = any> extends ExplicitViewModel<TShowParam, TResponse> {

    /**
     * Whether the hiding animation should be started.
     */
    readonly isHiding = new Bindable(false);

    
    show(param?: TShowParam) {
        super.show(param);
        this.isHiding.value = false;
    }

    hide() {
        if(this.shouldShow.value) {
            this.isHiding.value = true;
        }
    }

    /**
     * Event to be called from the view when the hiding animation has been finished.
     */
    onHideAniEnd() {
        if(this.isHiding.value) {
            this.isHiding.value = false;
            super.hide();
        }
    }
}