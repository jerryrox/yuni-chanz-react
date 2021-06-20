import IApi from "./IApi";
import { Bindable } from "bindable-data";

interface IStreamableQueryApi<T = any> extends IApi<T[]> {

    /**
     * The list of data received through API streaming.
     */
    streamedData: Bindable<T[]>;


    /**
     * Starts the data streaming for continuous feed.
     */
    startStream(): void;

    /**
     * Stops an existing data streaming request.
     */
    stopStream(): void;
}
export default IStreamableQueryApi;