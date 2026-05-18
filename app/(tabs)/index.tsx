import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
          backgroundColor: t.surface,
          borderRadius: 12,
          paddingHorizontal: 14,
          borderWidth: 2,
          borderColor: focused ? t.accent : "transparent",
        },
        searchIcon: { marginRight: 10 },
        input: { flex: 1, paddingVertical: 12, fontSize: 16, color: t.text, fontWeight: "500" },
        metricsRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 10 },
        modeBadge: {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 5,
          backgroundColor: t.accentTint,
        },
        modeText: { color: t.accent, fontWeight: "700", fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 },
        metricText: { fontSize: 12, color: t.textSubtle, fontWeight: "500" },
        emptyWelcome: { alignItems: "center", paddingVertical: 24 },
        welcomeIcon: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        },
        welcomeTitle: { fontSize: 18, fontWeight: "700", color: t.text, marginBottom: 4 },
        welcomeSub: { fontSize: 14, color: t.textMuted, fontWeight: "400", marginBottom: 20 },
        tipsBtn: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: t.accentTint,
        },
        tipsBtnText: { color: t.accent, fontWeight: "600", fontSize: 13 },
        wotdCard: {
          marginTop: 16,
          padding: 16,
          backgroundColor: t.card,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: t.border,
          alignSelf: "stretch",
        },
        wotdLabel: { fontSize: 10, fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
        wotdWord: { fontSize: 22, fontWeight: "800", color: t.text, letterSpacing: -0.3 },
        emptyState: { alignItems: "center", paddingVertical: 60 },
        emptyText: { fontSize: 16, fontWeight: "600", color: t.textMuted, marginTop: 12, marginBottom: 4 },
        emptyHint: { fontSize: 13, color: t.textSubtle },
        card: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        },
        cardLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
        cardWord: { fontSize: 16, fontWeight: "600", color: t.text },
        sourceBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: t.accentTint },
        sourceBadgeText: { fontSize: 9, fontWeight: "700", color: t.accent, textTransform: "uppercase" },
        starBtn: { padding: 4 },
      }),
    [t, focused]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <View style={styles.searchContainer}>
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
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color={t.textSubtle} />
            </Pressable>
          )}
        </View>

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
              <Ionicons name="book-outline" size={32} color={t.accent} />
            </View>
            <Text style={styles.welcomeTitle}>{wordsLoaded.toLocaleString()} words loaded</Text>
            <Text style={styles.welcomeSub}>Start typing or use the mic to search</Text>
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
              <Ionicons name="search-outline" size={48} color={t.textSubtle} />
              <Text style={styles.emptyText}>No matches found</Text>
              <Text style={styles.emptyHint}>Try a different word or check your spelling</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
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
