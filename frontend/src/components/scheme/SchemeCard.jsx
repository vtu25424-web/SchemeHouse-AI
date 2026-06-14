function SchemeCard({ scheme, type = "search" }) {
  const score = Math.min(
    scheme.match_score || scheme.score || 0,
    100
  );

  const isRecommendation = type === "recommendation";

  return (
    <div className="scheme-card">

      {/* TITLE */}
      <h3>{scheme.scheme_name}</h3>

      {/* CATEGORY */}
      <p>
        <b>Category:</b> {scheme.category}
      </p>

      {/* ========================= */}
      {/* SEARCH MODE (FILTER PAGE) */}
      {/* ========================= */}
      {!isRecommendation && (
        <>
          <p>
            <b>Income Range:</b> ₹{scheme.min_income} - ₹{scheme.max_income}
          </p>

          <div>
            <b>Benefits:</b>
            <ul>
              {scheme.benefits?.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* APPLY BUTTON */}
          {scheme.official_link && (
            <div style={{ marginTop: "10px" }}>
              <a
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Apply Now
              </a>
            </div>
          )}
        </>
      )}

      {/* ========================= */}
      {/* RECOMMENDATION MODE (AI) */}
      {/* ========================= */}
      {isRecommendation && (
        <>
          {/* ELIGIBILITY */}
          <p
            style={{
              color: scheme.eligible ? "green" : "red",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {scheme.eligible ? "🟢 Eligible" : "🔴 Not Eligible"}
          </p>

          {/* MATCH SCORE */}
          {score > 0 && (
            <>
              <p>
                <b>Match Score:</b> {score}%
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
            </>
          )}

          {/* REASON */}
          {scheme.reason && (
            <p>
              <b>Reason:</b> {scheme.reason}
            </p>
          )}

          {/* APPLY BUTTON (RECOMMENDATION MODE ALSO) */}
          {scheme.official_link && (
            <div style={{ marginTop: "10px" }}>
              <a
                href={scheme.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Apply Now
              </a>
            </div>
          )}
        </>
      )}

    </div>
  );
}

export default SchemeCard;