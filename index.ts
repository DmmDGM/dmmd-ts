import { findCommonPrototype, numberPrototype, objectPrototype, parsePrototypeChain } from "./utils/prototype-inspect";

class A {}
class B extends A {}
class C extends B {}
class CPlus extends B {}
class D extends C {}
class DPlus extends CPlus {}
class E extends D {}
class EPlus extends DPlus {}
class Unrelated {}

const common = findCommonPrototype(() => {}, new E());
console.log(common);
console.log(common === objectPrototype);

const a = findCommonPrototype(5, {});
console.log(a);