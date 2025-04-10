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

/** Creates a loop that executes a callback in specified interval and returns callbacks that controls the loop. */
export function loop(
    callback: () => any,
    time: number,
    createImmediate: boolean = false
): {
    restart: (immediate?: boolean) => void,
    start: (immediate?: boolean) => void,
    stop: () => void
} {
    // Creates interval
    let interval = setInterval(callback, time);

    // Defines callbacks
    const start = (startImmediate: boolean = false) => {
        if(interval.hasRef()) return;
        interval = setInterval(() => callback(), time);
        if(startImmediate) callback();
    };
    const stop = () => clearInterval(interval);
    const restart = (refreshImmediate: boolean = false) => {
        if(!interval.hasRef()) return start(refreshImmediate);
        interval.refresh();
        if(refreshImmediate) callback();
    };

    // Calls immediate
    if(createImmediate) callback();

    // Returns callback
    return { restart, start, stop };
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
