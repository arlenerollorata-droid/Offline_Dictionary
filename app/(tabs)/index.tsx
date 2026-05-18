import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { searchFuzzy, searchPrefix, searchWildcard, wordsLoaded } from "../../src/core/dictionaryService";
import { useDictionary } from "../../src/state/context";

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
  const { state, setQuery, addHistory, toggleFavorite } = useDictionary();
  const query = state.query;
  const [metrics, setMetrics] = useState<QueryMetrics>({ timeMs: 0, mode: "none", count: 0 });

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
      count: allRows.length
    });

    return allRows;
  }, [query, state.fuzzyThreshold, state.maxSuggestions]);

  const getModeColor = (mode: string) => {
    switch (mode) {
      case "prefix": return "#c62828";
      case "wildcard": return "#d97706";
      case "fuzzy": return "#7c3aed";
      default: return "#999";
    }
  };

  const getModeIcon = (mode: string): any => {
    switch (mode) {
      case "prefix": return "search";
      case "wildcard": return "contract";
      case "fuzzy": return "sparkles";
      default: return "help-circle";
    }
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case "prefix": return "Prefix Search";
      case "wildcard": return "Wildcard Pattern";
      case "fuzzy": return "Fuzzy Match";
      default: return "Type to search";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dictionary</Text>
        <Text style={styles.subtitle}>{wordsLoaded.toLocaleString()} words • Instant search</Text>
      </View>
      
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9ca39e" style={styles.searchIcon} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Type word, prefix, c_t"
          placeholderTextColor="#9ca39e"
          style={styles.input}
          onSubmitEditing={() => addHistory(query)}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9ca39e" />
          </Pressable>
        )}
      </View>

      {/* Metrics & Mode Display */}
      {query.trim() && (
        <View style={styles.metricsContainer}>
          <View style={[styles.modeBadge, { backgroundColor: getModeColor(metrics.mode) }]}>
            <Ionicons name={getModeIcon(metrics.mode)} size={12} color="#fff" style={{ marginRight: 4 }} />
            <Text style={styles.modeText}>{getModeLabel(metrics.mode)}</Text>
          </View>
          <Text style={styles.metricText}>
            {metrics.count > 0 
              ? `${metrics.count} result${metrics.count !== 1 ? 's' : ''} • ${metrics.timeMs}ms`
              : "No matches found"}
          </Text>
        </View>
      )}

      {!query.trim() && (
        <Link href="/modal" asChild>
          <Pressable style={styles.helpButton}>
            <Ionicons name="bulb-outline" size={18} color="#c62828" style={styles.helpIcon} />
            <Text style={styles.helpText}>Search Tips</Text>
          </Pressable>
        </Link>
      )}

      <FlatList
        data={rows}
        keyExtractor={(item) => `${item.word}-${item.source}`}
        ListEmptyComponent={
          query.trim() ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#b0b9b4" />
              <Text style={styles.emptyText}>No matches found</Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item.word)}`} asChild>
            <Pressable
              style={styles.resultCard}
              onPress={() => addHistory(item.word)}
            >
              <View style={styles.resultContent}>
                <Text style={styles.resultWord}>{item.word}</Text>
                <View style={[styles.resultBadge, { backgroundColor: getModeColor(item.source) + "15" }]}>
                  <Text style={[styles.resultBadgeText, { color: getModeColor(item.source) }]}>{item.source}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => toggleFavorite(item.word)}
                style={styles.resultStar}
                hitSlop={8}
              >
                <Ionicons 
                  name={state.favorites.includes(item.word) ? "star" : "star-outline"} 
                  size={20} 
                  color={state.favorites.includes(item.word) ? "#ffc107" : "#b0b9b4"} 
                />
              </Pressable>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "400",
    marginTop: 2
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  searchIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#212529",
    fontWeight: "400"
  },
  metricsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  modeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },
  modeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  metricText: {
    fontSize: 12,
    color: "#adb5bd",
    fontWeight: "500"
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fbe9e7",
    borderRadius: 8
  },
  helpIcon: {
    marginRight: 8
  },
  helpText: {
    color: "#c62828",
    fontWeight: "600",
    fontSize: 14
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#adb5bd",
    marginTop: 12
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1f3f5"
  },
  resultContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  resultWord: {
    fontSize: 17,
    fontWeight: "600",
    color: "#212529"
  },
  resultBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  resultBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  resultStar: {
    padding: 4
  }
});
