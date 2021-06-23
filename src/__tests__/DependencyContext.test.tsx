import React, { useEffect } from "react";
import DependencyContext from "../lib/dependencies/DependencyContext";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { render } from "@testing-library/react";
import { useContext } from "react";
import IDependencyContainer from "../lib/dependencies/IDependencyContainer";
import BaseDependency from "../lib/dependencies/BaseDependency";

class TestDep extends BaseDependency {
}

const container = new DependencyContainer();
container.add(new TestDep(container));
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
    onContext: (value: IDependencyContainer) => void;
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
    let contextValue: IDependencyContainer | null = null;
    const onContext = (value: IDependencyContainer) => {
        contextValue = value;
    };

    render(
        <TestParent>
            <TestChild onContext={onContext}/>
        </TestParent>
    );

    expect(contextValue).not.toBeNull();
    expect(contextValue).toBe(container);
    expect(contextValue!.getType(TestDep)).toBe(container.allDependencies[0]);
});