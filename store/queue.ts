// Defines classes
export class Queue<Element extends unknown> {
    set: Set<Element>;

    constructor() {
        this.set = new Set();
    }

    clear(): void {
        
    }

    delete(element: Element): void {

    }

    pull(): Element | null {
        return null;
    }

    push(bump: boolean = false): void {
        
    }

    test(element: Element): boolean {
        return false;
    }
}
