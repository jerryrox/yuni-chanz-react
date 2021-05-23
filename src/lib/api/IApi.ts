interface IApi<T = any> {

    /**
     * Makes the API requests for response T.
     */
    request(): Promise<T>;
}
export default IApi;