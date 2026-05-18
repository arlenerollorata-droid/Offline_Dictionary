class TrieNode {
  public children: Map<string, TrieNode> = new Map();
  public isWord = false;
}

export class Trie {
  private root: TrieNode = new TrieNode();

  insert(word: string): void {
    const normalized = word.trim().toLowerCase();
    if (!normalized) {
      return;
    }

    let current = this.root;
    for (const char of normalized) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isWord = true;
  }

  contains(word: string): boolean {
    const node = this.findNode(word.toLowerCase());
    return !!node && node.isWord;
  }

  findByPrefix(prefix: string, limit = 20): string[] {
    const normalized = prefix.toLowerCase();
    const startNode = this.findNode(normalized);
    if (!startNode) {
      return [];
    }

    const results: string[] = [];
    this.collectWords(startNode, normalized, results, limit);
    return results;
  }

  findByWildcard(pattern: string, limit = 20): string[] {
    const normalized = pattern.toLowerCase();
    const results: string[] = [];

    const search = (node: TrieNode, index: number, currentWord: string): void => {
      if (results.length >= limit) {
        return;
      }

      if (index === normalized.length) {
        if (node.isWord) {
          results.push(currentWord);
        }
        return;
      }

      const char = normalized[index];
      if (char === "_" || char === "?") {
        for (const [childChar, childNode] of node.children) {
          search(childNode, index + 1, currentWord + childChar);
        }
      } else {
        const next = node.children.get(char);
        if (next) {
          search(next, index + 1, currentWord + char);
        }
      }
    };

    search(this.root, 0, "");
    return results;
  }

  private findNode(prefix: string): TrieNode | null {
    let current = this.root;
    for (const char of prefix) {
      const next = current.children.get(char);
      if (!next) {
        return null;
      }
      current = next;
    }
    return current;
  }

  private collectWords(node: TrieNode, prefix: string, results: string[], limit: number): void {
    if (results.length >= limit) {
      return;
    }

    if (node.isWord) {
      results.push(prefix);
    }

    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, results, limit);
      if (results.length >= limit) {
        return;
      }
    }
  }
}
