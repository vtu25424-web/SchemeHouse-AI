from fastapi import APIRouter, Query
from app.services.scheme_service import (
    get_all_schemes,
    search_schemes,
    filter_schemes_by_category,
    filter_by_income
)

router = APIRouter()


# Get all schemes
@router.get("/schemes")
def fetch_all_schemes():
    schemes = get_all_schemes()

    return {
        "success": True,
        "total": len(schemes),
        "data": schemes
    }


# Search schemes
@router.get("/schemes/search")
def search_scheme(keyword: str = Query(...)):
    results = search_schemes(keyword)

    return {
        "success": True,
        "total": len(results),
        "data": results
    }


# Filter schemes by category
@router.get("/schemes/filter")
def filter_scheme(category: str = Query(...)):
    results = filter_schemes_by_category(category)

    return {
        "success": True,
        "total": len(results),
        "data": results
    }


# Filter schemes by income
@router.get("/schemes/filter-income")
def filter_income_route(income: int = Query(...)):
    return filter_by_income(income)