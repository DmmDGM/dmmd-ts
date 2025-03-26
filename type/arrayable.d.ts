// Exports
/** Converts a type into both its single form and its array form. */
export type Arrayable<Element extends any> = Element[] | Element;

/** Forces an arrayable type to collapse into its single form. */
export type NonArrayable<Element extends any> = Element extends any[] ? Element[number] : Element;

/** Forces a singleable type to collapse into its array form. */
export type NonSingleable<Element extends any> = Element extends any[] ? Element : Element[];

/** Converts a type into both its array form and its single form. */
export type Singleable<Element extends any[]> = Element | Element[number];
