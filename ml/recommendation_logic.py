def get_recommendations(profile, schemes):

    recommendations = []

    age = profile.get("age", 0)
    income = profile.get("income", 0)
    occupation = profile.get("occupation", "").lower()
    category = profile.get("category", "").lower()
    state = profile.get("state", "").lower()

    for scheme in schemes:

        scheme_name = scheme.get("scheme_name", "")
        scheme_category = scheme.get("category", "").lower()

        eligibility = [
            e.lower()
            for e in scheme.get("eligibility", [])
        ]

        eligibility_text = " ".join(eligibility)

        score = 0

        # Category Match (Highest Priority)
        if category == scheme_category:
            score += 50

        # Occupation Match
        if occupation and occupation in eligibility_text:
            score += 30

        # Additional Occupation Keywords
        if occupation == "farmer":
            if "small farmers" in eligibility_text:
                score += 10
            if "agricultural land owners" in eligibility_text:
                score += 10

        # Income Handling
        income_limit_raw = scheme.get(
            "income_limit",
            "No limit"
        )

        try:
            income_limit = int(
                str(income_limit_raw)
                .replace("Below", "")
                .replace("₹", "")
                .replace("lakh", "00000")
                .replace(",", "")
                .strip()
            )

            if income <= income_limit:
                score += 10

        except:
            # No limit schemes
            score += 5

        # Age Logic
        if age < 25 and "student" in eligibility_text:
            score += 20

        if age > 60 and "senior citizen" in eligibility_text:
            score += 20

        # State Bonus
        if state and state in eligibility_text:
            score += 10

        # Add only useful results
        if score >= 40:
            recommendations.append({
                "scheme_name": scheme_name,
                "category": scheme.get("category"),
                "benefits": scheme.get("benefits"),
                "score": score
            })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:8]