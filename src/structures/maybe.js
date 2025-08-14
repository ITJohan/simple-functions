/**
 * @template T
 * @typedef {(
 *  Nothing | Just<T>
 * )} Maybe
 */

/**
 * @template A
 * @typedef {{
 *  inspect: () => string;
 *  map: <B>(f: (x: A) => B) => Maybe<B>;
 *  ap: <B>(x: Maybe<(x: A) => B>) => Maybe<B>;
 *  chain: <B>(fn: (x: A) => Maybe<B>) => Maybe<B>;
 *  isJust: () => boolean;
 *  isNothing: () => boolean;
 * }} Just
 */

/**
 * @typedef {{
 *  inspect: () => string;
 *  map: () => Nothing;
 *  ap: () => Nothing;
 *  chain: () => Nothing;
 *  isJust: () => boolean;
 *  isNothing: () => boolean;
 * }} Nothing
 */

/**
 * @template T
 * @param {T} value
 * @returns {Maybe<T>}
 */
export const Maybe = (value) => {
  if (value === undefined || value === null) {
    return Nothing();
  }
  return Just(value);
};

/**
 * @template T
 * @param {T} value
 */
Maybe.of = (value) => Maybe(value);

/**
 * @template T
 * @param {T} value
 * @returns {Just<T>}
 */
export const Just = (value) => ({
  inspect: () => `Just(${value})`,
  map: (fn) => Maybe.of(fn(value)),
  ap: (other) => other.map((fn) => fn(value)),
  chain: (fn) => fn(value),
  isJust: () => true,
  isNothing: () => false,
});

/**
 * @returns {Nothing}
 */
export const Nothing = () => ({
  inspect: () => "Nothing",
  map: () => Nothing(),
  ap: () => Nothing(),
  chain: () => Nothing(),
  isJust: () => false,
  isNothing: () => true,
});
