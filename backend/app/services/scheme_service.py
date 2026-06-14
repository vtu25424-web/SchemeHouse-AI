import json
import os
from app.database.mongodb import db

# MongoDB Collection
SCHEME_COLLECTION = db["schemes"]

# Get absolute path of schemes.json
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

JSON_FILE = os.path.join(BASE_DIR, "data", "schemes.json")


# =========================
# JSON SCHEMES
# =========================
def get_json_schemes():
    """Load schemes from JSON file."""
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []


# =========================
# MONGODB SCHEMES
# =========================
def get_mongodb_schemes():
    """Load schemes from MongoDB."""
    try:
        schemes = list(
            SCHEME_COLLECTION.find({}, {"_id": 0})
        )
        return schemes
    except Exception:
        return []


# =========================
# COMBINED SCHEMES
# =========================
def get_all_schemes():
    """Return schemes from both JSON and MongoDB."""
    json_schemes = get_json_schemes()
    mongodb_schemes = get_mongodb_schemes()

    return json_schemes + mongodb_schemes


# =========================
# SEARCH SCHEMES
# =========================
def search_schemes(keyword):
    """Search schemes by name, category, eligibility, or benefits."""
    schemes = get_all_schemes()
    keyword = keyword.lower()

    filtered_schemes = []

    for scheme in schemes:
        scheme_name = scheme.get("scheme_name", "").lower()
        category = scheme.get("category", "").lower()
        eligibility = scheme.get("eligibility", [])
        benefits = scheme.get("benefits", [])

        if (
            keyword in scheme_name
            or keyword in category
            or any(keyword in str(item).lower() for item in eligibility)
            or any(keyword in str(item).lower() for item in benefits)
        ):
            filtered_schemes.append(scheme)

    return filtered_schemes


# =========================
# FILTER BY CATEGORY
# =========================
def filter_schemes_by_category(category):
    """Filter schemes by category."""
    schemes = get_all_schemes()

    return [
        scheme
        for scheme in schemes
        if scheme.get("category", "").lower() == category.lower()
    ]


# =========================
# FILTER BY INCOME
# =========================
def filter_by_income(income):
    """Filter schemes by income range."""
    schemes = get_all_schemes()

    try:
        income = int(income)
    except ValueError:
        return []

    return [
        scheme
        for scheme in schemes
        if scheme.get("min_income", 0)
        <= income
        <= scheme.get("max_income", 99999999)
    ]


# =========================
# ADMIN CRUD FUNCTIONS
# =========================

def add_scheme(scheme):
    """Add a new scheme to MongoDB."""

    scheme_data = {
        "scheme_name": scheme.get("scheme_name"),
        "category": scheme.get("category"),
        "min_income": scheme.get("min_income"),
        "max_income": scheme.get("max_income"),
        "eligibility": scheme.get("eligibility", []),
        "benefits": scheme.get("benefits", []),
        "official_link": scheme.get("official_link", "")
    }

    SCHEME_COLLECTION.insert_one(scheme_data)

    return {
        "message": "Scheme added successfully"
    }


def update_scheme(scheme_name, updated_data):
    """Update an existing scheme."""

    SCHEME_COLLECTION.update_one(
        {"scheme_name": scheme_name},
        {"$set": updated_data}
    )

    return {
        "message": "Scheme updated successfully"
    }


def delete_scheme(scheme_name):
    """Delete a scheme."""

    SCHEME_COLLECTION.delete_one(
        {"scheme_name": scheme_name}
    )

    return {
        "message": "Scheme deleted successfully"
    }