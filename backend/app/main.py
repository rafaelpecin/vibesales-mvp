from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl


from app.services.site_analyzer import analyze_site
from app.services.seo_suggester import suggest_seo
from app.routes import analyze
app.include_router(analyze.router)


app = FastAPI()


class SiteRequest(BaseModel):
    url: HttpUrl


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze-site")
def analyze(request: SiteRequest):
    try:
        return analyze_site(str(request.url))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/seo-suggestions")
def seo_suggestions(request: SiteRequest):
    try:
        site_data = analyze_site(request.url)
        suggestions = suggest_seo(site_data)
        return {
            "url": request.url,
            "suggestions": suggestions,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
