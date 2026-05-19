import { getClosestWords, levenshteinDistance } from "../src/core/levenshtein";

describe("Levenshtein", () => {
  it("computes standard distance example", () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });

  it("is case insensitive", () => {
    expect(levenshteinDistance("React", "react")).toBe(0);
  });

  it("returns closest words within threshold", () => {
    const words = ["react", "route", "router", "reducer"];
    expect(getClosestWords("reacr", words, 2, 3)).toEqual(["react"]);
  });
});
