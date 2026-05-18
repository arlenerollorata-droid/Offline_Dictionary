import { seedWords } from "../data/seedWords";
import { getClosestWords } from "./levenshtein";
import { Trie } from "./trie";

const trie = new Trie();

for (const word of seedWords) {
  trie.insert(word);
}

export const wordsLoaded = seedWords.length;

export function searchPrefix(prefix: string, limit = 20): string[] {
  return trie.findByPrefix(prefix, limit);
}

export function searchWildcard(pattern: string, limit = 20): string[] {
  return trie.findByWildcard(pattern, limit);
}

export function searchExact(word: string): boolean {
  return trie.contains(word);
}

export function searchFuzzy(input: string, maxDistance = 2, limit = 10): string[] {
  return getClosestWords(input, seedWords, maxDistance, limit);
}

export function getWordDefinition(word: string): string {
  return `${word}: Placeholder definition. Replace with your full offline dictionary dataset.`;
}
