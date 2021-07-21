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

test("Retrieving search params", () => {
    expect(navigation.getHistory()).toBeNull();
    expect(navigation.getSearchParams()).toBeNull();

    const history: any = {
        location: {
            search: "test=aa",
        },
    };
    navigation.setHistory(history);
    const params = navigation.getSearchParams();
    expect(params).not.toBeNull();
    expect(params!.get("test")).toBe("aa");
    expect(params!.get("test2")).toBe(null);
});

test("Push path with object query param", () => {
    let pushedPath = "";
    const history: any = {
        push: (path: string) => {
            pushedPath = path;
        },
    };

    navigation.setHistory(history);

    navigation.pushPath("/test");
    expect(pushedPath).toBe("/test");
    
    navigation.pushPath("/test2", {});
    expect(pushedPath).toBe("/test2?");

    navigation.pushPath("/test3", {
        key: "value",
        key2: "3",
    });
    expect(pushedPath).toBe("/test3?key=value&key2=3");
});

test("Push path with URLSearchParam", () => {
    let pushedPath = "";
    const history: any = {
        push: (path: string) => {
            pushedPath = path;
        },
    };

    navigation.setHistory(history);

    navigation.pushPath("/test");
    expect(pushedPath).toBe("/test");
    
    navigation.pushPath("/test2", new URLSearchParams());
    expect(pushedPath).toBe("/test2?");

    navigation.pushPath("/test3", new URLSearchParams("key=value&key2=3"));
    expect(pushedPath).toBe("/test3?key=value&key2=3");
});