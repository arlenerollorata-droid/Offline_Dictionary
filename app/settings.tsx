import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDictionary } from "../src/state/context";
import { wordsLoaded } from "../src/core/dictionaryService";
import { useTheme } from "../src/theme/ThemeContext";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const t = useTheme();
  const { state, setMaxSuggestions, setFuzzyThreshold } = useDictionary();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: t.headerBg },
      headerTintColor: "#fff",
      headerTitleStyle: { color: "#fff", fontWeight: "700" },
    });
  }, [navigation, t.headerBg]);

  const [inputMax, setInputMax] = useState(String(state.maxSuggestions));
  const [inputThreshold, setInputThreshold] = useState(String(state.fuzzyThreshold));

  useEffect(() => {
    setInputMax(String(state.maxSuggestions));
  }, [state.maxSuggestions]);

  useEffect(() => {
    setInputThreshold(String(state.fuzzyThreshold));
  }, [state.fuzzyThreshold]);

  const commitMax = () => {
    const num = parseInt(inputMax, 10);
    if (isNaN(num) || num < 1) {
      setInputMax(String(state.maxSuggestions));
    } else {
      setMaxSuggestions(Math.min(50, num));
    }
  };

  const commitThreshold = () => {
    const num = parseInt(inputThreshold, 10);
    if (isNaN(num) || num < 0) {
      setInputThreshold(String(state.fuzzyThreshold));
    } else {
      setFuzzyThreshold(Math.min(5, num));
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg },
        content: { padding: 20 },
        pageTitle: { fontSize: 30, fontWeight: "800", color: t.text, marginBottom: 24, letterSpacing: -0.5 },
        card: {
          backgroundColor: t.card,
          borderRadius: 14,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: t.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        cardHead: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
        cardTitle: { fontSize: 12, fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: 1 },
        label: { fontSize: 14, fontWeight: "600", color: t.text, marginBottom: 8 },
        input: {
          borderWidth: 1,
          borderColor: t.borderStrong,
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 16,
          fontWeight: "500",
          backgroundColor: t.surface,
          color: t.text,
          marginBottom: 8,
        },
        statRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: t.border },
        statRowLast: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
        statLabel: { fontSize: 14, fontWeight: "500", color: t.textSecondary },
        statValue: { fontSize: 16, fontWeight: "700", color: t.accent },
        hint: { fontSize: 12, color: t.textMuted, lineHeight: 18 },
        recommend: { marginTop: 4, fontSize: 12, color: t.accent, fontWeight: "600" },
        divider: { height: 1, backgroundColor: t.border, marginVertical: 16 },
        algoName: { fontSize: 14, fontWeight: "600", color: t.text, marginBottom: 4 },
        algoDesc: { fontSize: 13, color: t.textMuted, lineHeight: 20 },
        tipRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
        bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: t.accent, marginTop: 7, marginRight: 12, flexShrink: 0 },
        tipText: { fontSize: 14, color: t.textSecondary, lineHeight: 20, flex: 1 },
        tipBold: { fontWeight: "700", color: t.text },
      }),
    [t]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Settings</Text>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name={t.mode === "dark" ? "moon" : "sunny"} size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Appearance</Text>
        </View>
        <Pressable
          onPress={t.toggleMode}
          style={({ pressed }) => [
            { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 4, opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: t.text }}>Theme</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontSize: 14, color: t.textMuted, fontWeight: "500" }}>
              {t.mode === "dark" ? "Dark" : "Light"}
            </Text>
            <Ionicons name={t.mode === "dark" ? "moon" : "sunny"} size={20} color={t.accent} />
          </View>
        </Pressable>
        <Text style={[styles.hint, { marginTop: 8 }]}>Tap to switch between light and dark mode</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="options-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Search Preferences</Text>
        </View>

        <Text style={styles.label}>Max Results (1–50)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={inputMax}
          onChangeText={setInputMax}
          onEndEditing={commitMax}
          onBlur={commitMax}
          maxLength={2}
          keyboardAppearance={t.mode === "dark" ? "dark" : "light"}
        />
        <Text style={styles.hint}>Showing up to {state.maxSuggestions} suggestions per search</Text>
        <Text style={styles.recommend}>Recommended: 20</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Fuzzy Threshold (0–5)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={inputThreshold}
          onChangeText={setInputThreshold}
          onEndEditing={commitThreshold}
          onBlur={commitThreshold}
          maxLength={1}
          keyboardAppearance={t.mode === "dark" ? "dark" : "light"}
        />
        <Text style={styles.hint}>{state.fuzzyThreshold} character edits allowed. Lower = stricter.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="stats-chart-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Library</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Words Loaded</Text>
          <Text style={styles.statValue}>{wordsLoaded.toLocaleString()}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Favorites</Text>
          <Text style={styles.statValue}>{state.favorites.length}</Text>
        </View>
        <View style={styles.statRowLast}>
          <Text style={styles.statLabel}>History</Text>
          <Text style={styles.statValue}>{state.history.length}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="code-slash-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Algorithms</Text>
        </View>
        <Text style={styles.algoName}>Trie Structure</Text>
        <Text style={styles.algoDesc}>O(L) insertion · O(P+K) prefix search. Character-by-character tree for instant lookups.</Text>
        <View style={styles.divider} />
        <Text style={styles.algoName}>Levenshtein Distance</Text>
        <Text style={styles.algoDesc}>O(m×n) DP fuzzy matching. Handles typos and spelling mistakes.</Text>
        <View style={styles.divider} />
        <Text style={styles.algoName}>Wildcard Pattern</Text>
        <Text style={styles.algoDesc}>Recursive Trie traversal with _ and ? as single-character placeholders.</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="bulb-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Quick Tips</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.bullet} />
          <Text style={styles.tipText}>
            Type <Text style={styles.tipBold}>"car"</Text> for prefix matching → car, card, carpet
          </Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.bullet} />
          <Text style={styles.tipText}>
            Type <Text style={styles.tipBold}>"c_t"</Text> for wildcard matching → cat, cot, cut
          </Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.bullet} />
          <Text style={styles.tipText}>
            Type <Text style={styles.tipBold}>"algrithm"</Text> for fuzzy matching → algorithm
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
