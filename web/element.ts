export function create<Tag extends keyof HTMLElementTagNameMap>(tag: Tag): HTMLElementTagNameMap[Tag] {
    const element = document.createElement(tag);

    return element;
}

create("a")