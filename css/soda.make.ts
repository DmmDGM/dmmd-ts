// Imports
import soda from "../json/soda.json";
import * as time from "../vanilla/time";
import chalk from "chalk";
import nodePath from "node:path";

// Initializes make
const boop = time.beep();

// Defines map
const input = nodePath.resolve(import.meta.dir, "./soda.make.css");
const output = nodePath.resolve(import.meta.dir, "./soda.css");
const source = await Bun.file(input).text();

// Defines target
const prefix = "sd";
const target = source.replaceAll(/%(.*?)%/g, (match: string, tag: string) => {
    return `--${prefix}-${tag}: ${soda[tag as keyof typeof soda]};`;
});
await Bun.write(output, target);

// Finalizes make
const delta = boop();
console.log(chalk.green(`${input} => ${output} (${delta} ms)`));
