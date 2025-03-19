function beep() {
    const start = performance.timeOrigin + performance.now();
    const boop = () => performance.timeOrigin + performance.now() - start;
    return boop;
}