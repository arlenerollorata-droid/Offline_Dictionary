import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { dark, light, ThemeColors } from "./colors";

const STORAGE_KEY = "@dictionary_theme_mode";

export type ThemeContextValue = ThemeColors & {
  mode: "light" | "dark";
  setMode: (m: "light" | "dark") => void;
  toggleMode: () => void;
};

const defaultVal = { ...light, mode: "light" as const, setMode: () => {}, toggleMode: () => {} };
const ThemeContext = createContext<ThemeContextValue>(defaultVal);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme() ?? "light";
  const [override, setOverride] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((v) => {
      if (v === "light" || v === "dark") setOverride(v);
    });
  }, []);

  const mode = override ?? system;
  const colors = mode === "dark" ? dark : light;

  const setMode = (m: "light" | "dark") => {
    setOverride(m);
    AsyncStorage.setItem(STORAGE_KEY, m);
  };

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const value: ThemeContextValue = { ...colors, mode, setMode, toggleMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
