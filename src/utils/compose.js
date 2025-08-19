/**
 * @template A
 * @template Z
 * @param {[(x: any) => Z, ...Function[], (x: A) => any]} fns
 * @returns {(x: A) => Z}
 */
const compose = (...fns) => (x) => (
  /** @type {Z} */ (
    /** @type {unknown} */ (
      fns.reduceRight((x, fn) => fn(x), x)
    )
  )
);

export { compose };
