// Defines types
/** Collection of custom options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing. */
export type ElementCustomOptions<Element extends HTMLElement> = {
    attributes: { [ attribute: string ]: string };
    children: HTMLElement[] | HTMLElement;
    classes: string[];
    events: Partial<{ [ Event in keyof HTMLElementEventMap ]:
            ElementEventListener<Element, Event>[] |
            ElementEventListener<Element, Event>
    }>;
    href: string;
    html: string;
    id: string;
    parent: HTMLElement | null;
    src: string;
    style: Partial<CSSStyleDeclaration>;
    text: string;
};

/** Event listener callback. */
export type ElementEventListener<
    Element extends HTMLElement,
    EventName extends keyof HTMLElementEventMap
> = (
    this: Element,
    event: HTMLElementEventMap[EventName]
) => any;

/** Element modifier. */
export type ElementModifier<
    Element extends HTMLElement,
    OptionName extends keyof ElementOptions<Element>
> = (
    element: Element,
    option: ElementOptions<Element>[OptionName]
) => void;

/** Collection of element modifiers. */
export type ElementModifiers<Element extends HTMLElement> = {
    [ OptionName in keyof ElementOptions<Element> ]: ElementModifier<Element, OptionName>
};

/** Collection of native options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing. */
export type ElementNativeOptions<Element extends HTMLElement> = {
    [ Key in keyof Element ]: Element[Key]
};

/** Collection of options with custom shortcuts for element modification. */
export type ElementOptions<Element extends HTMLElement> =
    ElementCustomOptions<Element> &
    Omit<ElementNativeOptions<Element>, keyof ElementCustomOptions<Element>>;

// Defines constants
/** Default collection of modifiers. */
export const elementDefaultModifiers = {
    attributes: appendAttributes,
    children: appendChildren,
    classes: appendClasses,
    events: appendEvents,
    href: replaceHref,
    html: replaceHtml,
    id: replaceId,
    parent: replaceParent,
    src: replaceSrc,
    style: appendStyle,
    text: replaceText
} as const;

// Defines functions
/** Appends attributes to an element's attribute list. */
export function appendAttributes<Element extends HTMLElement>(
    element: Element,
    attributes: ElementOptions<Element>["attributes"]
): void {
    // Appends attributes
    const attributeNames = Object.getOwnPropertyNames(attributes);
    for(let i = 0; i < attributeNames.length; i++) {
        const attributeName = attributeNames[i] as keyof typeof attributes & string;
        const attribute = attributes[attributeName];
        element.setAttribute(attributeName, attribute);
    }
}

/** Appends children to an element's children. */
export function appendChildren<Element extends HTMLElement>(
    element: Element,
    children: ElementOptions<Element>["children"]
): void {
    // Appends children
    const list = Array.isArray(children) ? children : [ children ];
    for(let i = 0; i < list.length; i++) {
        const child = list[i];
        element.appendChild(child);
    }
}

/** Appends classes to an element's class list. */
export function appendClasses<Element extends HTMLElement>(
    element: Element,
    classes: ElementOptions<Element>["classes"]
): void {
    // Appends classes
    for(let i = 0; i < classes.length; i++) element.classList.add(classes[i]);
}

/** Appends events to an element's events. */
export function appendEvents<Element extends HTMLElement>(
    element: Element,
    events: ElementOptions<Element>["events"]
): void {
    // Appends events
    const eventNames = Object.getOwnPropertyNames(events);
    for(let i = 0; i < eventNames.length; i++) {
        const eventName = eventNames[i] as keyof typeof events & string;
        const event = events[eventName];
        const listeners = Array.isArray(event) ? event : [ event ];
        for(let j = 0; j < listeners.length; j++) element.addEventListener(eventName, listeners[j]);
    }
}

/** Appends stlye to an element's style. */
export function appendStyle<Element extends HTMLElement>(
    element: Element,
    style: ElementOptions<Element>["style"]
): void {
    // Appensd style
    Object.assign(element.style, style);
}

/** Clears an element's attribute list. */
export function clearAttributes<Element extends HTMLElement>(
    element: Element
): never {
    throw new Error("Not implemented.");
}

/** Clears an element's children. */
export function clearChildren<Element extends HTMLElement>(
    element: Element
): never {
    throw new Error("Not implemented.");
}

/** Clears an element's class list. */
export function clearClasses<Element extends HTMLElement>(
    element: Element
): never {
    throw new Error("Not implemented.");
}

/** Clears an element's events. */
export function clearEvents<Element extends HTMLElement>(
    element: Element
): never {
    throw new Error("Not implemented.");
}

/** Clears an element's estyle. */
export function clearStyle<Element extends HTMLElement>(
    element: Element
): never {
    throw new Error("Not implemented.");
}

/** Creates, initializes, and returns an element with a set of options. */
export function create<TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    options: Partial<ElementOptions<HTMLElementTagNameMap[TagName]>> = {},
    modifiers: Partial<ElementModifiers<HTMLElementTagNameMap[TagName]>> =
        elementDefaultModifiers as typeof modifiers
): HTMLElementTagNameMap[TagName] {
    // Creates element
    const element = document.createElement(tagName);

    // Initializes element
    modify(element, options, modifiers);

    // Returns element
    return element;
}

/** Deletes attributes from an element's attribute list. */
export function deleteAttributes<Element extends HTMLElement>(
    element: Element,
    attributes: ElementOptions<Element>["attributes"]
): never {
    throw new Error("Not implemented.");
}

/** Deletes children from an element's children. */
export function deleteChildren<Element extends HTMLElement>(
    element: Element,
    children: ElementOptions<Element>["children"]
): never {
    throw new Error("Not implemented.");
}

/** Deletes classes from an element's class list. */
export function deleteClasses<Element extends HTMLElement>(
    element: Element,
    classes: ElementOptions<Element>["classes"]
): never {
    throw new Error("Not implemented.");
}

/** Deletes events from an element's events. */
export function deleteEvents<Element extends HTMLElement>(
    element: Element,
    events: ElementOptions<Element>["events"]
): never {
    throw new Error("Not implemented.");
}

/** Deletes style from an element's styles. */
export function deleteStyle<Element extends HTMLElement>(
    element: Element,
    style: ElementOptions<Element>["style"]
): never {
    throw new Error("Not implemented.");
}

/** Replaces an element with a set of options. */
export function modify<Element extends HTMLElement>(
    element: Element,
    options: Partial<ElementOptions<Element>>,
    modifiers: Partial<ElementModifiers<Element>> = elementDefaultModifiers as typeof modifiers
): void {
    // Replaces element
    const overwrites = Object.assign({}, options);
    const overwriteNames = Object.getOwnPropertyNames(overwrites);
    for(let i = 0; i < overwriteNames.length; i++) {
        const overwriteName = overwriteNames[i] as keyof typeof overwrites;
        const overwrite = overwrites[overwriteName];
        if(typeof overwrite === "undefined") continue;
        if(overwriteName in modifiers) {
            delete overwrites[overwriteName];
            const modifier = modifiers[overwriteName] as ElementModifier<Element, typeof overwriteName>;
            if(typeof modifier === "undefined") continue;
            modifier(element, overwrite as ElementOptions<Element>[typeof overwriteName]);
        }
    }
    Object.assign(element, overwrites);
}

/** Replaces an element's attribute list. */
export function replaceAttributes<Element extends HTMLElement>(
    element: Element,
    attributes: ElementOptions<Element>["attributes"]
): void {
    // Replaces attributes
    for(let i = element.attributes.length - 1; i >= 0; i--)
        element.removeAttribute(element.attributes[i].name);
    appendAttributes(element, attributes);
}

/** Replaces an element's children. */
export function replaceChildren<Element extends HTMLElement>(
    element: Element,
    children: ElementOptions<Element>["children"]
): void {
    // Replaces children
    const list = Array.isArray(children) ? children : [ children ];
    element.replaceChildren(...list);
}

/** Replaces an element's class list. */
export function replaceClasses<Element extends HTMLElement>(
    element: Element,
    classes: ElementOptions<Element>["classes"]
): void {
    // Replaces classes
    element.classList = "";
    for(let i = 0; i < classes.length; i++) element.classList.add(classes[i]);
}

/** Replaces an element's events. */
export function replaceEvents<Element extends HTMLElement>(
    element: Element,
    events: ElementOptions<Element>["events"]
): void {
    // Replaces events
    const clone = element.cloneNode(false);
    element.replaceWith(clone);
    appendEvents(element, events);
}

/** Replaces an element's href. */
export function replaceHref<Element extends HTMLElement>(
    element: Element,
    href: ElementOptions<Element>["href"]
): void {
    // Replaces href
    element.setAttribute("href", href);
}

/** Replaces an element's inner html. */
export function replaceHtml<Element extends HTMLElement>(
    element: Element,
    html: ElementOptions<Element>["html"]
): void {
    // Replaces html
    element.innerHTML = html;
}

/** Replaces an element's id. */
export function replaceId<Element extends HTMLElement>(
    element: Element,
    id: ElementOptions<Element>["id"]
): void {
    // Replaces id
    element.id = id;
}

/** Replaces an element's parent. */
export function replaceParent<Element extends HTMLElement>(
    element: Element,
    parent: ElementOptions<Element>["parent"]
): void {
    // Replaces parent
    if(parent !== null) parent.appendChild(element);
    else if(element.parentElement !== null) element.parentElement.removeChild(element);
}

/** Replaces an element's src. */
export function replaceSrc<Element extends HTMLElement>(
    element: Element,
    src: ElementOptions<Element>["src"]
): void {
    // Replaces src
    element.setAttribute("src", src);
}

/** Replaces an element's style. */
export function replaceStyle<Element extends HTMLElement>(
    element: Element,
    style: ElementOptions<Element>["style"]
): void {
    // Replaces style
    element.style = "";
    appendStyle(element, style);
}

/** Replaces an element's inner text. */
export function replaceText<Element extends HTMLElement>(
    element: Element,
    text: ElementOptions<Element>["text"]
): void {
    // Replaces text
    element.innerText = text;
}
