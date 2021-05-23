import React from "react";
import BaseViewModel from "../lib/viewmodels/BaseViewModel";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { BlocContextValue, Bindable, useBindable } from "bindable-bloc";
import DependencyContext from "../lib/dependencies/DependencyContext";
import useViewModel from "../lib/viewmodels/UseViewModel";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PromiseUtils from "../lib/utils/PromiseUtils";

class TestVM extends BaseViewModel {

    async onShow() {
        await PromiseUtils.wait(250);
    }

    onHide() {}
}

const TestView = () => {
    useViewModel(TestVM);

    return (
        <div/>
    );
};

interface ITestParentParam {
    contextValue: BlocContextValue;
    bindableShowFlag: Bindable<boolean>;
}
const TestParent = ({
    contextValue,
    bindableShowFlag,
}: ITestParentParam) => {
    const showFlag = useBindable(bindableShowFlag);

    return (
        <DependencyContext.Provider value={contextValue}>
            {
                showFlag && <TestView/>
            }
        </DependencyContext.Provider>
    );
};

test("ViewModel mount/unmount functions are called via Hook.", async () => {
    const model = new TestVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    const showFlag = new Bindable<boolean>(false);

    render(
        <TestParent
            contextValue={container.contextValue}
            bindableShowFlag={showFlag}
        />
    );
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);

    act(() => {
        showFlag.value = true;
    });
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);

    await PromiseUtils.wait(300);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(true);

    act(() => {
        showFlag.value = false;
    });
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
});
