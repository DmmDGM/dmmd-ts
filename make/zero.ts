// Imports
import { resolve as resolvePath, dirname as getDirectory } from "node:path";
import chalk from "chalk";
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
console.log(chalk.green(`Make: ${output} (${delta} ms)`));
