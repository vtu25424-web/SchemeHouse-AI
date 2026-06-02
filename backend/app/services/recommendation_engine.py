import json
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

SCHEME_FILE = os.path.join(
    BASE_DIR,
    "backend",
    "data",
    "schemes.json"
)


def load_schemes():

    with open(
        SCHEME_FILE,
        "r",
        encoding="utf-8"
    ) as file:
        return json.load(file)


def generate_recommendations(email):

    # Fetch profile from MongoDB
    profile = get_user_profile(email)

    if not profile:
        return []

    # Load schemes dataset
    schemes = load_schemes()
    # Generate recommendations using ML layer
    recommendations = get_recommendations(
        profile,
        schemes
    )

    return recommendations