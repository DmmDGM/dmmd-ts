// Imports
import { resolve as resolvePath } from "node:path";
import { clamp } from "../util/math";
import { beep } from "../util/time";
import chalk from "chalk";

// Defines types
type ColorHex = string;
type ColorRgb = [ number, number, number ];
type ColorPath = { light: ColorHex; base: ColorHex; dark: ColorHex; };

// Defines paths
const paths: { [ color: string ]: ColorPath } = {
    red: { light: "efcfcf", base: "ef4f4f", dark: "1f0000" },
    coral: { light: "efcfbf", base: "ef6f4f", dark: "1f0700" },
    orange: { light: "efcfaf", base: "ef8f4f", dark: "1f0f00" },
    amber: { light: "efdfbf", base: "efaf4f", dark: "1f1700" },
    yellow: { light: "efefcf", base: "efef4f", dark: "1f1f00" },
    lime: { light: "dfefcf", base: "afef4f", dark: "0f1f00" },
    green: { light: "cfefcf", base: "4fef4f", dark: "001f00" },
    teal: { light: "cfefdf", base: "4fefaf", dark: "001f0f" },
    cyan: { light: "cfefef", base: "4fefef", dark: "0f1f1f" },
    blue: { light: "afcfef", base: "0f8fef", dark: "000f1f" },
    indigo: { light: "cfcfef", base: "4f4fef", dark: "00001f" },
    violet: { light: "dfcfef", base: "6f4faf", dark: "0f071f" },
    purple: { light: "efcfef", base: "8f4f8f", dark: "1f0f1f" },
    grape: { light: "efbfdf", base: "af2faf", dark: "1f0717" },
    magenta: { light: "efafcf", base: "ef0fbf", dark: "1f000f" },
    fuchsia: { light: "efbfc7", base: "ef4fbf", dark: "1f030f" },
    pink: { light: "efcfdf", base: "ef8fbf", dark: "1f070f" },
    mono: { light: "efefef", base: "7f7f7f", dark: "0f0f0f" }
};

// Defines color converters
function toRgb(hex: ColorHex): ColorRgb {
    // Prevents invalid color
    if(hex.length !== 6) throw new Error("Value is not a valid 6-digit hex color.");
    
    // Converts color
    const red = clamp(parseInt(hex.slice(0, 2), 16), 0, 255);
    const green = clamp(parseInt(hex.slice(2, 4), 16), 0, 255);
    const blue = clamp(parseInt(hex.slice(4, 6), 16), 0, 255);

    // Returns color
    return [ red, green, blue ];
}

function toHex(rgb: ColorRgb): ColorHex {
    // Converts color
    const red = clamp(rgb[0], 0, 255).toString(16);
    const green = clamp(rgb[1], 0, 255).toString(16);
    const blue = clamp(rgb[2], 0, 255).toString(16);

    // Returns color
    return red.padStart(2, "0") + green.padStart(2, "0") + blue.padStart(2, "0");
}

// Defines generators
function tween(start: ColorRgb, end: ColorRgb, length: number): ColorRgb[] {
    // Prevents invalid length
    if(length <= 2) throw new Error("Cannot produce a tween less than 2 in length.");
    
    // Defines output
    const output: ColorRgb[] = [];

    // Defines delta
    const delta = [
        (end[0] - start[0]) / (length - 1),
        (end[1] - start[1]) / (length - 1),
        (end[2] - start[2]) / (length - 1)
    ];

    // Applies delta
    for(let i = 0; i < length; i++) output.push([
        Math.trunc(start[0] + delta[0] * i),
        Math.trunc(start[1] + delta[1] * i),
        Math.trunc(start[2] + delta[2] * i)
    ]);

    // Returns output
    return output;
}

function range(path: ColorPath): ColorHex[] {
    // Returns color
    return [
        ...tween(toRgb(path.dark), toRgb(path.base), 16),
        ...tween(toRgb(path.base), toRgb(path.light), 5).slice(1)
    ].map(toHex);
}

// Initializes make
const boop = beep();
const outputJson = resolvePath(import.meta.dir, "../json/soda.json");
const outputCss = resolvePath(import.meta.dir, "../css/soda.css");

// Generates contents
const colors = Object.keys(paths);
const json: { [ color: string ]: { [ value: number ]: ColorHex }} = {};
const definitions: string[] = [];
for(let i = 0; i < colors.length; i++) {
    const blocks: { [ value: number ]: ColorHex } = {};
    const variables: string[] = [];
    const color = colors[i];
    const path = paths[color];
    const hexes = range(path);
    for(let j = 0; j < hexes.length; j++) {
        const hex = hexes[j];
        blocks[(j + 1) * 50] = hex;
        variables.push(`\t--sd-${color}-${(j + 1) * 50}: #${hex};`);
    }
    variables.push(`\t--sd-${color}: #${path.base};`);
    json[color] = blocks;
    definitions.push(`\t/* Defines ${color} */\n${variables.join("\n")}`);
}

// Generates files
Bun.write(
    outputJson,
    JSON.stringify(json, null, 4)
);
Bun.write(
    outputCss,
    `/* Defines colors */\n:root {\n${definitions.join("\n\n")}\n}`
);

// Finalizes make
const delta = boop();
console.log(chalk.green(`Make: ${outputJson}, ${outputCss} (${delta} ms)`));