/** @import { Task } from "../types.js" */

import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { task } from "./task.js";

describe(task.of.name, () => {
  it("should return a Task<E, A> that can be forked to A", () => {
    /** @type {Task<string, number>} */
    const result = task.of(123);
    result.fork((x) => x, (x) => assertEquals(x, 123));
  });

  it("should return a Task<E, A> that can fork to E", () => {
    const result = task.fromPromise(
      new Promise((_resolve, reject) => reject(new Error("failure"))),
    );
    result.fork(
      (x) => assertEquals(x.message, "failure"),
      () => {},
    );
  });

  it("should return a Task<E, A> that can map to Task<E, B>", () => {
    /** @type {Task<string, number>} */
    const result = task.of(123);
    const mappedTask = result.map((x) => String(x));
    mappedTask.fork((x) => x, (x) => assertEquals(x, "123"));
  });

  it("should return a Task<E, A> that can chain to Task<E, B>", () => {
    /** @type {Task<string, number>} */
    const result = task.of(123);
    const chainedTask = result.chain((x) => task.of(x));
    chainedTask.fork((x) => x, (x) => assertEquals(x, 123));
  });
});
