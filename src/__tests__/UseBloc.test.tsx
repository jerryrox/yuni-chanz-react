import React, { useEffect } from "react";
import DependencyContext from "../lib/dependencies/DependencyContext";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { render } from "@testing-library/react";
import useDependency from "../lib/dependencies/UseDependency";
import IDependency from "../lib/dependencies/IDependency";

class TestDep implements IDependency {
    async initialize() { }
}

const container = new DependencyContainer([
    new TestDep(),
]);
container.initialize();

interface ITestParentParam {
    children?: React.ReactNode;
}
const TestParent = ({
    children,
}: ITestParentParam) => {
    return (
        <DependencyContext.Provider value={container}>
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
    const value = useDependency(TestDep)!;

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
    expect(testDep).not.toBeUndefined();
    expect(testDep).toBe(container.allDependencies[0]);
});