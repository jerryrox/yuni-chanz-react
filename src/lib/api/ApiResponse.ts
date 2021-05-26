export default class ApiResponse<T = any> {
    
    readonly isSuccess: boolean;

    readonly value: T | undefined;
    readonly error: Error | undefined;
    readonly message: string | undefined;

    constructor(isSuccess: boolean, value?: T, error?: Error, message?: string) {
        this.isSuccess = isSuccess;

        this.value = value;
        this.error = error;
        this.message = message;
    }

    /**
     * Instantiates a new ApiResponse with successful response.
     */
    static success<T = any>(value?: T): ApiResponse<T> {
        return new ApiResponse<T>(true, value);
    }

    /**
     * Instantiates a new ApiResponse with failed response.
     */
    static failed<T = any>(error?: Error, message?: string): ApiResponse<T> {
        return new ApiResponse<T>(false, undefined, error, message);
    }
}