from fastapi import APIRouter

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

@router.get("/")
def recommendation_home():
    return {
        "message": "Recommendation Route Working"
    }