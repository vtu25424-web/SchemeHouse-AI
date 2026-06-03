import json
import os

# Get absolute path of schemes.json
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "schemes.json"
)


# Load schemes data
def load_schemes():
    with open(DATA_PATH, "r", encoding="utf-8") as file:
        schemes = json.load(file)

    return schemes


# Get all schemes
def get_all_schemes():
    return load_schemes()


# Search schemes by name/category/eligibility/benefits
def search_schemes(keyword):

    schemes = load_schemes()

    keyword = keyword.lower()

    filtered_schemes = []

    for scheme in schemes:

        scheme_name = scheme.get(
            "scheme_name",
            ""
        ).lower()

        category = scheme.get(
            "category",
            ""
        ).lower()

        eligibility = scheme.get(
            "eligibility",
            []
        )

        benefits = scheme.get(
            "benefits",
            []
        )

        if (
            keyword in scheme_name
            or keyword in category
            or any(
                keyword in item.lower()
                for item in eligibility
            )
            or any(
                keyword in item.lower()
                for item in benefits
            )
        ):
            filtered_schemes.append(scheme)

    return filtered_schemes


# Filter schemes by category
def filter_schemes_by_category(category):

    schemes = load_schemes()

    filtered_schemes = [
        scheme
        for scheme in schemes
        if scheme.get(
            "category",
            ""
        ).lower() == category.lower()
    ]

    return filtered_schemes


# Filter schemes by user income
def filter_by_income(income):

    schemes = load_schemes()

    return [
        scheme
        for scheme in schemes
        if scheme.get("min_income", 0)
        <= int(income)
        <= scheme.get("max_income", 99999999)
    ]