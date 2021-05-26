import ApiResponse from "./ApiResponse";
interface IApi<T = any> {

    /**
     * Makes the API requests for response T.
     */
    request(): Promise<ApiResponse<T>>;
}
export default IApi;