/** Creates and returns a callback function, which returns the time elapsed time since the initialization function is
 *  called */
export function beep() {
    // Creates callback function
    const start = performance.now();
    const boop = () => performance.now() - start;

    // Returns callback function
    return boop;
}
