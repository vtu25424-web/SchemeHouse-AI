from fastapi import APIRouter
from app.services.recommendation_engine import (
    generate_recommendations,
    chatbot_response
)
from app.services.user_service import get_user_profile

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"]
)


@router.get("/")
def recommendation_home():
    return {
        "message": "Recommendation API Working"
    }


@router.get("/{email}")
def get_recommendations(email: str):

    user = get_user_profile(email)

    if not user:
        return {
            "success": False,
            "message": "User profile not found"
        }

    recommendations = generate_recommendations(email)

    return {
        "success": True,
        "email": email,
        "total_recommendations": len(recommendations),
        "recommendations": recommendations
    }


# ==========================
# AI Chatbot Route
# ==========================

@router.post("/chat")
def chat(data: dict):

    message = data.get("message", "")

    result = chatbot_response(message)

    return {
        "reply": result
    }