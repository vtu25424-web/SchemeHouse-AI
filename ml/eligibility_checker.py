# ml/eligibility_checker.py

import re


def extract_income_limit(value):

    if value == "No limit":
        return float("inf")

    if "Below" in value:

        numbers = re.findall(r'\d+', value)

        if numbers:

            amount = int(numbers[0])

            if "lakh" in value.lower():
                amount = amount * 100000

            return amount

    return 0


def check_eligibility(profile, scheme):

    age = profile.get("age", 0)
    income = profile.get("income", 0)
    occupation = profile.get("occupation", "").lower()
    category = profile.get("category", "").lower()

    eligibility = [
        e.lower() for e in scheme.get("eligibility", [])
    ]

    income_limit_text = scheme.get("income_limit", "No limit")

    income_limit = extract_income_limit(income_limit_text)

    reasons = []

    # Occupation Match
    if occupation in " ".join(eligibility):
        reasons.append("Occupation matched")

    # Category Match
    if category in " ".join(eligibility):
        reasons.append("Category matched")

    # Income Match
    if income <= income_limit:
        reasons.append("Income eligible")

    # Student Match
    if age < 25 and "student" in " ".join(eligibility):
        reasons.append("Student eligible")

    # Senior Citizen Match
    if age > 60 and "senior citizen" in " ".join(eligibility):
        reasons.append("Senior citizen eligible")

    eligible = len(reasons) > 0

    return {
        "eligible": eligible,
        "reasons": reasons
    }