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

export function createInterval(
    callback: (this: NodeJS.Timeout) => any,
    time: number,
    immediate: boolean = false
): {
    refresh: (immediate?: boolean) => void,
    start: (immediate?: boolean) => void,
    stop: () => void
} {
    // Creates interval
    let interval = setInterval(callback, time);
    let stop = () => clearInterval(interval);
    let start = (startImmediate: boolean = false) => {
        if(interval.hasRef()) interval = setInterval(callback, time);
        if(startImmediate) callback.call(interval);
    };
    let refresh = (refreshImmediate: boolean = false) => {
        interval.hasRef() ? interval.refresh() : start(refreshImmediate);
    };
    return { refresh, start, stop };
}

/** Creates a loop that executes a callback in specified intervals and returns a callback that stops the loop. */
export function loop(
    callback: (this: NodeJS.Timeout) => any,
    time: number,
    immediate: boolean = false
): () => void {
    // Creates interval
    const interval = setInterval(callback, time);
    const stop = () => clearInterval(interval);

    // Calls immediate
    if(immediate) callback.call(interval);

    // Returns stop
    return stop;
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

