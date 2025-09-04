/** @import { Left, Right } from "../types.js" */

/**
 * @template E, A
 * @param {A} value
 * @returns {Right<E, A>}
 */
const right = (value) => ({
  map: (fn) => right(fn(value)),
  chain: (fn) => fn(value),
  fold: (_leftFn, rightFn) => rightFn(value),
  inspect: () => value,
});

/**
 * @template E
 * @param {E} error
 * @returns {Left<E, never>}
 */
const left = (error) => ({
  map: (_fn) => left(error),
  chain: (_fn) => left(error),
  fold: (leftFn, _rightFn) => leftFn(error),
  inspect: () => error,
});

export { left, right };
