import { Constructor } from "bindable-bloc/lib/Types";
import useBloc from "../dependencies/UseBloc";
import { useEffect } from "react";
import BaseViewModel from "./BaseViewModel";

export default function useViewModel<T extends BaseViewModel>(type: Constructor<T>) {
    const model = useBloc(type);

    useEffect(() => {
        model.onMount();
        return () => {
            model.onUnmount();
        };
    }, []); // eslint-disable-line
    return model;
}