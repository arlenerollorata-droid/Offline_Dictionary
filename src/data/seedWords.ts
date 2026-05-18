const englishWords = require("an-array-of-english-words") as string[];

const normalizedWords = englishWords
  .map((word) => String(word).trim().toLowerCase())
  .filter((word) => /^[a-z]+$/.test(word));

const uniqueWords = Array.from(new Set(normalizedWords));

const priorityWords = [
  "apple", "bag", "banana", "book", "cat", "computer", "dictionary",
  "dog", "education", "future", "garden", "hello", "history",
  "language", "mobile", "offline", "search", "student",
  "technology", "word", "world",
  "trie",
  "xylophone", "xenon", "xerox",
  "yellow", "yacht", "yoga",
  "zebra", "zenith", "zoo",
  "react", "read", "real"
];

const total = 15000;
const step = Math.max(1, Math.floor(uniqueWords.length / total));
const sampled: string[] = [];
for (let i = 0; i < total && i * step < uniqueWords.length; i++) {
  sampled.push(uniqueWords[i * step]);
}

const seedSet = new Set([...priorityWords, ...sampled]);

export const seedWords: string[] = Array.from(seedSet);
export const wordsLoaded = seedWords.length;
