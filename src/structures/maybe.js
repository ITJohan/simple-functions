/**
 * Monad
 * @typedef {{
 *  inspect: () => string;
 *  map: (fn: (x: any) => any) => Maybe;
 *  ap: (x: Maybe) => Maybe;
 *  chain: (fn: (x: any) => Maybe) => Maybe;
 *  isJust: () => boolean;
 *  isNothing: () => boolean;
 * }} Maybe
 */

/**
 * @param {any} value
 * @returns {Maybe}
 */
export const Maybe = (value) => {
  const isNothing = value === undefined || value === null;

  return {
    inspect: () => isNothing ? "Nothing" : `Just(${value})`,
    map: (fn) => isNothing ? Maybe.of(value) : Maybe.of(fn(value)),
    ap: (other) => isNothing ? Maybe.of(value) : other.map((fn) => fn(value)),
    chain: (fn) => isNothing ? Maybe.of(value) : fn(value),
    isJust: () => !isNothing,
    isNothing: () => isNothing,
  };
};

/**
 * @param {any} value
 */
Maybe.of = (value) => Maybe(value);
