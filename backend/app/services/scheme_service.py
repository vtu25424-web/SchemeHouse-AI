import json
import os

# Get absolute path of schemes.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "schemes.json")


# Load schemes data
def load_schemes():
    with open(DATA_PATH, "r", encoding="utf-8") as file:
        schemes = json.load(file)
    return schemes


# Get all schemes
def get_all_schemes():
    return load_schemes()


# Search schemes by name
def search_schemes(query):
    schemes = load_schemes()

    query = query.lower()

    filtered_schemes = []

    for scheme in schemes:

        if (
            query in scheme["scheme_name"].lower()
            or query in scheme["category"].lower()
            or any(query in item.lower() for item in scheme["eligibility"])
            or any(query in item.lower() for item in scheme["benefits"])
        ):
            filtered_schemes.append(scheme)

    return filtered_schemes


# Filter schemes by category
def filter_schemes_by_category(category):
    schemes = load_schemes()

    filtered_schemes = [
        scheme for scheme in schemes
        if scheme["category"].lower() == category.lower()
    ]

    return filtered_schemes