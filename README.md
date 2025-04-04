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

> [NOTE]
> Since this library is only meant to be used in Bun's TypeScript environment, if your project is written in vanilla
> JavaScript or in a non-Bun environment (i.e. Node.js, Deno, or browser), you will unfortunately need build or compile
> this library yourself.

## Links and Contacts
- Discord (preferred): `@therock2t`
- Email: `dm12332131mdgaming@gmail.com`
- Github: https://github.com/dmmdgm/dmmd-ts

## References and Credits
- [Bun.js](https://bun.sh/)

---

###### Last Updated: 2025/03/29
