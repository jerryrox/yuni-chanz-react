class PromiseUtils {

    /**
     * Returns a promise that resolves after the specified number of milliseconds.
     */
    wait(milliseconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }
}
export default new PromiseUtils();