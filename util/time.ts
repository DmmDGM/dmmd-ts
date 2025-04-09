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

/** Creates an interval that executes a callback in specified interval and returns callbacks that controls the
 *  interval. */
export function createInterval(
    callback: (this: NodeJS.Timeout) => any,
    time: number,
    createImmediate: boolean = false
): {
    refresh: (immediate?: boolean) => void,
    start: (immediate?: boolean) => void,
    stop: () => void
} {
    // Creates interval
    let interval = setInterval(callback, time);

    // Defines callbacks
    const start = (startImmediate: boolean = false) => {
        if(interval.hasRef()) return;
        interval = setInterval(callback, time);
        if(startImmediate) callback.call(interval);
    };
    const stop = () => clearInterval(interval);
    const refresh = (refreshImmediate: boolean = false) => {
        if(!interval.hasRef()) {
            start(refreshImmediate);
            return;
        }
        interval.refresh();
        if(refreshImmediate) callback.call(interval);
    };

    // Calls immediate
    if(createImmediate) callback.call(interval);

    // Returns callback
    return { refresh, start, stop };
}

/** Creates a timeout that executes after a specific time and returns callbacks that controls the timeout. */
export function createTimeout(
    callback: (this: NodeJS.Timeout) => any,
    time: number
): {
    refresh: () => void,
    start: () => void,
    stop: () => void
} {
    // Creates timeout
    let timeout = setTimeout(callback, time);

    // Defines callbacks
    const start = () => {
        if(timeout.hasRef()) return;
        timeout = setTimeout(callback, time);
    };
    const stop = () => clearTimeout(timeout);
    const refresh = () => timeout.hasRef() ? timeout.refresh() : start();

    // Returns callback
    return { refresh, start, stop };
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

