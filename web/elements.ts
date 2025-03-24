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
