import ModelConverter from "../lib/data/ModelConverter";


interface ITestModel {
    name: string;
    age: number;
    weight: number;
    dob: Date;
    isMale: boolean;
}

class TestConverter extends ModelConverter<ITestModel> {

    toModel(data: any): ITestModel {
        return {
            name: this.decodeString(data.name) ?? "DefaultName",
            age: this.decodeInt(data.age) ?? 100,
            weight: this.decodeFloat(data.weight) ?? 100,
            dob: this.decodeDate(data.dob) ?? new Date(2020, 1, 0),
            isMale: this.decodeBool(data.isMale) ?? false,
        };
    }

    toPlain(model: ITestModel): any {
        return {
            name: model.name,
            age: model.age,
            weight: model.weight,
            dob: model.dob.getTime(),
            isMale: model.isMale,
        };
    }
}

test("Model conversion", () => {
    const converter = new TestConverter();

    const model = converter.toModel({
    });
    expect(model.name).toBe("DefaultName");
    expect(model.age).toBe(100);
    expect(model.weight).toBe(100);
    expect(model.dob.getTime()).toBe(new Date(2020, 1, 0).getTime());
    expect(model.isMale).toBe(false);

    const plain = converter.toPlain({
        name: "Lol",
        age: 20,
        weight: 50,
        dob: new Date(2000, 1, 0),
        isMale: true,
    });
    expect(plain.name).toBe("Lol");
    expect(plain.age).toBe(20);
    expect(plain.weight).toBe(50);
    expect(plain.dob).toBe(new Date(2000, 1, 0).getTime());
    expect(plain.isMale).toBe(true);
});

test("Data decode functions", () => {
    const converter = new TestConverter();

    expect(converter.decodeString(undefined)).toBe(null);
    expect(converter.decodeString(null)).toBe(null);
    expect(converter.decodeString("zxcv")).toBe("zxcv");
    expect(converter.decodeString(10)).toBe("10");

    expect(converter.decodeBool(undefined)).toBe(null);
    expect(converter.decodeBool(null)).toBe(null);
    expect(converter.decodeBool(1)).toBe(null);
    expect(converter.decodeBool("tRuE")).toBe(true);
    expect(converter.decodeBool(true)).toBe(true);

    expect(converter.decodeInt(undefined)).toBe(null);
    expect(converter.decodeInt(null)).toBe(null);
    expect(converter.decodeInt("lolz")).toBe(null);
    expect(converter.decodeInt(1)).toBe(1);
    expect(converter.decodeInt("1")).toBe(1);
    expect(converter.decodeInt("ff", 16)).toBe(255);

    expect(converter.decodeFloat(undefined)).toBe(null);
    expect(converter.decodeFloat(null)).toBe(null);
    expect(converter.decodeFloat("lolz")).toBe(null);
    expect(converter.decodeFloat(1.5)).toBeCloseTo(1.5);
    expect(converter.decodeFloat("1.5")).toBeCloseTo(1.5);

    expect(converter.decodeDate(undefined)).toBe(null);
    expect(converter.decodeDate(null)).toBe(null);
    expect(converter.decodeDate("lolz")).toBe(null);
    expect(converter.decodeDate(1.5)?.getTime()).toBeCloseTo(new Date(1.5).getTime());
    expect(converter.decodeDate("2020-01-01")?.getTime()).toBeCloseTo(new Date("2020-01-01").getTime());
});

test("Array map", () => {
    const converter = new TestConverter();
    const result = converter.mapArray(1234, () => {
        throw new Error("This shouldn't be called.");
    });
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(0);
    
    const result2 = converter.mapArray("1234", () => {
        throw new Error("This also shouldn't be called.");
    });
    expect(Array.isArray(result2)).toBeTruthy();
    expect(result2.length).toBe(0);

    let mapCalls = 0;
    const result3 = converter.mapArray([1,2,3,4], (v, i, a) => {
        expect(v).toBe(i + 1);
        expect(a).toMatchObject([1,2,3,4]);
        mapCalls++;
        return `${v}${i}`;
    });
    expect(mapCalls).toBe(4);
    expect(result3).toMatchObject([
        "10",
        "21",
        "32",
        "43"
    ]);
});

test("Iterate object", () => {
    const converter = new TestConverter();

    let checkedKeys: string = "";
    const result = converter.iterateObject<number>({
        "a": 1,
        "b": 10,
        "c": 100,
    }, (key, value, curOutput) => {
        checkedKeys += key;
        return curOutput + value;
    }, 0);
    expect(result).toBe(111);
    expect(checkedKeys.length).toBe(3);
    expect(checkedKeys.includes("a")).toBeTruthy();
    expect(checkedKeys.includes("b")).toBeTruthy();
    expect(checkedKeys.includes("c")).toBeTruthy();

    const result2 = converter.iterateObject([1, 2, 3], () => {
        throw new Error("This shouldn't be called.");
    }, null);
    expect(result2).toBeNull();

    const result3 = converter.iterateObject<Record<string, number>>({
        "a": 1,
        "b": 10,
        "c": 100,
    }, (key, value, curOutput) => {
        curOutput[key] = value * 10;
        return curOutput;
    }, {});
    expect(result3).toMatchObject({
        "a": 10,
        "b": 100,
        "c": 1000,
    });
});