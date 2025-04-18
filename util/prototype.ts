// Defines methods
/** Finds and returns the closest common prototype of two non-undefined values. */
export function findCommonPrototype(left: unknown, right: unknown): object | null {
	// Parses prototype chain
	const leftChain = parsePrototypeChain(left);
	const rightChain = parsePrototypeChain(right);

	// Finds common prototype
	const iterator = leftChain.values();
	let prototype = iterator.next();
	while(!prototype.done) {
		if(rightChain.has(prototype.value)) return prototype.value;
		prototype = iterator.next();
	}

	// Handles null prototype
	return null;
}

/** Parses and returns a set containing the entire prototype chain of a non-undefined value. */
export function parsePrototypeChain(value: unknown): Set<object> {
	// Handles undefined value
	if(typeof value === "undefined") throw new Error("Prototype chain does not exists on undefined");

	// Handles null value
	const chain: Set<object> = new Set();
	if(value === null) return chain;

	// Parses prototype chain
	let prototype = Object.getPrototypeOf(value);
	while(prototype !== null) {
		chain.add(prototype);
		prototype = Object.getPrototypeOf(prototype);
	}

	// Returns chain
	return chain;
}
