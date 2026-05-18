import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useDictionary } from "../src/state/context";
import { wordsLoaded } from "../src/core/dictionaryService";

export default function SettingsScreen() {
  const { state, setMaxSuggestions, setFuzzyThreshold } = useDictionary();

  // Local text inputs to allow clearing and editing before committing
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
      // revert display to current valid value
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Settings</Text>

      {/* Search Settings Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="options-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Search Preferences</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Max Results (1-50)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={inputMax}
            onChangeText={setInputMax}
            onEndEditing={commitMax}
            onBlur={commitMax}
            maxLength={2}
          />
          <Text style={styles.hint}>Currently displaying up to {state.maxSuggestions} suggestions</Text>
          <Text style={styles.recommend}>Recommended: 20 for balanced results and responsiveness</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Fuzzy Threshold (0-5)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={inputThreshold}
            onChangeText={setInputThreshold}
            onEndEditing={commitThreshold}
            onBlur={commitThreshold}
            maxLength={1}
          />
          <Text style={styles.hint}>{state.fuzzyThreshold} character edits allowed for fuzzy matching</Text>
        </View>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Library Statistics</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Words Loaded</Text>
          <Text style={styles.statValue}>{wordsLoaded.toLocaleString()}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Favorites Saved</Text>
          <Text style={styles.statValue}>{state.favorites.length}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Search History</Text>
          <Text style={styles.statValue}>{state.history.length}</Text>
        </View>
      </View>

      {/* Algorithm Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="code-slash-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Algorithms & Performance</Text>
        </View>
        
        <View style={styles.algoItem}>
          <Text style={styles.algoName}>Trie Structure</Text>
          <Text style={styles.algoDesc}>O(L) insertion, O(P+K) prefix search. Highly memory efficient for dictionaries.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.algoItem}>
          <Text style={styles.algoName}>Levenshtein Distance</Text>
          <Text style={styles.algoDesc}>O(m×n) fuzzy matching using Dynamic Programming for typo tolerance.</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.algoItem}>
          <Text style={styles.algoName}>Wildcard Pattern Matching</Text>
          <Text style={styles.algoDesc}>Recursive Trie traversal using placeholders for flexible lookups.</Text>
        </View>
      </View>

      {/* Tips Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Quick Search Tips</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipBullet} />
          <Text style={styles.tipText}>Type "car" for prefix matching (car, card, carpet)</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipBullet} />
          <Text style={styles.tipText}>Type "c_t" or "c?t" for wildcard matching (cat, cot, cut)</Text>
        </View>
        <View style={styles.tipRow}>
          <View style={styles.tipBullet} />
          <Text style={styles.tipText}>Type "algrithm" for fuzzy matching (algorithm)</Text>
        </View>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 24,
    letterSpacing: -0.5
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f1f3f5",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#495057",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  row: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#f8f9fa",
    color: "#212529",
    marginBottom: 8
  },
  hint: {
    fontSize: 12,
    color: "#6c757d",
    lineHeight: 18
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f3f5",
    marginVertical: 16
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057"
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#c62828"
  },
  algoItem: {
    marginBottom: 4
  },
  algoName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4
  },
  algoDesc: {
    fontSize: 13,
    color: "#6c757d",
    lineHeight: 20
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingRight: 10
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#c62828",
    marginRight: 12
  },
  tipText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20
  },
  spacer: {
    height: 40
  }
  ,
  recommend: {
    marginTop: 6,
    fontSize: 12,
    color: "#4b5563",
    fontWeight: "600"
  }
});
