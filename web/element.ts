// Defines types
/** Full options for element creation with custom shortcuts while still offering complete access to the internal
 *  properties. */
type ElementFullOptions<
    TagName extends keyof HTMLElementTagNameMap,
    Tag = HTMLElementTagNameMap[TagName]
> = ElementSimplifiedOptions<TagName> & { [ Key in keyof Tag ]: Tag[Key] };
/** Simplified options for element creation with custom shortcuts. */
type ElementSimplifiedOptions<
    TagName extends keyof HTMLElementTagNameMap,
    Tag = HTMLElementTagNameMap[TagName]
> = {
    attributes: Record<string, string>;
    classes: string[];
    events: Partial<{ [Event in keyof HTMLElementEventMap]: (
        this: Tag,
        event: HTMLElementEventMap[Event]
    ) => any }>;
    href: string;
    html: string;
    id: string;
    parent: HTMLElement;
    src: string;
    style: CSSStyleDeclaration;
    text: string;
};

/** Creates, initializes, and returns an element with a simplified set of options. */
export function create<
    TagName extends keyof HTMLElementTagNameMap
>(
    tagname: TagName,
    options: Partial<ElementSimplifiedOptions<TagName>> = {}
): HTMLElementTagNameMap[TagName] {
    // Creates element
    const element = document.createElement(tagname);

    // Initializes element
    const optionNames = Object.getOwnPropertyNames(options);
    for(let i = 0; i < optionNames.length; i++) {
        const optionName = optionNames[i] as keyof typeof options;
        switch(optionName) {
            case "attributes": {
                const attributes = options[optionName] ?? {};
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for(let j = 0; j < attributeNames.length; j++) {
                    const attributeName = attributeNames[j] as keyof typeof attributes;
                    const attribute = attributes[attributeName];
                    element.setAttribute(attributeName, attribute);
                }
                break;
            }
            case "classes": {
                const classes = options[optionName] ?? [];
                for(let i = 0; i < classes.length; i++) {
                    const token = classes[i];
                    element.classList.add(token);
                }
                break;
            }
            case "events": {
                const events = options[optionName] ?? {};
                const eventNames = Object.getOwnPropertyNames(events);
                for(let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName];
                    element.addEventListener(eventName, event as EventListenerOrEventListenerObject);
                }
                break;
            }
            case "href": {
                const href = options[optionName] ?? "";
                element.setAttribute("href", href);
                break;
            }
            case "html": {
                const html = options[optionName] ?? "";
                element.innerHTML = html;
                break;
            }
            case "id": {
                const id = options[optionName] ?? "";
                element.id = id;
                break;
            }
            case "parent": {
                const parent = options[optionName] ?? null;
                if(parent === null) continue;
                parent.appendChild(element);
                break;
            }
            case "src": {
                const src = options[optionName] ?? "";
                element.setAttribute("src", src);
                break;
            }
            case "style": {
                const style = options[optionName] ?? {};
                Object.assign(element.style, style);
                break;
            }
            case "text": {
                const text = options[optionName] ?? "";
                element.innerText = text;
                break;
            }
        }
    }

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
    const element = create(tagname);

    // Overwrites element
    const overwrite = Object.assign({}, options);
    const optionNames: (keyof ElementSimplifiedOptions<TagName>)[] = [
        "attributes", "classes", "events", "href",
        "html", "id", "parent", "src", "style", "text"
    ];
    for(let i = 0; optionNames.length; i++) delete overwrite[optionNames[i]];
    Object.assign(element, overwrite);

    // Returns element
    return element;
}
