/**
 * 1. `u.map(a => a)` is equivalent to `u` (identity)
 * 2. `u.map(x => f(g(x)))` is equivalent to `u.map(g).map(f)` (composition)
 * @template A
 * @typedef {{
 *  map: <B>(f: (a: A) => B) => Functor<B>
 * }} Functor
 */

/**
 * 1. `a.equals(a) === true` (reflexivity)
 * 2. `a.equals(b) === b.equals(a)` (symmetry)
 * 3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
 *
 * @template A
 * @typedef {{
 *  equals: (a: A) => boolean;
 * }} Setoid
 */
