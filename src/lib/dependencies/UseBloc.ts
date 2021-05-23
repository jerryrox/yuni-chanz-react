import { Constructor } from "bindable-bloc/lib/Types";
import { BaseBloc } from "bindable-bloc";
import { useContext } from "react";
import DependencyContext from "./DependencyContext";

/**
 * A React Hook which allows access to a Bloc instance within a dependency context.
 */
export default function useBloc<T extends BaseBloc>(type: Constructor<T>): T {
    const bloc = useContext(DependencyContext).getBloc(type);
    return bloc;
}