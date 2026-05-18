import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function FavoritesScreen() {
  const t = useTheme();
  const { state, toggleFavorite } = useDictionary();

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
        emptyHint: { fontSize: 14, color: t.textMuted, textAlign: "center", lineHeight: 20 },
        card: {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
          gap: 14,
        },
        cardIcon: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
        },
        word: { flex: 1, fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
        removeBtn: { padding: 4 },
      }),
    [t]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="star-outline" size={36} color={t.accent} />
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyHint}>Tap the star icon next to any word to save it here</Text>
          </View>
        }
        contentContainerStyle={state.favorites.length === 0 ? { flex: 1 } : { paddingBottom: 24, paddingHorizontal: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name="star" size={18} color={t.accent} />
              </View>
              <Text style={styles.word}>{item}</Text>
              <Pressable onPress={() => toggleFavorite(item)} hitSlop={12} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={18} color={t.textSubtle} />
              </Pressable>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
