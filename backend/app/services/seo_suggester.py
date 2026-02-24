from app.llm.provider import generate


def build_prompt(site_data: dict) -> str:
    return f"""
You are an SEO expert.
Based on the data below, suggest improvements.
URL: {site_data.get("url")}
Title: {site_data.get("title")}
Meta des: {site_data.get("meta_description")}
H1: {site_data.get("h1")}
H2: {site_data.get("h2")}
Words: {site_data.get("word_count")}
Lang: {site_data.get("language")}
Issues detected: {site_data.get("issues")}

Return JSON only:
improved_title
improved_meta_desc
suggested_keywords
suggested_seo_improvements
"""


def suggest_seo(site_data: dict) -> str:
    prompt = build_prompt(site_data)
    return generate(prompt)
