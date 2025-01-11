import { TagTrie } from './tagTrie.js';

function loadTags() {
    console.log(`Loading tags...`);
    const trie = new TagTrie();

    eel.load_tags_from_cache()(tags => {
        console.log(`Loaded ${tags.length} tags from cache`);
        tags.forEach(tag => trie.insert(tag));
        window.tagSearchTrie = trie;

        document.getElementById("tags-loaded").textContent =
            `${tags.length} tags loaded`;
    });
}

function tagInputUpdate(e) {
    console.log(`Input update: ${e.target.value}`);
    const searchTerm = e.target.value;
    const results = window.tagSearchTrie.search(searchTerm);

    // Display first 10 results
    const resultsList = results.slice(0, 10).map(tag => `
        <li>${tag.name} (${tag.modelCount} models)</li>
    `).join('');

    document.getElementById('search-tag-autocomplete').innerHTML = resultsList;
}

window.addEventListener("load", function(){
    loadTags();
    document.getElementById('search-tag-input').addEventListener('input', tagInputUpdate);
});
