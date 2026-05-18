export type DictionaryState = {
  query: string;
  favorites: string[];
  history: string[];
  maxSuggestions: number;
  fuzzyThreshold: number;
};

export type DictionaryAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "ADD_HISTORY"; payload: string }
  | { type: "SET_MAX_SUGGESTIONS"; payload: number }
  | { type: "SET_FUZZY_THRESHOLD"; payload: number }
  | { type: "HYDRATE"; payload: Partial<DictionaryState> };

export const initialState: DictionaryState = {
  query: "",
  favorites: [],
  history: [],
  maxSuggestions: 20,
  fuzzyThreshold: 2
};
