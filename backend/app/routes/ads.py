from fastapi import APIRouter
from app.llm.provider import generate

router = APIRouter()

@router.post("/ads")
def generate_ads(payload: dict):
    prompt = f"""
    Create Google Ads copy.
    Product info:
    {payload}

    Rules:
    - Headlines <= 30 chars
    - Descriptions <= 90 chars

    Return JSON only.
    """

    return generate(prompt)
