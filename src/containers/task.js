/**
 * Represents a lazy, asynchronous computation that can fail.
 * @template E The error type.
 * @template A The success value type.
 */
class Task {
  /**
   * The core computation, stored as a private field.
   * It's a function that takes reject and resolve callbacks.
   * @type {(reject: (x: E) => void, resolve: (x: A) => void) => void}
   */
  #fork;

  /**
   * The constructor is marked as private.
   * Users should create instances via static methods like Task.of() or Task.fromPromise().
   * @private
   * @param {(reject: (x: E) => void, resolve: (x: A) => void) => void} fn
   */
  constructor(fn) {
    this.#fork = fn;
  }

  /**
   * Creates a Task that immediately resolves with a given value.
   * @template A
   * @param {A} x The success value.
   * @returns {Task<never, A>}
   */
  static of(x) {
    return new Task((_reject, resolve) => resolve(x));
  }

  /**
   * Creates a Task that immediately rejects with a given error.
   * @template E
   * @param {E} x The error value.
   * @returns {Task<E, never>}
   */
  static rejected(x) {
    return new Task((reject, _resolve) => reject(x));
  }

  /**
   * Creates a Task from a function that returns a Promise.
   * @template A
   * @param {() => Promise<A>} fn A function that returns a promise, preserving laziness.
   * @returns {Task<Error, A>}
   */
  static fromPromise(fn) {
    return new Task((reject, resolve) => {
      fn().then(resolve).catch(reject);
    });
  }

  /**
   * Executes the lazy computation.
   * @param {(x: E) => void} reject The callback for the failure case.
   * @param {(x: A) => void} resolve The callback for the success case.
   */
  fork(reject, resolve) {
    this.#fork(reject, resolve);
  }

  /**
   * Transforms the success value of the Task without executing it.
   * Returns a new Task containing the transformation.
   * @template B
   * @param {(value: A) => B} fn The mapping function.
   * @returns {Task<E, B>}
   */
  map(fn) {
    return new Task((reject, resolve) => {
      this.#fork(reject, (value) => resolve(fn(value)));
    });
  }

  /**
   * Sequences another asynchronous operation after the current one succeeds.
   * Returns a new Task representing the complete sequence.
   * @template B
   * @param {(value: A) => Task<E, B>} fn The function to generate the next Task.
   * @returns {Task<E, B>}
   */
  chain(fn) {
    return new Task((reject, resolve) => {
      this.#fork(reject, (value) => fn(value).fork(reject, resolve));
    });
  }

  /**
   * Executes the Task and returns a standard JavaScript Promise.
   * This is the bridge to the native async/await world.
   * @returns {Promise<A>}
   */
  run() {
    return new Promise((resolve, reject) => {
      this.#fork(reject, resolve);
    });
  }
}

export { Task };
