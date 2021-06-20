import React, { Fragment, useMemo } from "react";
import { Constructor } from "bindable-bloc/lib/Types";
import ExplicitViewModel from "./ExplicitViewModel";
import { useBindable } from "bindable-bloc";
import useDependency from "../dependencies/UseDependency";

interface IExplicitViewServiceParam {
    viewModelType: Constructor<ExplicitViewModel>;
    children?: React.ReactNode;
}

const ExplicitViewWrapper = ({
    viewModelType,
    children,
}: IExplicitViewServiceParam) => {
    const model = useDependency(viewModelType)!;

    const shouldShow = useBindable(model.shouldShow);

    const view = useMemo(() => {
        if(shouldShow) {
            return (
                <Fragment>
                    {children}
                </Fragment>
            );
        }
        return (
            <div style={{
                position: "absolute",
            }}/>
        );
    }, [shouldShow]);

    return view;
};
export default ExplicitViewWrapper;