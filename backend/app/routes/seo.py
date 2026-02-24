from fastapi import APIRouter
from app.llm.provider import generate

router = APIRouter()

@router.post("/seo")
def seo_suggestions(payload: dict):
    prompt = f"""
    You are an SEO expert.

    Based on this info:
    {payload}

    Return JSON only with:
    - keywords
    - optimized_title
    - optimized_description
    - content_ideas
    """

    return generate(prompt)
