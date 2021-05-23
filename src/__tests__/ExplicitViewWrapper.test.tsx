import React from "react";
import ExplicitViewModel from "../lib/viewmodels/ExplicitViewModel";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import DependencyContext from "../lib/dependencies/DependencyContext";
import ExplicitViewWrapper from "../lib/viewmodels/ExplicitViewWrapper";
import useViewModel from "../lib/viewmodels/UseViewModel";
import { render } from "@testing-library/react";
import PromiseUtils from "../lib/utils/PromiseUtils";
import { act } from "react-dom/test-utils";
import { BlocContextValue } from "bindable-bloc";

class TestVM extends ExplicitViewModel {

    async onShow() {
        await PromiseUtils.wait(250);
    }

    onHide() {}
}
const TestView = () => {
    useViewModel(TestVM);

    return (
        <div>TestView rendered</div>
    );
};

interface ITestParentParam {
    contextValue: BlocContextValue;
}
const TestParent = ({
    contextValue,
}: ITestParentParam) => {
    return (
        <DependencyContext.Provider value={contextValue}>
            <ExplicitViewWrapper viewModelType={TestVM}>
                <TestView/>
            </ExplicitViewWrapper>
        </DependencyContext.Provider>
    );
};

test("View is correctly shown and hidden when requested on its viewmodel.", async () => {
    const model = new TestVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    expect(model.shouldShow.value).toBe(false);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);

    render(
        <TestParent contextValue={container.contextValue}/>
    );
    expect(model.shouldShow.value).toBe(false);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);

    act(() => {
        model.show();
    });
    expect(model.shouldShow.value).toBe(true);
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);

    await PromiseUtils.wait(300);
    expect(model.shouldShow.value).toBe(true);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(true);

    act(() => {
        model.hide();
    });
    expect(model.shouldShow.value).toBe(false);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
});

test("View is correctly disposed when it was requested for hiding during initialization", async () => {
    const model = new TestVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    render(
        <TestParent contextValue={container.contextValue}/>
    );

    act(() => {
        model.show();
    });
    expect(model.shouldShow.value).toBe(true);
    expect(model.isInitializing.value).toBe(true);
    expect(model.isActive.value).toBe(true);

    act(() => {
        model.hide();
    });
    expect(model.shouldShow.value).toBe(false);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);

    await PromiseUtils.wait(300);
    expect(model.shouldShow.value).toBe(false);
    expect(model.isInitializing.value).toBe(false);
    expect(model.isActive.value).toBe(false);
});