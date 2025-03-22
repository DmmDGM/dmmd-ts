// Defines types
/** Collection of custom options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing. */
export type ElementSimplifiedOptions<Element extends HTMLElement> = {
    attributes: { [ attribute: string ]: string };
    children: HTMLElement[];
    classes: string[];
    events: Partial<{ [ Event in keyof HTMLElementEventMap ]: (
        this: Element,
        event: HTMLElementEventMap[Event][] | HTMLElementEventMap[Event]
    ) => any }>;
    href: string;
    html: string;
    id: string;
    parent: HTMLElement | null;
    src: string;
    style: Partial<CSSStyleDeclaration>;
    text: string;
};
/** Collection of native options for element modification.
 * 
 *  Please prefer `ElementOption<Element>` unless you know what you are doing. */
export type ElementNativeOptions<Element extends HTMLElement> = { [ Key in keyof Element ]: Element[Key] };
/** Collection of options with custom shortcuts for element modification. */
export type ElementOptions<Element extends HTMLElement> =
    ElementSimplifiedOptions<Element> &
    Omit<ElementNativeOptions<Element>, keyof ElementSimplifiedOptions<Element>>;
export type ElementModifiers<Element extends HTMLElement> = { [ Option in keyof ElementOptions<Element> ]: (
    element: Element,
    option: ElementOptions<Element>[Option]
) => void };

// Defines constants
/** Default collection of modifiers. */
export const elementDefaultModifiers: Partial<ElementModifiers<HTMLElement>> = {
    attributes: appendAttributes,
    children: appendChildren,
    classes: appendClasses,
    events: appendEvents,
    href: modifyHref,
    html: modifyHtml,
    id: modifyId,
    parent: modifyParent,
    src: modifySrc,
    style: appendStyle,
    text: modifyText
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

/** Modifies an element with a set of options. */
export function modify<Element extends HTMLElement>(
    element: Element,
    options: Partial<ElementOptions<Element>>,
    modifiers: Partial<ElementModifiers<Element>> = elementDefaultModifiers as typeof modifiers
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

/** Appends attributes to an element's attributes list.
 * 
 *  Alias of `element.setAttribute(attribute, value)`.
 */
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

/** Replaces an element's attributes list */
export function replaceAttributes<Element extends HTMLElement>(
    element: Element,
    attributes: ElementOptions<Element>["attributes"]
): void {
    // Replaces attributes
    for(let i = element.attributes.length - 1; i >= 0; i--)
        element.removeAttribute(element.attributes[i].name);
    appendAttributes(element, attributes);
}

/** Appends children to an element's children list.
 * 
 *  Alias of `element.appendChild(child)`;
*/
export function appendChildren<Element extends HTMLElement>(
    element: Element,
    children: ElementOptions<Element>["children"]
): void {
    // Appends children
    for(let i = 0; i < children.length; i++) {
        const child = children[i];
        element.appendChild(child);
    }
}

/** Replaces an element's children list.
 *  
 *  Alias of `element.replaceChildren(...children)`. */
export function replaceChildren<Element extends HTMLElement>(
    element: Element,
    children: ElementOptions<Element>["children"]
): void {
    // Replaces children
    element.replaceChildren(...children);
}

/** Appends classes to an element's class list.
 * 
 *  Alias of `element.classList.add(class)`.
*/
export function appendClasses<Element extends HTMLElement>(
    element: Element,
    classes: ElementOptions<Element>["classes"]
): void {
    // Appends classes
    for(let i = 0; i < classes.length; i++) element.classList.add(classes[i]);
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

/** Appends events to an element's events.
 * 
 *  Alias of `element.addEventListener(event, listener)`.
*/
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

/** Modifies an element's href.
 * 
 *  Alias of `element.href = href`. */
export function modifyHref<Element extends HTMLElement>(
    element: Element,
    href: ElementOptions<Element>["href"]
): void {
    // Modifies href
    element.setAttribute("href", href);
}

/** Modifies an element's inner html.
 * 
 *  Alias of `element.innerHTML = html`. */
export function modifyHtml<Element extends HTMLElement>(
    element: Element,
    html: ElementOptions<Element>["html"]
): void {
    // Modifies html
    element.innerHTML = html;
}

/** Modifies an element's id.
 * 
 *  Alias of `element.id = id`. */
export function modifyId<Element extends HTMLElement>(
    element: Element,
    id: ElementOptions<Element>["id"]
): void {
    // Modifies id
    element.id = id;
}

/** Modifies an element's parent.
 * 
 *  Alias of `parent.appendChild(element)` or `parent.removeChild(element)` if parent is null. */
export function modifyParent<Element extends HTMLElement>(
    element: Element,
    parent: ElementOptions<Element>["parent"]
): void {
    // Modifies parent
    if(parent === null) {
        if(element.parentElement !== null) element.parentElement.removeChild(element);
    }
    else parent.appendChild(element);
}

/** Modifies an element's src.
 * 
 *  Alias of `parent.src = src;`. */
export function modifySrc<Element extends HTMLElement>(
    element: Element,
    src: ElementOptions<Element>["src"]
): void {
    // Modifies src
    element.setAttribute("src", src);
}

/** Appends stlye to an element's style. */
export function appendStyle<Element extends HTMLElement>(
    element: Element,
    style: ElementOptions<Element>["style"]
): void {
    // Appensd style
    Object.assign(element.style, style);
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

/** Modifies an element's inner text.
 * 
 *  Alias of `element.innerText = text`. */
export function modifyText<Element extends HTMLElement>(
    element: Element,
    text: ElementOptions<Element>["text"]
): void {
    // Modifies text
    element.innerText = text;
}
