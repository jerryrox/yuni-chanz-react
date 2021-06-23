import { useContext } from "react";
import DependencyContext from "./DependencyContext";
import { Constructor } from "../Types";
import BaseDependency from "./BaseDependency";

/**
 * A React Hook which allows access to a Bloc instance within a dependency context.
 */
export default function useDependency<T extends BaseDependency>(type: Constructor<T>): T | undefined {
    const bloc = useContext(DependencyContext).getType(type);
    return bloc;
}