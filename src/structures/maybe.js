/** @import { Inspectable, Monad, Traversable } from "../types.js" */

class Maybe {
  /**
   * @template T
   * @param {T} value
   */
  static of(value) {
    return new Just(value);
  }

  // /**
  //  * @template U
  //  * @param {(x: T) => U} f
  //  */
  // map(f) {
  //   return new Maybe(f(this.#value));
  // }

  // /**
  //  * @template U
  //  * @param {Maybe<(a: T) => U>} fn
  //  * @returns {Maybe<U>}
  //  */
  // ap(fn) {
  //   return this.map(fn.#value);
  // }

  // /**
  //  * @template U
  //  * @param {(x: T) => U} fn
  //  */
  // chain(fn) {
  //   return this.map(fn).join();
  // }

  // join() {
  //   return this.#value;
  // }

  // /**
  //  * @template U
  //  * @param {Maybe<T>} x
  //  * @param {(x: T) => Maybe<U>} fn
  //  * @returns {Maybe<Traversable<U>>}
  //  */
  // traverse(x, fn) {
  //   return fn(this.#value).map(Maybe.of);
  // }
}

/**
 * @template T
 * @extends Maybe
 * @implements {Inspectable}
 */
class Just extends Maybe {
  #value;

  /**
   * @param {T} value
   */
  constructor(value) {
    super();
    this.#value = value;
  }

  inspect() {
    return `Just(${this.#value})`;
  }

  isJust() {
    return true;
  }

  isNothing() {
    return false;
  }
}

class Nothing {
}

export { Just, Maybe, Nothing };
