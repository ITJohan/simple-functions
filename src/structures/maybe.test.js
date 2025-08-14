import { describe, it } from "@std/testing/bdd";
import { Just, Maybe, Nothing } from "./maybe.js";

describe(Just.name, () => {
  it('should wrap a value and be considered a "Just"', () => {
    // A Just instance should correctly store the value it was created with.
    // isJust() should return true.
    // isNothing() should return false.
  });

  it('should apply a function to its value using "map"', () => {
    // Mapping a function over a Just should return a new Just containing the result of applying the function to the original value.
    // Example: Just(5).map(x => x * 2) should result in Just(10).
  });

  it('should chain functions that return a Maybe using "chain"', () => {
    // Applying chain with a function that returns a Just should return that new Just.
    // Example: Just(5).chain(x => Just(x + 1)) should result in Just(6).
    // Applying chain with a function that returns Nothing should result in Nothing.
    // Example: Just(5).chain(x => Nothing) should result in Nothing.
  });

  it('should return its wrapped value for "getOrElse"', () => {
    // Calling getOrElse on a Just should ignore the default value and return its own wrapped value.
    // Example: Just(10).getOrElse(0) should return 10.
  });

  it('should return the Just instance if the predicate is true for "filter"', () => {
    // Filtering a Just with a predicate that its value satisfies should return the original Just instance.
    // Example: Just(10).filter(x => x > 5) should result in Just(10).
  });

  it('should return Nothing if the predicate is false for "filter"', () => {
    // Filtering a Just with a predicate that its value does not satisfy should return Nothing.
    // Example: Just(3).filter(x => x > 5) should result in Nothing.
  });

  it('should apply a function wrapped in a Just using "ap"', () => {
    // The ap method should apply a function contained within another Just to its own value.
    // Example: Just(x => x + 5).ap(Just(10)) should result in Just(15).
  });

  it('should return its value when "get" is called (unsafe)', () => {
    // The get method should return the raw, unwrapped value. This is considered unsafe as it can fail on a Nothing.
    // Example: Just("hello").get() should return "hello".
  });

  it('should return a descriptive string for "toString"', () => {
    // The toString method should provide a clear representation of the Just instance and its value.
    // Example: Just(42).toString() should return a string like "Just(42)".
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
