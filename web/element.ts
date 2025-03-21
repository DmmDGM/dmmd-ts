// Defines types
/** Full options for element creation with custom shortcuts. */
type ElementFullOptions<
    Element extends HTMLElement = HTMLElement
> = ElementSimplifiedOptions<Element> & { [ Key in keyof Element ]: Element[Key] };
/** Simplified options for element creation with custom shortcuts. */
type ElementSimplifiedOptions<
    Element extends HTMLElement = HTMLElement
> = {
    attributes: Record<string, string>;
    classes: string[];
    events: Partial<{ [Event in keyof HTMLElementEventMap]: (
        this: Element,
        event: HTMLElementEventMap[Event]
    ) => any }>;
    href: string;
    html: string;
    id: string;
    parent: HTMLElement;
    src: string;
    style: Partial<CSSStyleDeclaration>;
    text: string;
};

// Defines constants
/** Default element creation options. */
export const elementDefaultOptions: ElementSimplifiedOptions = {
    attributes: {},
    classes: [],
    events: {},
    href: "",
    html: "",
    id: "",
    parent: document.body,
    src: "",
    style: {},
    text: ""
};

/** Modifies element with a simplied set of options. */
export function modify<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    options: Partial<ElementSimplifiedOptions<Element>>
): Element {
    // Modifies element
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        const optionName = optionNames[i] as keyof typeof options;
        const option = options[optionName] ?? elementDefaultOptions[optionName];
        switch(optionName) {
            case "attributes": {
                const attributes = option as ElementSimplifiedOptions<Element>[typeof optionName];
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for(let j = 0; j < attributeNames.length; j++) {
                    const attributeName = attributeNames[j] as keyof typeof attributes;
                    const attribute = attributes[attributeName];
                    element.setAttribute(attributeName, attribute);
                }
                break;
            }
            case "classes": {
                const classes = option as ElementSimplifiedOptions<Element>[typeof optionName];
                for(let i = 0; i < classes.length; i++) {
                    const token = classes[i];
                    element.classList.add(token);
                }
                break;
            }
            case "events": {
                const events = option as ElementSimplifiedOptions<Element>[typeof optionName];
                const eventNames = Object.getOwnPropertyNames(events);
                for(let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName];
                    element.addEventListener(eventName, event as EventListenerOrEventListenerObject);
                }
                break;
            }
            case "href": {
                const href = option as ElementSimplifiedOptions<Element>[typeof optionName];
                element.setAttribute("href", href);
                break;
            }
            case "html": {
                const html = option as ElementSimplifiedOptions<Element>[typeof optionName];
                element.innerHTML = html;
                break;
            }
            case "id": {
                const id = option as ElementSimplifiedOptions<Element>[typeof optionName];
                element.id = id;
                break;
            }
            case "parent": {
                const parent = option as ElementSimplifiedOptions<Element>[typeof optionName];
                parent.appendChild(element);
                break;
            }
            case "src": {
                const src = option as ElementSimplifiedOptions<Element>[typeof optionName];
                element.setAttribute("src", src);
                break;
            }
            case "style": {
                const style = option as ElementSimplifiedOptions<Element>[typeof optionName];
                Object.assign(element.style, style);
                break;
            }
            case "text": {
                const text = option as ElementSimplifiedOptions<Element>[typeof optionName];
                element.innerText = text;
                break;
            }
        }
    }

    // Returns element
    return element;
}

/** Creates, initializes, and returns an element with a simplified set of options. */
export function create<
    TagName extends keyof HTMLElementTagNameMap,
    Element extends HTMLElement = HTMLElementTagNameMap[TagName]
>(
    tagname: TagName,
    options: Partial<ElementSimplifiedOptions<Element>> = {}
): HTMLElementTagNameMap[TagName] {
    // Creates element
    const element = document.createElement(tagname);

    // Initializes element
    modify(element, options);

    // Returns element
    return element;
}

/** Creates, initializes, and returns an element with a full set of options.
 *  
 *  Please prefer `create(tagname, options)` when total customization is not required.
 *  
 *  Collision in option types may occur. Please use with caution. */
export function createFull<
    TagName extends keyof HTMLElementTagNameMap
>(
    tagname: TagName,
    options: Partial<ElementFullOptions<TagName>> = {}
): HTMLElementTagNameMap[TagName] {
    // Creates and initializes element
    const element = document.createElement(tagname);

    // Initializes element
    Object.assign(element, options);
    modify(tagname, options);
    
    // Returns element
    return element;
}
