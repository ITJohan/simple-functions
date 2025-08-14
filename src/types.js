/**
 * Algebraic structures from the Fantasy Land Specification at https://github.com/fantasyland/fantasy-land/blob/master/README.md
 */

/**
 * @typedef {{
 *  inspect(): string;
 * }} Inspectable
 */

/** Level 1 */

/**
 * 1. `u.contramap(a => a)` is equivalent to `u` (identity)
 * 2. `u.contramap(x => f(g(x)))` is equivalent to `u.contramap(f).contramap(g)` (composition)
 * @template A
 * @typedef {{
 *  contramap<B>(f: (x: B) => A): Contravariant<B>;
 * } & Inspectable} Contravariant
 */

/**
 * 1. `v.filter(x => p(x) && q(x))` is equivalent to `v.filter(p).filter(q)` (distributivity)
 * 2. `v.filter(x => true)` is equivalent to `v` (identity)
 * 3. `v.filter(x => false)` is equivalent to `w.filter(x => false)` if `v` and `w` are values of the same Filterable (annihilation)
 * @template A
 * @typedef {{
 *  filter(p: (x: A) => boolean): Filterable<A>
 * } & Inspectable} Filterable
 */

/**
 * 1. `u.reduce` is equivalent to `u.reduce((acc, x) => acc.concat([x]), []).reduce`
 * @template A
 * @typedef {{
 *  reduce<B>(f: (previous: B, current: A) => B, x: B): B
 * } & Inspectable} Foldable
 */

/**
 * 1. `u.map(a => a)` is equivalent to `u` (identity)
 * 2. `u.map(x => f(g(x)))` is equivalent to `u.map(g).map(f)` (composition)
 * @template A
 * @typedef {{
 *  map<B>(f: (x: A) => B): Functor<B>;
 * } & Inspectable} Functor
 */

/**
 * 1. `a.concat(b).concat(c)` is equivalent to `a.concat(b.concat(c))` (associativity)
 * @typedef {{
 *  concat(x: Semigroup): Semigroup
 * } & Inspectable} Semigroup
 */

/**
 * 1. `a.compose(b).compose(c) === a.compose(b.compose(c))` (associativity)
 * @template I, J
 * @typedef {{
 *  compose<K>(x: Semigroupoid<J, K>): Semigroupoid<I, K>
 * } & Inspectable} Semigroupoid
 */

/**
 * 1. `a.equals(a) === true` (reflexivity)
 * 2. `a.equals(b) === b.equals(a)` (symmetry)
 * 3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
 * @typedef {{
 *  equals(x: Setoid): boolean;
 * } & Inspectable} Setoid
 */

/** Level 2 */

/**
 * 1. `a.alt(b).alt(c)` is equivalent to `a.alt(b.alt(c))` (associativity)
 * 2. `a.alt(b).map(f)` is equivalent to `a.map(f).alt(b.map(f))` (distributivity)
 * @template A
 * @typedef {{
 *  alt(x: Alt<A>): Alt<A>
 * } & Functor<A>} Alt
 */

/**
 * 1. `v.ap(u.ap(a.map(f => g => x => f(g(x)))))`  is equivalent to `v.ap(u).ap(a)` (composition)
 * @template A
 * @typedef {{
 *  ap<B>(x: Apply<(x: A) => B>): Apply<B>
 * } & Functor<A>} Apply
 */

/**
 * 1. `p.bimap(a => a, b => b)` is equivalent to `p` (identity)
 * 2. `p.bimap(a => f(g(a)), b => h(i(b)))` is equivalent to `p.bimap(g, i).bimap(f, h)` (composition)
 * @template A, C
 * @typedef {{
 *  bimap<B,D>(f: (x: A) => B, g: (x: C) => D): Bifunctor<B, D>
 * } & Functor<A>} Bifunctor
 */

/**
 * 1. `a.compose(C.id())` is equivalent to `a` (right identity)
 * 2. `C.id().compose(a)` is equivalent to `a` (left identity)
 * @template A, B
 * @typedef {{
 *  id(): Category<A, A>
 * } & Semigroupoid<A, B>} Category
 */

/**
 * 1. `w.extend(g).extend(f)` is equivalent to `w.extend(_w => f(_w.extend(g)))`
 * @template A
 * @typedef {{
 *  extend<B>(f: (x: Extend<A>) => B): Extend<B>
 * } & Functor<A>} Extend
 */

/**
 * 1. `m.concat(M.empty())` is equivalent to `m` (right identity)
 * 2. `M.empty().concat(m)` is equivalent to `m` (left identity)
 * @typedef {{
 *  empty(): Monoid
 * } & Semigroup} Monoid
 */

/**
 * 1. `a.lte(b)` or `b.lte(a)` (totality)
 * 2. If `a.lte(b)` and `b.lte(a)`, then `a.equals(b)` (antisymmetry)
 * 3. If `a.lte(b)` and `b.lte(c)`, then `a.lte(c)` (transitivity)
 * @typedef {{
 *  lte(x: Ord): boolean
 * } & Setoid} Ord
 */

/**
 * 1. `p.promap(a => a, b => b)` is equivalent to `p` (identity)
 * 2. `p.promap(a => f(g(a)), b => h(i(b)))` is equivalent to `p.promap(f, i).promap(g, h)` (composition)
 * @template B, C
 * @typedef {{
 *  promap<A, D>(f: (x: A) => B, g: (x: C) => D): Profunctor<A, D>
 * } & Functor<B>} Profunctor
 */

/**
 * 1. `t(u.traverse(F, x => x))` is equivalent to `u.traverse(G, t)` for any `t` such that `t(a).map(f)` is equivalent to `t(a.map(f))` (naturality)
 * 2. `u.traverse(F, F.of)` is equivalent to `F.of(u)` for any Applicative `F` (identity)
 * 3. `u.traverse(Compose, x => new Compose(x))` is equivalent to `new Compose(u.traverse(F, x => x).map(x => x.traverse(G, x => x)))` for `Compose` defined below and any Applicatives `F` and `G` (composition)
 * @template A
 * @typedef {{
 *  traverse<B>(x: Applicative<A>, f: (x: A) => Applicative<B>): Applicative<Traversable<B>>
 * }} Traversable
 */

/** Level 3 */

/**
 * 1. `v.ap(A.of(x => x))` is equivalent to `v` (identity)
 * 2. `A.of(x).ap(A.of(f))` is equivalent to `A.of(f(x))` (homomorphism)
 * 3. `A.of(y).ap(u)` is equivalent to `u.ap(A.of(f => f(y)))` (interchange)
 * @template A
 * @typedef {Apply<A>} Applicative
 */

/**
 * 1. `m.chain(f).chain(g)` is equivalent to `m.chain(x => f(x).chain(g))` (associativity)
 * @template A
 * @typedef {{
 *  chain<B>(f: (x: A) => Chain<B>): Chain<B>
 * } & Apply<A>} Chain
 */

/**
 * 1. `w.extend(_w => _w.extract())` is equivalent to `w` (left identity)
 * 2. `w.extend(f).extract()` is equivalent to `f(w)` (right identity)
 * @template A
 * @typedef {{
 *  extract(): A
 * } & Extend<A>} Comonad
 */

/**
 * 1. `g.concat(g.invert())` is equivalent to `g.constructor.empty()` (right inverse)
 * 2. `g.invert().concat(g)` is equivalent to `g.constructor.empty()` (left inverse)
 * @typedef {{
 *  invert(): Group
 * } & Monoid} Group
 */

/**
 * 1. `x.alt(A.zero())` is equivalent to `x` (right identity)
 * 2. `A.zero().alt(x)` is equivalent to `x` (left identity)
 * 3. `A.zero().map(f)` is equivalent to `A.zero()` (annihilation)
 * @template A
 * @typedef {{
 *  zero(): Plus<A>
 * } & Alt<A>} Plus
 */

/** level 4 */

/**
 * 1. `x.ap(f.alt(g))` is equivalent to `x.ap(f).alt(x.ap(g))` (distributivity)
 * 2. `x.ap(A.zero())` is equivalent to `A.zero()` (annihilation)
 * @template A
 * @typedef {Applicative<A> & Plus<A>} Alternative
 */

/**
 * 1. `M.chainRec((next, done, v) => p(v) ? d(v).map(done) : n(v).map(next), i)` is equivalent to `(function step(v) { return p(v) ? d(v) : n(v).chain(step); }(i))` (equivalence)
 * 2. Stack usage of `M.chainRec(f, i)` must be at most a constant multiple of the stack usage of `f` itself.
 * @template A
 * @typedef {{
 *  chainRec: <B, C>(f: (next: () => C, done: () => C, value: A) => ChainRec<C>, i: A) => ChainRec<B>
 * } & Chain<A>} ChainRec
 */

/**
 * 1. `M.of(a).chain(f)` is equivalent to `f(a)` (left identity)
 * 2. `m.chain(M.of)` is equivalent to `m` (right identity)
 * @template A
 * @typedef {Applicative<A> & Chain<A>} Monad
 */
