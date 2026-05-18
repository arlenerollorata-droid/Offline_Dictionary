import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDictionary } from "../../src/state/context";

export default function HistoryScreen() {
  const { state } = useDictionary();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>{state.history.length} search{state.history.length !== 1 ? 'es' : ''}</Text>
      </View>

      {/* List */}
      <FlatList
        data={state.history}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color="#adb5bd" />
            <Text style={styles.emptyText}>No search history</Text>
            <Text style={styles.emptyHint}>Your recent searches will appear here</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.indexCircle}>
                  <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.word}>{item}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#adb5bd" />
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
    backgroundColor: "#fff"
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingHorizontal: 40
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#495057",
    marginTop: 20,
    marginBottom: 8
  },
  emptyHint: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f1f3f5"
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  indexCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e9ecef",
    alignItems: "center",
    justifyContent: "center"
  },
  indexText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#495057"
  },
  textContainer: {
    flex: 1
  },
  word: {
    fontSize: 17,
    fontWeight: "600",
    color: "#212529",
    textTransform: "capitalize"
  }
});
