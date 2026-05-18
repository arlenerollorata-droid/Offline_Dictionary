import { DictionaryAction, DictionaryState, initialState } from "./types";

export function dictionaryReducer(state: DictionaryState, action: DictionaryAction): DictionaryState {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };

    case "TOGGLE_FAVORITE": {
      const word = action.payload.toLowerCase();
      const exists = state.favorites.includes(word);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((item) => item !== word)
          : [...state.favorites, word].sort()
      };
    }

    case "ADD_HISTORY": {
      const word = action.payload.toLowerCase().trim();
      if (!word) {
        return state;
      }

      const next = [word, ...state.history.filter((item) => item !== word)].slice(0, 30);
      return { ...state, history: next };
    }

    case "SET_MAX_SUGGESTIONS":
      return { ...state, maxSuggestions: Math.max(1, Math.min(50, action.payload)) };

    case "SET_FUZZY_THRESHOLD":
      return { ...state, fuzzyThreshold: Math.max(0, Math.min(5, action.payload)) };

    case "HYDRATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function getInitialState(): DictionaryState {
  return initialState;
}
