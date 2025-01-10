import json
import os
from urllib.parse import urljoin

import dotenv
import requests

import settings

dotenv.load_dotenv()


def get_all_tags():
    """There are like 100k+ tags, this takes a while..."""
    url = urljoin(settings.BASE_URL, "tags")
    all_tags = []
    page = 1
    batch_size = 200  # Maximum allowed limit for efficiency
    print(f"Requesting tags from {url}")

    while True:
        print(f"Page {page}")
        response = requests.get(
            url=url,
            headers={"Authorization": f"Bearer {settings.API_KEY}"},
            params={"limit": batch_size, "page": page},
        )
        response.raise_for_status()

        batch = response.json().get("items")
        if not batch:  # No more tags to fetch
            break

        print(f"Got {len(batch)} tags")
        all_tags.extend(batch)
        if not page % 100:
            save_tags_to_cache(all_tags)
        page += 1

    print(f"Got a total of {len(all_tags)} tags")
    return all_tags


def save_tags_to_cache(tags):
    print(f"Saving {len(tags)} tags to cache")
    with open(
        os.path.join(settings.CACHE_DIR, "tags.json"), "w", encoding="utf-8"
    ) as f:
        json.dump(tags, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    tags = get_all_tags()
    save_tags_to_cache(tags)
