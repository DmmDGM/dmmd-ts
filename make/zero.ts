// Imports
import { resolve as resolvePath, dirname as getDirectory } from "node:path";
import green from "chalk";
import soda from "../json/soda.json";
import { beep } from "../util/time";

// Initializes make
const boop = beep();
const input = resolvePath(import.meta.dir, "../web/zero.ts");
const output = resolvePath(import.meta.dir, "../web/zero.js");

// Generates file
await Bun.build({
    entrypoints: [ input ],
    outdir: getDirectory(output),
    minify: true
});

// Finalizes make
const delta = boop();
console.log(green(`${output} (${delta} ms)`));
