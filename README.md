# DmmD.ts

## About
This is a (mostly) Bun library containing a collection of utility methods and properties that are commonly used in my own programming projects.
Besides TypeScript, this library also contains various CSS, JSON, and text files for lightweight quick-start purposes.

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

This library supports three levels of importing, depending on your needs for your project.

- Importing the entire library:

```ts
import dmmd from "dmmd-ts";
import { util } from "dmmd-ts";
```

- Importing individual namespaces:

```ts
import util from "dmmd-ts/util";
import { prototype } from "dmmd-ts/util";
```

- Importing individual files:

```ts
import prototype from "dmmd-ts/util/prototype";
import { parsePrototypeChain } from "dmmd-ts/util/prototype";
```

> [!NOTE]
> This library is only meant to be used in Bun's TypeScript environment.
> If your project is written in vanilla JavaScript and/or in a non-Bun environment (i.e. Node.js, Deno, or browser),
> and you wish to include this library in your project,
> you will unfortunately need to build and compile it yourself.

## Namespaces and Files

### Server-side Code (`/bun`)

A collection of server-side / Bun only code.

| Name | Description |
| - | - |
| Project Constants (`/project.ts`) | Collection of project constants. |

### Styles (`/css`)

A collection of minimal styles for quick start ups.

| Name | Description |
| - | - |
| Rebody (`/rebody.css`) | Forces full size without spacing on `html`, `body`, and `#app`. |
| Soda.css (`/soda.css`) | Collection of color presets. |

### Type Declarations (`/declare`)

A collection of immediate global type declarations.

| Name | Description |
| - | - |
| Styles (`/css.d.ts`) | Declaration of `.css` files. |

### JSON Data (`/json`)

A collection of JSON data and constants.

| Name | Description |
| - | - |

### Internal Builder (`/make`)

Internal builder for dynamic files within the library.

| Name | Description |
| - | - |
| Soda.css (`/soda.ts`) | Generates `/css/soda.css` file. |
| Zero (`/zero.ts`) | Generates `/web/zero.js` file. |

> [!CAUTION]
> For building and internal use only.

### Raw Internal Files (`/raw`)

Raw internal files for dynamic files within the library.

| Name | Description |
| - | - |
| Soda.css (`/soda.css`) | Template file for `soda.css`. |

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
| Color Converter (`/color.ts`) | Converts values between various color formats. |
| Fetcher (`/fetch.ts`) | Handles tailored fetch requests. |
| Math Extended (`/math.ts`) | Implements more advanced math features. |
| Object Inspector (`/object.ts`) | Implements more advanced object-related computations. |
| Prototype Inspector (`/prototype.ts`) | Implements prototype-chain related computations. |
| Queue (`/queue.ts`) | Implements a last-in-first-out list. |
| Time (`/time.ts`) | Collection of timing based functionalities. |

> [!WARNING]
> `/color.ts`, `/fetch.ts`, and `/queue.ts` have no complete features as of right now.

### Client-Side Code (`/web`)

A collection of client-side / browser only code.

| Name | Description |
| - | - |
| Element Inspector (`/element.ts`) | Handles creation and modification of elements with custom shortcuts.
| Zero (`/zero.ts`) | Implementation of iiPythonx's [`zero.js`](https://github.com/iiPythonx/radio/blob/main/radio/frontend/js/zero.js), with a clear goal of maximum file-size minimization. File import only. |
| Zero (Compiled) (`/zero.js`) | Compiled file for `/zero.ts`, with the current file size being at `504 bytes`. Further minification using [Minify JS](https://minify-js.com/) can reduce it down to `496 bytes` if needed. File import only. |

### Script

## Links and Contacts
- Discord (preferred): `@therock2t`
- Email: `dm12332131mdgaming@gmail.com`
- Github: https://github.com/dmmdgm/dmmd-ts

---

###### Last Updated: 2025/04/06
