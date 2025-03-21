/** Clamps and returns a value between a minimum and a maximum value. */
export function clamp(value: number, minimum: number, maximum: number): number {
    // Returns value
    return Math.min(Math.max(value, minimum), maximum);
}
