import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { map } from "./map.js";

describe(map.name, () => {
  it("should accept a Functor and return a mapped Functor", () => {
    const arr = [1, 2, 3];
    /** @param {number} x */
    const toString = (x) => String(x);
    arr.map((x) => String(x));

    const strArr = map(toString)(arr);

    assertEquals(strArr, ["1", "2", "3"]);
  });
});
