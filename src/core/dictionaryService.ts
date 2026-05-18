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
  const { getDefinition } = require("./definitions");
  return getDefinition(word);
}

const anagramMap = new Map<string, string[]>();

for (const w of seedWords) {
  const key = w.split("").sort().join("");
  const list = anagramMap.get(key);
  if (list) {
    list.push(w);
  } else {
    anagramMap.set(key, [w]);
  }
}

export function findAnagrams(word: string, limit = 20): string[] {
  const normalized = word.toLowerCase().trim();
  if (!normalized) return [];

  const key = normalized.split("").sort().join("");
  const matches = anagramMap.get(key);
  if (!matches) return [];

  return matches.filter(w => w !== normalized).slice(0, limit);
}

export function getWordOfTheDay(): string {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
  const index = seed % seedWords.length;
  return seedWords[index];
}
