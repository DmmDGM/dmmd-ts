// Defines methods
/** Runs an asynchronous callback and returns the result or a fallback value if an error occurs. */
export async function attemptAsync<Value extends any>(
    callback: () => Promise<Value>,
    fallback: Promise<Value> | Value
): Promise<Value> {
    // Attempts callback
    try {
        return await callback();
    }
    
    // Returns fallback
    catch {
        return await fallback;
    }
}

/** Runs a synchronous callback and returns the result or a fallback value if an error occurs. */
export function attemptSync<Value extends any>(
    callback: () => Value,
    fallback: Value
): Value {
    // Attempts callback
    try {
        return callback();
    }
    
    // Returns fallback
    catch {
        return fallback;
    }
}

/** Runs an asynchronous callback and returns the result and the error if one occurs. */
export async function runAsync<Value extends any>(
    callback: () => Promise<Value>
): Promise<[ Value, null, null ] | [ null, Error, unknown ]> {
    // Attempts callback
    try {
        return [ await callback(), null, null ];
    }

    // Returns error
    catch(error) {
        return [ null, error instanceof Error ? error : new Error(String(error)), error ];
    }
}

/** Runs a synchronous callback and returns the result and the error if one occurs. */
export function runSync<Value extends any>(
    callback: () => Value
): [ Value, null, null ] | [ null, Error, unknown ] {
    // Attempts callback
    try {
        return [ callback(), null, null ];
    }

    // Returns error
    catch(error) {
        return [ null, error instanceof Error ? error : new Error(String(error)), error ];
    }
}
