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
        reason_parts = []

        # Category Match (Highest Priority)
        if category == scheme_category:
            score += 50
            reason_parts.append("Category matched")

        # Occupation Match
        if occupation and occupation in eligibility_text:
            score += 30
            reason_parts.append("Occupation matched")

        # Additional Occupation Keywords
        if occupation == "farmer":

            if "small farmers" in eligibility_text:
                score += 10
                reason_parts.append("Small farmer benefit match")

            if "agricultural land owners" in eligibility_text:
                score += 10
                reason_parts.append("Land owner eligibility match")

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
                reason_parts.append("Income within limit")

        except:
            score += 5
            reason_parts.append("No strict income limit")

        # Age Logic
        if age < 25 and "student" in eligibility_text:
            score += 20
            reason_parts.append("Student age match")

        if age > 60 and "senior citizen" in eligibility_text:
            score += 20
            reason_parts.append("Senior citizen match")

        # State Bonus
        if state and state in eligibility_text:
            score += 10
            reason_parts.append(
                "State-based eligibility match"
            )

        # Only keep useful recommendations
        if score >= 40:

            # Cap score at 100
            score = min(score, 100)

            reason = (
                ", ".join(reason_parts)
                if reason_parts
                else "Basic eligibility match"
            )

            recommendations.append({
                "scheme_name": scheme_name,
                "category": scheme.get("category"),
                "benefits": scheme.get("benefits"),
                "official_link": scheme.get("official_link", ""),
                "score": score,
                "reason": reason,
                "eligible": True
            })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:8]