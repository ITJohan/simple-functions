import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { Just, Maybe, Nothing } from "./maybe.js";

describe(Just.name, () => {
  it('should wrap a value and be considered a "Just"', () => {
    const just = Just(123);
    assertEquals(just.inspect(), "Just(123)");
    assertEquals(just.isJust(), true);
    assertEquals(just.isNothing(), false);
  });

  it('should apply a function to its value using "map"', () => {
    const just = Just(5).map((x) => x * 2);
    assertEquals(just.inspect(), `Just(10)`);
  });

  it('should apply a function wrapped in a Just using "ap"', () => {
    const result = Just(10).ap(Just((/** @type {number} */ x) => x + 5));
    assertEquals(result.inspect(), "Just(15)");
  });

  it('should chain functions that return a Maybe using "chain"', () => {
    assertEquals(Just(5).chain((x) => Just(x + 1)).inspect(), `Just(6)`);
    assertEquals(Just(5).chain(Nothing).inspect(), `Nothing`);
  });
});

describe(Nothing.name, () => {
  it('should be considered a "Nothing"', () => {
    // A Nothing instance should not contain a value.
    // isJust() should return false.
    // isNothing() should return true.
  });

  it('should ignore "map" and always return Nothing', () => {
    // Mapping any function over Nothing should have no effect and return Nothing.
    // Example: Nothing.map(x => x * 2) should result in Nothing.
  });

  it('should ignore "chain" and always return Nothing', () => {
    // Chaining any function with chain on Nothing should have no effect and return Nothing.
    // Example: Nothing.chain(x => Just(x + 1)) should result in Nothing.
  });

  it('should return the default value for "getOrElse"', () => {
    // Calling getOrElse on Nothing should always return the provided default value.
    // Example: Nothing.getOrElse("default") should return "default".
  });

  it('should always return Nothing for "filter"', () => {
    // Filtering Nothing with any predicate should have no effect and return Nothing.
    // Example: Nothing.filter(x => x > 5) should result in Nothing.
  });

  it('should return Nothing when "ap" is called', () => {
    // Applying a Just containing a function to Nothing should result in Nothing.
    // Example: Just(x => x + 5).ap(Nothing) should result in Nothing.
    // Applying Nothing to a Just value should also result in Nothing.
    // Example: Nothing.ap(Just(10)) should result in Nothing.
  });

  it('should throw an error when "get" is called (unsafe)', () => {
    // Attempting to call get on Nothing should throw a specific error, as there is no value to retrieve.
  });

  it('should return a descriptive string for "toString"', () => {
    // The toString method should return a simple, clear representation.
    // Example: Nothing.toString() should return "Nothing".
  });
});

describe(Maybe.name, () => {
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
