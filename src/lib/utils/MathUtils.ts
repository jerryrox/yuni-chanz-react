class MathUtils {
    
    /**
     * Clamps the specified value between min and max range.
     */
    clamp(value: number, min: number, max: number): number {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    /**
     * Parses the specified hexadecimal value to integer value.
     */
    parseHexToInt(hex: string, defaultValue: number = 0): number {
        const parsed = parseInt(hex, 16);
        if (Number.isNaN(parsed)) {
            return defaultValue;
        }
        return parsed;
    }

    /**
     * Returns the value between from and to using the specified interpolant.
     */
    lerp(from: number, to: number, interpolant: number): number {
        return (to - from) * interpolant + from;
    }

    /**
     * Returns the interpolant of specified value between from and to.
     */
    inverseLerp(from: number, to: number, value: number): number {
        return (value - from) / (to - from);
    }
}
export default new MathUtils();