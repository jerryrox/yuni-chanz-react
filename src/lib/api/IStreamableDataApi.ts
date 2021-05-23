import IApi from "./IApi";
import { Bindable } from "bindable-bloc";

interface IStreamableDataApi<T = any> extends IApi<T | null> {

    /**
     * The data received through API streaming.
     */
     streamedData: Bindable<T | null>;


     /**
      * Starts the data streaming for continuous feed.
      */
     startStream(): void;
 
     /**
      * Stops an existing data streaming request.
      */
     stopStream(): void;
}
export default IStreamableDataApi;