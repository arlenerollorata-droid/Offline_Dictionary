import { dictionaryReducer } from "../src/state/reducer";
import { initialState } from "../src/state/types";

describe("dictionaryReducer", () => {
  it("toggles favorites", () => {
    const withFavorite = dictionaryReducer(initialState, {
      type: "TOGGLE_FAVORITE",
      payload: "trie"
    });

    expect(withFavorite.favorites).toEqual(["trie"]);

    const withoutFavorite = dictionaryReducer(withFavorite, {
      type: "TOGGLE_FAVORITE",
      payload: "trie"
    });

    expect(withoutFavorite.favorites).toEqual([]);
  });

  it("adds unique history and keeps newest first", () => {
    const step1 = dictionaryReducer(initialState, {
      type: "ADD_HISTORY",
      payload: "react"
    });

    const step2 = dictionaryReducer(step1, {
      type: "ADD_HISTORY",
      payload: "expo"
    });

    const step3 = dictionaryReducer(step2, {
      type: "ADD_HISTORY",
      payload: "react"
    });

    expect(step3.history).toEqual(["react", "expo"]);
  });
});
