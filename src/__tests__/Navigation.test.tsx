import React from "react";
import { MemoryRouter, Switch, Route, useParams } from "react-router-dom";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import Navigation from "../lib/navigations/Navigation";
import DependencyContext from "../lib/dependencies/DependencyContext";
import { render } from "@testing-library/react";
import NavigationService from "../lib/navigations/NavigationService";
import { useEffect } from "react";
import useQueryParams from "../lib/navigations/UseQueryParams";

interface ITestChildParam {
    onPathParam: (pathParam: Record<string, string>) => void;
    onQueryParam: (queryParam: URLSearchParams) => void;
}
const TestChild = ({
    onPathParam,
    onQueryParam,
}: ITestChildParam) => {
    const pathParam = useParams();
    const queryParam = useQueryParams();

    useEffect(() => {
        onPathParam(pathParam);
    }, [pathParam]); // eslint-disable-line

    useEffect(() => {
        onQueryParam(queryParam);
    }, [queryParam]); // eslint-disable-line

    return (
        <div>Lolz</div>
    );
};
export default TestChild;

interface ITestComponentParam {
    path: string;
    children?: React.ReactNode;
}
const TestComponent = ({
    path,
    children,
}: ITestComponentParam) => {
    return (
        <MemoryRouter initialEntries={[path]}>
            <NavigationService/>
            <Switch>
                <Route exact path="/">{children}</Route>
                <Route path="/:id">{children}</Route>
            </Switch>
        </MemoryRouter>
    );
};

const container = new DependencyContainer();
const navigation = container.add(new Navigation(container));
container.initialize();

afterEach(() => {
    navigation.setHistory(null);
});

test("History is properly injected to Navigation", async () => {
    expect(navigation.getHistory()).toBeNull();

    render(
        <DependencyContext.Provider value={container}>
            <TestComponent path="/"/>
        </DependencyContext.Provider>
    );

    expect(navigation.getHistory()).not.toBeNull();
});

test("Params are properly injected to Navigation", async () => {

    let pathParam: Record<string, string> | null = null;
    let queryParam: URLSearchParams | null = null;
    const onPathParam = (value: Record<string, string>) => {
        pathParam = value;
    };
    const onQueryParam = (value: URLSearchParams) => {
        queryParam = value;
    };

    expect(navigation.getHistory()).toBeNull();
    expect(pathParam).toBeNull();
    expect(queryParam).toBeNull();

    render(
        <DependencyContext.Provider value={container}>
            <TestComponent path="/1234567890?x=1&y=a">
                <TestChild onPathParam={onPathParam} onQueryParam={onQueryParam}/>
            </TestComponent>
        </DependencyContext.Provider>
    );
    
    expect(navigation.getHistory()).not.toBeNull();
    expect(pathParam).toMatchObject({
        id: "1234567890",
    });
    expect(queryParam!.get("x")).toMatch("1");
    expect(queryParam!.get("y")).toMatch("a");
});