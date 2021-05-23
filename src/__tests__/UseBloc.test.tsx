import React, { useEffect } from "react";
import DependencyContext from "../lib/dependencies/DependencyContext";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { BaseBloc } from "bindable-bloc";
import { render } from "@testing-library/react";
import useBloc from "../lib/dependencies/UseBloc";

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
    onTestDep: (testDep: TestDep) => void;
}
const TestChild = ({
    onTestDep,
}: ITestChildParam) => {
    const value = useBloc(TestDep);

    useEffect(() => {
        onTestDep(value);
    }, [value]);

    return (
        <p>
            Lolz
        </p>
    );
};

test("UseBloc", async () => {
    let testDep: TestDep | null = null;
    const onContext = (value: TestDep) => {
        testDep = value;
    };

    render(
        <TestParent>
            <TestChild onTestDep={onContext}/>
        </TestParent>
    );

    expect(testDep).not.toBeNull();
    expect(testDep).toBe(container.dependencies.testDep);
});