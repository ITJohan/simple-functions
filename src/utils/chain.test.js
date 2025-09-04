/** @import {Either} from "../types.js" */

import { describe, it } from "@std/testing/bdd";
import { left, right } from "../containers/either.js";
import { pipe } from "./pipe.js";
import { chain } from "./chain.js";
import { assertEquals } from "@std/assert";

describe(chain.name, () => {
  it("should take a Chain-returning function and return a function expecting Chain and applies the function to its inner value", () => {
    /** @type {(x: any) => Either<string, string>} */
    const string = (x) => {
      if (typeof x !== "string") {
        return left("Not a string.");
      }
      return right(x);
    };
    /** @type {(min: number) => (x: string) => Either<string, string>} */
    const minLength = (min) => (x) => {
      if (x.length < min) {
        return left(`String length of ${x.length} is less than min ${min}.`);
      }
      return right(x);
    };

    const validator = pipe(string, chain(minLength(5)));
    const result = validator("Hello world");
    assertEquals(result.inspect(), "Hello world");
  });
});
