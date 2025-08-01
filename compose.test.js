import { describe, it } from "@std/testing/bdd"
import { spy } from "@std/testing/mock"
import { assertInstanceOf } from "@std/assert/instance-of";
import { assertEquals } from "@std/assert/equals";
import { compose } from "../simple-functions/compose.js";

describe('compose', () => {
  it('should return a composed function', () => {
    const a = () => { }
    const b = () => { }
    const result = compose(a, b)

    assertInstanceOf(result, Function)
  })

  it('should call the passed in functions right to left', () => {
    /** @type {('stringify' | 'increment')[]} */
    const callOrder = [];

    /** @type {(a: number) => number} */
    const increment = (a) => a + 1
    const incrementSpy = spy(
      /** @type {(a: number) => number} */
      (a) => {
        callOrder.push('increment')
        return increment(a)
      })

    /** @type {(a: number) => string} */
    const stringify = (a) => String(a);
    const stringifySpy = spy(
      /** @type {(a: number) => string} */
      (a) => {
        callOrder.push('stringify')
        return stringify(a)
      })

    const incrementThenStringify = compose(stringifySpy, incrementSpy);
    const result = incrementThenStringify(1)

    assertEquals(callOrder, ['increment', 'stringify'])
    assertEquals(result, '2')
  })
})