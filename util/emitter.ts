// Defines classes
/** Simplified version of the native event emitter. */
export class Emitter<Events extends { [ event: string ]: (...parameters: any[]) => any }> {
    // Declares fields
    private _listeners: Partial<{ [ Event in keyof Events ]: Events[Event][] }>;
    
    // Defines constructor
    constructor() {
        // Initializes fields
        this._listeners = {};
    }

    /** Emits event. */
    emit<Event extends keyof Events>(event: Event, ...parameters: Parameters<Events[Event]>): this {
        // Emits event
        if(event in this._listeners) {
            const listeners = this._listeners[event]!;
            for(let i = 0; i < listeners.length; i++) listeners[i](...parameters);
        }

        // Returns self
        return this;
    }

    /** Existing listeners attached to the emitter. */
    get listeners(): Partial<{ readonly [ Event in keyof Events ]: readonly Events[Event][] }> {
        // Returns listeners
        return this._listeners;
    }

    /** Removes all references of a listener from the emitter. */
    off<Event extends keyof Events>(event: Event, listener: Events[Event]): this {
        // Removes listener
        if(event in this._listeners) {
            const listeners = this._listeners[event]!;
            for(let i = listeners.length; i >= 0; i--) {
                if(listeners[i] === listener) listeners.splice(i, 1);
            }
            if(listeners.length === 0) delete this._listeners[event];
        }

        // Returns self
        return this;
    }

    /** Appends listener to the emitter. */
    on<Event extends keyof Events>(event: Event, listener: Events[Event]): this {
        // Appends listener
        if(event in this._listeners) this._listeners[event]!.push(listener);
        else this._listeners[event] = [ listener ];

        // Returns self
        return this;
    }
}
