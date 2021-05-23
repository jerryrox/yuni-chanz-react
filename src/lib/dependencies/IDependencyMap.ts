import { BaseBloc } from "bindable-bloc";

interface IDependencyMap {
    [key: string]: BaseBloc;
}
export default IDependencyMap;