import React from "react";
import DependencyContainer from "../lib/dependencies/DependencyContainer";
import { BlocContextValue } from "bindable-bloc";
import DependencyContext from "../lib/dependencies/DependencyContext";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PromiseUtils from "../lib/utils/PromiseUtils";
import RoutedViewModel from "../lib/viewmodels/RoutedViewModel";
import { Switch, Route, MemoryRouter } from "react-router-dom";
import Navigation from "../lib/navigations/Navigation";
import useRoutedViewModel from "../lib/viewmodels/UseRoutedViewModel";
import { History } from "history";

class TestRoutedVM extends RoutedViewModel {

    pathParam: Record<string, any> | undefined;
    queryParam: URLSearchParams | undefined;

    get routePath(): string {
        return "/test/:id";
    }

    async onShow() {}

    onHide() {}

    onRouteParams(pathParam: Record<string, any>, queryParam: URLSearchParams) {
        this.pathParam = pathParam;
        this.queryParam = queryParam;
    }
}

const TestRoutedView = () => {
    useRoutedViewModel(TestRoutedVM);

    return (
        <div/>
    );
};

interface ITestRoutedParentParam {
    contextValue: BlocContextValue;
    model: TestRoutedVM;
    onHistory: (history: History<any>) => void;
}
const TestRoutedParent = ({
    contextValue,
    model,
    onHistory,
}: ITestRoutedParentParam) => {
    return (
        <DependencyContext.Provider value={contextValue}>
            <MemoryRouter>
                <Switch>
                    <Route path={model.routePath}>
                        <TestRoutedView/>
                    </Route>
                    <Route path="*" render={({history}) => {
                        onHistory(history);
                        return null;
                    }}/>
                </Switch>
            </MemoryRouter>
        </DependencyContext.Provider>
    );
};

test("Route params are correctly injected.", async () => {
    const navigation = new Navigation();

    const model = new TestRoutedVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    let history: History<any> = (null as any);
    render(
        <TestRoutedParent
            contextValue={container.contextValue}
            model={model}
            onHistory={(h) => {
                history = h;
                navigation.setHistory(h);
            }}
        />
    );

    expect(model.isActive.value).toBe(false);
    expect(model.pathParam).toBeUndefined();
    expect(model.queryParam).toBeUndefined();

    act(() => {
        navigation.pushPath("/test/asdf");
    });
    expect(history.location.pathname).toBe("/test/asdf");
    await PromiseUtils.wait(300);
    expect(model.isActive.value).toBe(true);
    expect(model.pathParam).toMatchObject({
        id: "asdf",
    });
    expect(model.queryParam?.keys().next().done).toBe(true);

    history.push("/hiding/path");
    await PromiseUtils.wait(50);
    expect(model.isActive.value).toBe(false);
    expect(model.pathParam).toMatchObject({
        id: "asdf",
    });
    expect(model.queryParam?.keys().next().done).toBe(true);

    act(() => {
        navigation.pushPath("/test/asdf2", {
            search: "hi",
            age: "1",
        });
    });
    await PromiseUtils.wait(300);
    expect(model.isActive.value).toBe(true);
    expect(model.pathParam).toMatchObject({
        id: "asdf2",
    });
    expect(model.queryParam?.get("search")).toBe("hi");
    expect(model.queryParam?.get("age")).toBe("1");
});

test("Going back via history should properly call unmount event", async () => {
    const navigation = new Navigation();

    const model = new TestRoutedVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    let history: History<any> = (null as any);
    render(
        <TestRoutedParent
            contextValue={container.contextValue}
            model={model}
            onHistory={(h) => {
                history = h;
                navigation.setHistory(h);
            }}
        />
    );
    
    history.push("/test/1234");
    await PromiseUtils.wait(50);
    expect(model.isActive.value).toBe(true);
    
    history.goBack();
    await PromiseUtils.wait(50);
    expect(model.isActive.value).toBe(false);
});

test("Route params are updated while the view is active.", async () => {
    const navigation = new Navigation();

    const model = new TestRoutedVM();
    const container = new DependencyContainer({
        model,
    });
    container.initialize();

    let history: History<any> = (null as any);
    render(
        <TestRoutedParent
            contextValue={container.contextValue}
            model={model}
            onHistory={(h) => {
                history = h;
                navigation.setHistory(h);
            }}
        />
    );
    
    history.push("/hmm?name=nope");
    await PromiseUtils.wait(50);
    expect(model.pathParam).toBeUndefined();
    expect(model.queryParam).toBeUndefined();

    act(() => {
        navigation.pushPath("/test/a");
    });
    await PromiseUtils.wait(300);
    expect(model.pathParam).toMatchObject({
        id: "a",
    });
    expect(model.queryParam?.keys().next().done).toBe(true);
    expect(model.isActive.value).toBe(true);
    expect(model.isInitializing.value).toBe(false);

    history.push("/test/b?name=lol");
    expect(model.isActive.value).toBe(true);
    expect(model.isInitializing.value).toBe(false);
    await PromiseUtils.wait(50);
    expect(model.pathParam).toMatchObject({
        id: "b",
    });
    expect(model.queryParam?.get("name")).toBe("lol");
});