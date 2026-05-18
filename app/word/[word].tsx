import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-speech";
import { findAnagrams, getWordDefinition } from "../../src/core/dictionaryService";
import { getEtymology } from "../../src/core/etymologyService";
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
    navigation.setOptions({ title: word });
  }, [navigation, word]);

  const definition = useMemo(() => (word ? getWordDefinition(word) : ""), [word]);
  const etymology = useMemo(() => (word ? getEtymology(word) : null), [word]);
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
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: t.card,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: t.borderStrong,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04,
          shadowRadius: 4,
          elevation: 1,
        },
        favBtnActive: { backgroundColor: t.accent, borderColor: t.accent },
        card: {
          backgroundColor: t.card,
          borderRadius: 14,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: t.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        cardHead: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
        cardTitle: { fontSize: 12, fontWeight: "700", color: t.textMuted, textTransform: "uppercase", letterSpacing: 1 },
        definition: { fontSize: 16, color: t.text, lineHeight: 24, fontWeight: "400" },
        grid: { flexDirection: "row", gap: 12 },
        gridItem: {
          flex: 1,
          alignItems: "center",
          paddingVertical: 16,
          backgroundColor: t.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: t.border,
        },
        gridVal: { fontSize: 24, fontWeight: "800", color: t.accent },
        gridLabel: { fontSize: 10, color: t.textMuted, fontWeight: "600", textTransform: "uppercase", marginTop: 4 },
        anagramChip: {
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 10,
          backgroundColor: t.accentTint,
          marginRight: 8,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: t.accentTint,
        },
        anagramText: { fontSize: 14, fontWeight: "600", color: t.accent },
        anagramWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
        actions: { marginTop: 12 },
        actionPrimary: {
          flexDirection: "row",
          height: 54,
          borderRadius: 14,
          backgroundColor: t.accent,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: t.accent,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        },
        actionText: { color: t.white, fontWeight: "700", fontSize: 16 },
        etymologyMeta: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 10, flexWrap: "wrap" },
        langBadge: {
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 6,
          backgroundColor: t.accentTint,
        },
        langBadgeText: { fontSize: 11, fontWeight: "700", color: t.accent, textTransform: "uppercase", letterSpacing: 0.5 },
        timelineText: { fontSize: 12, color: t.textMuted, fontWeight: "500", flex: 1 },
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

      {etymology && etymology.origin && (
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name="globe-outline" size={16} color={t.accent} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Etymology</Text>
          </View>
          <Text style={styles.definition}>{etymology.origin}</Text>
          <View style={styles.etymologyMeta}>
            <View style={styles.langBadge}>
              <Text style={styles.langBadgeText}>{etymology.language}</Text>
            </View>
            {etymology.timeline && (
              <Text style={styles.timelineText}>{etymology.timeline}</Text>
            )}
          </View>
        </View>
      )}

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
