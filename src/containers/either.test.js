import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Either } from "./either.js";

describe(Either.left.name, () => {
  it("should return a Left object with map that returns a Left", () => {
    /** @type {Either<string, number>} */
    const value = Either.left("1");
    assertEquals(value.map((x) => Number(x)).inspect(), "1");
  });

  it("should return a Left object with chain that returns a Left", () => {
    /** @type {Either<string, number>} */
    const value = Either.left("1");
    assertEquals(value.chain((x) => Either.right(x)).inspect(), "1");
  });

  it("should return a Left object with fold that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = Either.left("1");
    assertEquals(value.fold((err) => err, (val) => String(val)), "1");
  });

  it("should return a Left object with inspect that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = Either.left("1");
    assertEquals(value.inspect(), "1");
  });
});

describe(Either.right.name, () => {
  it("should return a Right object with map that returns a mapped Right", () => {
    const value = Either.right(1);
    assertEquals(value.map((x) => String(x)).inspect(), "1");
  });

  it("should return a Right object with chain that returns a chained Either", () => {
    /** @type {Either<string, number>} */
    const value = Either.right(1);
    assertEquals(value.chain((x) => Either.left(String(x))).inspect(), "1");
    assertEquals(value.chain((x) => Either.right(x)).inspect(), 1);
  });

  it("should return a Right object with fold that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = Either.right(1);
    assertEquals(value.fold((err) => err, (val) => String(val)), "1");
  });

  it("should return a Right object with inspect that returns the value", () => {
    /** @type {Either<string, number>} */
    const value = Either.right(1);
    assertEquals(value.inspect(), 1);
  });
});
