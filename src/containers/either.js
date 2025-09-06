/**
 * A class representing a value of one of two possible types.
 * An instance of Either is either an instance of Left or Right.
 * @template L The type of the Left value (conventionally the error).
 * @template R The type of the Right value (conventionally the success).
 */
class Either {
  #value;
  #isRight;

  get isLeft() {
    return !this.#isRight;
  }

  get isRight() {
    return this.#isRight;
  }

  /**
   * Private constructor. Use Either.left or Either.right instead.
   * @private
   * @param {{x: any; isRight: boolean}} params
   */
  constructor({ x, isRight }) {
    this.#value = x;
    this.#isRight = isRight;
  }

  /**
   * Creates a Left instance of Either.
   * @template L
   * @param {L} x The value to wrap in a Left.
   * @returns {Either<L, never>}
   */
  static left(x) {
    return new Either({ x, isRight: false });
  }

  /**
   * Creates a Right instance of Either.
   * @template R
   * @param {R} x The value to wrap in a Right.
   * @returns {Either<never, R>}
   */
  static right(x) {
    return new Either({ x, isRight: true });
  }

  /**
   * Alias for Either.right, for applicative functors.
   * @template R
   * @param {R} x
   * @returns {Either<never, R>}
   */
  static of(x) {
    return Either.right(x);
  }

  /**
   * Applies a function to the Right value.
   * If this is a Left, it returns the Left value.
   * @template B
   * @param {(x: R) => B} fn The function to apply.
   * @returns {Either<L, B>}
   */
  map(fn) {
    // Because of the `isLeft` check, the type checker now knows
    // that in the `else` block, `#value` is of type `R`.
    return this.isLeft
      ? /** @type {Either<L, B>} */ (/** @type {unknown} */ (this))
      : Either.right(fn(this.#value));
  }

  /**
   * Applies a function that returns an Either to the Right value.
   * @template B
   * @param {(x: R) => Either<L, B>} fn
   * @returns {Either<L, B>}
   */
  chain(fn) {
    return this.isLeft
      ? /** @type {Either<L, B>} */ (/** @type {unknown} */ (this))
      : fn(this.#value);
  }

  /**
   * Takes two functions and applies the first if this is a Left
   * and the second if this is a Right, extracting the value.
   * This is the primary way to get a value out of an Either.
   * @template B
   * @param {(leftValue: L) => B} onLeft
   * @param {(rightValue: R) => B} onRight
   * @returns {B}
   */
  fold(onLeft, onRight) {
    return this.isLeft ? onLeft(this.#value) : onRight(this.#value);
  }

  /**
   * Returns the wrapped value for inspection.
   * @returns {L | R}
   */
  inspect() {
    return this.#value;
  }
}

export { Either };
