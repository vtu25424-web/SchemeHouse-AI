function SchemeCard({
    scheme,
    type = "search"
}) {
    const score = Math.min(
        scheme.match_score || scheme.score || 0,
        100
    );

    return (
        <div className="scheme-card">

            <h3>{scheme.scheme_name}</h3>

            <p>
                <strong>Category:</strong>{" "}
                {scheme.category}
            </p>

            {/* Recommendation Mode */}
            {type === "recommendation" && (
                <>
                    <p
                        style={{
                            color: scheme.eligible
                                ? "green"
                                : "red",
                            fontWeight: "bold",
                            fontSize: "16px"
                        }}
                    >
                        {scheme.eligible
                            ? "🟢 Eligible"
                            : "🔴 Not Eligible"}
                    </p>

                    <p>
                        <strong>
                            Match Score:
                        </strong>{" "}
                        {score}%
                    </p>

                    <div className="score-bar">
                        <div
                            className="score-fill"
                            style={{
                                width: `${score}%`,
                                background:
                                    score >= 90
                                        ? "#16a34a"
                                        : score >= 70
                                        ? "#2563eb"
                                        : "#f59e0b"
                            }}
                        >
                            {score}%
                        </div>
                    </div>

                    <p>
                        <strong>
                            Reason:
                        </strong>{" "}
                        {scheme.reason}
                    </p>
                </>
            )}

            {/* Search / Filter Mode */}
            {type === "search" && (
                <p>
                    <strong>
                        Income Range:
                    </strong>{" "}
                    ₹{scheme.min_income}
                    {" - "}
                    ₹{scheme.max_income}
                </p>
            )}

            <h4>Benefits:</h4>

            <ul>
                {scheme.benefits?.map(
                    (benefit, index) => (
                        <li key={index}>
                            {benefit}
                        </li>
                    )
                )}
            </ul>

        </div>
    );
}

export default SchemeCard;