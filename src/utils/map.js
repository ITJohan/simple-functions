/** @import {Functor} from "../types.js" */

/**
 * @template A
 * @template B
 * @param {(x: A) => B} fn
 * @returns {(x: Functor<A>) => Functor<B>}
 */
const map = (fn) => (x) => x.map(fn);

export { map };
