import { Constructor } from "bindable-bloc/lib/Types";
import useDependency from "../dependencies/UseDependency";
import { useEffect } from "react";
import BaseViewModel from "./BaseViewModel";

export default function useViewModel<T extends BaseViewModel>(type: Constructor<T>) {
    const model = useDependency(type)!;

    useEffect(() => {
        model.onMount();
        return () => {
            model.onUnmount();
        };
    }, []); // eslint-disable-line
    return model;
}