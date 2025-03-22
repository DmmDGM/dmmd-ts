// Defines types
/** Collection of custom options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing.
*/
export type ElementSimplifiedOptions<Element extends HTMLElement> = {
    attributes: { [ attribute: string ]: string };
    classes: string[];
    events: Partial<{ [ Event in keyof HTMLElementEventMap ]: (
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
/** Collection of native options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing.
*/
export type ElementNativeOptions<Element extends HTMLElement> = { [ Key in keyof Element ]: Element[Key] };
/** Collection of options with custom shortcuts for element modification. */
export type ElementOptions<Element extends HTMLElement> =
    ElementSimplifiedOptions<Element> &
    Omit<ElementNativeOptions<Element>, keyof ElementSimplifiedOptions<Element>>;

// Defines constants
/** Default collection of modifiers. */
export const elementDefaultModifiers = {
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
}

/** Creates, initializes, and returns an element with a set of options. */
export function create<TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    options: Partial<ElementOptions<HTMLElementTagNameMap[TagName]>> = {},
    modifiers: Partial<{ [ Key in keyof ElementOptions<HTMLElementTagNameMap[TagName]> ]: (
        element: HTMLElementTagNameMap[TagName],
        option: ElementOptions<HTMLElementTagNameMap[TagName]>[Key]
    ) => void }> = elementDefaultModifiers as typeof modifiers
): HTMLElementTagNameMap[TagName] {
    // Creates element
    const element = document.createElement(tagName);

    // Initializes element
    modify(element, options, modifiers);

    // Returns element
    return element;
}

/** Modifies an element with a set of options. */
export function modify<Element extends HTMLElement>(
    element: Element,
    options: Partial<ElementOptions<Element>>,
    modifiers: Partial<{ [ Key in keyof ElementOptions<Element> ]: (
        element: Element,
        option: ElementOptions<Element>[Key]
    ) => void }> = elementDefaultModifiers as typeof modifiers
): void {
    // Modifies element
    const overwrites = Object.assign({}, options);
    const overwriteNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < overwriteNames.length; i++) {
        const overwriteName = overwriteNames[i] as keyof typeof overwrites;
        const overwrite = overwrites[overwriteName];
        if(typeof overwrite === "undefined") continue;
        if(overwriteName in modifiers) {
            delete overwrites[overwriteName];
            const modifier = modifiers[overwriteName];
            if(typeof modifier === "undefined") continue;
            modifier(element, overwrite as any);
        }
    }
    Object.assign(element, overwrites);
}

/** Modifies an element's attributes */
export function modifyAttributes<Element extends HTMLElement>(
    element: Element,
    attributes: ElementOptions<Element>["attributes"]
): void {
    // Modifies attributes
    const attributeNames = Object.getOwnPropertyNames(attributes);
    for(let i = 0; i < attributeNames.length; i++) {
        const attributeName = attributeNames[i] as keyof typeof attributes & string;
        const attribute = attributes[attributeName];
        element.setAttribute(attributeName, attribute);
    }
}

/** Modifies an element's class list. */
export function modifyClasses<Element extends HTMLElement>(
    element: Element,
    classes: ElementOptions<Element>["classes"]
): void {
    // Modifies classes
    for(let i = 0; i < classes.length; i++) {
        const token = classes[i];
        element.classList.add(token);
    }
}

/** Modifies an element's events. */
export function modifyEvents<Element extends HTMLElement>(
    element: Element,
    events: ElementOptions<Element>["events"]
): void {
    // Modifies events
    const eventNames = Object.getOwnPropertyNames(events);
    for(let i = 0; i < eventNames.length; i++) {
        const eventName = eventNames[i] as keyof typeof events & string;
        const event = events[eventName] as EventListenerOrEventListenerObject;
        element.addEventListener(eventName, event);
    }
}

/** Modifies an element's href. */
export function modifyHref<Element extends HTMLElement>(
    element: Element,
    href: ElementOptions<Element>["href"]
): void {
    // Modifies events
    element.setAttribute("href", href);
}

/** Modifies an element's inner html. */
export function modifyHtml<Element extends HTMLElement>(
    element: Element,
    html: ElementOptions<Element>["html"]
): void {
    // Modifies events
    element.innerHTML = html;
}

/** Modifies an element's id. */
export function modifyId<Element extends HTMLElement>(
    element: Element,
    id: ElementOptions<Element>["id"]
): void {
    // Modifies events
    element.id = id;
}

/** Modifies an element's parent. */
export function modifyParent<Element extends HTMLElement>(
    element: Element,
    parent: ElementOptions<Element>["parent"]
): void {
    // Modifies events
    parent.appendChild(element);
}

/** Modifies an element's src. */
export function modifySrc<Element extends HTMLElement>(
    element: Element,
    src: ElementOptions<Element>["src"]
): void {
    // Modifies events
    element.setAttribute("src", src);
}

/** Modifies an element's style. */
export function modifyStyle<Element extends HTMLElement>(
    element: Element,
    style: ElementOptions<Element>["style"]
): void {
    // Modifies events
    Object.assign(element.style, style);
}

/** Modifies an element's inner text. */
export function modifyText<Element extends HTMLElement>(
    element: Element,
    text: ElementOptions<Element>["text"]
): void {
    // Modifies events
    element.innerText = text;
}
