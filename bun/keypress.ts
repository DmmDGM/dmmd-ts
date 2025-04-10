// Imports
import { Emitter } from "../util/emitter";

// Defines types
export type Key = {
    control: boolean;
    shift: boolean;
    meta: boolean;
    alt: boolean;
    key: string;
};

// Defines properties
export const emitter = new Emitter<{
    "bind": () => void;
    "unbind": () => void;
    "key": (key: string) => void;
}>();

// Defines methods
export function bind() {
    process.stdin.setRawMode(true);
    process.stdin.on("data", (data) => {
        console.log([ data, data.toString() ]);
        emitter.emit("key", data.toString());
        if(data.toString() === "C") process.exit();
    });
}

export function unbind(): void {
    process.stdin.setRawMode(false);
}
