// Imports
import { resolve as resolvePath } from "node:path";
import green from "chalk";
import soda from "../json/soda.json";
import { beep } from "../vanilla/time";

// Initializes make
const boop = beep();
const input = resolvePath(import.meta.dir, "./soda.css");
const output = resolvePath(import.meta.dir, "../css/soda.css");
const source = await Bun.file(input).text();

// Generates file
const prefix = "sd";
const target = source.replaceAll(/%(.*?)%/g, (match: string, tag: string) => {
    return `--${prefix}-${tag}: ${soda[tag as keyof typeof soda]};`;
});

// Finalizes make
await Bun.write(output, target);
const delta = boop();
console.log(green(`${input} => ${output} (${delta} ms)`));
