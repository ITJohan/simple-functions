/**
 * 1. `u.contramap(a => a)` is equivalent to `u` (identity)
 * 2. `u.contramap(x => f(g(x)))` is equivalent to `u.contramap(f).contramap(g)` (composition)
 * @template A
 * @typedef {{
 *  contramap: <B>(fn: (b: B) => A) => Contravariant<B>
 * }} Contravariant
 */

/**
 * 1. `v.filter(x => p(x) && q(x))` is equivalent to `v.filter(p).filter(q)` (distributivity)
 * 2. `v.filter(x => true)` is equivalent to `v` (identity)
 * 3. `v.filter(x => false)` is equivalent to `w.filter(x => false)` if `v` and `w` are values of the same Filterable (annihilation)
 * @template A
 * @typedef {{
 *  filter: (fn: (a: A) => boolean) => Filterable<A>
 * }} Filterable
 */

/**
 * 1. `u.reduce` is equivalent to `u.reduce((acc, x) => acc.concat([x]), []).reduce`
 * @template A
 * @typedef {{
 *  reduce: <B>(fn: (b: B, a: A) => B, b: B) => B
 * }} Foldable
 */

/**
 * 1. `u.map(a => a)` is equivalent to `u` (identity)
 * 2. `u.map(x => f(g(x)))` is equivalent to `u.map(g).map(f)` (composition)
 * @template A
 * @typedef {{
 *  map: <B>(fn: (a: A) => B) => Functor<B>
 * }} Functor
 */

/**
 * 1. `a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))` (associativity)
 * @typedef {{
 *  concat: (a: Semigroup) => Semigroup
 * }} Semigroup
 */

/**
 * 1. `a.compose(b).compose(c) === a.compose(b.compose(c))` (associativity)
 * @template I
 * @template J
 * @typedef {{
 *  compose: <K>(c: Semigroupoid<J, K>) => Semigroupoid<I, K>
 * }} Semigroupoid
 */

/**
 * 1. `a.equals(a) === true` (reflexivity)
 * 2. `a.equals(b) === b.equals(a)` (symmetry)
 * 3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
 * @typedef {{
 *  equals: (a: Setoid) => boolean;
 * }} Setoid
 */
