/**
 * @template A
 * @template Z
 * @param {[(x: A) => any, ...Function[], (x: any) => Z]} fns
 * @returns {(x: A) => Z}
 */
const pipe = (...fns) => (x) => (
  /** @type {Z} */ (
    /** @type {unknown} */ (
      fns.reduce((x, fn) => fn(x), x)
    )
  )
);

export { pipe };
