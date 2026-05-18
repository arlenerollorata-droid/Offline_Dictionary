import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function HistoryScreen() {
  const t = useTheme();
  const { state } = useDictionary();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg },
        empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40 },
        emptyIcon: {
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        },
        emptyTitle: { fontSize: 18, fontWeight: "700", color: t.text, marginBottom: 6 },
        emptyHint: { fontSize: 14, color: t.textMuted, textAlign: "center" },
        card: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
          gap: 14,
        },
        indexCircle: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: t.surface,
          alignItems: "center",
          justifyContent: "center",
        },
        indexText: { fontSize: 12, fontWeight: "700", color: t.textMuted },
        word: { flex: 1, fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
      }),
    [t]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.history}
        keyExtractor={(item, idx) => `${item}-${idx}`}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={36} color={t.accent} />
            </View>
            <Text style={styles.emptyTitle}>No search history</Text>
            <Text style={styles.emptyHint}>Words you search will appear here</Text>
          </View>
        }
        contentContainerStyle={state.history.length === 0 ? { flex: 1 } : { paddingBottom: 24, paddingHorizontal: 16, paddingTop: 8 }}
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
