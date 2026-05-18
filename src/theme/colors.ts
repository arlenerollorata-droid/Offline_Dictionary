export type ThemeColors = {
  bg: string;
  surface: string;
  card: string;
  border: string;
  borderStrong: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  accentTint: string;
  headerBg: string;
  white: string;
};

export const light: ThemeColors = {
  bg: "#fafafa",
  surface: "#f0f0f0",
  card: "#fff",
  border: "#e5e5e5",
  borderStrong: "#d4d4d4",
  text: "#000",
  textSecondary: "#1a1a1a",
  textMuted: "#555",
  textSubtle: "#888",
  accent: "#7B1818",
  accentTint: "rgba(123,24,24,0.08)",
  headerBg: "#7B1818",
  white: "#fff",
};

export const dark: ThemeColors = {
  bg: "#000",
  surface: "#111",
  card: "#1a1a1a",
  border: "#2a2a2a",
  borderStrong: "#333",
  text: "#fff",
  textSecondary: "#e0e0e0",
  textMuted: "#aaa",
  textSubtle: "#777",
  accent: "#C62828",
  accentTint: "rgba(198,40,40,0.15)",
  headerBg: "#7B1818",
  white: "#fff",
};
