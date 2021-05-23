/// <reference types="react" />
interface ITestChildParam {
    onPathParam: (pathParam: Record<string, string>) => void;
    onQueryParam: (queryParam: URLSearchParams) => void;
}
declare const TestChild: ({ onPathParam, onQueryParam, }: ITestChildParam) => JSX.Element;
export default TestChild;
