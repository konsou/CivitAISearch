import { Tag } from './types.js'
import { TagTrie } from './tagTrie.js';

declare global {
  interface Window {
    tagSearchTrie: TagTrie;
  }
}


function tagElement() {

}

function loadTags() {
    console.log(`Loading tags...`);
    const trie = new TagTrie();

    // @ts-ignore
    eel.load_tags_from_cache()((tags: Tag[]) => {
        console.log(`Loaded ${tags.length} tags from cache`);
        tags.forEach(tag => trie.insert(tag));
        window.tagSearchTrie = trie;

        const tagsLoadedElement = document.getElementById("tags-loaded");
        if (tagsLoadedElement) { tagsLoadedElement.textContent = `${tags.length} tags loaded`;}

    });
}

function tagInputUpdate(e: InputEvent) {
    if (!e.target) { return; }
    const target = e.target as HTMLInputElement;
    console.log(`Input update: ${target.value}`);
    const searchTerm = target.value;
    const results = window.tagSearchTrie.search(searchTerm);

    // Display first 10 results
    const resultsList = results.slice(0, 10).map((tag: Tag) => `
        <li>${tag.name} (${tag.modelCount} models)</li>
    `).join('');

    const autoCompleteElement = document.getElementById('search-tag-autocomplete');
    if (autoCompleteElement) { autoCompleteElement.innerHTML = resultsList;}
}

window.addEventListener("load", function() {
    loadTags();
    document.getElementById('search-tag-input')?.addEventListener('input', (event: Event) => {
        const inputEvent = event as InputEvent;
        tagInputUpdate(inputEvent);
    });
});