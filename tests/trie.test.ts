import { Trie } from "../src/core/trie";

describe("Trie", () => {
  it("inserts and checks exact words", () => {
    const trie = new Trie();
    trie.insert("react");

    expect(trie.contains("react")).toBe(true);
    expect(trie.contains("rea")).toBe(false);
  });

  it("returns prefix matches", () => {
    const trie = new Trie();
    trie.insert("cat");
    trie.insert("car");
    trie.insert("cart");
    trie.insert("dog");

    expect(trie.findByPrefix("ca", 10)).toEqual(["cat", "car", "cart"]);
  });

  it("supports wildcard matching", () => {
    const trie = new Trie();
    trie.insert("cat");
    trie.insert("cot");
    trie.insert("cut");
    trie.insert("coat");

    expect(trie.findByWildcard("c_t", 10)).toEqual(["cat", "cot", "cut"]);
  });
});
