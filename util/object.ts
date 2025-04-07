// Defines functions
/** Merges sources and its nested children to target. */
export function deepAssign<TargetObject extends object>(
    target: TargetObject,
    ...sources: object[]
): TargetObject {
    // Merges objects
    for(let i = 0; i < sources.length; i++) deepMerge(target, sources[i]);

    // Returns target
    return target;
}

/** Merges source and its nested children to target. */
export function deepMerge<TargetObject extends object>(
    target: TargetObject,
    source: object
): TargetObject {
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
                typeof value === "object" &&
                value !== null
            ) pairs.push([ targetObject[key], value ]);
            else targetObject[key] = value;
        }
    }

    // Returns target
    return target;
}
