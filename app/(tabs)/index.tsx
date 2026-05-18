import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Animated, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { searchFuzzy, searchPrefix, searchWildcard, wordsLoaded, getWordOfTheDay } from "../../src/core/dictionaryService";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

type Row = {
  word: string;
  source: "prefix" | "fuzzy" | "wildcard";
};

type QueryMetrics = {
  timeMs: number;
  mode: "prefix" | "wildcard" | "fuzzy" | "none";
  count: number;
};

export default function SearchScreen() {
  const t = useTheme();
  const { state, setQuery, addHistory, toggleFavorite } = useDictionary();
  const query = state.query;
  const [metrics, setMetrics] = useState<QueryMetrics>({ timeMs: 0, mode: "none", count: 0 });
  const [focused, setFocused] = useState(false);
  const wotd = useMemo(() => getWordOfTheDay(), []);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  const rows = useMemo<Row[]>(() => {
    const startTime = performance.now();
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      setMetrics({ timeMs: 0, mode: "none", count: 0 });
      return [];
    }

    let fromWildcard: string[] = [];
    let fromPrefix: string[] = [];
    let fromFuzzy: string[] = [];
    let detectedMode: "prefix" | "wildcard" | "fuzzy" = "prefix";

    if (normalized.includes("_") || normalized.includes("?")) {
      fromWildcard = searchWildcard(normalized, state.maxSuggestions);
      detectedMode = "wildcard";
    } else {
      fromPrefix = searchPrefix(normalized, state.maxSuggestions);
      fromFuzzy = searchFuzzy(normalized, state.fuzzyThreshold, state.maxSuggestions);
      detectedMode = fromPrefix.length >= 5 ? "prefix" : "fuzzy";
    }

    const prefixRows = fromPrefix.map((word) => ({ word, source: "prefix" as const }));
    const wildcardRows = fromWildcard.map((word) => ({ word, source: "wildcard" as const }));
    const fuzzyRows = fromFuzzy.map((word) => ({ word, source: "fuzzy" as const }));

    const seen = new Set<string>();
    const allRows = [...prefixRows, ...wildcardRows, ...fuzzyRows].filter((row) => {
      if (seen.has(row.word)) return false;
      seen.add(row.word);
      return true;
    });
    const endTime = performance.now();

    setMetrics({
      timeMs: parseFloat((endTime - startTime).toFixed(2)),
      mode: detectedMode,
      count: allRows.length,
    });

    return allRows;
  }, [query, state.fuzzyThreshold, state.maxSuggestions]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg },
        searchWrap: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
        searchContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: t.card,
          borderRadius: 14,
          paddingHorizontal: 14,
          borderWidth: 2,
          borderColor: focused ? t.accent : t.border,
          shadowColor: focused ? t.accent : "#000",
          shadowOffset: { width: 0, height: focused ? 4 : 1 },
          shadowOpacity: focused ? 0.15 : 0.05,
          shadowRadius: focused ? 12 : 4,
          elevation: focused ? 4 : 1,
        },
        searchIcon: { marginRight: 10 },
        input: { flex: 1, paddingVertical: 14, fontSize: 16, color: t.text, fontWeight: "500" },
        metricsRow: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 10 },
        modeBadge: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 6,
          backgroundColor: t.accentTint,
        },
        modeText: { color: t.accent, fontWeight: "700", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 },
        metricText: { fontSize: 12, color: t.textSubtle, fontWeight: "500" },
        emptyWelcome: { alignItems: "center", paddingTop: 24, paddingHorizontal: 20 },
        welcomeIcon: {
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        },
        welcomeTitle: { fontSize: 20, fontWeight: "800", color: t.text, marginBottom: 4, letterSpacing: -0.3 },
        welcomeSub: { fontSize: 14, color: t.textMuted, fontWeight: "400", marginBottom: 24 },
        tipsBtn: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 18,
          borderRadius: 10,
          backgroundColor: t.accentTint,
        },
        tipsBtnText: { color: t.accent, fontWeight: "600", fontSize: 14 },
        wotdCard: {
          marginTop: 20,
          padding: 20,
          backgroundColor: t.card,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: t.border,
          borderLeftWidth: 4,
          borderLeftColor: t.accent,
          alignSelf: "stretch",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 2,
        },
        wotdLabel: {
          fontSize: 10,
          fontWeight: "700",
          color: t.textMuted,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          marginBottom: 6,
        },
        wotdWord: { fontSize: 24, fontWeight: "800", color: t.text, letterSpacing: -0.5 },
        wotdChevron: { marginTop: 8, alignSelf: "flex-end" },
        emptyState: { alignItems: "center", paddingVertical: 80 },
        emptyIcon: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        },
        emptyText: { fontSize: 17, fontWeight: "700", color: t.textMuted, marginBottom: 6 },
        emptyHint: { fontSize: 14, color: t.textSubtle, textAlign: "center", lineHeight: 20 },
        card: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: t.card,
          marginHorizontal: 16,
          marginTop: 8,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: t.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1,
        },
        cardLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
        cardWord: { fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
        sourceBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, backgroundColor: t.accentTint },
        sourceBadgeText: { fontSize: 9, fontWeight: "700", color: t.accent, textTransform: "uppercase" },
        starBtn: { padding: 6 },
        listContent: { paddingBottom: 24, paddingTop: 8 },
      }),
    [t, focused]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <Animated.View style={[styles.searchContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="search" size={20} color={t.accent} style={styles.searchIcon} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder='Search words, prefixes, "c_t"...'
            placeholderTextColor={t.textSubtle}
            style={styles.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSubmitEditing={() => addHistory(query)}
            keyboardAppearance={t.mode === "dark" ? "dark" : "light"}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")} onPressIn={onPressIn} onPressOut={onPressOut}>
              <Ionicons name="close-circle" size={20} color={t.textSubtle} />
            </Pressable>
          )}
        </Animated.View>

        {query.trim() ? (
          <View style={styles.metricsRow}>
            <View style={styles.modeBadge}>
              <Ionicons name="search" size={11} color={t.accent} style={{ marginRight: 4 }} />
              <Text style={styles.modeText}>
                {metrics.mode === "prefix" ? "Prefix" : metrics.mode === "wildcard" ? "Wildcard" : "Fuzzy"}
              </Text>
            </View>
            <Text style={styles.metricText}>
              {metrics.count > 0
                ? `${metrics.count} result${metrics.count !== 1 ? "s" : ""}  ·  ${metrics.timeMs}ms`
                : "No matches"}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyWelcome}>
            <View style={styles.welcomeIcon}>
              <Ionicons name="book-outline" size={36} color={t.accent} />
            </View>
            <Text style={styles.welcomeTitle}>{wordsLoaded.toLocaleString()} words loaded</Text>
            <Text style={styles.welcomeSub}>Start typing to search the dictionary</Text>
            <Link href="/modal" asChild>
              <Pressable style={styles.tipsBtn}>
                <Ionicons name="bulb-outline" size={16} color={t.accent} style={{ marginRight: 6 }} />
                <Text style={styles.tipsBtnText}>Search Tips</Text>
              </Pressable>
            </Link>
            <View style={styles.wotdCard}>
              <Text style={styles.wotdLabel}>Word of the Day</Text>
              <Link href={`/word/${encodeURIComponent(wotd)}`} asChild>
                <Pressable>
                  <Text style={styles.wotdWord}>{wotd}</Text>
                </Pressable>
              </Link>
              <View style={styles.wotdChevron}>
                <Ionicons name="arrow-forward" size={16} color={t.accent} />
              </View>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={rows}
        keyExtractor={(item) => `${item.word}-${item.source}`}
        ListEmptyComponent={
          query.trim() ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="search-outline" size={32} color={t.accent} />
              </View>
              <Text style={styles.emptyText}>No matches found</Text>
              <Text style={styles.emptyHint}>Try a different word or check your spelling</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item.word)}`} asChild>
            <Pressable style={styles.card} onPress={() => addHistory(item.word)}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardWord}>{item.word}</Text>
                <View style={styles.sourceBadge}>
                  <Text style={styles.sourceBadgeText}>{item.source}</Text>
                </View>
              </View>
              <Pressable onPress={() => toggleFavorite(item.word)} hitSlop={8} style={styles.starBtn}>
                <Ionicons
                  name={state.favorites.includes(item.word) ? "star" : "star-outline"}
                  size={20}
                  color={state.favorites.includes(item.word) ? t.accent : t.textSubtle}
                />
              </Pressable>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
