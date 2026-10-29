import pandas as pd
from data_processor import run_pipeline

# Run the full DS pipeline once at startup
df, eda = run_pipeline()

FIELD_DEVTYPE_MAP = {
    "data science": ["Data scientist or machine learning specialist", "Data engineer", "AI/ML engineer", "Academic researcher"],
    "web development": ["Developer, full-stack", "Developer, front-end", "Developer, back-end"],
    "devops": ["DevOps specialist", "Site reliability engineer", "Cloud infrastructure engineer"],
    "mobile": ["Developer, mobile"],
    "cybersecurity": ["Cybersecurity or InfoSec professional"],
    "game development": ["Developer, game or graphics"],
    "embedded": ["Developer, embedded applications or devices"],
}

def _filter_by_field(field: str) -> pd.DataFrame:
    dev_types = FIELD_DEVTYPE_MAP.get(field.lower(), [])
    if dev_types and "DevType" in df.columns:
        mask = df["DevType"].fillna("").apply(lambda x: any(d in x for d in dev_types))
        filtered = df[mask]
        return filtered if not filtered.empty else df
    return df

def _col_counts(filtered: pd.DataFrame, col: str, top_n: int):
    if col not in filtered.columns or filtered.empty:
        return []
    series = filtered[col].dropna().str.split(";").explode().str.strip()
    counts = series.value_counts().head(top_n)
    return [{"name": k, "count": int(v)} for k, v in counts.items()]

def get_top_languages(field: str, top_n: int = 10):
    return _col_counts(_filter_by_field(field), "LanguageHaveWorkedWith", top_n)

def get_top_databases(field: str, top_n: int = 8):
    return _col_counts(_filter_by_field(field), "DatabaseHaveWorkedWith", top_n)

def get_top_frameworks(field: str, top_n: int = 8):
    return _col_counts(_filter_by_field(field), "WebframeHaveWorkedWith", top_n)

def get_top_tools(field: str, top_n: int = 8):
    return _col_counts(_filter_by_field(field), "DevEnvsHaveWorkedWith", top_n)

def get_trending_languages(top_n: int = 12):
    if df.empty:
        return []
    have_col, want_col = "LanguageHaveWorkedWith", "LanguageWantToWorkWith"
    if have_col not in df.columns or want_col not in df.columns:
        return []
    have = df[have_col].dropna().str.split(";").explode().str.strip().value_counts()
    want = df[want_col].dropna().str.split(";").explode().str.strip().value_counts()
    combined = pd.DataFrame({"have": have, "want": want}).fillna(0)
    combined["trend_score"] = (combined["want"] / (combined["have"] + 1) * 100).round(1)
    combined = combined[combined["have"] >= 50]
    result = combined.sort_values("trend_score", ascending=False).head(top_n).reset_index()
    result.columns = ["name", "have", "want", "trend_score"]
    return result.to_dict(orient="records")

def get_overall_top_languages(top_n: int = 15):
    return _col_counts(df, "LanguageHaveWorkedWith", top_n)

def get_ai_tools_trend(top_n: int = 10):
    return _col_counts(df, "AIModelsHaveWorkedWith", top_n)

def get_devtype_distribution(top_n: int = 12):
    return _col_counts(df, "DevType", top_n)

def get_eda_summary():
    return eda

def get_salary_by_experience():
    if df.empty or "experience_level" not in df.columns or "ConvertedCompYearly" not in df.columns:
        return []
    order = ["Junior", "Mid", "Senior", "Expert"]
    result = (
        df[df["experience_level"].isin(order)]
        .groupby("experience_level")["ConvertedCompYearly"]
        .median()
        .reindex(order)
        .dropna()
        .round(0)
    )
    return [{"level": k, "median_salary": int(v)} for k, v in result.items()]

def get_ai_adoption_by_experience():
    if df.empty or "experience_level" not in df.columns or "uses_ai" not in df.columns:
        return []
    order = ["Junior", "Mid", "Senior", "Expert"]
    result = (
        df[df["experience_level"].isin(order)]
        .groupby("experience_level")["uses_ai"]
        .mean()
        .reindex(order)
        .dropna()
        .mul(100)
        .round(1)
    )
    return [{"level": k, "ai_adoption_pct": float(v)} for k, v in result.items()]
