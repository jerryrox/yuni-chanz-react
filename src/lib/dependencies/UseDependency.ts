import { Constructor } from "bindable-bloc/lib/Types";
import { useContext } from "react";
import DependencyContext from "./DependencyContext";
import IDependency from "./IDependency";

/**
 * A React Hook which allows access to a Bloc instance within a dependency context.
 */
export default function useDependency<T extends IDependency>(type: Constructor<T>): T | undefined {
    const bloc = useContext(DependencyContext).getType(type);
    return bloc;
}