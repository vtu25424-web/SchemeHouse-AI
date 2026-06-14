import os
import sys
from google import genai

# Add project root directory to Python path
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )
)

sys.path.append(BASE_DIR)

from ml.recommendation_logic import get_recommendations
from app.services.user_service import get_user_profile
from app.services.scheme_service import get_all_schemes


# ==========================
# Gemini Configuration
# ==========================

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# ==========================
# Recommendation Engine
# ==========================

def generate_recommendations(email):
    """
    Generate scheme recommendations for a user.
    """

    # Fetch user profile from MongoDB
    profile = get_user_profile(email)

    if not profile:
        return []

    # Load schemes from MongoDB (now includes official_link)
    schemes = get_all_schemes()

    # Generate recommendations using ML layer
    recommendations = get_recommendations(
        profile,
        schemes
    )

    # ==========================
    # Ensure official_link exists
    # ==========================
    formatted_recommendations = []

    for scheme in recommendations:
        formatted_recommendations.append({
            "scheme_name": scheme.get("scheme_name", ""),
            "category": scheme.get("category", ""),
            "min_income": scheme.get("min_income", 0),
            "max_income": scheme.get("max_income", 0),
            "benefits": scheme.get("benefits", []),
            "eligibility": scheme.get("eligibility", []),

            # NEW FIELD
            "official_link": scheme.get("official_link", ""),

            "score": scheme.get("score", 0),
            "eligible": scheme.get("eligible", False),
            "reason": scheme.get("reason", "")
        })

    return formatted_recommendations


# ==========================
# AI CHATBOT FUNCTION
# ==========================

def chatbot_response(user_message):
    """
    Generate AI response using Gemini.
    """

    prompt = f"""
    You are SchemeHouse AI.

    Suggest Indian government schemes based on user details.

    User:
    {user_message}

    Give:
    1. Possible eligible schemes
    2. Short explanation
    3. Benefits

    Keep response under 200 words.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text