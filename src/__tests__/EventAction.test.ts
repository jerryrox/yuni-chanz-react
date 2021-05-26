import EventAction from "../lib/data/EventAction";

test("Listeners can be added and removed.", () => {
    const event = new EventAction();

    let isAction1Called = false;
    let isAction2Called = false;
    const action1 = () => {
        isAction1Called = true;
    };
    const action2 = () => {
        isAction2Called = true;
    };

    event.addListener(action1);
    event.addListener(action2);
    expect(isAction1Called).toBe(false);
    expect(isAction2Called).toBe(false);

    event.invoke();
    expect(isAction1Called).toBe(true);
    expect(isAction2Called).toBe(true);

    event.removeListener(action2);
    isAction1Called = false;
    isAction2Called = false;
    event.invoke();
    expect(isAction1Called).toBe(true);
    expect(isAction2Called).toBe(false);
});

test("Removing action during invocation doesn't affect other invocations.", () => {
    const event = new EventAction();

    let isAction1Called = false;
    let isAction2Called = false;
    let isAction3Called = false;
    const action2 = () => {
        isAction2Called = true;
    };
    const action1 = () => {
        isAction1Called = true;
        event.removeListener(action2);
    };
    const action3 = () => {
        isAction3Called = true;
    };

    event.addListener(action1);
    event.addListener(action2);
    event.addListener(action3);
    expect(isAction1Called).toBe(false);
    expect(isAction2Called).toBe(false);
    expect(isAction3Called).toBe(false);

    event.invoke();
    expect(isAction1Called).toBe(true);
    expect(isAction2Called).toBe(false);
    expect(isAction3Called).toBe(true);
});