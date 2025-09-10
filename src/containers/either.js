/** @import { Either } from "../types.js" */

import { task } from "./task.js";

/**
 * @template E
 * @template A
 * @param {A} x
 * @returns {Either<E, A>}
 */
const right = (x) => ({
  tag: "right",
  value: x,
  map: (fn) => right(fn(x)),
  chain: (fn) => fn(x),
  ap: (other) => {
    if (other.tag === "left") {
      return left(other.value);
    }
    return right(other.value(x));
  },
  fold: (_onLeft, onRight) => onRight(x),
  toTask: () => task.of(x),
});

/**
 * @template E
 * @template A
 * @param {E} x
 * @returns {Either<E, A>}
 */
const left = (x) => {
  /** @type {Either<E, any>} */
  const instance = {
    tag: "left",
    value: x,
    map: () => instance,
    ap: () => instance,
    chain: () => instance,
    fold: (onLeft, _onRight) => onLeft(x),
    toTask: () => task.rejected(x),
  };
  return instance;
};

/**
 * @template E
 * @template A
 * @param {A} x
 * @returns {Either<E, A>}
 */
const of = (x) => right(x);

const either = { right, left, of };

export { either };
