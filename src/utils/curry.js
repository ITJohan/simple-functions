/**
 * @typedef {(...args: any[]) => any} Func
 */

/**
 * @template {Func} Fn
 * @typedef {(
 *  Parameters<Fn> extends [infer FirstArg, ...infer Rest]
 *  ? (arg: FirstArg) => Curry<(...args: Rest) => ReturnType<Fn>>
 *  : ReturnType<Fn>
 * )} Curry
 */

/**
 * @template {Func} T
 * @template {unknown[]} TAgg
 * @param {T} func
 * @param {TAgg} [agg]
 * @returns {Curry<T>}
 */
const curry = (func, agg) => {
  const aggregatedArgs = agg ?? [];
  if (func.length === aggregatedArgs.length) return func(...aggregatedArgs);
  return /** @type {any} */ ((/** @type {any} */ arg) =>
    curry(func, [...aggregatedArgs, arg]));
};

export { curry };
