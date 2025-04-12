// Imports
import nodeReadline from "node:readline";
import { Emitter } from "../util/emitter";

// Initializes keypress
const detector = (string: string | undefined, data: {
    ctrl: boolean;
    meta: boolean;
    name: string | undefined;
    sequence: string;
    shift: boolean;
}) => emitter.emit("key", {
    code: data.name ?? "",
    control: data.ctrl,
    meta: data.meta,
    raw: string ?? "",
    shift: data.shift,
    unicode: data.sequence
});
const emitter = new Emitter<{ "key": (key: Key) => void }>();

// Defines types
/** Key data. */
export type Key = {
    code: string;
    control: boolean;
    meta: boolean;
    raw: string;
    shift: boolean;
    unicode: string;
};

// Defines properties
/** Appends a keypress event listener. */
export const listen = emitter.on.bind(emitter, "key");
/** Mimics a keypress internally. */
export const press = emitter.emit.bind(emitter, "key");
/** Removes a keypress event listener. */
export const unlisten = emitter.off.bind(emitter, "key");

// Defines methods
/** Starts detecting keypress events. */
export function start(): void {
    process.stdin.setRawMode(true);
    nodeReadline.emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", detector);
}

/** Stops detecting keypress events. Does not remove existing listeners. */
export function stop(): void {
    process.stdin.setRawMode(false);
    process.stdin.off("keypress", detector);
}
