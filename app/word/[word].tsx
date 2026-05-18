import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-speech";
import { findAnagrams, getWordDefinition } from "../../src/core/dictionaryService";
import { useDictionary } from "../../src/state/context";
import { useTheme } from "../../src/theme/ThemeContext";

export default function WordDetailScreen() {
  const navigation = useNavigation();
  const [speaking, setSpeaking] = useState(false);
  const t = useTheme();
  const params = useLocalSearchParams<{ word?: string }>();
  const word = decodeURIComponent(params.word ?? "").toLowerCase();
  const { state, toggleFavorite } = useDictionary();
  const isFavorite = state.favorites.includes(word);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: word,
      headerStyle: { backgroundColor: t.bg },
      headerTitleStyle: { color: t.text, fontWeight: "700" },
      headerTintColor: t.accent,
    });
  }, [navigation, t, word]);

  const definition = useMemo(() => (word ? getWordDefinition(word) : ""), [word]);
  const anagrams = useMemo(() => (word ? findAnagrams(word, 12) : []), [word]);
  const vowels = useMemo(() => (word.match(/[aeiou]/gi) || []).length, [word]);
  const consonants = word.length - vowels;

  const speak = useCallback(() => {
    if (speaking) { Speech.stop(); setSpeaking(false); return; }
    setSpeaking(true);
    Speech.speak(word, {
      language: "en-US",
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  }, [speaking, word]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: t.bg },
        content: { padding: 20, paddingBottom: 40 },
        header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
        headerLeft: { flex: 1 },
        word: { fontSize: 36, fontWeight: "800", color: t.text, textTransform: "capitalize", letterSpacing: -0.5 },
        phoneticRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 6 },
        phonetic: { fontSize: 15, color: t.textMuted },
        favBtn: {
          width: 46,
          height: 46,
          borderRadius: 23,
          backgroundColor: t.card,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: t.borderStrong,
        },
        favBtnActive: { backgroundColor: t.accent, borderColor: t.accent },
        card: { backgroundColor: t.card, borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: t.border },
        cardHead: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
        cardTitle: { fontSize: 12, fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: 1 },
        definition: { fontSize: 16, color: t.text, lineHeight: 24, fontWeight: "400" },
        grid: { flexDirection: "row", gap: 10 },
        gridItem: { flex: 1, alignItems: "center", paddingVertical: 14, backgroundColor: t.surface, borderRadius: 10 },
        gridVal: { fontSize: 22, fontWeight: "800", color: t.accent },
        gridLabel: { fontSize: 10, color: t.textMuted, fontWeight: "600", textTransform: "uppercase", marginTop: 4 },
        anagramChip: {
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: t.accentTint,
          marginRight: 8,
          marginBottom: 8,
        },
        anagramText: { fontSize: 14, fontWeight: "600", color: t.accent },
        anagramWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
        actions: { marginTop: 8 },
        actionPrimary: {
          flexDirection: "row",
          height: 50,
          borderRadius: 12,
          backgroundColor: t.accent,
          alignItems: "center",
          justifyContent: "center",
        },
        actionText: { color: t.white, fontWeight: "700", fontSize: 15 },
        error: { fontSize: 16, color: t.accent, textAlign: "center", marginTop: 40, fontWeight: "600" },
      }),
    [t, word]
  );

  if (!word) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No word selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.word}>{word}</Text>
          <View style={styles.phoneticRow}>
            <Pressable onPress={speak} hitSlop={8}>
              <Ionicons
                name={speaking ? "volume-high" : "volume-medium-outline"}
                size={18}
                color={speaking ? t.accent : t.textMuted}
              />
            </Pressable>
            <Text style={styles.phonetic}>/{word}/</Text>
          </View>
        </View>
        <Pressable
          onPress={() => toggleFavorite(word)}
          style={[styles.favBtn, isFavorite && styles.favBtnActive]}
        >
          <Ionicons name={isFavorite ? "star" : "star-outline"} size={22} color={isFavorite ? t.white : t.accent} />
        </Pressable>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="book-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Definition</Text>
        </View>
        <Text style={styles.definition}>{definition}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Ionicons name="analytics-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
          <Text style={styles.cardTitle}>Analysis</Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridVal}>{word.length}</Text>
            <Text style={styles.gridLabel}>Letters</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridVal}>{vowels}</Text>
            <Text style={styles.gridLabel}>Vowels</Text>
          </View>
        </View>
        <View style={[styles.grid, { marginTop: 10 }]}>
          <View style={styles.gridItem}>
            <Text style={styles.gridVal}>{consonants}</Text>
            <Text style={styles.gridLabel}>Consonants</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridVal}>{word.length > 0 ? word[0].toUpperCase() : "-"}</Text>
            <Text style={styles.gridLabel}>Starts with</Text>
          </View>
        </View>
      </View>

      {anagrams.length > 0 && (
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="shuffle-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Anagrams ({anagrams.length})</Text>
          </View>
          <View style={styles.anagramWrap}>
            {anagrams.map((a) => (
              <Link key={a} href={`/word/${encodeURIComponent(a)}`} asChild>
                <Pressable style={styles.anagramChip}>
                  <Text style={styles.anagramText}>{a}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable onPress={() => toggleFavorite(word)} style={styles.actionPrimary}>
          <Ionicons name={isFavorite ? "star" : "star-outline"} size={18} color={t.white} style={{ marginRight: 8 }} />
          <Text style={styles.actionText}>{isFavorite ? "Remove from Favorites" : "Save to Favorites"}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
