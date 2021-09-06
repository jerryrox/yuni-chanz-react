export default abstract class ModelConverter<T = any> {

    /**
     * Converts the specified plain data into a structured data of type T.
     */
    abstract toModel(data: any): T;

    /**
     * Converts the specified model instance to plain data for storage.
     */
    abstract toPlain(model: T): any;

    /**
     * Provides array map function fo the specified value, if it is an array type.
     */
    mapArray<T>(value: any, mapper: (val: any, index: number, array: any[]) => T): T[] {
        if (Array.isArray(value)) {
            return value.map(mapper);
        }
        return [];
    }

    /**
     * Encodes the specified string to a plain value.
     */
    encodeString(value: string): any {
        return value;
    }

    /**
     * Encodes the specified bool to a plain value.
     */
    encodeBool(value: boolean): any {
        return value;
    }

    /**
     * Encodes the specified number to a plain value.
     */
    encodeNumber(value: number): any {
        return value;
    }

    /**
     * Encodes the specified date to a plain value.
     */
    encodeDate(value: Date): any {
        return value.getTime();
    }

    /**
     * Decodes the specified plain data into a string value.
     */
    decodeString(value: any): string | null {
        if(value === null || value === undefined) {
            return null;
        }
        return value.toString();
    }

    /**
     * Decodes the specified plain data into a boolean value.
     */
    decodeBool(value: any): boolean | null {
        if(value === null || value === undefined) {
            return null;
        }
        if(typeof(value) === "boolean") {
            return value;
        }
        if(typeof(value) === "string") {
            return value.toLowerCase() === "true";
        }
        return null;
    }

    /**
     * Decodes the specified plain data into an integer value.
     */
    decodeInt(value: any, radix = 10): number | null {
        const parsed = parseInt(value, radix);
        if(Number.isNaN(parsed)) {
            return null;
        }
        return parsed;
    }

    /**
     * Decodes the specified plain data into a float value.
     */
    decodeFloat(value: any): number | null {
        const parsed = parseFloat(value);
        if(Number.isNaN(parsed)) {
            return null;
        }
        return parsed;
    }

    /**
     * Decodes the specified plain data into a Date instance.
     */
    decodeDate(value: any): Date | null {
        if(value === null || value === undefined) {
            return null;
        }

        let date: Date | null = null;
        if(typeof(value) === "string") {
            date = new Date(Date.parse(value));
        }
        else if(typeof(value) === "number") {
            date = new Date(value);
        }
        else if(value instanceof Date) {
            date = value;
        }
        
        if(date === null || Number.isNaN(date.getTime())) {
            return null;
        }
        return date;
    }
}