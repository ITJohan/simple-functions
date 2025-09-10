/** @import { Either } from "../types.js" */

import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { either } from "./either.js";

describe(either.left.name, () => {
  it("should return a Left object with map that returns a Left", () => {
    /** @type {Either<string, number>} */
    const value = either.left("1");
    assertEquals(value.map((x) => Number(x)).value, "1");
  });

  it("should return a Left object with chain that returns a Left", () => {
    /** @type {Either<string, number>} */
    const value = either.left("1");
    assertEquals(value.chain((x) => either.right(x)).value, "1");
  });

  it("should return a Left object with fold that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = either.left("1");
    assertEquals(value.fold((err) => err, (val) => String(val)), "1");
  });

  it("should return a Left object with inspect that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = either.left("1");
    assertEquals(value.value, "1");
  });
});

describe(either.right.name, () => {
  it("should return a Right object with map that returns a mapped Right", () => {
    const value = either.right(1);
    assertEquals(value.map((x) => String(x)).value, "1");
  });

  it("should return a Right object with chain that returns a chained Either", () => {
    /** @type {Either<string, number>} */
    const value = either.right(1);
    assertEquals(value.chain((x) => either.left(String(x))).value, "1");
    assertEquals(value.chain((x) => either.right(x)).value, 1);
  });

  it("should return a Right object with fold that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = either.right(1);
    assertEquals(value.fold((err) => err, (val) => String(val)), "1");
  });

  it("should return a Right object with inspect that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = either.right(1);
    assertEquals(value.value, 1);
  });
});
