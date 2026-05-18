import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { saveState, loadState } from "../storage/persistence";
import { dictionaryReducer, getInitialState } from "./reducer";
import { DictionaryState } from "./types";

type DictionaryContextValue = {
  state: DictionaryState;
  setQuery: (query: string) => void;
  toggleFavorite: (word: string) => void;
  addHistory: (word: string) => void;
  setMaxSuggestions: (value: number) => void;
  setFuzzyThreshold: (value: number) => void;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dictionaryReducer, undefined, getInitialState);

  useEffect(() => {
    let active = true;

    loadState().then((stored) => {
      if (active && stored) {
        dispatch({ type: "HYDRATE", payload: stored });
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    saveState(state).catch(() => {
      // Persistence failures should not break app flow.
    });
  }, [state]);

  const value = useMemo<DictionaryContextValue>(
    () => ({
      state,
      setQuery: (query) => dispatch({ type: "SET_QUERY", payload: query }),
      toggleFavorite: (word) => dispatch({ type: "TOGGLE_FAVORITE", payload: word }),
      addHistory: (word) => dispatch({ type: "ADD_HISTORY", payload: word }),
      setMaxSuggestions: (value) => dispatch({ type: "SET_MAX_SUGGESTIONS", payload: value }),
      setFuzzyThreshold: (value) => dispatch({ type: "SET_FUZZY_THRESHOLD", payload: value })
    }),
    [state]
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used inside DictionaryProvider");
  }
  return context;
}
