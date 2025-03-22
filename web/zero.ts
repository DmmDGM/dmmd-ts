// Defines private constants
/** Alias for `document`. */
const page = document;

/** Alias for `Object.defineProperty`. */
const put = Object.defineProperty;

/** Alias for `"querySelector"`. */
let querySelector = "querySelector";

// Defines private functions
/** Deep assigns object. */
const assign = (target: any, data: Record<string, any>): void => {
    for(const key in data) {
        const value = data[key as keyof typeof data];
        typeof value === "object" ? assign(target[key], value) : target[key] = value;
    }
}

/** Wraps then iterates element with custom shortcuts. */
const modify = (element: HTMLElement, properties: object): HTMLElement => {
    // Wraps element
    const define = (property: string, map: string) => !(0 in element) && put(element, property, {
        // @ts-ignore
        get: () => element[map], set: (value: any) => element[map] = value
    });
    define("text", "innerText");
    define("html", "innerHTML");
    define("class", "classList");
    // @ts-ignore
    element[0] = 0;

    // Iterates properties
    assign(element, properties);

    // Returns element
    return element;
}

// Defines functions
/** Query selects and assigns properties to element. */
export const z = (query: string, properties: object): HTMLElement =>
    // @ts-ignore
    modify(page[querySelector](query) as HTMLElement, properties);

/** Query selects assigns properties to multiple elements. */
export const zs = (query: string, properties: object): HTMLElement[] => {
    // Iterates elements
    // @ts-ignore
    const elements = [ ...page[querySelector + "All"](query) ]
        .map(element => modify(element as HTMLElement, properties)) as HTMLElement[];

    // Defines shortcuts
    const define = (property: string) => put(elements, property, {
        // @ts-ignore
        get: () => elements.map(element => element[property]),
        // @ts-ignore
        set: (value: any) => elements.map(element => element[property] = value)
    });
    define("text");
    define("html");
    define("class");

    // Returns elements
    return elements;
}
