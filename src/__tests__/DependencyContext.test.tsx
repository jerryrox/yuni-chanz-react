import React, { useEffect } from "react";
import DependencyContext from "../lib/dependencies/DependencyContext";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { BaseBloc, BlocContextValue } from "bindable-bloc";
import { render } from "@testing-library/react";
import { useContext } from "react";

class TestDep extends BaseBloc {}

const container = new DependencyContainer({
    testDep: new TestDep(),
});
container.initialize();

interface ITestParentParam {
    children?: React.ReactNode;
}
const TestParent = ({
    children,
}: ITestParentParam) => {
    return (
        <DependencyContext.Provider value={container.contextValue}>
            {children}
        </DependencyContext.Provider>
    );
};

interface ITestChildParam {
    onContext: (value: BlocContextValue) => void;
}
const TestChild = ({
    onContext,
}: ITestChildParam) => {
    const value = useContext(DependencyContext);

    useEffect(() => {
        onContext(value);
    }, [value]);

    return (
        <p>
            Lolz
        </p>
    );
};

test("DependencyContext is correctly injected to DOM tree", async () => {
    let contextValue: BlocContextValue | null = null;
    const onContext = (value: BlocContextValue) => {
        contextValue = value;
    };

    render(
        <TestParent>
            <TestChild onContext={onContext}/>
        </TestParent>
    );

    expect(contextValue).not.toBeNull();
    expect(contextValue).toBe(container.contextValue);
    expect(contextValue!.getBloc(TestDep)).toBe(container.dependencies.testDep);
});