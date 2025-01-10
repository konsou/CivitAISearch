import os

import dotenv

dotenv.load_dotenv()

BASE_URL = "https://civitai.com/api/v1/"
API_KEY = os.getenv("CIVITAI_API_KEY")
CACHE_DIR = "./.cache"
