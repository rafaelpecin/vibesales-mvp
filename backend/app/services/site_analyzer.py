import requests
from bs4 import BeautifulSoup
from langdetect import detect


def analyze_site(url: str) -> dict:
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")

    title = soup.title.string.strip() if soup.title else None

    meta_desc = None
    meta_tag = soup.find("meta", attrs={"name": "description"})
    if meta_tag and meta_tag.get("content"):
        meta_desc = meta_tag["content"].strip()

    h1 = [h.get_text(strip=True) for h in soup.find_all("h1")]
    h2 = [h.get_text(strip=True) for h in soup.find_all("h2")]

    text = soup.get_text(separator=" ", strip=True)
    word_count = len(text.split())

    try:
        language = detect(text[:500])
    except Exception:
        language = None

    return {
        "url": url,
        "title": title,
        "meta_description": meta_desc,
        "h1": h1,
        "h2": h2,
        "word_count": word_count,
        "language": language,
        "issues": {
            "missing_title": title is None,
            "missing_meta_description": meta_desc is None,
            "multiple_h1": len(h1) > 1,
            "low_word_count": word_count < 300,
        },
    }
