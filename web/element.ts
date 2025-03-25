// Defines types
/** Element event listener. */
export type ElementListener<
    TargetElement extends HTMLElement,
    EventName extends keyof HTMLElementEventMap
> = ((this: TargetElement, event: HTMLElementEventMap[EventName]) => any) & EventListener;

/** Options for modifying element. */
export type ElementOptions<TargetElement extends HTMLElement> =
    ElementShortcuts<TargetElement> &
    Omit<ElementProperties<TargetElement>, keyof ElementShortcuts<TargetElement>>;

/** Native element properties. */
export type ElementProperties<TargetElement extends HTMLElement> = {
    [Key in keyof TargetElement]: TargetElement[Key]
};

/** Custom element shortcuts. */
export type ElementShortcuts<TargetElement extends HTMLElement> = {
    attributes: { [attribute: string]: string };
    children: HTMLElement[] | HTMLElement;
    classes: string[] | string;
    events: Partial<{ [EventName in keyof HTMLElementEventMap]:
        ElementListener<TargetElement, EventName>[] |
        ElementListener<TargetElement, EventName>
    }>;
    html: string;
    parent: HTMLElement | null;
    style: Partial<CSSStyleDeclaration>;
    text: string;
};

// Defines functions
/** Appends properties to element. */
export function append<TargetElement extends HTMLElement>(
    targetElement: TargetElement,
    options: Partial<ElementShortcuts<TargetElement>>
): TargetElement {
    // Appends properties to element
    type Shortcuts = Required<typeof options>;
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        // Handles option
        const optionName = optionNames[i] as keyof typeof options;
        switch(optionName) {
            // Handles attributes
            case "attributes": {
                // Appends attributes
                const attributes = (options[optionName] ?? {}) as Shortcuts["attributes"];
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for(let j = 0; j < attributeNames.length; j++) {
                    const attributeName = attributeNames[j] as string & keyof typeof attributes;
                    const attribute = attributes[attributeName];
                    targetElement.setAttribute(attributeName, attribute);
                }

                // Breaks
                break;
            }

            // Handles children
            case "children": {
                // Appends children
                const children = (options[optionName] ?? []) as Shortcuts["children"];
                if(Array.isArray(children)) {
                    for(let j = 0; j < children.length; j++) {
                        const child = children[j];
                        targetElement.appendChild(child);
                    }
                }
                else targetElement.appendChild(children);

                // Breaks
                break;
            }

            // Handles classes
            case "classes": {
                // Appends classes
                const classes = (options[optionName] ?? []) as Shortcuts["classes"];
                if(Array.isArray(classes)) {
                    for(let j = 0; j < classes.length; j++) {
                        const token = classes[j];
                        targetElement.classList.add(token);
                    }
                }
                else targetElement.classList.add(classes);

                // Breaks
                break;
            }

            // Handles events
            case "events": {
                // Appends events
                const events = (options[optionName] ?? {}) as Shortcuts["events"];
                const eventNames = Object.getOwnPropertyNames(events);
                for(let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName] ?? (() => {});
                    if(Array.isArray(event)) {
                        for(let k = 0; k < event.length; k++) {
                            const listener = event[k];
                            targetElement.addEventListener(eventName, listener);
                        }
                    }
                    else targetElement.addEventListener(eventName, event);
                }

                // Breaks
                break;
            }

            // Handles html
            case "html": {
                // Appends html
                const html = (options[optionName] ?? "") as Shortcuts["html"];
                targetElement.innerHTML += html;

                // Breaks
                break;
            }

            // Handles parent
            case "parent": {
                // Appends parent
                const parent = (options[optionName] ?? null) as Shortcuts["parent"];
                if(parent !== null) parent.appendChild(targetElement);

                // Breaks
                break;
            }

            // Handles style
            case "style": {
                // Appends style
                const style = (options[optionName] ?? {}) as Shortcuts["style"];
                Object.assign(targetElement.style, style);

                // Breaks
                break;
            }

            // Handles text
            case "text": {
                // Appends text
                const text = (options[optionName] ?? "") as Shortcuts["text"];
                targetElement.innerText += text;

                // Breaks
                break;
            }
        }
    }

    // Returns element
    return targetElement;
}

/** Creates and initializes element. */
export function create<TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    options: Partial<ElementOptions<HTMLElementTagNameMap[TagName]>>
): HTMLElementTagNameMap[TagName] {
    // Creates and returns element
    return modify(document.createElement(tagName), options);
}

/** Modifies element. */
export function modify<TargetElement extends HTMLElement>(
    targetElement: TargetElement,
    options: Partial<ElementOptions<TargetElement>>
): TargetElement {
    // Modifies element
    type Options = Required<typeof options>;
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        // Handles option
        const optionName = optionNames[i] as keyof typeof options;
        switch(optionName) {
            // Handles attributes
            case "attributes": {
                // Removes attributes
                for(let j = targetElement.attributes.length - 1; j >= 0; j--) {
                    const attribute = targetElement.attributes.item(j);
                    if(attribute === null) continue;
                    targetElement.removeAttribute(attribute.name);
                }

                // Appends attributes
                const attributes = (options[optionName] ?? {}) as NonNullable<Options["attributes"]>;
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for(let j = 0; j < attributeNames.length; j++) {
                    const attributeName = attributeNames[j] as string & keyof typeof attributes;
                    const attribute = attributes[attributeName];
                    targetElement.setAttribute(attributeName, attribute);
                }

                // Breaks
                break;
            }

            // Handles children
            case "children": {
                // Replaces children
                const children = (options[optionName] ?? []) as NonNullable<Options["children"]>;
                Array.isArray(children) ?
                    targetElement.replaceChildren(...children) :
                    targetElement.replaceChildren(children);

                // Breaks
                break;
            }

            // Handles classes
            case "classes": {
                // Removes classes
                targetElement.classList = "";

                // Appends classes
                const classes = (options[optionName] ?? []) as NonNullable<Options["classes"]>;
                if(Array.isArray(classes)) {
                    for(let j = 0; j < classes.length; j++) {
                        const token = classes[j];
                        targetElement.classList.add(token);
                    }
                }
                else targetElement.classList.add(classes);

                // Breaks
                break;
            }

            // Handles events
            case "events": {
                // Removes events
                const clone = targetElement.cloneNode();
                const children = targetElement.children;
                targetElement.replaceWith(clone);
                targetElement.replaceChildren(...Array.from(children));

                // Appends events
                const events = (options[optionName] ?? {}) as NonNullable<Options["events"]>;
                const eventNames = Object.getOwnPropertyNames(events);
                for(let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName] ?? (() => {});
                    if(Array.isArray(event)) {
                        for(let k = 0; k < event.length; k++) {
                            const listener = event[k];
                            targetElement.addEventListener(eventName, listener);
                        }
                    }
                    else targetElement.addEventListener(eventName, event);
                }

                // Breaks
                break;
            }

            // Handles html
            case "html": {
                // Replaces html
                const html = (options[optionName] ?? "") as NonNullable<Options["html"]>;
                targetElement.innerHTML = html;

                // Breaks
                break;
            }

            // Handles parent
            case "parent": {
                // Replaces parent
                const parent = (options[optionName] ?? null) as NonNullable<Options["parent"]>;
                if(parent === null && targetElement.parentElement !== null)
                    targetElement.parentElement.removeChild(targetElement);
                else if(parent !== null) parent.appendChild(targetElement);

                // Breaks
                break;
            }

            // Handles style
            case "style": {
                // Replaces style
                targetElement.style = "";
                const style = (options[optionName] ?? {}) as NonNullable<Options["style"]>;
                Object.assign(targetElement.style, style);

                // Breaks
                break;
            }

            // Handles text
            case "text": {
                // Replaces text
                const text = (options[optionName] ?? "") as NonNullable<Options["text"]>;
                targetElement.innerText = text;

                // Breaks
                break;
            }

            // Handles properties
            default: {
                // Replaces properties
                type Properties = ElementProperties<TargetElement>;
                const property = options[optionName] as Properties[typeof optionName];
                targetElement[optionName] = property;

                // Breaks
                break;
            }
        }
    }

    // Returns element
    return targetElement;
}

/** Removes properties from element. */
export function remove<TargetElement extends HTMLElement>(
    targetElement: TargetElement,
    options: Partial<ElementShortcuts<TargetElement> & {
        attributes: string[] | string;
        events: string[] | string;
        style: string[] | string;
    }>
): TargetElement {
    // Removes properties from element
    type Shortcuts = typeof options;
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        // Handles option
        const optionName = optionNames[i] as keyof typeof options;
        switch(optionName) {
            // Handles attributes
            case "attributes": {
                // Removes attributes
                const attributes = (options[optionName] ?? {}) as Shortcuts["attributes"];
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for(let j = 0; j < attributeNames.length; j++) {
                    const attributeName = attributeNames[j] as string & keyof typeof attributes;
                    const attribute = attributes[attributeName];
                    if(targetElement.getAttribute(attributeName) === attribute)
                        targetElement.removeAttribute(attributeName);
                }

                // Breaks
                break;
            }

            // Handles children
            case "children": {
                // Removes children
                const children = (options[optionName] ?? []) as Shortcuts["children"];
                if(Array.isArray(children)) {
                    for(let j = 0; j < children.length; j++) {
                        const child = children[j];
                        targetElement.removeChild(child);
                    }
                }
                else targetElement.removeChild(children);

                // Breaks
                break;
            }

            // Handles classes
            case "classes": {
                // Removes classes
                const classes = (options[optionName] ?? []) as Shortcuts["classes"];
                if(Array.isArray(classes)) {
                    for(let j = 0; j < classes.length; j++) {
                        const token = classes[j];
                        targetElement.classList.remove(token);
                    }
                }
                else targetElement.classList.remove(classes);

                // Breaks
                break;
            }

            // Handles events
            case "events": {
                // Appends events
                const events = (options[optionName] ?? {}) as Shortcuts["events"];
                const eventNames = Object.getOwnPropertyNames(events);
                for(let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName] ?? (() => {});
                    if(Array.isArray(event)) {
                        for(let k = 0; k < event.length; k++) {
                            const listener = event[k];
                            targetElement.addEventListener(eventName, listener);
                        }
                    }
                    else targetElement.addEventListener(eventName, event);
                }

                // Breaks
                break;
            }

            // Handles html
            case "html": {
                // Appends html
                const html = (options[optionName] ?? "") as Shortcuts["html"];
                targetElement.innerHTML += html;

                // Breaks
                break;
            }

            // Handles parent
            case "parent": {
                // Appends parent
                const parent = (options[optionName] ?? null) as Shortcuts["parent"];
                if(parent !== null) parent.appendChild(targetElement);

                // Breaks
                break;
            }

            // Handles text
            case "text": {
                // Appends text
                const text = (options[optionName] ?? "") as Shortcuts["text"];
                targetElement.innerText += text;

                // Breaks
                break;
            }

            // Handles properties
            default: {
                // Appends properties
                type Properties = ElementProperties<TargetElement>;
                const property = options[optionName] as Properties[typeof optionName];
                if(typeof targetElement[optionName] !== typeof property)
                    targetElement[optionName] = property;
                else switch(typeof targetElement[optionName]) {
                    case "bigint": {
                        (targetElement[optionName] as bigint) += property as bigint;
                        break;
                    }
                    case "number": {
                        (targetElement[optionName] as number) += property as number;
                        break;
                    }
                    case "object": {
                        deepMerge(targetElement[optionName] as object, property as object);
                        break;
                    }
                    case "string": {
                        (targetElement[optionName] as string) += property as string;
                        break;
                    }
                    default: {
                        targetElement[optionName] = property;
                        break;
                    }
                }

                // Breaks
                break;
            }
        }
    }

    // Returns element
    return targetElement;
}
