/** Creates and returns a callback function, which returns the time elapsed time since the initialization function is
 *  called. */
export function beep(): () => number {
    // Creates callback function
    const start = performance.now();
    const boop = () => performance.now() - start;

    // Returns callback function
    return boop;
}

/** Creates and returns a promise that resolves after a set amount of milliseconds. */
export function sleep(time: number): Promise<void> {
    // Returns timeout
    return new Promise((resolve: () => void) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
