import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function HistoryScreen() {
  const t = useTheme();
  const { state, clearHistory } = useDictionary();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg },
        empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 },
        emptyIcon: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        },
        emptyTitle: { fontSize: 20, fontWeight: "700", color: t.text, marginBottom: 6 },
        emptyHint: { fontSize: 14, color: t.textMuted, textAlign: "center" },
        card: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: t.card,
          marginHorizontal: 16,
          marginTop: 8,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: t.border,
          gap: 14,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1,
        },
        indexCircle: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: t.surface,
          alignItems: "center",
          justifyContent: "center",
        },
        indexText: { fontSize: 13, fontWeight: "700", color: t.textMuted },
        word: { flex: 1, fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
        clearBtn: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginHorizontal: 16,
          marginTop: 12,
          marginBottom: 4,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
        },
        clearBtnText: { fontSize: 14, fontWeight: "600", color: t.textMuted },
        listContent: { paddingBottom: 24, paddingTop: 8 },
      }),
    [t]
  );

  const handleClear = () => {
    Alert.alert("Clear History", "Remove all search history?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearHistory },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.history}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        ListHeaderComponent={
          state.history.length > 0 ? (
            <Pressable style={styles.clearBtn} onPress={handleClear}>
              <Ionicons name="trash-outline" size={16} color={t.textMuted} />
              <Text style={styles.clearBtnText}>Clear All</Text>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={36} color={t.accent} />
            </View>
            <Text style={styles.emptyTitle}>No search history</Text>
            <Text style={styles.emptyHint}>Words you search will appear here</Text>
          </View>
        }
        contentContainerStyle={state.history.length === 0 ? { flex: 1 } : styles.listContent}
        renderItem={({ item, index }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.indexCircle}>
                <Text style={styles.indexText}>{index + 1}</Text>
              </View>
              <Text style={styles.word}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color={t.textSubtle} />
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
