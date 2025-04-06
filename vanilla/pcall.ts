// Defines functions
/** Runs callback and returns the result or a fallback value if an error occurs. */
export function attempt<Value extends any>(callback: () => Value, fallback: Value): Value {
    // Attempts callback
    try {
        return callback();
    }
    
    // Returns fallback
    catch {
        return fallback;
    }
}

/** Runs callback and returns the result and the error if one occurs. */
export function inspect<Value extends any>(callback: () => Value): [ Value, null ] | [ null, unknown ] {
    // Attempts callback
    try {
        return [ callback(), null ];
    }

    // Returns error
    catch(error) {
        return [ null, error ];
    }
}
