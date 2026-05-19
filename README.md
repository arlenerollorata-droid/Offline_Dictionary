# Offline Dictionary with Trie Search
---

## Project Info

- **SDK Version:** Expo 54.0.34
- **Total Words:** 15,034
- **Name :** Arlene Rollorata | ITMSD 3
---

**ITMSD 3 Final Project: Cross-Platform Mobile Application**

A dictionary app that works without internet. It uses a custom Trie and Levenshtein distance to search 15,034 English words instantly on mobile devices.

## Project Highlights

**Custom Trie Data Structure** - O(L) insert, O(P+K) prefix search
**Fuzzy Matching Algorithm** - Levenshtein distance for typo correction
**Wildcard Pattern Matching** - Search with `_` and `?` placeholders (c_t = cat, cot, cut)
**Three Search Modes** - Auto switch (wildcard -> prefix -> fuzzy)
**Etymology Engine** - Shows word origins, prefixes, suffixes, and language roots
**Real-time Metrics** - Shows search speed and result counts
**Dark/Light Theme** - Switch themes manually or follow system settings
**Persistent Storage** - Favorites and history saved across sessions
**Production UI** - Card-based layouts with maroon/red color scheme
**TypeScript** - Strict type checking throughout

## Key Features

### Search
- **Prefix Search:** Type "app" -> shows apple, apply, application
- **Wildcard Search:** Type "c_t" -> shows cat, cot, cut, cast, cost
- **Fuzzy Search:** Type "dgo" (typo) -> shows "dog" as top result
- **Performance Display:** Shows time in milliseconds and result count
- **Anagram Lookup:** Instant anagram detection using precomputed hash map

### Etymology & Word Info
- **Affix Detection:** Finds prefixes (un-, re-, pre-, dis-) and suffixes (-ness, -tion, -ly)
- **Multi-affix Analysis:** Handles stacked affixes (unhappiness = un- + happy + -ness)
- **Inflection Handling:** Detects verb forms (running -> run), comparatives (bigger -> big), plurals
- **Language Guessing:** Detects Greek, Latin, French, Old Norse, and Germanic origins
- **Timeline Estimation:** Tells when a word entered English
- **Curated Etymologies:** 280+ hand-written entries for common words

### User Experience
- **Favorites:** Save words with a star; search/filter your saved list
- **History:** Last 30 searches saved; clear all button
- **Word Details:** Definition, etymology, character analysis, anagrams, text-to-speech
- **Settings:** Adjust fuzzy threshold (0-5), result limits (1-50), theme toggle
- **Search Tips:** In-app help modal explaining all search modes
- **Dark Mode:** Manual toggle or follow system, saved across sessions

### Technical
- **Offline-First:** All 15,034 words loaded; no internet needed
- **Responsive:** Works on different phone sizes with safe-area insets
- **Fast Startup:** App loads in <500ms with complete dictionary
- **Type Safe:** 100% TypeScript with strict mode
- **Well Tested:** Unit tests for algorithms, state management, and search

## Project Structure

```
project/
|-- app/                          # Expo Router screens
|   |-- (tabs)/
|   |   |-- index.tsx            # Search screen (main) with Word of the Day
|   |   |-- favorites.tsx        # Saved words list with filter
|   |   +-- history.tsx          # Recent searches with clear button
|   |-- word/
|   |   +-- [word].tsx           # Word detail + etymology + analytics
|   |-- settings.tsx             # Configuration, docs, library stats
|   |-- modal.tsx                # Search help modal
|   +-- _layout.tsx              # Root navigation + splash gate
|-- src/
|   |-- components/
|   |   +-- SplashScreen.tsx     # Animated splash with progress bar
|   |-- core/
|   |   |-- trie.ts              # Trie implementation (Map-based nodes)
|   |   |-- levenshtein.ts       # Levenshtein distance DP algorithm
|   |   |-- dictionaryService.ts # Search (prefix, wildcard, fuzzy, anagrams, WOTD)
|   |   |-- definitions.ts       # Curated definitions + affix-based fallback
|   |   |-- expandedDefinitions.ts # 800+ curated word definitions
|   |   +-- etymologyService.ts  # Etymology engine (affix stripping, language detection)
|   |-- data/
|   |   |-- seedWords.ts         # 15,034 English words
|   |   +-- etymologies.ts       # 280+ curated etymologies
|   |-- state/
|   |   |-- types.ts             # TypeScript definitions
|   |   |-- reducer.ts           # State mutations (7 action types)
|   |   +-- context.tsx          # React Context provider with AsyncStorage hydration
|   |-- storage/
|   |   +-- persistence.ts       # AsyncStorage save/load wrapper
|   +-- theme/
|       |-- colors.ts            # Theme color tokens (light + dark)
|       +-- ThemeContext.tsx      # Theme provider with persisted preference
|-- tests/
|   |-- trie.test.ts             # Insert, prefix, wildcard tests
|   |-- levenshtein.test.ts      # Distance + fuzzy ranking tests
|   |-- reducer.test.ts          # Favorites toggle + history dedup
|   +-- dictionaryService.test.ts # Search mode integration tests
|-- app.json                     # Expo config (SDK 54)
|-- package.json                 # Dependencies
|-- tsconfig.json                # TypeScript strict mode
+-- README.md                    # This file
```

## Algorithm Explanation

### 1. Trie Data Structure (src/core/trie.ts)

A tree structure that stores words character by character:

```typescript
class TrieNode {
  children: Map<string, TrieNode>
  isWord: boolean
}
```

**Complexity:**
- **Insert:** O(L) where L = word length
- **Search:** O(P+K) where P = prefix length, K = number of results
- **Memory:** O(26xN) where N = total nodes

**Why Trie?**
- Faster than checking every word one by one for large dictionaries
- Groups words by their starting letters
- Supports wildcard search naturally
- Works well with 1M+ words

### 2. Levenshtein Distance (src/core/levenshtein.ts)

Edit distance using dynamic programming:

```
levenshteinDistance("dog", "dgo") = 2
  - Insert 'o' -> "dgo" becomes "dog"
  - Or swap 'g' and 'o'
```

**Complexity:** O(mxn) where m = query length, n = candidate length

**Why Levenshtein?**
- Fixes typos and spelling mistakes
- Sorts results by how close they match
- Works as fallback when prefix finds nothing
- Feels natural to users

### 3. Etymology Engine (src/core/etymologyService.ts)

Steps for finding word origins:

```
Input word
    |
    v
Check curated etymologies -> return if found
    |
    v
Check for both prefix + suffix at same time -> find root word
    |
    v
Check for inflection (-ing, -ed, -er, -est) -> handle spelling changes
    |
    v
Check for prefix only or suffix only -> return breakdown
    |
    v
Check for Greek/Latin root -> return root info
    |
    v
Check for compound word -> return parts
    |
    v
Fallback: guess language + estimate timeline
```

**Stem resolution** handles spelling changes:
- Consonant doubling: runner -> run (runn -> run)
- Silent e-drop: driver -> drive (driv -> drive)
- y->i changes: happier -> happy (happi -> happy)

### 4. Search Algorithm Cascade

The app picks the best search mode:

```
User Input
    |
    v
Has _ or ? -> Use Wildcard (fastest: O(Px26))
    |
    v
Has results -> Use Prefix (fast: O(P+K))
    |
    v
No results -> Use Fuzzy (slower: O(mxn), but thorough)
```

### 5. Anagram Lookup

Uses a precomputed hash map (built when app starts):

```typescript
// Key: sorted letters, Value: list of matching words
anagramMap.get(sortLetters("cat")) -> ["act", "cat"]
```

**Complexity:** O(1) lookup vs O(N) brute-force

## Getting Started

### Prerequisites
- Node.js v18+ and npm v9+
- Expo Go app on your phone (SDK 54)
- Windows/Mac/Linux computer

### Installation

```bash
# 1. Go to project folder
cd "ITMSD/FINAL_PROJECT (ITMSD 3)"

# 2. Install dependencies
npm install

# 3. Verify setup
npx tsc --noEmit --skipLibCheck    # Should report 0 errors
npm test                            # All tests should pass
```

### Running the App

**Start dev server:**
```bash
npm start / npx expo start
```

**On phone:**
1. Open Expo Go
2. Scan the QR code in the terminal
3. App loads automatically

**Hot reload:**
```
Press 'r' to reload
Press 'q' to quit
```

## Performance

| Operation | Time | Notes |
|-----------|------|-------|
| App startup | ~200ms | Load 15,034 words into Trie |
| Prefix search "a" | <10ms | 500+ results |
| Wildcard search "c_t" | <15ms | 50-100 results |
| Fuzzy search "dgo" | ~50ms | Levenshtein ranking |
| Anagram lookup | <1ms | Precomputed hash map (O(1)) |
| Etymology analysis | <5ms | Multi-pass affix stripping |
| Memory usage | ~3-6MB | Trie + state + UI + etymology data |

## UI Design

**Color Scheme:**
- Primary: #7B1818 (Maroon) - headers, accents
- Dark Accent: #C62828 (Red) - dark mode highlights
- Background: #fafafa (Light) / #000 (Dark)
- Cards: #fff / #1a1a1a with subtle shadows

**Screen Overview:**
- **Search:** Live filtering with mode badge, metrics, Word of the Day card
- **Favorites:** Card list with search/filter bar and delete
- **History:** Numbered list with tap to open and clear all button
- **Word Detail:** Large text, etymology card with language badge, character analysis, anagrams, audio
- **Settings:** Theme toggle, threshold/limit controls, algorithm docs, library stats


### Algorithm Selection
1. **Trie vs Hash Table:** Trie allows prefix search; hash table does not
2. **Levenshtein vs Soundex:** Levenshtein handles all typos; Soundex only handles phonetic errors
3. **Why 3 Modes:** Wildcard is fast for patterns, Prefix is fastest, Fuzzy is best for typos

### Etymology Design
1. **Algorithmic fallback** instead of full database: 15,000+ curated entries is too much work; affix analysis covers all words
2. **Multi-pass stripping** handles words with both prefix and suffix that single-pass would miss
3. **Extra base word set** (~900 common stems) fills gaps in the sampled word list

### Performance
- **Startup:** O(WxL) where W=15,034 words, L=avg 7 chars = ~105k operations = <200ms
- **Search:** Worst case O(26^P) for wildcard; limited in practice
- **Memory:** Trie with 15,034 words = ~700KB overhead, fine for mobile

### Why React Native?
- Same code works on iOS and Android
- Expo Router for easy navigation
- Works offline with no internet dependency
- Native performance for smooth animations and text-to-speech

## Submission Checklist

- Project compiles without errors (0 TS errors)
- All 15,034 words load successfully
- All search modes work (prefix, wildcard, fuzzy)
- Etymology engine covers all words 
- Favorites save and can be searched/filtered
- History saves last 30 with clear all button
- Settings work (fuzzy: 0-5, limit: 1-50, theme toggle)
- Word detail screen complete (definition, etymology, analytics, anagrams, TTS)
- Real-time performance metrics display
- Dark/light theme with saved preference
- Professional UI with card layouts and animations
- TypeScript strict mode enabled
- README documentation complete
- Algorithm and etymology 

## Useful Commands

```bash
npm start                # Start dev server
npm test                 # Run tests
npx tsc --noEmit --skipLibCheck  # Check TypeScript
npm run lint             # Lint (if configured)
```

## Support

For issues or questions, check the in-app Settings screen for:
- Algorithm complexity (Big O)
- Search mode examples
- Configuration tips
- Library statistics (words, favorites, history)


