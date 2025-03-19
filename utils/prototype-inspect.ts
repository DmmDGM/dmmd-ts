// Defines constants
/** Bigint prototype */
export const bigintPrototype = Object.getPrototypeOf(0n);
/** Boolean prototype */
export const booleanPrototype = Object.getPrototypeOf(false);
/** Function prototype */
export const functionPrototype = Object.getPrototypeOf(() => { });
/** Number prototype */
export const numberPrototype = Object.getPrototypeOf(0);
/** Object prototype */
export const objectPrototype = Object.getPrototypeOf({});
/** String prototype */
export const stringPrototype = Object.getPrototypeOf("");
/** Symbol prototype */
export const symbolPrototype = Object.getPrototypeOf(Symbol.for(""));

// Defines functions
/** Finds and returns the closest common prototype of two non-undefined values or null if either is null */
export function findCommonPrototype(left: null, right: unknown): null;
export function findCommonPrototype(left: unknown, right: null): null;
export function findCommonPrototype(left: unknown, right: unknown): object;
export function findCommonPrototype(left: null | unknown, right: null | unknown): object | null {
	// Parses prototype chain
	const leftChain = parsePrototypeChain(left);
	const rightChain = parsePrototypeChain(right);

	// Finds common prototype
	const iterator = leftChain.values();
	let prototype = iterator.next();
	while (!prototype.done) {
		if (rightChain.has(prototype.value)) return prototype.value;
		prototype = iterator.next();
	}

	// Handles null values
	return null;
}

/** Parses and returns a set containing the entire prototype chain of an non-undefined value */
export function parsePrototypeChain(value: null): Set<never>;
export function parsePrototypeChain(value: unknown): Set<object>;
export function parsePrototypeChain(value: null | unknown): Set<object | never> {
	// Handles undefined value
	if (typeof value === "undefined")
		throw new Error("Prototype chain does not exists on undefined");

	// Handles null value
	const chain: Set<object> = new Set();
	if (value === null) return chain;

	// Parses prototype chain
	let prototype = Object.getPrototypeOf(value);
	while (prototype !== null) {
		chain.add(prototype);
		prototype = Object.getPrototypeOf(prototype);
	}

	// Returns chain
	return chain;
}
