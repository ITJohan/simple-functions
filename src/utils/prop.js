/**
 * @template {string | number | symbol} K
 * @param {K} key
 * @returns {<U extends { [P in K]?: unknown }>(obj: U) => U[K]}
 */
const prop = (key) => (obj) => obj[key];

export { prop };
