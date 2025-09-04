/**
 * @template E, A
 * @typedef {object} Left
 * @prop {<B>(fn: (value: A) => B) => Left<E, B>} map
 * @prop {<B>(fn: (value: A) => Either<E, B>) => Left<E, B>} chain
 * @prop {<R>(leftFn: (error: E) => R, rightFn: (value: A) => R) => R} fold
 * @prop {() => E} inspect
 */

/**
 * @template E, A
 * @typedef {object} Right
 * @prop {<B>(fn: (value: A) => B) => Right<E, B>} map
 * @prop {<B>(fn: (value: A) => Either<E, B>) => Either<E, B>} chain
 * @prop {<R>(leftFn: (error: E) => R, rightFn: (value: A) => R) => R} fold
 * @prop {() => A} inspect
 */

/**
 * @template E, A
 * @typedef {Left<E, A> | Right<E, A>} Either
 */

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
