from fastapi import APIRouter, Query
from app.services.scheme_service import (
    get_all_schemes,
    search_schemes,
    filter_schemes_by_category
)

router = APIRouter()


# Get all schemes
@router.get("/schemes")
def fetch_all_schemes():
    return {
        "success": True,
        "total": len(get_all_schemes()),
        "data": get_all_schemes()
    }


# Search schemes
@router.get("/schemes/search")
def search_scheme(query: str = Query(...)):
    results = search_schemes(query)

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