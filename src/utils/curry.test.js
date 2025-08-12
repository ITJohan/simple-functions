import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { curry } from "./curry.js";

describe(curry.name, () => {
  it("should return the return value of the given function if no params", () => {
    const one = () => 1;
    const curriedOne = curry(() => 1);

    assertEquals(curriedOne, one());
  });

  it("should return the given function if one param", () => {
    /**
     * @param {number} a
     */
    const increment = (a) => a + 1;
    const curriedIncrement = curry(increment);

    assertEquals(curriedIncrement(1), increment(1));
  });

  it("should return a curried function if multiple params", () => {
    /**
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @returns {number}
     */
    const add = (a, b, c, d) => a + b + c + d;
    const curriedAdd = curry(add);

    assertEquals(curriedAdd(1)(1)(1)(1), add(1, 1, 1, 1));
  });
});
