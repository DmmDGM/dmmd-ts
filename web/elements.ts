import { create, modify } from "./element";

export type ElementShortcuts<TargetElement extends HTMLElement> = {
    attributes: { [ attribute: string ]: string };
    children: HTMLElement[] | HTMLElement;
    classes: string[] | string;
    events: Partial<{ [ EventName in keyof HTMLElementEventMap ]:
        ElementListener<TargetElement, EventName>[] |
        ElementListener<TargetElement, EventName>[]
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
    [ Key in keyof TargetElement ]: TargetElement[Key]
};

export type ElementListener<
    TargetElement extends HTMLElement,
    EventName extends keyof HTMLElementEventMap
> = (this: TargetElement, event: HTMLElementEventMap[EventName]) => any;

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
    
}