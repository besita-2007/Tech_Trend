"""
data_processor.py — Full Data Science Pipeline
================================================
Steps covered:
  1. Data Loading
  2. Data Inspection
  3. Data Cleaning
  4. Feature Engineering
  5. Exploratory Data Analysis (EDA) helpers
  6. Returning a clean, analysis-ready DataFrame
"""

import pandas as pd
import os
import json

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "results.csv")

# ─────────────────────────────────────────────
# STEP 1 — DATA LOADING
# ─────────────────────────────────────────────
def load_raw():
    """Load the raw CSV into a DataFrame."""
    print("[1] Loading raw data...")
    df = pd.read_csv(DATA_PATH, low_memory=False)
    print(f"    ✓ Loaded {len(df):,} rows × {len(df.columns)} columns")
    return df


# ─────────────────────────────────────────────
# STEP 2 — DATA INSPECTION
# ─────────────────────────────────────────────
def inspect(df: pd.DataFrame) -> dict:
    """Return a summary of the raw dataset."""
    print("[2] Inspecting data...")
    total = len(df)
    missing = df.isnull().sum()
    missing_pct = (missing / total * 100).round(1)

    summary = {
        "total_rows": total,
        "total_columns": len(df.columns),
        "columns": list(df.columns),
        "missing_per_column": {
            col: {"count": int(missing[col]), "pct": float(missing_pct[col])}
            for col in df.columns
        },
        "dtypes": {col: str(df[col].dtype) for col in df.columns},
    }
    print(f"    ✓ {total:,} rows, {len(df.columns)} columns")
    high_missing = [c for c in df.columns if missing_pct[c] > 80]
    print(f"    ⚠ {len(high_missing)} columns have >80% missing values")
    return summary


# ─────────────────────────────────────────────
# STEP 3 — DATA CLEANING
# ─────────────────────────────────────────────
def clean(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleaning steps:
      - Drop fully empty rows
      - Standardize column names (strip whitespace)
      - Remove duplicate responses
      - Normalize salary outliers (cap at 99th percentile)
      - Standardize YearsCode (convert 'More than 50 years' / 'Less than 1 year')
      - Strip whitespace from all string columns
    """
    print("[3] Cleaning data...")
    original_len = len(df)

    # 3a. Strip column name whitespace
    df.columns = df.columns.str.strip()

    # 3b. Drop fully empty rows
    df = df.dropna(how="all")

    # 3c. Remove duplicate ResponseIds
    if "ResponseId" in df.columns:
        df = df.drop_duplicates(subset=["ResponseId"])

    # 3d. Normalize YearsCode
    if "YearsCode" in df.columns:
        df["YearsCode"] = df["YearsCode"].replace({
            "More than 50 years": "51",
            "Less than 1 year": "0"
        })
        df["YearsCode"] = pd.to_numeric(df["YearsCode"], errors="coerce")

    # 3e. Normalize YearsCodePro
    if "WorkExp" in df.columns:
        df["WorkExp"] = df["WorkExp"].replace({
            "More than 50 years": "51",
            "Less than 1 year": "0"
        })
        df["WorkExp"] = pd.to_numeric(df["WorkExp"], errors="coerce")

    # 3f. Cap salary outliers at 99th percentile
    if "ConvertedCompYearly" in df.columns:
        cap = df["ConvertedCompYearly"].quantile(0.99)
        df["ConvertedCompYearly"] = df["ConvertedCompYearly"].clip(upper=cap)

    # 3g. Strip whitespace from object columns
    str_cols = df.select_dtypes(include="object").columns
    for col in str_cols:
        df[col] = df[col].str.strip()

    removed = original_len - len(df)
    print(f"    ✓ Removed {removed:,} duplicate/empty rows → {len(df):,} clean rows remain")
    return df


# ─────────────────────────────────────────────
# STEP 4 — FEATURE ENGINEERING
# ─────────────────────────────────────────────
def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    New columns derived from existing data:
      - experience_level  : Junior / Mid / Senior / Expert
      - salary_band       : Low / Mid / High / Very High
      - is_professional   : True if MainBranch == developer by profession
      - uses_ai           : True if they use AI tools
      - multi_lang_count  : number of languages they know
    """
    print("[4] Engineering features...")

    # 4a. Experience level from YearsCode
    if "YearsCode" in df.columns:
        def exp_level(y):
            if pd.isna(y): return "Unknown"
            if y <= 2:  return "Junior"
            if y <= 5:  return "Mid"
            if y <= 10: return "Senior"
            return "Expert"
        df["experience_level"] = df["YearsCode"].apply(exp_level)

    # 4b. Salary band from ConvertedCompYearly
    if "ConvertedCompYearly" in df.columns:
        def salary_band(s):
            if pd.isna(s): return "Unknown"
            if s < 30000:  return "Low"
            if s < 80000:  return "Mid"
            if s < 150000: return "High"
            return "Very High"
        df["salary_band"] = df["ConvertedCompYearly"].apply(salary_band)

    # 4c. Is professional developer
    if "MainBranch" in df.columns:
        df["is_professional"] = df["MainBranch"].str.contains(
            "developer by profession", case=False, na=False
        )

    # 4d. Uses AI tools
    if "AISelect" in df.columns:
        df["uses_ai"] = df["AISelect"].str.contains(
            "Yes", case=False, na=False
        )

    # 4e. Number of languages known
    if "LanguageHaveWorkedWith" in df.columns:
        df["multi_lang_count"] = df["LanguageHaveWorkedWith"].fillna("").apply(
            lambda x: len([i for i in x.split(";") if i.strip()]) if x else 0
        )

    print("    ✓ Added: experience_level, salary_band, is_professional, uses_ai, multi_lang_count")
    return df


# ─────────────────────────────────────────────
# STEP 5 — EDA HELPERS (used by analyzer.py)
# ─────────────────────────────────────────────
def eda_summary(df: pd.DataFrame) -> dict:
    """
    Returns key EDA statistics exposed via the /eda API endpoint.
    """
    print("[5] Running EDA...")
    result = {}

    # Experience level distribution
    if "experience_level" in df.columns:
        result["experience_distribution"] = df["experience_level"].value_counts().to_dict()

    # Salary band distribution
    if "salary_band" in df.columns:
        result["salary_distribution"] = df["salary_band"].value_counts().to_dict()

    # AI adoption rate
    if "uses_ai" in df.columns:
        total = len(df)
        ai_users = df["uses_ai"].sum()
        result["ai_adoption_rate"] = round(ai_users / total * 100, 1)

    # Average languages known
    if "multi_lang_count" in df.columns:
        result["avg_languages_known"] = round(df["multi_lang_count"].mean(), 1)

    # Professional vs non-professional split
    if "is_professional" in df.columns:
        result["professional_pct"] = round(df["is_professional"].mean() * 100, 1)

    # Average years of experience
    if "YearsCode" in df.columns:
        result["avg_years_experience"] = round(df["YearsCode"].dropna().mean(), 1)

    # Average salary (USD)
    if "ConvertedCompYearly" in df.columns:
        result["avg_salary_usd"] = round(df["ConvertedCompYearly"].dropna().mean(), 0)

    # Top countries
    if "Country" in df.columns:
        result["top_countries"] = df["Country"].value_counts().head(10).to_dict()

    # Education levels
    if "EdLevel" in df.columns:
        result["education_distribution"] = df["EdLevel"].value_counts().head(6).to_dict()

    print("    ✓ EDA complete")
    return result


# ─────────────────────────────────────────────
# STEP 6 — FULL PIPELINE (entry point)
# ─────────────────────────────────────────────
def run_pipeline() -> tuple[pd.DataFrame, dict]:
    """
    Runs all pipeline steps and returns:
      - clean, feature-engineered DataFrame
      - EDA summary dict
    """
    print("\n===== DATA SCIENCE PIPELINE =====")
    raw = load_raw()
    inspect(raw)
    cleaned = clean(raw)
    featured = engineer_features(cleaned)
    eda = eda_summary(featured)
    print("===== PIPELINE COMPLETE =====\n")
    return featured, eda
