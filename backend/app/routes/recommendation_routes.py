from fastapi import APIRouter
from app.services.recommendation_engine import generate_recommendations
from app.services.user_service import get_user_profile

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/")
def recommendation_home():
    return {
        "message": "Recommendation Route Working"
    }


@router.get("/recommend/{email}")
def recommend_schemes(email: str):

    user = get_user_profile(email)

    if not user:
        return {
            "message": "User profile not found"
        }

    # User data itself contains the profile
    profile = user

    recommendations = generate_recommendations(profile)

    return {
        "email": email,
        "recommendations": recommendations
    }