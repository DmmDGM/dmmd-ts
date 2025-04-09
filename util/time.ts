// Defines functions
/** Creates and returns a callback, which returns the delta time elapsed time since the initialization function is
 *  called. */
export function beep(): () => number {
    // Creates callback
    const start = performance.now();
    const boop = () => performance.now() - start;

    // Returns callback
    return boop;
}

/** Creates and returns a callback, which prints and returns the delta time elapsed since the initialization function
 *  is called.
 * 
 *  Essentially a replication of `console.time` and `console.timeEnd`. */
export function ping(name: string = "default"): () => number {
    // Creates callbacks
    const boop = beep();
    const pong = () => {
        const delta = boop();
        console.log(name + ": " + String(delta) + " ms");
        return delta;
    }

    // Returns callback
    return pong;
}

/** Creates and returns a promise that resolves after a set amount of milliseconds.
 * 
 *  Please prefer `Bun.sleep` or `Bun.sleepSync` for client-side. */
export function sleep(time: number): Promise<void> {
    // Returns timeout
    return new Promise((resolve: () => void) => {
        setTimeout(resolve, time);
    });
}
