import * as prototype from "./vanilla/prototype";
import * as primitive from "./vanilla/primitive";
import { beep } from "./vanilla/time";

const boop1 = beep();
console.log(prototype.testParentPrototype(primitive.numberPrimitive, prototype.numberPrototype))
console.log(boop1());

const boop2 = beep();
console.log(typeof 0 === "number");
console.log(boop2());