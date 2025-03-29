# DmmD.ts

## About
This is a Bun.js library containing a collection of utility methods and properties that are commonly used in my own
programming projects. Besides TypeScript, this library also contains various CSS, JSON, and text files.

## Installation
Since this library will not be available on npm, you can install this package directly from Github using either of the
two methods below:

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

## Usage
There are three ways to import this library in your code:

- Importing the entire library:

```ts
import dmmd from "dmmd-ts";
```

- Importing individual modules:

```ts
import vanilla from "dmmd-ts/vanilla";
```

- Importing individual namespaces (preferred):

```ts
import prototype from "dmmd-ts/vanilla/prototype";
```

If your project is written in vanilla JavaScript, Common JavaScript and ESM JavaScript importing are an option as well;
however, because this library is really only meant to be used in a TypeScript environment, only importing the entire
library is supported. Feel free to build or compile this library yourself if this feature is absolutely necessary in
your project:

```js
const dmmd = require("dmmd-ts"); // Common JavaScript

import dmmd from "dmmd-ts"; // ESM JavaScript
```

## Links and Contacts
- Discord (preferred): `@therock2t`
- Email: `dm12332131mdgaming@gmail.com`
- Github: https://github.com/dmmdgm/dmmd-ts

## References and Credits
- [Bun.js](https://bun.sh/)

---

###### Last Updated: 2025/03/29
