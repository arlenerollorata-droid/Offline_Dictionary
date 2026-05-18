import { searchExact, searchPrefix } from "../src/core/dictionaryService";

describe("dictionaryService", () => {
  it("finds exact existing words", () => {
    expect(searchExact("trie")).toBe(true);
  });

  it("returns prefix list for valid query", () => {
    const result = searchPrefix("rea", 5);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].startsWith("rea")).toBe(true);
  });
});
