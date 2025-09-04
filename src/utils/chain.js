/** @import { Either } from "../types.js" */

/**
 * @template E, A, B
 * @param {(value: A) => Either<E, B>} fn The function to apply inside the chain.
 * @returns {(either: Either<E, A>) => Either<E, B>}
 */
const chain = (fn) => (either) => either.chain(fn);

export { chain };
