# DmmD.ts

## About
This is a (mostly) Bun library containing a collection of utility methods and properties that are commonly used in my own programming projects.

The goal is this project is to be as minimal in its dependencies as possible. 
As of right now, [Chalk](https://github.com/chalk/chalk) is only true dependency in the project; even then, it is used for internal building primarily.
There are no plans to include any other dependencies as of right now, but I can't promise I won't add any more in the future either.

Also, despite its name, this library also contains various CSS, JSON, and text files for lightweight quick-start purposes.

Personally I don't expect anyone else to use this library other than me. However, if you do decide to include it in your project and find any critical bugs, please alert me either via Github Issues or Discord.

## Installation

### Downloading

Since this library will not be available on npm,
you can install this package directly from Github using either of the two methods below:

- Adding directly from Github repository:

```sh
bun add github:dmmdgm/dmmd-ts
```

- Linking from local clone:

```sh
git clone https://github.com/dmmdgm/dmmd-ts
cd dmmd-ts
bun link
cd %your-project%
bun link dmmd-ts
```

### Importing

This library only supports file importing, as demonstrated in the following code snippet:

```ts
import prototype from "dmmd-ts/util/prototype";
prototype.parsePrototypeChain(/** ... */);

import { parsePrototypeChain } from "dmmd-ts/util/prototype";
parsePrototypeChain(/** ... */);
```

Please note that this library is only meant to be used in Bun's TypeScript environment.
If your project is written in vanilla JavaScript and/or in a non-Bun environment (i.e. Node.js, Deno, or browser), and you wish to include this library in your project, you will unfortunately need to build and compile it yourself.

## Namespaces and Files

### Server-side Code (`/bun`)

A collection of server-side / Bun only code.

| Name | Description |
| - | - |
| Keypress (`/keypress.ts`) | Implements a keypress handler. |
| Project Constants (`/project.ts`) | Collection of project constants. |

### Stylesheets (`/css`)

A collection of minimal styles for quick-start purposes.

| Name | Description |
| - | - |
| Rebody (`/rebody.css`) | Forces full size without spacing on `html`, `body`, and `#app`. |
| Soda.css (`/soda.css`) | Collection of color presets. |

### JSON Data (`/json`)

A collection of JSON data and constants.

| Name | Description |
| - | - |

### Internal Builder (`/make`)

Internal builder for dynamic files within the library.

| Name | Description |
| - | - |
| Make All (`/index.ts`) | Generates all files. Use `bun make` to run file. |
| Soda.css (`/soda.ts`) | Generates `/css/soda.css` file. |
| Zero (`/zero.ts`) | Generates `/web/zero.js` file. |

> [!CAUTION]
> For building and internal use only.

### Executable Scripts (`/script`)

A collection of publicly exposed scripts.

| Name | Description |
| - | - |

### Static Texts (`/text`)

A collection of static text files.

| Name | Description |
| - | - |

### Type Definitions (`/type`)

A collection of type definitions.

| Name | Description |
| - | - |
| Arrayable (`/arrayable.d.ts`) | Converts types between its single and its array forms. |

### Cross-Platform Code (`/util`)

A collection of utility code accessible and usable on both client-side and server-side.

| Name | Description |
| - | - |
| Event Emitter (`/emitter.ts`) | Simplified form of the native event emitter. |
| Math Extended (`/math.ts`) | Implements more advanced math features. |
| Object Inspector (`/object.ts`) | Implements more advanced object-related computations. |
| Protected Call (`/pcall.ts`) | Implements function calls that handles error automatically. |
| Prototype Inspector (`/prototype.ts`) | Implements prototype-chain related computations. |
| Time (`/time.ts`) | Collection of timing based functionalities. |

### Client-Side Code (`/web`)

A collection of client-side / browser only code.

| Name | Description |
| - | - |
| Element Inspector (`/element.ts`) | Handles creation and modification of elements with custom shortcuts.
| Zero (`/zero.ts`) | Implementation of iiPythonx's [`zero.js`](https://github.com/iiPythonx/radio/blob/main/radio/frontend/js/zero.js), with a clear goal of maximum file-size minimization. |
| Zero (Compiled) (`/zero.js`) | Compiled file for `/zero.ts`, with the current file size being at `504 bytes`. Further minification using [Minify JS](https://minify-js.com/) can reduce it down to `496 bytes` if needed. |

### Script

## Links and Contacts
- Discord (preferred): `@therock2t`
- Email: `dm12332131mdgaming@gmail.com`
- Github: https://github.com/dmmdgm/dmmd-ts

---

###### Last Updated: 2025/04/12
