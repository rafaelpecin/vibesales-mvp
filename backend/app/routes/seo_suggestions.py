from fastapi import APIRouter
from app.llm.provider import generate
import uuid

router = APIRouter()

# In-memory store (replace with DB later)
SEO_PROJECTS = {}

def generate_seo_suggestions(analysis: dict):
    prompt = f"""
You are an SEO strategist.

Business info:
- Product type: {analysis.get("product_type")}
- Primary topic: {analysis.get("primary_topic")}
- Language: {analysis.get("language")}

Tasks:
1. Identify 5 trending SEO content topics for this business
2. For each topic, generate:
   - Topic title
   - 3 high-intent keywords
   - Search intent (informational / commercial)

Return STRICT JSON in this format:

[
  {{
    "topic": "...",
    "keywords": ["...", "...", "..."],
    "intent": "..."
  }}
]
"""
    print(prompt)
    return generate(prompt, max_tokens=1800)


@router.post("/seo-suggestions")
def create_seo_suggestions(payload: dict):
    project_id = str(uuid.uuid4())

    suggestions = generate_seo_suggestions(payload)
    print(suggestions)

    SEO_PROJECTS[project_id] = {
        "analysis": payload,
        "suggestions": suggestions,
        "selected_topics": []
    }

    return {
        "project_id": project_id,
        "suggestions": suggestions
    }


@router.get("/seo-suggestions/{project_id}")
def get_seo_suggestions(project_id: str):
    return SEO_PROJECTS.get(project_id)


