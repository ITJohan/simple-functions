/** @import { Monad, Traversable } from "../types.js" */

/**
 * @template T
 * @implements {Monad<T>}
 * @implements {Traversable<T>}
 */
class Maybe {
  #value;

  /**
   * @param {T} x
   */
  constructor(x) {
    this.#value = x;
  }

  /**
   * @template T
   * @param {T} x
   */
  static of(x) {
    return new Maybe(x);
  }

  /**
   * @template U
   * @param {(x: T) => U} f
   */
  map(f) {
    return new Maybe(f(this.#value));
  }

  /**
   * @template U
   * @param {Maybe<(a: T) => U>} fn
   * @returns {Maybe<U>}
   */
  ap(fn) {
    return this.map(fn.#value);
  }

  /**
   * @template U
   * @param {(x: T) => U} fn
   */
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.#value;
  }

  /**
   * @template U
   * @param {Maybe<T>} x
   * @param {(x: T) => Maybe<U>} fn
   * @returns {Maybe<Traversable<U>>}
   */
  traverse(x, fn) {
    return fn(this.#value).map(Maybe.of);
  }
}

class Nothing {
}

class Just {
}

export { Just, Maybe, Nothing };
