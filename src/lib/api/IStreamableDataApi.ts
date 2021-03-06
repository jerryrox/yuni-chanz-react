import IApi from "./IApi";
import { Bindable } from "bindable-data";

interface IStreamableDataApi<T = any> extends IApi<T> {

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