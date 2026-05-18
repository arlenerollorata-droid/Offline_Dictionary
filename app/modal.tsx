import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { searchWildcard } from "../src/core/dictionaryService";
import { useDictionary } from "../src/state/context";
import { Link } from "expo-router";

export default function AdvancedSearchModal() {
  const { state, setQuery, addHistory } = useDictionary();

  const wildcardMatches = useMemo(() => {
    const q = state.query.trim();
    if (!(q.includes("_") || q.includes("?"))) {
      return [];
    }
    return searchWildcard(q, state.maxSuggestions);
  }, [state.query, state.maxSuggestions]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wildcard Search</Text>
        <Text style={styles.body}>Use _ or ? as a single-letter placeholder. Perfect for crosswords or finding patterns.</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="contract" size={20} color="#9ca39e" style={styles.searchIcon} />
        <TextInput
          value={state.query}
          onChangeText={setQuery}
          placeholder="e.g. c_t, b__k, ??st"
          placeholderTextColor="#9ca39e"
          style={styles.input}
        />
        {state.query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9ca39e" />
          </Pressable>
        )}
      </View>

      <FlatList
        data={wildcardMatches}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          state.query.trim() ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="help-circle-outline" size={48} color="#adb5bd" />
              <Text style={styles.emptyText}>No matches found</Text>
              <Text style={styles.emptyHint}>Try a different pattern like "s_r_ng"</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="sparkles-outline" size={48} color="#adb5bd" />
              <Text style={styles.emptyText}>Ready to search</Text>
              <Text style={styles.emptyHint}>Type a pattern above to see results</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.item} onPress={() => addHistory(item)}>
              <Text style={styles.itemText}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color="#adb5bd" />
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
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.5,
    marginBottom: 8
  },
  body: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 22
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 20
  },
  searchIcon: {
    marginRight: 10
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#212529"
  },
  listContent: {
    paddingBottom: 20
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5"
  },
  itemText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#212529",
    textTransform: "capitalize"
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#495057",
    marginTop: 16,
    marginBottom: 4
  },
  emptyHint: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center"
  }
});
