function SchemeCard({ scheme }) {
    const score = Math.min(scheme.score || 0, 100);

    return (
        <div className="scheme-card">
            <h3>{scheme.scheme_name}</h3>

            <p>
                <strong>Category:</strong> {scheme.category}
            </p>

            {/* Eligibility Status */}
            <p
                style={{
                    color: scheme.eligible ? "green" : "red",
                    fontWeight: "bold",
                    fontSize: "16px"
                }}
            >
                {scheme.eligible ? "🟢 Eligible" : "🔴 Not Eligible"}
            </p>

            {/* Match Score */}
            <p>
                <strong>Match Score:</strong>
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
                <strong>Benefits:</strong>
            </p>

            <ul>
                {scheme.benefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
            </ul>

            <p>
                <strong>Reason:</strong> {scheme.reason}
            </p>
        </div>
    );
}

export default SchemeCard;