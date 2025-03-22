// Defines private constants
/** Alias for `document`. */
const page = document;
/** Alias for `Object.defineProperty`. */
const put = Object.defineProperty;
/** Alias for `Symbol.for("z")`. */
const sign = Symbol.for("z");
/** Alias for `querySelect`. */
const select = page.querySelectorAll.bind(page);

// Defines private functions
/** Deep assigns object. */
const assign = (target: any, data: object): void => {
    for(const key in data) {
        const value = data[key as keyof typeof data];
        typeof value === "object" ? assign(target[key], value) : target[key] = value;
    }
}

/** Wraps then iterates element with custom shortcuts. */
const modify = (element: HTMLElement, properties: object): HTMLElement => {
    // Wraps element
    if(!(sign in element)) {
        const define = (property: string, map: string) => put(element, property, {
            // @ts-ignore
            get: () => element[map], set: (value: any) => element[map] = value
        });
        define("text", "innerText");
        define("html", "innerHTML");
        define("class", "classList");
        // @ts-ignore
        element[sign] = 0;
    }

    // Iterates properties
    assign(element, properties);

    // Returns element
    return element;
}

// Defines functions
/** Query selects and assigns properties to element.
 * 
 *  `z(query, properties)` stands for `zero(element, properties)`. */
export const z = (query: string, properties: object): HTMLElement => modify(select(query)[0] as HTMLElement, properties);

/** Query selects assigns properties to multiple elements.
 * 
 *  `zs(query, properties)` stands for `zeros(element, properties)`. */
export const zs = (query: string, properties: object): HTMLElement[] => {
    // Iterates elements
    // @ts-ignore
    const elements = [ ...select(query) ]
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
