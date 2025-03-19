// Defines types
/** Primitive value type. */
export type Primitive = typeof bigintPrimitive | typeof booleanPrimitive |
    typeof functionPrimitive | typeof nullPrimitive | typeof numberPrimitive|
    typeof objectPrimitive | typeof stringPrimitive | typeof symbolPrimitive |
    typeof undefinedPrimitive;
/** Primitive constructor type. */
export type PrimitiveConstructor = typeof bigintConstructor | typeof booleanConstructor |
    typeof functionConstructor | typeof numberConstructor | typeof objectConstructor |
    typeof stringConstructor | typeof symbolConstructor;
/** Primitive typeof type. */
export type PrimitiveType = typeof bigintType | typeof booleanType |
    typeof functionType | typeof numberType | typeof objectType |
    typeof stringType | typeof symbolType | typeof undefinedType;

// Defines constants
/** Default bigint constructor constant. */
export const bigintConstructor = BigInt;
/** Default function constructor constant. */
export const booleanConstructor = Boolean;
/** Default function constructor constant. */
export const functionConstructor = Function;
/** Default object constructor constant. */
export const objectConstructor = Object;
/** Default number constructor constant. */
export const numberConstructor = Number;
/** Default string constructor constant. */
export const stringConstructor = String;
/** Default symbol constructor constant. */
export const symbolConstructor = Symbol;
/** Default bigint value constant. */
export const bigintPrimitive = bigintConstructor(Number()) as bigint;
/** Default boolean value constant. */
export const booleanPrimitive = booleanConstructor() as boolean;
/** Default function value constant. */
export const functionPrimitive = functionConstructor() as () => void;
/** Default null value constant. */
export const nullPrimitive =
    Object.getPrototypeOf(Object.getPrototypeOf(objectConstructor())) as null;
/** Default number value constant. */
export const numberPrimitive = numberConstructor() as number;
/** Default nan value constant. */
export const nanPrimitive = Number(Object()) as number;
/** Default empty value constant. */
export const objectPrimitive = objectConstructor() as object;
/** Default string value constant. */
export const stringPrimitive = stringConstructor() as string;
/** Default symbol value constant. */
export const symbolPrimitive = symbolConstructor() as symbol;
/** Default undefined value constant. */
export const undefinedPrimitive = void 0 as undefined;
/** Bigint type constant. */
export const bigintType = typeof bigintPrimitive as "bigint";
/** Boolean type constant. */
export const booleanType = typeof booleanPrimitive as "boolean";
/** Function type constant. */
export const functionType = typeof functionPrimitive as "function";
/** Number type constant. */
export const numberType = typeof numberPrimitive as "number";
/** Object type constant. */
export const objectType = typeof objectPrimitive as "object";
/** String type constant. */
export const stringType = typeof stringPrimitive as "string";
/** Symbol type constant. */
export const symbolType = typeof symbolPrimitive as "symbol";
/** Undefined type constant. */
export const undefinedType = typeof undefinedPrimitive as "undefined";

/** Tests whether value is a type of or an instance of a primitive.
 * 
 *  Prefer `typeof` when strict type check is not required.
 */
export function testPrimitiveType(
    value: unknown,
    type: Primitive | PrimitiveConstructor | PrimitiveType | "null"
): boolean {
    switch(type) {
        case bigintConstructor:
        case booleanConstructor:
        case functionConstructor:
        case objectConstructor:
        case numberConstructor:
        case stringConstructor:
        case symbolConstructor: {
            return value !== null && Object.getPrototypeOf(value).constructor === type;
        }
        case bigintType:
        case booleanType:
        case functionType:
        case objectType:
        case "null":
        case numberType:
        case stringType:
        case symbolType:
        case undefinedType: {
            return (value === null && type === "null") ||
                (value !== null && typeof value === type);
        }
        default: {
            return (value === null && type === null) ||
                (value !== null && typeof !== null && typeof value)
        }
    }
}