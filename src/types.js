/**
 * @template E
 * @template A
 * @typedef {object} Right
 * @prop {"right"} tag
 * @prop {A} value
 * @prop {<B>(fn: (x: A) => B) => Either<E, B>} map
 * @prop {<B>(other: Either<E, (x: A) => B>) => Either<E, B>} ap
 * @prop {<B>(fn: (x: A) => Either<E, B>) => Either<E, B>} chain
 * @prop {<B>(onLeft: (value: E) => B, onRight: (value: A) => B) => B} fold
 * @prop {() => Task<E, A>} toTask
 */

/**
 * @template E
 * @template A
 * @typedef {object} Left
 * @prop {"left"} tag
 * @prop {E} value
 * @prop {<B>(fn: (x: A) => B) => Either<E, B>} map
 * @prop {<B>(other: Either<E, (x: A) => B>) => Either<E, B>} ap
 * @prop {<B>(fn: (x: A) => Either<E, B>) => Either<E, B>} chain
 * @prop {<B>(onLeft: (value: E) => B, onRight: (value: A) => B) => B} fold
 * @prop {() => Task<E, A>} toTask
 */

/**
 * @template E
 * @template A
 * @typedef {Right<E, A> | Left<E, A>} Either
 */

/**
 * @template E, A
 * @typedef {(reject: (error: E) => void, resolve: (value: A) => void) => void} Computation
 */

/**
 * @template E, A
 * @typedef {object} Task
 * @prop {(reject: (error: E) => void, resolve: (value: A) => void) => void} fork
 * @prop {<B>(fn: (x: A) => B) => Task<E, B>} map
 * @prop {<B>(fn: (x: A) => Task<E, B>) => Task<E, B>} chain
 * @prop {<B>(other: Task<E, (x: A) => B>) => Task<E, B>} ap
 * @prop {() => Promise<A>} run
 */
