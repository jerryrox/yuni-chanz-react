import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useQueryParams from "../navigations/UseQueryParams";
import RoutedViewModel from "./RoutedViewModel";
import useViewModel from "./UseViewModel";
import { useBindable } from "bindable-data";
import { Constructor } from "../Types";

export default function useRoutedViewModel<T extends RoutedViewModel>(type: Constructor<T>) {
    const model = useViewModel(type);
    const location = useLocation();
    const pathParam = useParams();
    const queryParam = useQueryParams();

    const isActive = useBindable(model.isActive);

    useEffect(() => {
        if(isActive) {
            model.onRoutePath(location.pathname);
        }
    }, [location.pathname, isActive]);
    useEffect(() => {
        if(isActive) {
            model.onRouteParams(pathParam, queryParam, location.pathname);
        }
    }, [pathParam, queryParam, location.pathname, isActive]); 
    return model;
}