// Defines types
/** Loop controls. */
export type Loop = {
    now: () => Loop;
    reset: () => Loop;
    start: () => Loop;
    stop: () => Loop;
};

// Defines methods
/** Creates and returns a callback, which returns the delta time elapsed time since the initialization function is
 *  called. */
export function beep(): () => number {
    // Creates callback
    const start = performance.now();
    const boop = () => performance.now() - start;

    // Returns callback
    return boop;
}

/** Creates a loop that executes a callback in specified interval and returns controls for the loop. */
export function loop(callback: () => any, interval: number): Loop {
    // Creates timeout
    const tick = (expected: number = performance.now() + interval) => setTimeout(() => {
        // Triggers callback
        callback();

        // Ticks timeout
        timeout = tick(expected + interval);
    }, expected - performance.now());
    let timeout: NodeJS.Timeout = tick();

    // Creates controls
    const controls = {
        now: () => {
            controls.reset();
            callback();
            return controls;
        },
        reset: () => {
            if(timeout.hasRef()) timeout.refresh();
            else timeout = tick();
            return controls;
        },
        start: () => {
            if(!timeout.hasRef()) timeout = tick();
            return controls;
        },
        stop: () => {
            clearTimeout(timeout);
            return controls;
        }
    };

    // Returns callbacks
    return controls;
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
