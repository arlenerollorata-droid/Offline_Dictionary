import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getWordDefinition } from "../../src/core/dictionaryService";
import { useDictionary } from "../../src/state/context";

export default function WordDetailScreen() {
  const params = useLocalSearchParams<{ word?: string }>();
  const word = decodeURIComponent(params.word ?? "").toLowerCase();
  const { state, toggleFavorite } = useDictionary();
  const isFavorite = state.favorites.includes(word);

  const handleCopy = () => {
    alert(`Copied: ${word}`);
  };

  const handleShare = () => {
    alert(`Share: ${word}`);
  };

  if (!word) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No word selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Word Header */}
      <View style={styles.headerRow}>
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{word}</Text>
          <View style={styles.phoneticContainer}>
            <Ionicons name="volume-medium-outline" size={18} color="#6c757d" />
            <Text style={styles.phonetic}>/{word}/</Text>
          </View>
        </View>
        <Pressable 
          onPress={() => toggleFavorite(word)}
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        >
          <Ionicons 
            name={isFavorite ? "star" : "star-outline"} 
            size={24} 
            color={isFavorite ? "#fff" : "#c62828"} 
          />
        </Pressable>
      </View>

      {/* Definition Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="book-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Definition</Text>
        </View>
        <Text style={styles.definition}>{getWordDefinition(word)}</Text>
      </View>

      {/* Word Analytics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="analytics-outline" size={18} color="#c62828" style={{ marginRight: 8 }} />
          <Text style={styles.sectionTitle}>Word Analysis</Text>
        </View>
        <View style={styles.analyticsGrid}>
          <View style={styles.analyticItem}>
            <Text style={styles.analyticValue}>{word.length}</Text>
            <Text style={styles.analyticLabel}>Length</Text>
          </View>
          <View style={styles.analyticItem}>
            <Text style={styles.analyticValue}>
              {/^[a-z]*$/.test(word) ? "Alpha" : "Mixed"}
            </Text>
            <Text style={styles.analyticLabel}>Type</Text>
          </View>
          <View style={styles.analyticItem}>
            <Text style={styles.analyticValue}>{(word.match(/[aeiou]/gi) || []).length}</Text>
            <Text style={styles.analyticLabel}>Vowels</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <Pressable onPress={handleCopy} style={styles.iconButton}>
          <Ionicons name="copy-outline" size={20} color="#c62828" />
          <Text style={styles.iconButtonText}>Copy</Text>
        </Pressable>
        <Pressable onPress={handleShare} style={styles.iconButton}>
          <Ionicons name="share-social-outline" size={20} color="#c62828" />
          <Text style={styles.iconButtonText}>Share</Text>
        </Pressable>
        <Pressable 
          onPress={() => toggleFavorite(word)} 
          style={[styles.mainButton, isFavorite ? styles.buttonDanger : styles.buttonPrimary]}
        >
          <Text style={styles.mainButtonText}>
            {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          </Text>
        </Pressable>
      </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24
  },
  wordContainer: {
    flex: 1
  },
  word: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1a1a1a",
    textTransform: "capitalize",
    letterSpacing: -1
  },
  phoneticContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6
  },
  phonetic: {
    fontSize: 16,
    color: "#6c757d",
    fontFamily: "System"
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  favoriteButtonActive: {
    backgroundColor: "#c62828",
    borderColor: "#c62828"
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
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#495057",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  definition: {
    fontSize: 17,
    color: "#212529",
    lineHeight: 26,
    fontWeight: "400"
  },
  analyticsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  analyticItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef"
  },
  analyticLabel: {
    fontSize: 11,
    color: "#6c757d",
    fontWeight: "600",
    textTransform: "uppercase",
    marginTop: 4
  },
  analyticValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#c62828"
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
    marginBottom: 40
  },
  iconButton: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e9ecef"
  },
  iconButtonText: {
    fontSize: 10,
    color: "#c62828",
    fontWeight: "700",
    marginTop: 4
  },
  mainButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonPrimary: {
    backgroundColor: "#c62828"
  },
  buttonDanger: {
    backgroundColor: "#dc3545"
  },
  mainButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },
  error: {
    fontSize: 18,
    color: "#dc3545",
    textAlign: "center",
    marginTop: 40,
    fontWeight: "600"
  }
});

