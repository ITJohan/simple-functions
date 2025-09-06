import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { IO } from "./io.js";

describe(IO.name, () => {
  describe(IO.of.name, () => {
    it("should return a new IO<A> object that performs no side-effects", () => {
      const io = IO.of(123);
      assertEquals(io.run(), 123);
    });
  });

  describe(IO.from.name, () => {
    it("should return a new IO<A> object that performs side-effects", () => {
      const io = IO.from(() => 123);
      assertEquals(io.run(), 123);
    });

    it("should return a new IO<A> object that can map to IO<B>", () => {
      const io = IO.from(() => 123).map((x) => String(x));
      assertEquals(io.run(), "123");
    });

    it("should return a new IO<A> object that can chain to IO<B>", () => {
      const io = IO.from(() => 123).chain((x) => IO.from(() => x));
      assertEquals(io.run(), 123);
    });
  });
});
