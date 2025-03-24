export type ElementShortcuts<TargetElement extends HTMLElement> = {
    attributes: { [attribute: string]: string };
    children: HTMLElement[] | HTMLElement;
    classes: string[] | string;
    events: Partial<{ [EventName in keyof HTMLElementEventMap]:
        ElementListener<TargetElement, EventName>[] |
        ElementListener<TargetElement, EventName>
    }>;
    href: string;
    html: string;
    id: string;
    parent: HTMLElement | null;
    src: string;
    style: Partial<CSSStyleDeclaration>;
    text: string;
};

export type ElementProperties<TargetElement extends HTMLElement> = {
    [Key in keyof TargetElement]: TargetElement[Key]
};

export type ElementListener<
    TargetElement extends HTMLElement,
    EventName extends keyof HTMLElementEventMap
> = ((this: TargetElement, event: HTMLElementEventMap[EventName]) => any);

export type ElementOptions<TargetElement extends HTMLElement> =
    ElementShortcuts<TargetElement> &
    Omit<ElementProperties<TargetElement>, keyof ElementShortcuts<TargetElement>>;

export function create<TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    options: Partial<ElementOptions<HTMLElementTagNameMap[TagName]>>
): HTMLElementTagNameMap[TagName] {
    const targetElement = document.createElement(tagName);
    return modify(targetElement, options);
}

export function modify<TargetElement extends HTMLElement>(
    targetElement: TargetElement,
    options: Partial<ElementOptions<TargetElement>>
): TargetElement {
    // Modifies element
    type Shortcuts = ElementShortcuts<TargetElement>;
    const optionNames = Object.getOwnPropertyNames(options);
    for (let i = 0; i < optionNames.length; i++) {
        // Handles option
        const optionName = optionNames[i] as keyof typeof options;
        switch (optionName) {
            // Handles attributes
            case "attributes": {
                // Removes attributes
                for (let j = targetElement.attributes.length - 1; j >= 0; j--) {
                    const attribute = targetElement.attributes.item(j);
                    if (attribute === null) continue;
                    targetElement.removeAttribute(attribute.name);
                }

                // Appends attributes
                const attributes = (options[optionName] ?? {}) as Shortcuts["attributes"];
                const attributeNames = Object.getOwnPropertyNames(attributes);
                for (let j = 0; j < attributeNames.length; j++) {
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
                const children = (options[optionName] ?? []) as Shortcuts["children"];
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
                const classes = (options[optionName] ?? []) as Shortcuts["classes"];
                if (Array.isArray(classes)) {
                    for (let j = 0; j < classes.length; j++) {
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
                const events = (options[optionName] ?? {}) as Shortcuts["events"];
                const eventNames = Object.getOwnPropertyNames(events);
                for (let j = 0; j < eventNames.length; j++) {
                    const eventName = eventNames[j] as keyof typeof events;
                    const event = events[eventName];
                    if (Array.isArray(event)) {
                        for (let k = 0; k < event.length; k++) {
                            const listener = event[k] as EventListener;
                            targetElement.addEventListener(eventName, listener);
                        }
                    }
                    else targetElement.addEventListener(eventName, event as EventListener);
                }
            }
        }
    }
    return targetElement;
}