import { Constructor } from "bindable-bloc/lib/Types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useQueryParams from "../navigations/UseQueryParams";
import RoutedViewModel from "./RoutedViewModel";
import { useBindable } from "bindable-bloc";
import useViewModel from "./UseViewModel";

export default function useRoutedViewModel<T extends RoutedViewModel>(type: Constructor<T>) {
    const model = useViewModel(type);
    const pathParam = useParams();
    const queryParam = useQueryParams();

    const isActive = useBindable(model.isActive);

    useEffect(() => {
        if(isActive) {
            model.onRouteParams(pathParam, queryParam);
        }
    }, [pathParam, queryParam, isActive]); 
    return model;
}