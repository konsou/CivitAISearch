function loadTags() {
    console.log(`Loading tags...`);
    eel.load_tags_from_cache()(tags => {
        console.log(`Loaded ${tags.length} tags from cache`);
        document.getElementById("tags").textContent = `${tags.length} tags loaded`;
    });
}

window.addEventListener("load", function(){
    loadTags();
});
