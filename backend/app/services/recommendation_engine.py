import os
import sys

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


def generate_recommendations(email):
    """
    Generate scheme recommendations for a user.
    """

    # Fetch user profile from MongoDB
    profile = get_user_profile(email)

    if not profile:
        return []

    # Load schemes from JSON + MongoDB
    schemes = get_all_schemes()

    # Generate recommendations using ML layer
    recommendations = get_recommendations(
        profile,
        schemes
    )

    return recommendations