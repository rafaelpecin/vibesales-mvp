import os
from google import genai

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL_NAME = "gemini-2.5-flash"


def generate(prompt: str, max_tokens: int = 2000) -> str:
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config={
            "temperature": 0.4,
            "max_output_tokens": max_tokens,
        },
    )

    if not response or not response.text:
        raise Exception("Gemini returned empty response")

    return response.text.strip()
