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

/**
 * @template E, A
 * @param {Computation<E, A>} computation
 * @returns {Task<E, A>}
 */
const createTask = (computation) => ({
  fork: (reject, resolve) => computation(reject, resolve),
  map: (fn) =>
    createTask((reject, resolve) =>
      computation(reject, (value) => resolve(fn(value)))
    ),
  chain: (fn) =>
    createTask((reject, resolve) =>
      computation(reject, (value) => fn(value).fork(reject, resolve))
    ),
  ap: (other) =>
    createTask((reject, resolve) => {
      Promise.all([
        new Promise((res, rej) => other.fork(rej, res)),
        new Promise((res, rej) => computation(rej, res)),
      ])
        .then(([fn, val]) => resolve(fn(val)))
        .catch(reject);
    }),
  run: () => new Promise((resolve, reject) => computation(reject, resolve)),
});

/**
 * @template E, A
 * @param {A} x
 * @returns {Task<E, A>}
 */
const of = (x) => createTask((_reject, resolve) => resolve(x));

/**
 * @template E, A
 * @param {E} x
 * @returns {Task<E, A>}
 */
const rejected = (x) => createTask((reject, _resolve) => reject(x));

/**
 * @template E, A
 * @param {(...args: any[]) => Promise<A>} promise
 * @returns {(...args: any[]) => Task<E, A>}
 */
const fromPromise = (promise) => (...args) =>
  createTask((reject, resolve) => {
    promise(...args)
      .then(resolve)
      .catch(reject);
  });

const task = { of, rejected, fromPromise };

export { task };
