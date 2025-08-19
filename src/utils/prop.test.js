import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert/equals";
import { prop } from "./prop.js";

describe(prop.name, () => {
  it("should return the specified prop from the object", () => {
    const obj = {
      a: 123,
      b: "abc",
    };

    const a = prop("a")(obj);
    const b = prop("b")(obj);

    assertEquals(a, obj.a);
    assertEquals(b, obj.b);
  });

  it("should return undefined for non-existing props", () => {
    assertEquals(prop("a")({}), undefined);
  });

  it("should return specified value in an array", () => {
    assertEquals(prop(0)([1, 2, 3]), 1);
  });
});
