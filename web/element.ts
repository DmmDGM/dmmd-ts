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
/** Collection of element modifiers. */
export const modifiers = {
    attributes: modifyAttributes,
    classes: modifyClasses,
    events: modifyEvents,
    href: modifyHref,
    html: modifyHtml,
    id: modifyId,
    parent: modifyParent,
    src: modifySrc,
    style: modifyStyle,
    text: modifyText
};

/** Modifies an element with a simplied set of options. */
export function modify<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    options: Partial<ElementSimplifiedOptions<Element>>
): void {
    // Modifies element
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        const optionName = optionNames[i] as keyof typeof options;
        if(optionName in modifiers) modifiers[optionName](element, )
    }
}

/** Modifies an element's attributes */
export function modifyAttributes<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    attributes: ElementSimplifiedOptions["attributes"]
): void {
    // Modifies attributes
    const attributeNames = Object.getOwnPropertyNames(attributes);
    for(let j = 0; j < attributeNames.length; j++) {
        const attributeName = attributeNames[j] as keyof typeof attributes;
        const attribute = attributes[attributeName];
        element.setAttribute(attributeName, attribute);
    }
}

/** Modifies an element's class list. */
export function modifyClasses<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    classes: ElementSimplifiedOptions["classes"]
): void {
    // Modifies classes
    for(let i = 0; i < classes.length; i++) {
        const token = classes[i];
        element.classList.add(token);
    }
}

/** Modifies an element's events. */
export function modifyEvents<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    events: ElementSimplifiedOptions["events"]
): void {
    // Modifies events
    const eventNames = Object.getOwnPropertyNames(events);
    for(let j = 0; j < eventNames.length; j++) {
        const eventName = eventNames[j] as keyof typeof events;
        const event = events[eventName] as EventListenerOrEventListenerObject;
        element.addEventListener(eventName, event);
    }
}

/** Modifies an element's href. */
export function modifyHref<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    href: ElementSimplifiedOptions["href"]
): void {
    // Modifies events
    element.setAttribute("href", href);
}

/** Modifies an element's inner html. */
export function modifyHtml<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    html: ElementSimplifiedOptions["html"]
): void {
    // Modifies events
    element.innerHTML = html;
}

/** Modifies an element's id. */
export function modifyId<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    id: ElementSimplifiedOptions["id"]
): void {
    // Modifies events
    element.id = id;
}

/** Modifies an element's parent. */
export function modifyParent<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    parent: ElementSimplifiedOptions["parent"]
): void {
    // Modifies events
    parent.appendChild(element);
}

/** Modifies an element's src. */
export function modifySrc<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    src: ElementSimplifiedOptions["src"]
): void {
    // Modifies events
    element.setAttribute("src", src);
}

/** Modifies an element's style. */
export function modifyStyle<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    style: ElementSimplifiedOptions["style"]
): void {
    // Modifies events
    Object.assign(element.style, style);
}

/** Modifies an element's inner text. */
export function modifyText<
    Element extends HTMLElement = HTMLElement
>(
    element: Element,
    text: ElementSimplifiedOptions["text"]
): void {
    // Modifies events
    element.innerText = text;
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
