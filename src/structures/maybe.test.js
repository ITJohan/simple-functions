import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { Maybe } from "./maybe.js";

describe(Maybe.name, () => {
  it("should be Just if wrapping a value", () => {
    const maybe = Maybe.of(123);
    assertEquals(maybe.inspect(), "Just(123)");
    assertEquals(maybe.isJust(), true);
    assertEquals(maybe.isNothing(), false);
  });

  it("should be Nothing if wrapping a null", () => {
    const nothing = Maybe.of(null);
    assertEquals(nothing.inspect(), "Nothing");
    assertEquals(nothing.isJust(), false);
    assertEquals(nothing.isNothing(), true);
  });

  it("should be Nothing if wrapping a undefined", () => {
    const nothing = Maybe.of(undefined);
    assertEquals(nothing.inspect(), "Nothing");
    assertEquals(nothing.isJust(), false);
    assertEquals(nothing.isNothing(), true);
  });

  it("should apply a function to value using map", () => {
    const maybe = Maybe.of(5).map((x) => x * 2);
    assertEquals(maybe.inspect(), `Just(10)`);
  });

  it("should be Nothing if calling map on Nothing", () => {
    const maybe = Maybe(null);
    assertEquals(maybe.map((x) => x * 2).inspect(), "Nothing");
  });

  it("should apply a function wrapped in a Just using ap", () => {
    const maybe = Maybe.of(10).ap(Maybe.of((/** @type {number} */ x) => x + 5));
    assertEquals(maybe.inspect(), "Just(15)");
  });

  it("should be Nothing when calling ap on Nothing", () => {
    const maybe = Maybe.of(undefined).ap(
      Maybe.of((/** @type {number} */ x) => x + 5),
    );
    assertEquals(maybe.inspect(), "Nothing");
  });

  it('should chain functions that return a Maybe using "chain"', () => {
    assertEquals(
      Maybe.of(5).chain((x) => Maybe.of(x + 1)).inspect(),
      `Just(6)`,
    );
  });

  it("should return Nothing when calling chain on Nothing", () => {
    assertEquals(
      Maybe.of(null).chain((x) => Maybe.of(x + 1)).inspect(),
      "Nothing",
    );
  });

  it("should adhere to the Functor and Applicative identity law", () => {
    // m.map(x => x) should be equivalent to m.
    // Test with both Just and Nothing.
  });

  it("should adhere to the Functor and Apply composition law", () => {
    // m.map(f).map(g) should be equivalent to m.map(x => g(f(x))).
    // Test with both Just and Nothing.
  });

  it("should adhere to the Monad left identity law", () => {
    // Maybe.of(x).chain(f) should be equivalent to f(x).
    // Maybe.of is a factory that creates a Just from a value.
  });

  it("should adhere to the Monad right identity law", () => {
    // m.chain(Maybe.of) should be equivalent to m.
    // Test with both Just and Nothing.
  });

  it("should adhere to the Chain associativity law", () => {
    // m.chain(f).chain(g) should be equivalent to m.chain(x => f(x).chain(g)).
    // Test with Just and various combinations of functions returning Just or Nothing.
  });

  it("should adhere to the Applicative homomorphism law", () => {
    // A.of(x).ap(A.of(f)) is equivalent to A.of(f(x))
  });

  it("should adhere to the Applicative interchange law", () => {
    // A.of(y).ap(u) is equivalent to u.ap(A.of(f => f(y)))
  });
});
