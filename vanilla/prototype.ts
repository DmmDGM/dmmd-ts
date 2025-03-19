// Imports
import * as primitive from "./primitive";

// Defines constants
/** Bigint prototype constant. */
export const bigintPrototype = Object.getPrototypeOf(primitive.bigintPrimitive);
/** Boolean prototype constant. */
export const booleanPrototype = Object.getPrototypeOf(primitive.booleanPrimitive);
/** Function prototype constant. */
export const functionPrototype = Object.getPrototypeOf(primitive.functionPrimitive);
/** Number prototype constant. */
export const numberPrototype = Object.getPrototypeOf(primitive.numberPrimitive);
/** Object prototype constant. */
export const objectPrototype = Object.getPrototypeOf(primitive.objectPrimitive);
/** String prototype constant. */
export const stringPrototype = Object.getPrototypeOf(primitive.stringPrimitive);
/** Symbol prototype constant. */
export const symbolPrototype = Object.getPrototypeOf(primitive.symbolPrimitive);

// Defines functions
/** Finds and returns the closest common prototype of two non-undefined values or null if either
 *  is null. */
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

/** Parses and returns a set containing the entire prototype chain of a non-undefined value. */
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

/** Checks and returns whether a non-undefined value is an instance of a parent.
 *  
 *  Please prefer `typeof` and `instanceof` when strict prototype chain check is not required. */
export function testParentPrototype(value: unknown, parent: object): boolean {
	// Parses chain
	const chain = parsePrototypeChain(value);
	
	// Returns result
	return chain.has(parent);
}
