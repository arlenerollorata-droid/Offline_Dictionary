export function levenshteinDistance(a: string, b: string): number {
  const left = a.toLowerCase();
  const right = b.toLowerCase();

  if (left === right) {
    return 0;
  }

  if (!left.length) {
    return right.length;
  }

  if (!right.length) {
    return left.length;
  }

  const rows = left.length + 1;
  const cols = right.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) {
    dp[i][0] = i;
  }

  for (let j = 0; j < cols; j += 1) {
    dp[0][j] = j;
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[rows - 1][cols - 1];
}

export function getClosestWords(input: string, words: string[], maxDistance = 2, limit = 10): string[] {
  const normalized = input.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const adjustedMax = normalized.length <= 3 ? Math.min(maxDistance, 1) : maxDistance;

  const scored = words
    .map((word) => ({ word, distance: levenshteinDistance(normalized, word) }))
    .filter((entry) => entry.distance <= adjustedMax)
    .sort((a, b) => a.distance - b.distance || a.word.localeCompare(b.word));

  return scored.slice(0, limit).map((entry) => entry.word);
}
