import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { searchWildcard } from "../src/core/dictionaryService";
import { useDictionary } from "../src/state/context";
import { useTheme } from "../src/theme/ThemeContext";

export default function AdvancedSearchModal() {
  const navigation = useNavigation();
  const t = useTheme();
  const { state, setQuery, addHistory } = useDictionary();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: t.bg },
      headerTitleStyle: { color: t.text, fontWeight: "700" },
      headerTintColor: t.accent,
    });
  }, [navigation, t]);
  const [focused, setFocused] = useState(false);

  const wildcardMatches = useMemo(() => {
    const q = state.query.trim();
    if (!(q.includes("_") || q.includes("?"))) return [];
    return searchWildcard(q, state.maxSuggestions);
  }, [state.query, state.maxSuggestions]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg, padding: 20 },
        header: { marginBottom: 20 },
        title: { fontSize: 26, fontWeight: "800", color: t.text, letterSpacing: -0.5, marginBottom: 8 },
        body: { fontSize: 14, color: t.textMuted, lineHeight: 22 },
        searchContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: t.surface,
          borderRadius: 12,
          paddingHorizontal: 14,
          borderWidth: 2,
          borderColor: focused ? t.accent : "transparent",
          marginBottom: 20,
        },
        searchIcon: { marginRight: 10 },
        input: { flex: 1, paddingVertical: 12, fontSize: 16, color: t.text, fontWeight: "500" },
        list: { paddingBottom: 20 },
        item: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 4,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        },
        itemText: { fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
        empty: { alignItems: "center", justifyContent: "center", paddingVertical: 60 },
        emptyTitle: { fontSize: 16, fontWeight: "600", color: t.textMuted, marginTop: 12, marginBottom: 4 },
        emptyHint: { fontSize: 13, color: t.textSubtle, textAlign: "center" },
      }),
    [t, focused]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wildcard Search</Text>
        <Text style={styles.body}>Use _ or ? as a single-letter placeholder. Great for crosswords and pattern matching.</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="contract" size={20} color={t.accent} style={styles.searchIcon} />
        <TextInput
          value={state.query}
          onChangeText={setQuery}
          placeholder="e.g. c_t, b__k, ??st"
          placeholderTextColor={t.textSubtle}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {state.query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color={t.textSubtle} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={wildcardMatches}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          state.query.trim() ? (
            <View style={styles.empty}>
              <Ionicons name="help-circle-outline" size={44} color={t.textSubtle} />
              <Text style={styles.emptyTitle}>No matches</Text>
              <Text style={styles.emptyHint}>Try a different pattern like "s_r_ng"</Text>
            </View>
          ) : (
            <View style={styles.empty}>
              <Ionicons name="sparkles-outline" size={44} color={t.textSubtle} />
              <Text style={styles.emptyTitle}>Ready to search</Text>
              <Text style={styles.emptyHint}>Type a pattern above to see results</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.item} onPress={() => addHistory(item)}>
              <Text style={styles.itemText}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color={t.textSubtle} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
