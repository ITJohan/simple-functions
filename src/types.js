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
