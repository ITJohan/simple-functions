/**
 * @template A
 * @template B
 * @overload
 * @param {(x: A) => B} fn1
 * @returns {(x: A) => B}
 */

/**
 * @template A
 * @template B
 * @template C
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @returns {(x: A) => C}
 */

/**
 * @template A
 * @template B
 * @template C
 * @template D
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @param {(x: C) => D} fn3
 * @returns {(x: A) => D}
 */

/**
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @param {(x: C) => D} fn3
 * @param {(x: D) => E} fn4
 * @returns {(x: A) => E}
 */

/**
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @param {(x: C) => D} fn3
 * @param {(x: D) => E} fn4
 * @param {(x: E) => F} fn5
 * @returns {(x: A) => F}
 */

/**
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @param {(x: C) => D} fn3
 * @param {(x: D) => E} fn4
 * @param {(x: E) => F} fn5
 * @param {(x: F) => G} fn6
 * @returns {(x: A) => G}
 */

/**
 * @template A
 * @template B
 * @template C
 * @template D
 * @template E
 * @template F
 * @template G
 * @template H
 * @overload
 * @param {(x: A) => B} fn1
 * @param {(x: B) => C} fn2
 * @param {(x: C) => D} fn3
 * @param {(x: D) => E} fn4
 * @param {(x: E) => F} fn5
 * @param {(x: F) => G} fn6
 * @param {(x: G) => H} fn7
 * @returns {(x: A) => H}
 */

/** @param {Function[]} fns */
const pipe = (...fns) => {
  if (fns.length >= 1 && fns.length <= 7) {
    /** @param {any} x */
    return (x) => fns.reduce((x, func) => func(x), x);
  }

  throw new Error("Requires at least one function and at most five.");
};

export { pipe };
