import BaseViewModel from "./BaseViewModel";

export default abstract class RoutedViewModel<TResponse = any> extends BaseViewModel<TResponse> {

    /**
     * Event called when the route's path and query parameters have changed.
     */
    onRouteParams(pathParam: Record<string, any>, queryParam: URLSearchParams) {} // eslint-disable-line
}