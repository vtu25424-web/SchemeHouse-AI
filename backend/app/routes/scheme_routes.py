from fastapi import APIRouter, Query
from app.services.scheme_service import (
    get_all_schemes,
    search_schemes,
    filter_schemes_by_category,
    filter_by_income
)

router = APIRouter()


# =========================
# NORMALIZE SCHEME RESPONSE
# =========================
def format_scheme(scheme: dict):
    """Ensure consistent API response format"""
    return {
        "scheme_name": scheme.get("scheme_name", ""),
        "category": scheme.get("category", ""),
        "min_income": scheme.get("min_income", 0),
        "max_income": scheme.get("max_income", 0),
        "eligibility": scheme.get("eligibility", []),
        "benefits": scheme.get("benefits", []),
        "official_link": scheme.get("official_link", "")
    }


# =========================
# GET ALL SCHEMES
# =========================
@router.get("/schemes")
def fetch_all_schemes():
    schemes = get_all_schemes()

    formatted = [format_scheme(s) for s in schemes]

    return {
        "success": True,
        "total": len(formatted),
        "data": formatted
    }


# =========================
# SEARCH SCHEMES
# =========================
@router.get("/schemes/search")
def search_scheme(keyword: str = Query(...)):
    results = search_schemes(keyword)

    formatted = [format_scheme(s) for s in results]

    return {
        "success": True,
        "total": len(formatted),
        "data": formatted
    }


# =========================
# FILTER BY CATEGORY
# =========================
@router.get("/schemes/filter")
def filter_scheme(category: str = Query(...)):
    results = filter_schemes_by_category(category)

    formatted = [format_scheme(s) for s in results]

    return {
        "success": True,
        "total": len(formatted),
        "data": formatted
    }


# =========================
# FILTER BY INCOME
# =========================
@router.get("/schemes/filter-income")
def filter_income_route(income: int = Query(...)):
    results = filter_by_income(income)

    formatted = [format_scheme(s) for s in results]

    return {
        "success": True,
        "total": len(formatted),
        "data": formatted
    }