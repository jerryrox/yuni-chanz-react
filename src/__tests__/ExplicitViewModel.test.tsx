import ExplicitViewModel from "../lib/viewmodels/ExplicitViewModel";

interface IShowParam {
    id: string;
    name: string;
}

class TestVM extends ExplicitViewModel<IShowParam> {

    paramReceiveCount: number = 0;
    receivedParam: IShowParam | null = null;

    onShowParam(param: IShowParam) {
        this.receivedParam = param;
        this.paramReceiveCount ++;
    }

    async onShow() {}

    onHide() {}
}

test("ViewModel is shown with correct onShowParam calls", () => {
    const model = new TestVM();
    expect(model.receivedParam).toBeNull();
    expect(model.paramReceiveCount).toBe(0);

    model.show();
    expect(model.receivedParam).toBeNull();
    expect(model.paramReceiveCount).toBe(0);

    model.show();
    expect(model.receivedParam).toBeNull();
    expect(model.paramReceiveCount).toBe(0);

    model.hide();
    model.show({
        id: "asdf",
        name: "fdsa",
    });
    expect(model.receivedParam).toMatchObject({
        id: "asdf",
        name: "fdsa",
    });
    expect(model.paramReceiveCount).toBe(1);
});