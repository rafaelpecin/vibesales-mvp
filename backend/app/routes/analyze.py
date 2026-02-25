from fastapi import APIRouter
import requests
from bs4 import BeautifulSoup
from app.llm.provider import generate

router = APIRouter()


@router.post("/analyze")
def analyze_site(payload: dict):
    url = payload["url"]

    html = requests.get(url, timeout=10).text
    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.string if soup.title else ""
    description = ""
    meta = soup.find("meta", attrs={"name": "description"})
    if meta:
        description = meta.get("content", "")

    text = " ".join(p.get_text() for p in soup.find_all("p"))[:4000]
    if not text:
        text = " ".join(d.get_text() for d in soup.find_all("div"))[:4000]

    prompt = f"""
    Analyze this webpage and return JSON only with:
    - primary_topic
    - product_type
    - language

    CONTENT:
    {text}
    """

    print("Prompt 'Analyze' Page:")
    print(prompt)
    ai = generate(prompt)

    ai = ai.replace("```json", '').replace("```", '')
    print("Analyze AI Return:")
    print(ai)

    return {
        "url": url,
        "title": title,
        "description": description,
        "analysis": ai
    }
