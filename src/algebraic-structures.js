/**
 * Algebraic structures from the Fantasy Land Specification at https://github.com/fantasyland/fantasy-land/blob/master/README.md
 */

/** Level 1 */

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
 * @template I, J
 * @typedef {{
 *  compose: <K>(a: Semigroupoid<J, K>) => Semigroupoid<I, K>
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

/** Level 2 */

/**
 * 1. `a.alt(b).alt(c)` is equivalent to `a.alt(b.alt(c))` (associativity)
 * 2. `a.alt(b).map(f)` is equivalent to `a.map(f).alt(b.map(f))` (distributivity)
 * @template A
 * @typedef {{
 *  alt: (a: Alt<A>) => Alt<A>
 * } & Functor<A>} Alt
 */

/**
 * 1. `v.ap(u.ap(a.map(f => g => x => f(g(x)))))`  is equivalent to `v.ap(u).ap(a)` (composition)
 * @template A
 * @typedef {{
 *  ap: <B>(fn: (Apply<(a: A) => B>)) => Apply<B>
 * } & Functor<A>} Apply
 */

/**
 * 1. `p.bimap(a => a, b => b)` is equivalent to `p` (identity)
 * 2. `p.bimap(a => f(g(a)), b => h(i(b)))` is equivalent to `p.bimap(g, i).bimap(f, h)` (composition)
 * @template A, C
 * @typedef {{
 *  bimap: <B,D>(f: (a: A) => B, g: (c: C) => D) => Bifunctor<B, D>
 * } & Functor<A>} Bifunctor
 */

/**
 * 1. `a.compose(C.id())` is equivalent to `a` (right identity)
 * 2. `C.id().compose(a)` is equivalent to `a` (left identity)
 * @template A, B
 * @typedef {{
 *  id: () => Category<A, A>
 * } & Semigroupoid<A, B>} Category
 */

/**
 * 1. `w.extend(g).extend(f)` is equivalent to `w.extend(_w => f(_w.extend(g)))`
 * @template A
 * @typedef {{
 *  extend: <B>(f: (w: Extend<A>) => B) => Extend<B>
 * } & Functor<A>} Extend
 */

/**
 * 1. `m.concat(M.empty())` is equivalent to `m` (right identity)
 * 2. `M.empty().concat(m)` is equivalent to `m` (left identity)
 * @typedef {{
 *  empty: () => Monoid
 * } & Semigroup} Monoid
 */

/**
 * 1. `a.lte(b)` or `b.lte(a)` (totality)
 * 2. If `a.lte(b)` and `b.lte(a)`, then `a.equals(b)` (antisymmetry)
 * 3. If `a.lte(b)` and b.lte(c), then `a.lte(c)` (transitivity)
 * @typedef {{
 *  lte: (a: Ord) => boolean
 * } & Setoid} Ord
 */

/**
 * 1. `p.promap(a => a, b => b)` is equivalent to `p` (identity)
 * 2. `p.promap(a => f(g(a)), b => h(i(b)))` is equivalent to `p.promap(f, i).promap(g, h)` (composition)
 * @template B, C
 * @typedef {{
 *  promap: <A, D>(fn1: (a: A) => B, fn2: (c: C) => D) => Profunctor<A, D>
 * } & Functor<B>} Profunctor
 */

/**
 * 1. `t(u.traverse(F, x => x))` is equivalent to `u.traverse(G, t)` for any `t` such that `t(a).map(f)` is equivalent to `t(a.map(f))` (naturality)
 * 2. `u.traverse(F, F.of)` is equivalent to `F.of(u)` for any Applicative `F` (identity)
 * 3. `u.traverse(Compose, x => new Compose(x))` is equivalent to `new Compose(u.traverse(F, x => x).map(x => x.traverse(G, x => x)))` for `Compose` defined below and any Applicatives `F` and `G` (composition)
 * @template A
 * @typedef {{
 *  traverse: <B>(f: Applicative, fn: (a: A) => Applicative<B>) => Applicative<Traversable<B>>
 * }} Traversable
 */
