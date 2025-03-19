// Defines constants
/** Default bigint value */
export const bigintPrimitive = BigInt(Number());
/** Default boolean value */
export const booleanPrimitive = Boolean();
/** Default function value */
export const functionPrimitive = Function();
/** Default null value */
export const nullPrimitive = Object.getPrototypeOf(Object.getPrototypeOf(Object()));
/** Default number value */
export const numberPrimitive = Number();
/** Default empty value */
export const objectPrimitive = Object();
/** Default string value */
export const stringPrimitive = String();
/** Default symbol value */
export const symbolPrimitive = Symbol();
/** Default undefined value */
export const undefinedPrimitive = void 0;
/** Bigint type */
export const bigintType = typeof bigintPrimitive;
/** Boolean type */
export const booleanType = typeof booleanPrimitive;
/** Function type */
export const functionType = typeof functionPrimitive;
/** Number type */
export const numberType = typeof numberPrimitive;
/** Object type */
export const objectType = typeof objectPrimitive;
/** String type */
export const stringType = typeof stringPrimitive;
/** Symbol type */
export const symbolType = typeof symbolPrimitive;
/** Undefined type */
export const undefinedType = typeof undefinedPrimitive;
