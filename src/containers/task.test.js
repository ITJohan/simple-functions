import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { Task } from "./task.js";

describe(Task.of.name, () => {
  it("should return a Task<E, A> that can be forked to A", () => {
    /** @type {Task<string, number>} */
    const task = Task.of(123);
    task.fork((x) => x, (x) => assertEquals(x, 123));
  });

  it("should return a Task<E, A> that can fork to E", () => {
    const task = Task.fromPromise(() =>
      new Promise((_resolve, reject) => reject(new Error("failure")))
    );
    task.fork(
      (x) => assertEquals(x.message, "failure"),
      () => {},
    );
  });

  it("should return a Task<E, A> that can map to Task<E, B>", () => {
    /** @type {Task<string, number>} */
    const task = Task.of(123);
    const mappedTask = task.map((x) => String(x));
    mappedTask.fork((x) => x, (x) => assertEquals(x, "123"));
  });

  it("should return a Task<E, A> that can chain to Task<E, B>", () => {
    /** @type {Task<string, number>} */
    const task = Task.of(123);
    const chainedTask = task.chain((x) => Task.of(x));
    chainedTask.fork((x) => x, (x) => assertEquals(x, 123));
  });
});
