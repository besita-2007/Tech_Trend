from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from analyzer import (
    get_top_languages, get_top_databases, get_top_frameworks,
    get_top_tools, get_trending_languages, get_overall_top_languages,
    get_ai_tools_trend, get_devtype_distribution,
    get_eda_summary, get_salary_by_experience, get_ai_adoption_by_experience
)
from recommender import get_roadmap, get_all_fields

app = FastAPI(title="SO Trends API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Stack Overflow Trends API is running"}

@app.get("/fields")
def fields():
    return {"fields": get_all_fields()}

# ── Trend endpoints ──────────────────────────
@app.get("/trends/languages")
def trending_languages():
    return {"data": get_trending_languages()}

@app.get("/trends/overall")
def overall_languages():
    return {"data": get_overall_top_languages()}

@app.get("/trends/ai-tools")
def ai_tools():
    return {"data": get_ai_tools_trend()}

@app.get("/trends/devtypes")
def devtypes():
    return {"data": get_devtype_distribution()}

# ── EDA / Data Science insights endpoints ───
@app.get("/eda")
def eda_summary():
    """Returns key EDA statistics from the cleaned dataset."""
    return get_eda_summary()

@app.get("/eda/salary-by-experience")
def salary_by_experience():
    """Median salary (USD) grouped by experience level."""
    return {"data": get_salary_by_experience()}

@app.get("/eda/ai-adoption-by-experience")
def ai_adoption_by_experience():
    """AI tool adoption rate (%) grouped by experience level."""
    return {"data": get_ai_adoption_by_experience()}

# ── Field-specific endpoint ──────────────────
@app.get("/field/{field_name}")
def field_info(field_name: str):
    roadmap = get_roadmap(field_name)
    if not roadmap:
        raise HTTPException(
            status_code=404,
            detail=f"Field '{field_name}' not found. Available: {get_all_fields()}"
        )
    return {
        "field": field_name,
        "description": roadmap["description"],
        "top_languages": get_top_languages(field_name),
        "top_databases": get_top_databases(field_name),
        "top_frameworks": get_top_frameworks(field_name),
        "top_tools": get_top_tools(field_name),
        "roadmap": roadmap["stages"],
    }
