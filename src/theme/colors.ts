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
  white: string;
};

export const light: ThemeColors = {
  bg: "#fff",
  surface: "#f5f5f5",
  card: "#fff",
  border: "#f3f4f6",
  borderStrong: "#e5e7eb",
  text: "#1a1a1a",
  textSecondary: "#374151",
  textMuted: "#6b7280",
  textSubtle: "#9ca3af",
  accent: "#c62828",
  accentTint: "rgba(198,40,40,0.08)",
  white: "#fff",
};

export const dark: ThemeColors = {
  bg: "#0a0a0a",
  surface: "#141414",
  card: "#1a1a1a",
  border: "#262626",
  borderStrong: "#333",
  text: "#f5f5f5",
  textSecondary: "#d1d5db",
  textMuted: "#9ca3af",
  textSubtle: "#6b7280",
  accent: "#f87171",
  accentTint: "rgba(248,113,113,0.12)",
  white: "#fff",
};
