import React from "react";
import BaseViewModel from "../lib/viewmodels/BaseViewModel";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import DependencyContext from "../lib/dependencies/DependencyContext";
import useViewModel from "../lib/viewmodels/UseViewModel";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PromiseUtils from "../lib/utils/PromiseUtils";
import IDependencyContainer from "../lib/dependencies/IDependencyContainer";
import { Bindable, useBindable } from "bindable-data";

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
    container: IDependencyContainer;
    bindableShowFlag: Bindable<boolean>;
}
const TestParent = ({
    container,
    bindableShowFlag,
}: ITestParentParam) => {
    const showFlag = useBindable(bindableShowFlag);

    return (
        <DependencyContext.Provider value={container}>
            {
                showFlag && <TestView/>
            }
        </DependencyContext.Provider>
    );
};

test("ViewModel mount/unmount functions are called via Hook.", async () => {
    const container = new DependencyContainer();
    const model = container.add(new TestVM(container));
    container.initialize();

    const showFlag = new Bindable<boolean>(false);

    render(
        <TestParent
            container={container}
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
