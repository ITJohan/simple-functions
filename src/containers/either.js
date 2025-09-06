/** @import { EitherValue } from "../types.js" */

const Either = {
  /**
   * @template L
   * @param {L} x
   * @returns {EitherValue<L, never>}
   */
  left: (x) => {
    /** @type {EitherValue<L, never>} */
    const leftInstance = {
      isLeft: true,
      isRight: false,
      map: () => leftInstance,
      chain: () => leftInstance,
      fold: (onLeft, _onRight) => onLeft(x),
      inspect: () => x,
    };
    return leftInstance;
  },

  /**
   * @template R
   * @param {R} x
   * @returns {EitherValue<never, R>}
   */
  right: (x) => ({
    isLeft: false,
    isRight: true,
    map: (fn) => Either.right(fn(x)),
    chain: (fn) => fn(x),
    fold: (_onLeft, onRight) => onRight(x),
    inspect: () => x,
  }),

  /**
   * @template R
   * @param {R} x
   * @returns {EitherValue<never, R>}
   */
  of: (x) => Either.right(x),
};

export { Either };
