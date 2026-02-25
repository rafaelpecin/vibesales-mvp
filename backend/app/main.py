import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl


from app.services.site_analyzer import analyze_site
from app.services.seo_suggester import suggest_seo
from app.routes import analyze, seo, ads, seo_suggestions


app = FastAPI()
app.include_router(analyze.router)
app.include_router(seo.router)
app.include_router(ads.router)
app.include_router(seo_suggestions.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", os.environ.get("FRONTEND_URL")],
    allow_methods=["*"],
    allow_headers=["*"],
)



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
