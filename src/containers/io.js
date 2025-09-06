/**
 * Represents a lazy, synchronous, side-effectful computation.
 * @template A The type of the value produced by the computation.
 */
class IO {
  /**
   * The core side-effectful function, stored as a private field.
   * This function is lazy and will not be executed until run() is called.
   * @property {() => A} #effect
   */
  #effect;

  /**
   * The constructor is private. Use static methods like IO.of() or IO.from().
   * @private
   * @param {() => A} fn The synchronous, side-effectful function.
   */
  constructor(fn) {
    this.#effect = fn;
  }

  /**
   * Lifts a pure value into an IO context.
   * This IO performs no side-effects and simply returns the value.
   * @template A
   * @param {A} x The value to lift.
   * @returns {IO<A>}
   */
  static of(x) {
    return new IO(() => x);
  }

  /**
   * Creates an IO from a side-effectful function.
   * This is the primary way to capture an effect.
   * @template A
   * @param {() => A} fn The side-effectful function to capture.
   * @returns {IO<A>}
   */
  static from(fn) {
    return new IO(fn);
  }

  /**
   * Executes the side-effectful computation and returns its result.
   * This is the bridge from the "pure" IO world to the "impure" real world.
   * @returns {A}
   */
  run() {
    return this.#effect();
  }

  /**
   * Transforms the result of the IO using a pure function.
   * Returns a new IO that combines the original effect and the transformation.
   * @template B
   * @param {(x: A) => B} fn The pure mapping function.
   * @returns {IO<B>}
   */
  map(fn) {
    return new IO(() => fn(this.#effect()));
  }

  /**
   * Sequences another IO computation after the current one.
   * Returns a new IO representing the complete sequence of effects.
   * @template B
   * @param {(value: A) => IO<B>} fn The function to generate the next IO.
   * @returns {IO<B>}
   */
  chain(fn) {
    return new IO(() => fn(this.#effect()).run());
  }
}

export { IO };
