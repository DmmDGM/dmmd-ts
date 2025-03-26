# [DmmD.ts](../README.md) / [Documentation](./docs.md) / CSS

## About
A collection of types in `.d.ts` files for TypeScript development.

## Table of Contents
- [Arrayable](#arrayable)
    - [Arrayable](#arrayable-1)
    - [NonArrayable](#nonarrayable)
    - [NonSingleable](#nonsingleable)
    - [Singleable](#singleable)

## Arrayable
### About
Converts type between its regular and its array forms.

### Usage
```ts
import type * as Arrayable from "dmmd-ts/type/arrayable";
```

### Types
#### Arrayable
```ts
import { Arrayable } from "dmmd-ts/type/arrayable";

// Allowed
let value: Arrayable<string> = "hello";
value = "world";
value = [ "hello" ];
value = [ "hello", "world" ];

// Not allowed
value = 123;
value = [ 123 ];
```

#### NonArrayable
```ts
import { NonArrayable } from "dmmd-ts/type/arrayable";

// Allowed
let value: NonArrayable<string[] | string> = "hello";
value = "world";

// Not allowed
value = 123;
value = [ 123 ];
value = [ "hello" ];
value = [ "hello", "world" ];
```

#### NonSingleable
```ts
import { NonSingleable } from "dmmd-ts/type/arrayable";

// Allowed
let value: NonSingleable<string[] | string> = "hello";
value = "world";
value = [ "hello" ];
value = [ "hello", "world" ];

// Not allowed
value = 123;
value = [ 123 ];
```

#### Singleable
```ts
import { Singleable } from "dmmd-ts/type/arrayable";

// Allowed
let value: Singleable<string[]> = [ "hello" ];
value = [ "world" ];
value = [ "hello", "world" ];
value = "hello";

// Not allowed
value = 123;
value = [ 123 ];
```

---

###### Last Updated: March 26, 2025
