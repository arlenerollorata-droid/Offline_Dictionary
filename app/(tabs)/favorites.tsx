import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function FavoritesScreen() {
  const t = useTheme();
  const { state, toggleFavorite } = useDictionary();
  const [filter, setFilter] = useState("");

  const filtered = useMemo(
    () => state.favorites.filter(w => w.includes(filter.toLowerCase())),
    [state.favorites, filter]
  );

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
        emptyHint: { fontSize: 14, color: t.textMuted, textAlign: "center", lineHeight: 20 },
        searchBar: {
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 12,
          marginBottom: 4,
          paddingHorizontal: 14,
          height: 44,
          borderRadius: 12,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
          gap: 8,
        },
        searchInput: { flex: 1, fontSize: 15, color: t.text, paddingVertical: 0 },
        clearBtn: {
          width: 24,
          height: 24,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        },
        countBadge: {
          fontSize: 12,
          color: t.textMuted,
          marginHorizontal: 16,
          marginTop: 8,
        },
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
        cardIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: t.accentTint,
          alignItems: "center",
          justifyContent: "center",
        },
        word: { flex: 1, fontSize: 16, fontWeight: "600", color: t.text, textTransform: "capitalize" },
        removeBtn: {
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: t.surface,
          alignItems: "center",
          justifyContent: "center",
        },
        listContent: { paddingBottom: 24, paddingTop: 8 },
      }),
    [t]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          state.favorites.length > 0 ? (
            <>
              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={18} color={t.textMuted} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Filter favorites..."
                  placeholderTextColor={t.textMuted}
                  value={filter}
                  onChangeText={setFilter}
                  keyboardAppearance={t.mode === "dark" ? "dark" : "light"}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                {filter.length > 0 && (
                  <Pressable onPress={() => setFilter("")} style={styles.clearBtn}>
                    <Ionicons name="close-circle" size={18} color={t.textMuted} />
                  </Pressable>
                )}
              </View>
              <Text style={styles.countBadge}>
                {filtered.length} of {state.favorites.length} favorites
              </Text>
            </>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="star-outline" size={36} color={t.accent} />
            </View>
            <Text style={styles.emptyTitle}>
              {filter ? "No matches" : "No favorites yet"}
            </Text>
            <Text style={styles.emptyHint}>
              {filter ? "Try a different filter" : "Tap the star icon next to any word to save it here"}
            </Text>
          </View>
        }
        contentContainerStyle={state.favorites.length === 0 ? { flex: 1 } : styles.listContent}
        renderItem={({ item }) => (
          <Link href={`/word/${encodeURIComponent(item)}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardIcon}>
                <Ionicons name="star" size={20} color={t.accent} />
              </View>
              <Text style={styles.word}>{item}</Text>
              <Pressable onPress={() => toggleFavorite(item)} hitSlop={12} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={16} color={t.textSubtle} />
              </Pressable>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
