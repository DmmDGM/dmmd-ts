type ElementBaseOptions<
    TagName extends keyof HTMLElementTagNameMap,
    Tag = HTMLElementTagNameMap[TagName]
> = {
    class: string[];
    events: Partial<{ [Event in keyof HTMLElementEventMap]: (
        this: Tag,
        event: HTMLElementEventMap[Event]
    ) => any }>;
    html: string;
    id: string;
    parent: HTMLElement;
    style: CSSStyleDeclaration
    text: string;
} & { [ Key in keyof Tag ]: Tag[Key] };

/** Creates, initializes, and returns an element with predefined options. */
export function create(
    // tag: Tag,
    // options: Partial<object> = {}
): HTMLElementTagNameMap[Tag] {
    const element = document.createElement(tag);
    element.style
    return element;
}
