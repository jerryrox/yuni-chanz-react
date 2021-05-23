class PathUtils {
    
    /**
     * Combines all specified path segments if they are a valid string with non-zero length.
     */
    combineNonNull(segments: (string | null | undefined)[], separator: string = "/", lead: string = "", trail: string = ""): string {
        let path: string = "";
        for(const segment of segments) {
            if(segment !== null && segment !== undefined && segment.length > 0) {
                if(path.length > 0) {
                    path = `${path}${separator}${segment}`;
                }
                else {
                    path = segment;
                }
            }
        }
        return `${lead}${path}${trail}`;
    }
}
export default new PathUtils();