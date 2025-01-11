class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.tag = null;
    }
}

export class TagTrie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(tag) {
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

    search(prefix) {
        // Navigate to prefix node
        const prefixNode = this._findNode(prefix);
        if (!prefixNode) {
            return [];
        }

        // Collect and sort all words under this node
        const results = this._collectWords(prefixNode);
        return results.sort((a, b) => b.modelCount - a.modelCount);
    }

    _findNode(prefix) {
        let currentNode = this.root;

        for (const char of prefix.toLowerCase()) {
            if (!currentNode.children[char]) {
                return null;
            }
            currentNode = currentNode.children[char];
        }

        return currentNode;
    }

    _collectWords(node) {
        const results = [];

        // Add this node's tag if it's a complete word
        if (node.isEndOfWord) {
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