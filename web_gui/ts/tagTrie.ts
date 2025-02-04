import { Tag } from './types.js'

type NodeChildren = {

}

class TrieNode {
    children: Record<string, TrieNode>;
    isEndOfWord: boolean;
    tag: Tag | null;
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.tag = null;
    }
}

export class TagTrie {
    private root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(tag: Tag) {
        let currentNode = this.root;

        for (const char of tag.name.toLowerCase()) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }

        currentNode.isEndOfWord = true;
        currentNode.tag = tag;
    }

    search(prefix: string) {
        // Navigate to prefix node
        const prefixNode = this._findNode(prefix);
        if (!prefixNode) {
            return [];
        }

        // Collect and sort all words under this node
        const results = this._collectWords(prefixNode);
        return results.sort((a: Tag, b: Tag) => (b.modelCount || 0) - (a.modelCount || 0));
    }

    _findNode(prefix: string) {
        let currentNode = this.root;

        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children[char]) {
                return null;
            }
            currentNode = currentNode.children[char];
        }

        return currentNode;
    }

    _collectWords(node: TrieNode): Tag[] {
        const results: Tag[] = [];

        // Add this node's tag if it's a complete word
        if (node.isEndOfWord && node.tag) {
            results.push(node.tag);
        }

        // Recursively collect all child nodes' words
        for (const char in node.children) {
            const childWords = this._collectWords(node.children[char]);
            results.push(...childWords);
        }

        return results;
    }
}