// Defines methods
/** Merges sources and its nested children to target. */
export function deepAssign(target: object, ...sources: object[]): object {
    // Merges objects
    for(let i = 0; i < sources.length; i++) deepMerge(target, sources[i]);

    // Returns target
    return target;
}

/** Merges source and its nested children to target. */
export function deepMerge(target: object, source: object): object {
    // Initializes pair
    const pairs: [ object, object ][] = [
        [ target, source ]
    ];

    // Merges objects
    while(pairs.length > 0) {
        const [ targetObject, sourceObject ] = pairs.pop()!;
        const keys = Object.getOwnPropertyNames(sourceObject);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i] as keyof typeof sourceObject;
            const value = sourceObject[key];
            if(
                typeof targetObject[key] === "object" &&
                targetObject[key] !== null &&
                typeof value === "object" &&
                value !== null
            ) pairs.push([ targetObject[key], value ]);
            else targetObject[key] = value;
        }
    }

    // Returns target
    return target;
}
